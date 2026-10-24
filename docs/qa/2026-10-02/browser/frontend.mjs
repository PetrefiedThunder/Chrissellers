import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

// Usage: node frontend.mjs /private/tmp/qa-tools http://127.0.0.1:3000
// Connect only: the orchestrator owns the already-running browser server.
const [toolRoot, baseUrl] = process.argv.slice(2)
assert(toolRoot && baseUrl, 'Supply isolated tools path and loopback base URL')
assert(['localhost', '127.0.0.1', '[::1]'].includes(new URL(baseUrl).hostname))
assert(process.env.PW_TEST_CONNECT_WS_ENDPOINT, 'Browser server endpoint required')
const require = createRequire(path.join(toolRoot, 'package.json'))
const engines = require('playwright')
const output = path.resolve('docs/qa/2026-10-02/artifacts/frontend')
await mkdir(output, { recursive: true })
const report = { started: new Date().toISOString(), baseUrl, engines: [], journeys: [], checks: [], performance: {} }

async function localContext(browser, options = {}) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, ...options })
  const blocked = []
  await context.route('**/*', async route => {
    const url = new URL(route.request().url())
    if (['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) && ['http:', 'https:'].includes(url.protocol)) {
      await route.continue()
    } else {
      blocked.push(url.origin + url.pathname)
      await route.abort('blockedbyclient')
    }
  })
  return { context, blocked }
}

function observe(page) {
  const errors = { console: [], page: [], network: [], failed: [] }
  page.on('console', message => {
    if (message.type() === 'error' || message.type() === 'warning') errors.console.push({ type: message.type(), text: message.text() })
  })
  page.on('pageerror', error => errors.page.push(error.message))
  page.on('response', response => {
    if (response.status() >= 400) errors.network.push({ url: response.url(), status: response.status() })
  })
  page.on('requestfailed', request => errors.failed.push({ url: request.url(), error: request.failure()?.errorText }))
  return errors
}

async function navigateSections(page) {
  const visited = []
  for (const [name, target, heading] of [
    ['Work', 'work', 'Selected work'],
    ['Career', 'career', 'Career'],
    ['Contact', 'contact', 'Get in touch'],
  ]) {
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name, exact: true }).click()
    assert.equal(new URL(page.url()).hash, '#' + target)
    const section = page.locator('#' + target)
    assert(await section.getByRole('heading', { name: heading, exact: true }).isVisible())
    const box = await section.getByRole('heading', { name: heading, exact: true }).boundingBox()
    assert(box && box.y >= 0 && box.y < 1000, `${target} heading is in the viewport`)
    visited.push({ target, heading, y: box.y })
  }
  return visited
}

