/**
 * scripts/convert-images.mjs
 * One-time image conversion script — generates WebP versions of all site images.
 * Run: node scripts/convert-images.mjs
 */

import sharp from 'sharp';
import { readdir, access } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC = new URL('../public', import.meta.url).pathname;

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function convert(inputPath, outputPath, quality = 82) {
  if (await exists(outputPath)) {
    console.log(`  skip (exists): ${basename(outputPath)}`);
    return;
  }
  await sharp(inputPath).webp({ quality }).toFile(outputPath);
  const { size: inSize } = await import('fs').then(m => m.promises.stat(inputPath));
  const { size: outSize } = await import('fs').then(m => m.promises.stat(outputPath));
  const saved = (((inSize - outSize) / inSize) * 100).toFixed(0);
  console.log(`  ✓ ${basename(inputPath)} → ${basename(outputPath)} (${(inSize/1024).toFixed(0)}KB → ${(outSize/1024).toFixed(0)}KB, -${saved}%)`);
}

async function main() {
  console.log('\n── Converting root images ──');
  await convert(join(PUBLIC, 'slate_origin.png'), join(PUBLIC, 'slate_origin.webp'), 85);

  console.log('\n── Converting butterfly images ──');
  const butterflyDir = join(PUBLIC, 'butterflies');
  const files = await readdir(butterflyDir);
  const pngs = files.filter(f => extname(f) === '.png');

  for (const file of pngs) {
    const inputPath = join(butterflyDir, file);
    const outputPath = join(butterflyDir, file.replace('.png', '.webp'));
    await convert(inputPath, outputPath, 85);
  }

  console.log('\n✅ All conversions complete.\n');
}

main().catch(err => { console.error(err); process.exit(1); });
