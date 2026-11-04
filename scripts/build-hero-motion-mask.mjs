// Builds the hero motion mask in the artwork's own pixel space.
// R = cape freedom, G = drifting fog, B = breathing (upper body).
// Run: node scripts/build-hero-motion-mask.mjs
// Polygons and zones below are hand-traced for retro-vision-hero.png (1774x887);
// re-trace them if the artwork changes.
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = process.argv[2] ?? path.join(root, "public/images/retro-vision-hero.png");
const OUT = process.argv[3] ?? path.join(root, "public/images/hero-motion-mask.png");

const inPoly = (x, y, p) => {
  let c = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    const [xi, yi] = p[i], [xj, yj] = p[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};
const sstep = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };

(async () => {
  const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, N = W * H;

  const raster = (poly) => {
    const a = new Uint8Array(N);
    const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
    for (let y = Math.max(0, Math.min(...ys) | 0); y <= Math.min(H - 1, Math.max(...ys)); y++)
      for (let x = Math.max(0, Math.min(...xs) | 0); x <= Math.min(W - 1, Math.max(...xs)); x++)
        if (inPoly(x + 0.5, y + 0.5, poly)) a[y * W + x] = 255;
    return a;
  };
  const blur = async (a, sigma) => {
    const out = await sharp(Buffer.from(a), { raw: { width: W, height: H, channels: 1 } }).blur(sigma).extractChannel(0).raw().toBuffer();
    if (out.length !== N) throw new Error('blur size ' + out.length);
    return Float32Array.from(out, v => v / 255);
  };

  const cape = [[1428,392],[1446,412],[1470,455],[1497,500],[1525,528],[1552,545],[1582,560],[1612,575],[1636,588],[1634,608],[1612,622],[1596,640],[1588,648],[1565,660],[1548,676],[1532,684],[1512,690],[1500,690],[1478,676],[1456,678],[1440,672],[1436,600],[1432,500],[1420,430]];
  const body = [[1290,330],[1440,330],[1442,600],[1446,790],[1300,790],[1280,560]];
  const warrior = [[1280,320],[1450,320],[1660,570],[1660,640],[1560,720],[1460,800],[1280,800]];
  const torso = [[1296,326],[1446,326],[1446,550],[1296,550]];

  const lumA = new Uint8Array(N);
  for (let i = 0; i < N; i++) lumA[i] = Math.round(0.2126 * data[i * 3] + 0.7152 * data[i * 3 + 1] + 0.0722 * data[i * 3 + 2]);
  const lumB = await blur(lumA, 2.5);
  const detailRaw = new Uint8Array(N);
  for (let i = 0; i < N; i++) detailRaw[i] = Math.min(255, Math.round(Math.abs(lumA[i] / 255 - lumB[i]) * 255 * 4));
  const detail = await blur(detailRaw, 6);

  const capeM = await blur(raster(cape), 7);
  const bodyM = await blur(raster(body), 6);
  const warriorM = await blur(raster(warrior), 18);
  const torsoM = await blur(raster(torso), 10);

  // Fog zones (ellipses) — valley mist, lower-left haze, clouds left of the moon, right-hand cloud bank.
  const zones = [[1080,565,280,75],[850,720,320,120],[860,235,170,110],[1690,500,170,60],[600,560,200,90]];
  const A = [1425, 400], T = [1615, 595];
  const L = Math.hypot(T[0] - A[0], T[1] - A[1]), dx = (T[0] - A[0]) / L, dy = (T[1] - A[1]) / L;

  const R = new Uint8Array(N), G = new Uint8Array(N), B = new Uint8Array(N);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x;
    // Cape: free along the shoulder→tip axis, pinned near the body.
    const s = Math.min(1, Math.max(0, ((x - A[0]) * dx + (y - A[1]) * dy) / L));
    const r = capeM[i] * Math.pow(s, 1.3) * sstep(1438, 1490, x) * (1 - bodyM[i]);
    R[i] = Math.round(255 * Math.min(1, r));

    // Fog: only light, soft pixels inside the zones; never the moon, castle, islands or warrior.
    let z = 0;
    for (const [cx, cy, rx, ry] of zones) {
      const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
      z = Math.max(z, 1 - sstep(0.55, 1, d));
    }
    const p = i * 3, lum = (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) / 255;
    const moon = 1 - sstep(250, 300, Math.hypot(x - 1150, y - 60));
    const castle = (x > 930 && x < 1310 && y > 170 && y < 470) ? 1 : 0;
    const islands = (x > 1390 && x < 1480 && y < 230) || (x > 1560 && y < 360) || (x > 890 && x < 980 && y > 120 && y < 240) ? 1 : 0;
    const soft = 1 - sstep(0.06, 0.16, detail[i]);
    const g = z * soft * sstep(0.16, 0.42, lum) * (1 - moon) * (1 - castle) * (1 - islands) * (1 - warriorM[i]);
    G[i] = Math.round(255 * g);

    // Breathing: strongest at the shoulders, fading out by the hips.
    B[i] = Math.round(255 * torsoM[i] * (1 - sstep(385, 548, y)));
  }

  const rgb = Buffer.alloc(N * 3);
  for (let i = 0; i < N; i++) { rgb[i * 3] = R[i]; rgb[i * 3 + 1] = G[i]; rgb[i * 3 + 2] = B[i]; }
  // Fog edges get an extra soften; the mask is smooth, so half resolution is plenty.
  await sharp(rgb, { raw: { width: W, height: H, channels: 3 } })
    .resize(Math.round(W / 2), Math.round(H / 2), { kernel: "lanczos3" })
    .png({ compressionLevel: 9 })
    .toFile(OUT);
  console.log("mask", W, H, "->", OUT);
})();
