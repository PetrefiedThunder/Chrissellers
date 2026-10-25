/** Local-only UX evidence. Usage: node ux.mjs /path/to/qa-tools http://127.0.0.1:PORT */
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const require = createRequire(resolve(process.argv[2], 'package.json'));
const { chromium } = require('playwright');
const axePath = require.resolve('axe-core/axe.min.js');
const base = process.argv[3];
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname), 'Only local server allowed');
assert.ok(process.env.PW_TEST_CONNECT_WS_ENDPOINT, 'Remote browser endpoint required');
const directory = resolve('docs/qa/2026-10-02/artifacts/ux');
await mkdir(directory, { recursive: true });
const browser = await chromium.connect(process.env.PW_TEST_CONNECT_WS_ENDPOINT);
const report = { startedAt: new Date().toISOString(), browser: browser.version(), scenarios: [], keyboard: {}, errorPage: {}, checks: [], blockedRequests: [] };

function check(name, condition, findingId) {
  const status = condition ? 'passed' : findingId ? 'expected-failure' : 'failed';
  report.checks.push({ name, status, ...(findingId ? { findingId } : {}) });
  assert.ok(condition || findingId, name);
}

async function context(options = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, ...options });
  await ctx.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (!['127.0.0.1', 'localhost'].includes(url.hostname)) {
      report.blockedRequests.push(`${url.protocol}//${url.host}${url.pathname}`);
      return route.abort('blockedbyclient');
    }
    return route.continue();
  });
  return ctx;
}

async function geometry(page) {
  return page.evaluate(() => {
    const box = el => {
      const rect = el.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, right: rect.right, bottom: rect.bottom };
    };
    return {
      viewport: { width: innerWidth, height: innerHeight },
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      rootFontSize: getComputedStyle(document.documentElement).fontSize,
      font: getComputedStyle(document.querySelector('h1')).fontFamily,
      overflowing: [...document.querySelectorAll('body *')].filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
      }).map(el => ({ tag: el.tagName, text: el.textContent.trim().slice(0, 100), box: box(el) })).slice(0, 40),
      nav: [...document.querySelectorAll('nav a')].map(el => ({ text: el.textContent.trim(), box: box(el) })),
      email: [...document.querySelectorAll('footer a[href^="mailto:"]')].map(el => ({ text: el.textContent.trim(), box: box(el) })),
      headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(el => ({ level: el.tagName, text: el.textContent.trim() })),
      landmarks: [...document.querySelectorAll('header,nav,main,footer')].map(el => ({ tag: el.tagName, label: el.getAttribute('aria-label'), id: el.id })),
      focusStyles: getComputedStyle(document.querySelector('a')).outline,
    };
  });
}

async function axe(page) {
  await page.addScriptTag({ path: axePath });
  const result = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } }));
  return { tool: result.testEngine, passes: result.passes.length, incomplete: result.incomplete.map(rule => ({ id: rule.id, impact: rule.impact, nodes: rule.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })), violations: result.violations.map(rule => ({ id: rule.id, impact: rule.impact, description: rule.description, help: rule.help, tags: rule.tags, nodes: rule.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })) };
}