let browser
try {
  browser = await engines.chromium.connect(process.env.PW_TEST_CONNECT_WS_ENDPOINT, { timeout: 15000 })
  report.engines.push({ requested: 'chromium', actual: browser.browserType().name(), version: browser.version(), outcome: 'connected' })
  const { context, blocked } = await localContext(browser)
  const page = await context.newPage()
  const errors = observe(page)
  const response = await page.goto(baseUrl, { waitUntil: 'networkidle' })
  assert.equal(response.status(), 200)
  assert.equal(await page.locator('h1').count(), 1)
  assert.match(await page.title(), /Christopher Sellers/)
  assert.equal(await page.getByRole('main').count(), 1)
  assert.equal(await page.locator('#work article').count(), 6)
  assert.equal(await page.locator('#career ol > li').count(), 6)
  await page.screenshot({ path: path.join(output, 'desktop-home.png'), fullPage: false })
  await page.getByRole('link', { name: 'See the work', exact: true }).click()
  assert.equal(new URL(page.url()).hash, '#work')
  const visited = await navigateSections(page)
  const emailLinks = await page.locator('a[href^="mailto:"]').evaluateAll(links => links.map(link => ({ label: link.textContent.trim(), href: link.getAttribute('href') })))
  assert.equal(emailLinks.length, 2)
  for (const link of emailLinks) assert.match(link.href, /^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/)
  const externalLinks = await page.locator('a[target="_blank"]').evaluateAll(links => links.map(link => ({ label: link.textContent.trim() || link.getAttribute('aria-label'), href: link.href, rel: link.rel })))
  for (const link of externalLinks) {
    assert.equal(new URL(link.href).protocol, 'https:')
    assert.match(link.rel, /noopener/)
    assert.match(link.rel, /noreferrer/)
  }
  await page.screenshot({ path: path.join(output, 'desktop-contact.png'), fullPage: false })
  await page.getByRole('navigation').getByRole('link', { name: 'Christopher Sellers', exact: true }).click()
  assert.equal(new URL(page.url()).hash, '#main')
  assert.deepEqual(errors, { console: [], page: [], network: [], failed: [] })
  assert.equal(blocked.length, 0)
  report.journeys.push({ name: 'arrival-work-career-contact-home', outcome: 'pass', visited, emailLinks, externalLinks, errors, blocked })
  report.checks.push('200 root; unique H1/main; six work cards; six career entries; hash navigation; contact syntax; external HTTPS + noopener/noreferrer; zero browser errors')
  await context.close()

  const noJs = await localContext(browser, { javaScriptEnabled: false })
  const noJsPage = await noJs.context.newPage()
  const noJsResponse = await noJsPage.goto(baseUrl, { waitUntil: 'load' })
  assert.equal(noJsResponse.status(), 200)
  assert.equal(await noJsPage.locator('#work article').count(), 6)
  assert.equal(await noJsPage.locator('#career ol > li').count(), 6)
  const noJsVisited = await navigateSections(noJsPage)
  assert.equal(await noJsPage.locator('a[href^="mailto:"]').count(), 2)
  await noJsPage.screenshot({ path: path.join(output, 'no-js-contact.png') })
  report.journeys.push({ name: 'javascript-disabled', outcome: 'pass', visited: noJsVisited, blocked: noJs.blocked })
  await noJs.context.close()

  const missing = await localContext(browser)
  const missingPage = await missing.context.newPage()
  const missingResponse = await missingPage.goto(baseUrl + '/qa-does-not-exist', { waitUntil: 'load' })
  assert.equal(missingResponse.status(), 404)
  assert(await missingPage.getByText('This page could not be found.').isVisible())
  report.journeys.push({ name: 'unknown-route', outcome: 'pass', status: 404, limitation: 'UX pass assesses recovery and semantics' })
  await missing.context.close()

  const perf = await localContext(browser)
  const perfPage = await perf.context.newPage()
  const session = await perf.context.newCDPSession(perfPage)
  await session.send('Network.enable')
  await session.send('Network.setCacheDisabled', { cacheDisabled: true })
  await session.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1_600_000 / 8, uploadThroughput: 750_000 / 8, connectionType: 'cellular4g' })
  await session.send('Emulation.setCPUThrottlingRate', { rate: 4 })
  await perfPage.addInitScript(() => {
    window.__qa = { lcp: null, cls: 0, longTaskMs: 0 }
    for (const [type, callback] of [
      ['largest-contentful-paint', entries => { window.__qa.lcp = entries.at(-1)?.startTime ?? null }],
      ['layout-shift', entries => { window.__qa.cls += entries.filter(entry => !entry.hadRecentInput).reduce((sum, entry) => sum + entry.value, 0) }],
      ['longtask', entries => { window.__qa.longTaskMs += entries.reduce((sum, entry) => sum + Math.max(0, entry.duration - 50), 0) }],
    ]) {
      try { new PerformanceObserver(list => callback(list.getEntries())).observe({ type, buffered: true }) } catch { /* Browser support recorded by null LCP. */ }
    }
  })
  await perfPage.goto(baseUrl, { waitUntil: 'networkidle' })
  await perfPage.getByRole('link', { name: 'See the work', exact: true }).click()
  report.performance = await perfPage.evaluate(() => ({
    conditions: 'Single localhost Chromium sample, cold cache, 150ms simulated latency, 1.6Mbps download, 0.75Mbps upload, 4x CPU; not Lighthouse or field CWV',
    navigation: performance.getEntriesByType('navigation').map(entry => entry.toJSON()),
    paint: performance.getEntriesByType('paint').map(entry => entry.toJSON()),
    webVitalsApproximation: window.__qa,
    resources: performance.getEntriesByType('resource').map(entry => ({ name: entry.name, type: entry.initiatorType, duration: entry.duration, transferSize: entry.transferSize, encodedBodySize: entry.encodedBodySize })),
  }))
  await perf.context.close()
  await browser.close()
  browser = undefined

  for (const name of ['firefox', 'webkit']) {
    let alternate
    let connectedToRequestedEngine = false
    try {
      alternate = await engines[name].connect(process.env.PW_TEST_CONNECT_WS_ENDPOINT, { timeout: 10000 })
      const actual = alternate.browserType().name()
      if (actual !== name) {
        report.engines.push({ requested: name, actual, outcome: 'unavailable', reason: 'The supplied endpoint serves another engine; no cross-browser claim' })
      } else {
        connectedToRequestedEngine = true
        const smoke = await localContext(alternate)
        const smokePage = await smoke.context.newPage()
        const smokeResponse = await smokePage.goto(baseUrl, { waitUntil: 'load' })
        assert.equal(smokeResponse.status(), 200)
        assert.equal(await smokePage.locator('h1').count(), 1)
        await navigateSections(smokePage)
        report.engines.push({ requested: name, actual, version: alternate.version(), outcome: 'pass' })
        await smoke.context.close()
      }
    } catch (error) {
      if (connectedToRequestedEngine) throw error
      report.engines.push({ requested: name, outcome: 'unavailable', reason: error.message })
    } finally {
      if (alternate) await alternate.close()
    }
  }
  report.outcome = 'pass'
} catch (error) {
  report.outcome = 'fail'
  report.error = error.stack
  process.exitCode = 1
} finally {
  if (browser) await browser.close()
  report.finished = new Date().toISOString()
  await writeFile(path.join(output, 'runtime-report.json'), JSON.stringify(report, null, 2) + '\n')
  console.log(JSON.stringify({ outcome: report.outcome, engines: report.engines, journeys: report.journeys.map(({ name, outcome }) => ({ name, outcome })), error: report.error, performance: report.performance.webVitalsApproximation }, null, 2))
}
