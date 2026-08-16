import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

console.log('📦 Empaquetando proyecto Noema Consultora...');

const rootDir = process.cwd();
const outputZip = path.resolve(rootDir, '..', 'noema-consultora-codigo-completo.zip');

// Items to exclude
const excludeItems = new Set(['node_modules', '.git', '.vercel', 'dist', 'vite-dev.log', 'package-lock.json']);

// Temporary folder for clean packaging
const tempDir = path.resolve(rootDir, '..', 'noema_temp_pack');

if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

fs.mkdirSync(tempDir, { recursive: true });

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  const baseName = path.basename(src);

  if (excludeItems.has(baseName)) {
    return;
  }

  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('📂 Copiando archivos limpios...');
for (const item of fs.readdirSync(rootDir)) {
  if (!excludeItems.has(item)) {
    copyRecursive(path.join(rootDir, item), path.join(tempDir, item));
  }
}

console.log(`🤐 Generando archivo ZIP en: ${outputZip}...`);
try {
  execSync(`powershell -Command "Compress-Archive -Path '${tempDir}\\*' -DestinationPath '${outputZip}' -Force"`);
  console.log('✅ Archivo ZIP creado exitosamente!');
  console.log(`📁 Ubicación: ${outputZip}`);
} catch (err) {
  console.error('⚠️ Error al empaquetar ZIP:', err.message);
} finally {
  try {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  } catch (cleanErr) {
    // Ignore transient file lock on Windows
  }
}
