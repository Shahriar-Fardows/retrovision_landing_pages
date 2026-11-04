// Grades the hero key art for the centred layout: the source was painted for
// copy on the left, so its left third is crushed to near-black. This lifts those
// shadows with a gamma curve (fading out by the middle), adds faint haze and dithers
// the lifted darks so they don't band.
// Run: node scripts/grade-hero-art.mjs  (then rebuild the motion mask)
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "assets/art/retro-vision-hero-source.png");
const OUT = path.join(root, "public/images/retro-vision-hero.png");

const GAMMA = 0.58; // gamma at the far left: brightens darks but keeps their relative detail
const HAZE = [30, 36, 70]; // faint cool atmosphere in the darkest areas
const HAZE_AMOUNT = 0.18;

const sstep = (a, b, v) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const out = Buffer.alloc(data.length);
let seed = 1;
const noise = () => ((seed = (seed * 16807) % 2147483647) / 2147483647 - 0.5) * 1.6;

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 3;
    const w = 1 - sstep(0.28, 0.62, x / W);
    const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
    // Affect shadows only: highlights (lit cliffs, clouds) keep their value.
    const shadow = 1 - sstep(0.08, 0.45, lum);
    const k = w * shadow;
    for (let c = 0; c < 3; c++) {
      const lifted = 255 * Math.pow(data[i + c] / 255, 1 + (GAMMA - 1) * k);
      const v = lifted + HAZE[c] * HAZE_AMOUNT * k * (1 - lum);
      out[i + c] = Math.max(0, Math.min(255, Math.round(v + noise() * k)));
    }
  }
}

await sharp(out, { raw: { width: W, height: H, channels: 3 } }).png({ compressionLevel: 9 }).toFile(OUT);
console.log("graded", W, H, "->", OUT);
