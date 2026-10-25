// QA-only offline replacement for next/font Google CSS responses.
// Real font binaries come from public npm packages installed outside the repo.
// This does not validate the live Google Fonts service or its exact font version.
const path = require('node:path')
const modules = process.env.QA_TOOLS_NODE_MODULES || '/private/tmp/chrissellers-qa-20261002-tools/node_modules'

module.exports = Object.fromEntries([
  ['Inter', 'inter', '100..900'],
  ['Space Grotesk', 'space-grotesk', '300..700'],
].map(([family, name, range]) => {
  const relative = `@fontsource-variable/${name}/files/${name}-latin-wght-normal.woff2`
  const file = process.env.QA_FONT_ORIGIN
    ? `${process.env.QA_FONT_ORIGIN}/${relative}`
    : path.join(modules, relative)
  const url = `https://fonts.googleapis.com/css2?family=${family.replaceAll(' ', '+')}:wght@${range}&display=swap`
  const css = `/* latin */\n@font-face { font-family: '${family}'; font-style: normal; font-weight: ${range.replace('..', ' ')}; font-display: swap; src: url(${file}) format('woff2'); }`
  return [url, css]
}))
