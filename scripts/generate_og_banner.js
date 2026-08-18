import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function generateOGBanner() {
  const width = 1200
  const height = 630

  const symbolPath = path.resolve(__dirname, '../public/assets/images/logo_symbol_white.png')
  
  // Resize the official white symbol
  const symbolWidth = 140
  const symbolHeight = 126
  const symbolBuffer = await sharp(symbolPath)
    .resize(symbolWidth, symbolHeight, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()

  const symbolLeft = Math.round((width - symbolWidth) / 2)
  const symbolTop = 58

  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f1922" />
        <stop offset="50%" stop-color="#162330" />
        <stop offset="100%" stop-color="#1b2c3d" />
      </linearGradient>
      <radialGradient id="ambientGlow" cx="50%" cy="32%" r="48%">
        <stop offset="0%" stop-color="#c88a6e" stop-opacity="0.22" />
        <stop offset="50%" stop-color="#c88a6e" stop-opacity="0.05" />
        <stop offset="100%" stop-color="#c88a6e" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#c88a6e" stop-opacity="0" />
        <stop offset="50%" stop-color="#c88a6e" stop-opacity="0.75" />
        <stop offset="100%" stop-color="#c88a6e" stop-opacity="0" />
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
    <rect width="${width}" height="${height}" fill="url(#ambientGlow)" />

    <!-- Subtle Luxury Border -->
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="16" fill="none" stroke="#c88a6e" stroke-width="1.2" stroke-opacity="0.35" />
    <rect x="32" y="32" width="${width - 64}" height="${height - 64}" rx="12" fill="none" stroke="#ffffff" stroke-width="0.8" stroke-opacity="0.08" />

    <!-- Center Divider Line -->
    <line x1="220" y1="330" x2="980" y2="330" stroke="url(#lineGrad)" stroke-width="1.5" />

    <!-- Typography -->
    <g text-anchor="middle">
      <!-- Brand Name -->
      <text x="600" y="242" font-family="'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif" font-size="52" font-weight="700" fill="#FFFFFF" letter-spacing="14">NOEMA</text>
      
      <!-- Sub Brand Tagline -->
      <text x="600" y="286" font-family="'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif" font-size="17" font-weight="600" fill="#c88a6e" letter-spacing="6">INVESTIGACIÓN Y ESTUDIOS</text>
      
      <!-- Value Proposition Slogan -->
      <text x="600" y="405" font-family="'Cormorant Garamond', Georgia, serif" font-size="36" font-style="italic" font-weight="600" fill="#F3EFEA">Evidencia confiable y estratégica para decisiones de alto impacto</text>
      
      <!-- Badges / Pillars -->
      <text x="600" y="468" font-family="'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#9BA8B5" letter-spacing="2.5">SERVICIO DE CAMPO  ·  ESTUDIOS METODOLÓGICOS  ·  PARAGUAY</text>

      <!-- URL Badge -->
      <rect x="460" y="515" width="280" height="42" rx="21" fill="#182736" fill-opacity="0.9" stroke="#c88a6e" stroke-width="1.2" stroke-opacity="0.5" />
      <text x="600" y="542" font-family="'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="#FFFFFF" letter-spacing="2">www.noema.com.py</text>
    </g>
  </svg>
  `

  const baseImage = await sharp(Buffer.from(svgOverlay))
    .composite([
      {
        input: symbolBuffer,
        top: symbolTop,
        left: symbolLeft,
      },
    ])
    .png({ quality: 95 })
    .toBuffer()

  const outDir = path.resolve(__dirname, '../public')
  const outPng = path.join(outDir, 'og-image.png')
  const outJpg = path.join(outDir, 'og-image.jpg')

  await sharp(baseImage).toFile(outPng)
  await sharp(baseImage).jpeg({ quality: 95 }).toFile(outJpg)

  console.log('✅ Generated refined 1200x630 Open Graph banners:', outPng, outJpg)
}

generateOGBanner().catch(console.error)
