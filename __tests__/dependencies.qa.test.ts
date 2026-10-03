import manifest from '../package.json'
import lockfile from '../package-lock.json'

describe('BE-001: Next.js next/og security patch', () => {
  it('pins the manifest and lockfile to the same Next.js release', () => {
    expect(manifest.dependencies.next).toBe(lockfile.packages['node_modules/next'].version)
    expect(lockfile.packages[''].dependencies.next).toBe(manifest.dependencies.next)
  })

  it('locks a stable release at or above the patched 16.3.6 version', () => {
    // GHSA-vcvr-r3jv-pc5j affects >=16.2.0 <16.3.6. Do not exploit the renderer.
    const version = lockfile.packages['node_modules/next'].version
    expect(version).toMatch(/^\d+\.\d+\.\d+$/)
    const [major, minor, patch] = version.split('.').map(Number)
    expect(
      major > 16 || (major === 16 && (minor > 3 || (minor === 3 && patch >= 6))),
    ).toBe(true)
  })
})
