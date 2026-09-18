import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import subsetFont from 'subset-font'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const faSrc = path.join(root, 'assets-in/fontawesome')
const outDir = path.join(root, 'public/assets/fonts')

const SOLID = [
  'house',
  'compass',
  'chart-pie',
  'envelope',
  'arrow-up',
  'sliders',
  'layer-group',
  'users-viewfinder',
  'location-dot',
  'arrow-left',
  'triangle-exclamation',
  'spinner',
  'paper-plane',
  'check',
  'heart',
  'clock',
  'xmark',
  'bars',
  'chevron-right',
  'arrow-up-right-from-square',
  'map-location-dot',
  'diagram-project',
]

const BRANDS = ['whatsapp']

function extractGlyphs(css, classes) {
  const map = {}
  for (const name of classes) {
    const re = new RegExp(`\\.fa-${name}:before[^{]*\\{content:"\\\\([0-9a-fA-F]+)"`)
    const m = css.match(re)
    if (!m) {
      throw new Error(`\u274c Icono no encontrado en el css FA: fa-${name}`)
    }
    map[name] = parseInt(m[1], 16)
  }
  return map
}

function iconRules(map, family) {
  return Object.entries(map)
    .map(([name, cp]) => `.fa-${name}::before{content:"\\${cp.toString(16)}"}`)
    .join('\n')
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true })

  const css = fs.readFileSync(path.join(faSrc, 'all.min.css'), 'utf8')
  const solidMap = extractGlyphs(css, SOLID)
  const brandsMap = extractGlyphs(css, BRANDS)

  const solidText = String.fromCodePoint(...Object.values(solidMap))
  const brandsText = String.fromCodePoint(...Object.values(brandsMap))

  const solidOut = await subsetFont(fs.readFileSync(path.join(faSrc, 'fa-solid-900.woff2')), solidText, { targetFormat: 'woff2' })
  const brandsOut = await subsetFont(fs.readFileSync(path.join(faSrc, 'fa-brands-400.woff2')), brandsText, { targetFormat: 'woff2' })

  fs.writeFileSync(path.join(outDir, 'fa-solid-subset.woff2'), solidOut)
  fs.writeFileSync(path.join(outDir, 'fa-brands-subset.woff2'), brandsOut)

  const cssOut = [
    `@font-face{font-family:"Font Awesome 6 Free";font-style:normal;font-weight:900;font-display:block;src:url(/assets/fonts/fa-solid-subset.woff2) format("woff2")}`,
    `@font-face{font-family:"Font Awesome 6 Brands";font-style:normal;font-weight:400;font-display:block;src:url(/assets/fonts/fa-brands-subset.woff2) format("woff2")}`,
    `.fa,.fas,.fa-solid,.far,.fa-regular,.fab,.fa-brands{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-block;font-style:normal;font-variant:normal;line-height:1;text-rendering:auto}`,
    `.fa-solid,.fas{font-family:"Font Awesome 6 Free";font-weight:900}`,
    `.fa-brands,.fab{font-family:"Font Awesome 6 Brands";font-weight:400}`,
    `.fa-spin{-webkit-animation:fa-spin 2s linear infinite;animation:fa-spin 2s linear infinite}`,
    `@keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}`,
    iconRules(solidMap),
    iconRules(brandsMap),
    '',
  ].join('\n')

  fs.writeFileSync(path.join(outDir, 'fa-subset.css'), cssOut)

  console.log(`\u2705 Solid subset: ${solidOut.length} bytes (${Object.keys(solidMap).length} iconos)`)
  console.log(`\u2705 Brands subset: ${brandsOut.length} bytes (${Object.keys(brandsMap).length} iconos)`)
  console.log(`\u2705 CSS: ${Buffer.byteLength(cssOut)} bytes`)
  console.log(`\u2192 ${outDir}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})