import sharp from 'sharp';
import fs from 'fs';

async function processLogo() {
  const inputPath = 'C:/Users/exeme/.gemini/antigravity-ide/brain/7625479a-6f08-4b6f-af07-de56cad9559a/.user_uploaded/media_1787008269326.png';
  
  // 1. Save original official logo
  fs.copyFileSync(inputPath, 'public/assets/images/logo_official_original.png');
  
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const rgbaBuffer = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];

    rgbaBuffer[i * 4] = r;
    rgbaBuffer[i * 4 + 1] = g;
    rgbaBuffer[i * 4 + 2] = b;

    // Background is near white (r,g,b > 240)
    if (r > 240 && g > 240 && b > 240) {
      const minVal = Math.min(r, g, b);
      const alpha = Math.max(0, Math.min(255, (255 - minVal) * 16));
      rgbaBuffer[i * 4 + 3] = alpha;
    } else {
      rgbaBuffer[i * 4 + 3] = 255;
    }
  }

  // Save transparent full logo
  await sharp(rgbaBuffer, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('public/assets/images/logo_noema.png');

  console.log('✅ Transparent logo saved to public/assets/images/logo_noema.png');

  // 2. Extract the Isotipo symbol (top portion)
  const symbolCrop = await sharp('public/assets/images/logo_noema.png')
    .extract({
      left: Math.round(width * 0.15),
      top: Math.round(height * 0.12),
      width: Math.round(width * 0.70),
      height: Math.round(height * 0.54)
    })
    .trim()
    .png()
    .toFile('public/assets/images/logo_symbol.png');

  console.log('✅ Extracted trimmed symbol to public/assets/images/logo_symbol.png');
}

processLogo().catch(console.error);

