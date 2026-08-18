import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const assetsImagesDir = path.join(publicDir, 'assets/images');

function createIco(pngBuffers) {
  // pngBuffers: array of { width, height, buffer }
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type (1 for icon)
  header.writeUInt16LE(count, 4); // number of images

  const dirEntries = [];
  let offset = 6 + count * 16;

  for (const img of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(b => b.buffer)]);
}

async function generateAllAssets() {
  console.log('🚀 Starting generation of official NOEMA brand assets & favicon suite...');

  const symbolWhitePath = path.join(assetsImagesDir, 'logo_symbol_white.png');
  const originalOfficialPath = path.join(assetsImagesDir, 'logo_official_original.png');

  // 1. Clean trimmed white symbol
  const trimmedSymbol = await sharp(symbolWhitePath).trim().toBuffer();
  console.log('✓ Trimmed white symbol loaded');

  // 2. Generate Master 512x512 Brand App Icon & Favicon Master
  // Using luxury dark background #162330 + rose gold subtle accent
  const size = 512;
  const symbolInnerSize = Math.round(size * 0.72); // 368px
  const resizedSymbol = await sharp(trimmedSymbol)
    .resize(symbolInnerSize, symbolInnerSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const cornerRadius = Math.round(size * 0.22); // luxury squircle for app icon
  const bgSvg = Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#101a24" />
          <stop offset="50%" stop-color="#162330" />
          <stop offset="100%" stop-color="#1c2d3d" />
        </linearGradient>
        <radialGradient id="subtleGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stop-color="#c88a6e" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#c88a6e" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${cornerRadius}" fill="url(#bgGrad)" />
      <rect width="${size}" height="${size}" rx="${cornerRadius}" fill="url(#subtleGlow)" />
      <rect x="10" y="10" width="${size - 20}" height="${size - 20}" rx="${cornerRadius - 6}" fill="none" stroke="#c88a6e" stroke-width="4" stroke-opacity="0.35" />
    </svg>
  `);

  const masterBadge = await sharp(bgSvg)
    .composite([{ input: resizedSymbol, gravity: 'center' }])
    .png()
    .toBuffer();

  // Also create a fully solid square / roundable version for favicons at small resolutions (16x16, 32x32, 48x48, 96x96)
  // For small sizes (16, 32, 48), the symbol should occupy ~78% so it is super clear and readable even at 16x16
  async function generateFaviconSize(px) {
    const symbolPx = Math.max(12, Math.round(px * 0.76));
    const smallSymbol = await sharp(trimmedSymbol)
      .resize(symbolPx, symbolPx, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    const rad = Math.round(px * 0.20);
    const smallBgSvg = Buffer.from(`
      <svg width="${px}" height="${px}" viewBox="0 0 ${px} ${px}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g${px}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#101a24" />
            <stop offset="100%" stop-color="#1a2b3a" />
          </linearGradient>
        </defs>
        <rect width="${px}" height="${px}" rx="${rad}" fill="url(#g${px})" />
      </svg>
    `);

    return await sharp(smallBgSvg)
      .composite([{ input: smallSymbol, gravity: 'center' }])
      .png()
      .toBuffer();
  }

  const f16Buffer = await generateFaviconSize(16);
  const f32Buffer = await generateFaviconSize(32);
  const f48Buffer = await generateFaviconSize(48);
  const f96Buffer = await generateFaviconSize(96);
  const f192Buffer = await sharp(masterBadge).resize(192, 192).png().toBuffer();
  const f512Buffer = masterBadge;

  // Save individual PNG favicons
  await sharp(f16Buffer).toFile(path.join(publicDir, 'favicon-16x16.png'));
  await sharp(f32Buffer).toFile(path.join(publicDir, 'favicon-32x32.png'));
  await sharp(f48Buffer).toFile(path.join(publicDir, 'favicon-48x48.png'));
  await sharp(f48Buffer).toFile(path.join(publicDir, 'favicon.png'));
  await sharp(f96Buffer).toFile(path.join(publicDir, 'favicon-96x96.png'));
  await sharp(f192Buffer).toFile(path.join(publicDir, 'android-chrome-192x192.png'));
  await sharp(f192Buffer).toFile(path.join(publicDir, 'favicon-192x192.png'));
  await sharp(f512Buffer).toFile(path.join(publicDir, 'android-chrome-512x512.png'));
  await sharp(f512Buffer).toFile(path.join(publicDir, 'favicon-512x512.png'));

  // Apple touch icon (180x180)
  const appleTouchBuffer = await sharp(masterBadge).resize(180, 180).png().toBuffer();
  await sharp(appleTouchBuffer).toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // 3. Generate multi-resolution Windows / Standard ICO file
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: f16Buffer },
    { width: 32, height: 32, buffer: f32Buffer },
    { width: 48, height: 48, buffer: f48Buffer },
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Multi-resolution favicon.ico created (16x16, 32x32, 48x48)');

  // 4. Generate crisp SVG Favicon (for modern browsers: Chrome, Firefox, Safari)
  const svgFaviconContent = `
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="48" height="48" rx="10" fill="#162330"/>
  <rect x="1" y="1" width="46" height="46" rx="9" stroke="#C88A6E" stroke-opacity="0.3" stroke-width="1"/>
  <image href="/assets/images/logo_symbol_white.png" x="6" y="6" width="36" height="36" preserveAspectRatio="xMidYMid meet"/>
</svg>
`.trim();
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFaviconContent);
  console.log('✓ Vector favicon.svg created');

  // 5. Generate Official Organization Brand Logos for Google Schema.org / Search Snippets / Social
  // Extract official clean dark logo (tree + NOEMA text)
  const officialExtracted = await sharp(originalOfficialPath)
    .extract({ left: 67, top: 136, width: 517, height: 340 })
    .toBuffer();

  // Save clean official logo card for Google Schema & Knowledge Panels (high contrast on white background)
  // Schema guidelines: 800x450 or 600x600 with high contrast
  const schemaLogoWidth = 800;
  const schemaLogoHeight = 450;
  const logoInCard = await sharp(officialExtracted)
    .resize(480, 315, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const schemaCardSvg = Buffer.from(`
    <svg width="${schemaLogoWidth}" height="${schemaLogoHeight}" viewBox="0 0 ${schemaLogoWidth} ${schemaLogoHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="schemaBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#F8FAFC" />
        </linearGradient>
      </defs>
      <rect width="${schemaLogoWidth}" height="${schemaLogoHeight}" fill="url(#schemaBg)" />
      <rect x="8" y="8" width="${schemaLogoWidth - 16}" height="${schemaLogoHeight - 16}" rx="12" fill="none" stroke="#E2E8F0" stroke-width="2" />
    </svg>
  `);

  const schemaLogoLight = await sharp(schemaCardSvg)
    .composite([{ input: logoInCard, gravity: 'center' }])
    .png()
    .toBuffer();

  await sharp(schemaLogoLight).toFile(path.join(assetsImagesDir, 'logo_schema_official.png'));

  // Also create a high-resolution dark luxury official brand card
  const darkCardSvg = Buffer.from(`
    <svg width="${schemaLogoWidth}" height="${schemaLogoHeight}" viewBox="0 0 ${schemaLogoWidth} ${schemaLogoHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="darkBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f1922" />
          <stop offset="50%" stop-color="#162330" />
          <stop offset="100%" stop-color="#1b2c3d" />
        </linearGradient>
      </defs>
      <rect width="${schemaLogoWidth}" height="${schemaLogoHeight}" fill="url(#darkBg)" />
      <rect x="12" y="12" width="${schemaLogoWidth - 24}" height="${schemaLogoHeight - 24}" rx="16" fill="none" stroke="#c88a6e" stroke-width="2" stroke-opacity="0.4" />
      <g text-anchor="middle">
        <text x="400" y="320" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="44" font-weight="700" fill="#FFFFFF" letter-spacing="12">NOEMA</text>
        <text x="400" y="360" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" font-weight="600" fill="#c88a6e" letter-spacing="5">INVESTIGACIÓN Y ESTUDIOS</text>
      </g>
    </svg>
  `);

  const darkSymbolResized = await sharp(trimmedSymbol)
    .resize(170, 170, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const brandCardDark = await sharp(darkCardSvg)
    .composite([{ input: darkSymbolResized, top: 60, left: 315 }])
    .png()
    .toBuffer();

  await sharp(brandCardDark).toFile(path.join(assetsImagesDir, 'logo_brand_official.png'));

  console.log('✅ All favicon and official brand image assets generated successfully!');
}

try {
  await generateAllAssets();
} catch (err) {
  console.error('Error generating assets:', err);
  process.exit(1);
}
