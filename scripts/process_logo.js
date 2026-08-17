import sharp from 'sharp';
import fs from 'fs';

async function processLogo() {
  const inputPath = 'public/assets/images/logo_noema.jpg';
  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  // Create RGBA buffer with transparency for near-white pixels
  const rgbaBuffer = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];

    rgbaBuffer[i * 4] = r;
    rgbaBuffer[i * 4 + 1] = g;
    rgbaBuffer[i * 4 + 2] = b;

    // Calculate whiteness
    if (r > 240 && g > 240 && b > 240) {
      // Calculate alpha feathering
      const minVal = Math.min(r, g, b);
      const alpha = Math.max(0, Math.min(255, (255 - minVal) * 16));
      rgbaBuffer[i * 4 + 3] = alpha;
    } else {
      rgbaBuffer[i * 4 + 3] = 255;
    }
  }

  await sharp(rgbaBuffer, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('public/assets/images/logo_noema.png');

  console.log('✅ Transparent logo saved as public/assets/images/logo_noema.png');

  // Also extract the symbol/icon
  // The icon is roughly top 65% of the image
  const iconHeight = Math.round(height * 0.62);
  await sharp('public/assets/images/logo_noema.png')
    .extract({ left: Math.round(width * 0.15), top: Math.round(height * 0.12), width: Math.round(width * 0.7), height: Math.round(height * 0.52) })
    .png()
    .toFile('public/assets/images/logo_symbol.png');

  console.log('✅ Symbol extracted to public/assets/images/logo_symbol.png');
}

processLogo().catch(console.error);