try {
  for (const spec of [
    { name: 'desktop-light-1440', width: 1440, colorScheme: 'light' },
    { name: 'desktop-dark-1440', width: 1440, colorScheme: 'dark' },
    { name: 'tablet-light-768', width: 768, colorScheme: 'light' },
    { name: 'mobile-light-375', width: 375, colorScheme: 'light' },
    { name: 'mobile-light-320', width: 320, colorScheme: 'light' },
    { name: 'mobile-dark-320', width: 320, colorScheme: 'dark' },
    { name: 'desktop-text200-1280', width: 1280, colorScheme: 'light', text200: true },
    { name: 'mobile-text200-375', width: 375, colorScheme: 'light', text200: true },
    { name: 'reduced-motion-375', width: 375, colorScheme: 'light', reducedMotion: 'reduce' },
  ]) {
    const ctx = await context({ viewport: { width: spec.width, height: 900 }, colorScheme: spec.colorScheme, reducedMotion: spec.reducedMotion ?? 'no-preference' });
    const page = await ctx.newPage();
    const response = await page.goto(base, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    await page.locator('h1').waitFor();
    await page.evaluate(() => document.fonts.ready);
    if (spec.text200) await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    const data = { ...spec, geometry: await geometry(page), axe: await axe(page) };
    check(`${spec.name}: viewport reflow`, data.geometry.documentWidth <= spec.width, spec.name === 'mobile-text200-375' ? 'UX-001' : undefined);
    check(`${spec.name}: axe WCAG rules`, data.axe.violations.length === 0);
    await page.screenshot({ path: `${directory}/${spec.name}-viewport.png` });
    await page.screenshot({ path: `${directory}/${spec.name}.png`, fullPage: true });
    if (spec.width <= 375) {
      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${directory}/${spec.name}-contact.png` });
    }
    report.scenarios.push(data);
    await ctx.close();
    console.log(`${spec.name}: document ${data.geometry.documentWidth}px / viewport ${spec.width}px; axe ${data.axe.violations.length} violations, ${data.axe.incomplete.length} incomplete`);
  }

  const ctx = await context();
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  const keyboardSteps = [];
  for (let i = 0; i < 13; i++) {
    await page.keyboard.press('Tab');
    await page.locator(':focus').evaluate(el => Promise.all(el.getAnimations().map(animation => animation.finished)));
    keyboardSteps.push(await page.evaluate(() => {
      const el = document.activeElement;
      const r = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return { tag: el.tagName, text: el.textContent.trim(), label: el.getAttribute('aria-label'), href: el.getAttribute('href'), outline: style.outline, offset: style.outlineOffset, box: { x: r.x, y: r.y, width: r.width, height: r.height }, visibleInViewport: r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth };
    }));
    if (i === 0) {
      await page.screenshot({ path: `${directory}/keyboard-skip-focus.png` });
      await page.keyboard.press('Enter');
      report.keyboard.skipDestination = await page.evaluate(() => ({ hash: location.hash, activeTag: document.activeElement.tagName, activeId: document.activeElement.id }));
      await page.keyboard.press('Tab');
      report.keyboard.afterSkipTab = await page.evaluate(() => ({ text: document.activeElement.textContent.trim(), href: document.activeElement.getAttribute('href') }));
      check('Skip link bypasses navigation to first main link', report.keyboard.afterSkipTab.text === 'Get in touch');
      await page.goto(base, { waitUntil: 'networkidle' });
      await page.keyboard.press('Tab');
    }
  }
  report.keyboard.steps = keyboardSteps;
  check('Keyboard focus is visible after transition settles', keyboardSteps.every(step => step.visibleInViewport && step.outline.includes('solid 2px')));
  report.keyboard.accessibilitySnapshot = await page.locator('body').ariaSnapshot();
  const error = await page.goto(`${base}/qa-missing-page`, { waitUntil: 'networkidle' });
  report.errorPage.status = error.status();
  check('404 route returns HTTP 404', report.errorPage.status === 404);
  report.errorPage.axe = await axe(page);
  check('404: axe WCAG rules', report.errorPage.axe.violations.length === 0);
  report.errorPage.snapshot = await page.locator('body').ariaSnapshot();
  report.errorPage.links = await page.locator('a').evaluateAll(elements => elements.map(el => ({ text: el.textContent, href: el.getAttribute('href'), targetExists: el.hash ? !!document.getElementById(el.hash.slice(1)) : null })));
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  report.errorPage.afterSkip = await page.evaluate(() => ({ hash: location.hash, mainCount: document.querySelectorAll('main').length, activeTag: document.activeElement.tagName, activeText: document.activeElement.textContent.trim() }));
  check('404 has a valid main skip target and a route home', report.errorPage.afterSkip.mainCount === 1 && report.errorPage.links.some(link => link.href === '#main' && link.targetExists === true) && report.errorPage.links.some(link => link.href === '/'), 'UX-002');
  await page.screenshot({ path: `${directory}/404-page.png` });
  await ctx.close();
} finally {
  report.finishedAt = new Date().toISOString();
  await writeFile(`${directory}/ux-report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
