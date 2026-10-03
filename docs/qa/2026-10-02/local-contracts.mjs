// Run from the repository root after a production localhost server is ready.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { writeFile } from 'node:fs/promises'

const base = new URL(process.argv[2] || 'http://127.0.0.1:3100')
assert.equal(base.hostname, '127.0.0.1', 'QA requests must remain on loopback')
assert.equal(base.protocol, 'http:')
assert.equal(base.username + base.password, '')
const artifactDir = new URL('./artifacts/', import.meta.url)
const results = { startedAt: new Date().toISOString(), base: base.origin, checks: [] }

async function request(path, method = 'GET') {
  const url = new URL(path, base)
  assert.equal(url.origin, base.origin)
  const response = await fetch(url, { method, redirect: 'manual', signal: AbortSignal.timeout(15000) })
  const bytes = Buffer.from(await response.arrayBuffer())
  results.checks.push({
    method, path: url.pathname + url.search, status: response.status,
    contentType: response.headers.get('content-type'), bytes: bytes.length,
    cacheControl: response.headers.get('cache-control'),
  })
  return { response, bytes, text: bytes.toString('utf8') }
}

try {
  const home = await request('/')
  assert.equal(home.response.status, 200)
  assert.match(home.response.headers.get('content-type'), /text\/html/)
  assert.match(home.text, /<html[^>]+lang="en"/)
  assert.match(home.text, /<title>Christopher Sellers/)
  assert.match(home.text, /<main id="main"/)
  assert.equal(home.response.headers.get('set-cookie'), null)
  const metadata = Object.fromEntries(
    [...home.text.matchAll(/<meta\s+(?:name|property)="([^"]+)"\s+content="([^"]*)"\s*\/?\s*>/g)]
      .map((match) => [match[1], match[2].replaceAll('&amp;', '&')]),
  )
  assert.ok(metadata.description?.length > 50)
  assert.equal(metadata['og:type'], 'website')
  assert.equal(metadata['twitter:card'], 'summary_large_image')
  assert.equal(metadata['og:description'], metadata.description)
  assert.equal(metadata['twitter:description'], metadata.description)
  assert.equal(metadata['og:image:width'], '1200')
  assert.equal(metadata['og:image:height'], '630')
  assert.ok(metadata['og:image:alt']?.includes('Christopher Sellers'))
  // Metadata contains the public URL. Fetch only its path at our local origin.
  const imageUrl = new URL(metadata['og:image'])
  const imagePath = imageUrl.pathname + imageUrl.search
  const png = await request(imagePath)
  assert.equal(png.response.status, 200)
  assert.equal(png.response.headers.get('content-type'), 'image/png')
  assert.equal(png.bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a')
  assert.equal(png.bytes.readUInt32BE(16), 1200)
  assert.equal(png.bytes.readUInt32BE(20), 630)
  await writeFile(new URL('BE-opengraph.png', artifactDir), png.bytes)
  results.metadata = metadata
  results.image = { width: 1200, height: 630, sha256: createHash('sha256').update(png.bytes).digest('hex') }
  const imageHead = await request(imagePath, 'HEAD')
  assert.equal(imageHead.response.status, 200)
  assert.equal(imageHead.bytes.length, 0)
  const imagePost = await request(imagePath, 'POST')
  assert.equal(imagePost.response.status, 405)
  const head = await request('/', 'HEAD')
  assert.equal(head.response.status, 200)
  assert.equal(head.bytes.length, 0)
  const query = await request('/?qa_boundary=%3Cqa-marker%3E')
  assert.equal(query.response.status, 200)
  assert.ok(!query.text.includes('<qa-marker>'))
  for (const path of ['/qa-does-not-exist', '/api/qa-does-not-exist', '/%ZZ']) {
    const missing = await request(path)
    assert.ok([400, 404].includes(missing.response.status))
    assert.ok(!/Error:.*\n\s+at |node_modules\//.test(missing.text))
    if (missing.response.status === 404) assert.match(missing.text, /name="robots" content="noindex"/)
  }
  // Five harmless parallel reads verify cached image consistency, not load capacity.
  const repeated = await Promise.all(Array.from({ length: 5 }, () => request(imagePath)))
  assert.ok(repeated.every(({ response, bytes }) => response.status === 200 && bytes.equals(png.bytes)))
  results.outcome = 'PASS'
} catch (error) {
  results.outcome = 'FAIL'
  results.error = error.message
  process.exitCode = 1
} finally {
  results.finishedAt = new Date().toISOString()
  await writeFile(new URL('BE-local-contracts.json', artifactDir), JSON.stringify(results, null, 2) + '\n')
  console.log(JSON.stringify(results, null, 2))
}
