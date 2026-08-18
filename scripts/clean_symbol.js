import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function cleanSymbol() {
  const symbolPath = path.resolve(__dirname, '../public/assets/images/logo_symbol_white.png')
  
  const meta = await sharp(symbolPath).metadata()
  console.log('Original dimensions:', meta.width, meta.height)

  // The text at the bottom starts around 82% of height. The actual heads end at ~80% of height.
  // Let's crop to only the heads
  const cropHeight = Math.round(meta.height * 0.81)
  
  const cropped = await sharp(symbolPath)
    .extract({
      left: 0,
      top: 0,
      width: meta.width,
      height: cropHeight,
    })
    .trim()
    .toBuffer()

  // Save clean logo_symbol_white.png
  await sharp(cropped).png().toFile(symbolPath)
  console.log('✅ Cleaned logo_symbol_white.png!')

  // Also update public/favicon.png, favicon-32x32.png, favicon-16x16.png
  const publicDir = path.resolve(__dirname, '../public')
  await sharp(cropped).resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(publicDir, 'favicon-32x32.png'))
  await sharp(cropped).resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(publicDir, 'favicon-16x16.png'))
  await sharp(cropped).resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(publicDir, 'favicon.png'))

  // Apple touch icon (180x180 with dark luxury background #162330)
  const appleTouchSymbol = await sharp(cropped)
    .resize(130, 130, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()
  
  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 22, g: 35, b: 48, alpha: 1 },
    },
  })
    .composite([{ input: appleTouchSymbol, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'))

  console.log('✅ Updated all clean favicons and apple-touch-icon')
}

cleanSymbol().catch(console.error)
