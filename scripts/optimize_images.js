import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const sourcesDir = 'assets-in/fotografias/originales-heroes'
const heroesDir = 'public/assets/images/heroes'
const heroes = ['lapacho_amarillo', 'lapacho_blanco', 'lapacho_rosado']

async function main() {
  for (const h of heroes) {
    const src = path.join(sourcesDir, `${h}.jpg`)

    // Banner / full-bleed variant (keeps source width, ~1376px)
    await sharp(src)
      .rotate()
      .webp({ quality: 70 })
      .toFile(path.join(heroesDir, `${h}.webp`))
    console.log(`\u2705 ${h}.webp (banner)`)

    // Hero card variant (resized for ~430px card display @2x = 860px)
    await sharp(src)
      .rotate()
      .resize({ width: 860 })
      .webp({ quality: 60 })
      .toFile(path.join(heroesDir, `${h}-card.webp`))
    console.log(`\u2705 ${h}-card.webp`)
  }

  await sharp(path.join(sourcesDir, 'analytics_insights.jpg'))
    .rotate()
    .webp({ quality: 70 })
    .toFile('public/assets/images/analytics_insights.webp')
  console.log('\u2705 analytics_insights.webp')

  await sharp(path.join(sourcesDir, 'logo_symbol_white.png'))
    .rotate()
    .resize({ width: 110 })
    .webp({ quality: 90, alphaQuality: 95 })
    .toFile('public/assets/images/logo_symbol_white.webp')
  console.log('\u2705 logo_symbol_white.webp')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})