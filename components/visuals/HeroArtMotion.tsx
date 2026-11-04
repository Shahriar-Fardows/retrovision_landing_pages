"use client";

import { useEffect, useRef } from "react";

// Brings the flattened hero artwork to life without separate layers: a WebGL pass
// redraws the same image and warps only the pixels a hand-traced mask allows
// (public/images/hero-motion-mask.png, built by scripts/build-hero-motion-mask.mjs).
//   R — cape: travelling wind wave from the shoulder anchor to the tattered tip
//   G — soft fog and clouds: slow drift and light variation
//   B — head and shoulders: a ~1px breath
// Everything else (moon, castle, islands, body, legs) samples itself and stays still.
// It also adds depth of field: the art behind the centred copy (marked with
// [data-hero-focus]) is softened so the busy castle doesn't fight the headline,
// while the warrior and the edges stay sharp. With reduced motion it draws that
// soft, still frame once and never animates.

const MASK_SRC = "/images/hero-motion-mask.png";
// Artwork pixel size — the mask and the shader's anchor points are in this space.
const ART_W = 1774;
const ART_H = 887;
const FRAME_MS = 1000 / 30; // slow motion reads fine at 30fps and halves GPU work
const MAX_PIXELS = 3_600_000;
const RAMP_SECONDS = 2.5; // ease motion in so the first frame matches the static image
const DOF_MIN_WIDTH = 768; // phones stack the copy above the art; no blur needed there

const VERTEX = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAGMENT = `#version 300 es
precision highp float;
uniform sampler2D uImage;
uniform sampler2D uMask;
uniform vec2 uCanvas;
uniform vec2 uOrigin;
uniform vec2 uSize;
uniform vec2 uArt;
uniform float uTime;
uniform float uAmp;
uniform vec4 uFocus; // centre xy + radii zw of the text block, canvas px (top-left origin)
uniform float uDof;
out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uCanvas.y - gl_FragCoord.y);
  vec2 uv = (frag - uOrigin) / uSize;
  vec3 m = texture(uMask, uv).rgb;
  vec2 px = uv * uArt;
  float t = uTime;
  vec2 off = vec2(0.0);

  // Cape. Wave travels shoulder -> tip; overlapping periods (~4s, ~2.8s, ~2.4s flutter)
  // plus noise and a slow gust envelope keep it from reading as a loop.
  if (m.r > 0.002) {
    const vec2 A = vec2(1425.0, 400.0);
    const vec2 AX = vec2(0.688, 0.725);
    const float L = 269.0;
    vec2 pe = vec2(-AX.y, AX.x);
    float s = dot(px - A, AX) / L;
    float gust = 0.78 + 0.22 * sin(t * 0.31) * sin(t * 0.17 + 1.7);
    float n = noise(vec2(s * 3.0 - t * 0.45, dot(px - A, pe) * 0.02)) - 0.5;
    float wave = sin(s * 5.2 - t * 1.57 + n * 1.4) * 0.7 + sin(s * 8.7 - t * 2.21 + 1.3) * 0.3;
    float flutter = sin(s * 17.0 - t * 2.6 + n * 3.0) * 0.6 + (noise(px * 0.045 + vec2(t * 0.9, -t * 0.4)) - 0.5);
    off += pe * (wave * 6.5 * gust) * m.r;
    off += AX * (sin(s * 4.1 - t * 1.2) * 1.8) * m.r;
    off += pe * flutter * 1.8 * m.r * m.r;
  }

  // Breath: head and shoulders rise about a pixel every ~5.2s.
  if (m.b > 0.002) off.y -= m.b * (0.55 + 0.55 * sin(t * 1.208));

  // Fog: slow drift and a gentle swell of light.
  float light = 0.0;
  if (m.g > 0.002) {
    vec2 q = px * 0.0055 + vec2(t * 0.028, t * 0.006);
    float f1 = fbm(q);
    float f2 = fbm(q + vec2(5.2, 1.3) - vec2(t * 0.012, 0.0));
    off += m.g * vec2((f1 - 0.5) * 7.0, (f2 - 0.5) * 2.5);
    light += m.g * (f2 - 0.5) * 0.09;
  }

  // Sunset glow behind the right-hand island breathes very slowly.
  float sun = 1.0 - smoothstep(0.0, 260.0, distance(px, vec2(1610.0, 265.0)));
  light += sun * 0.035 * sin(t * 0.23);

  // textureLod everywhere: implicit derivatives are undefined inside the branches.
  vec2 suv = uv - off * uAmp / uArt;
  vec2 texSize = vec2(textureSize(uImage, 0));
  float baseLod = max(0.0, log2(texSize.x / uSize.x));
  float focus = uDof * (1.0 - smoothstep(0.4, 1.0, length((frag - uFocus.xy) / uFocus.zw)));
  vec3 col;
  if (focus > 0.002) {
    float lod = baseLod + focus * 2.6;
    vec2 r = exp2(lod) * 0.75 / texSize;
    col = (textureLod(uImage, suv, lod).rgb * 2.0
      + textureLod(uImage, suv + vec2(r.x, r.y), lod).rgb
      + textureLod(uImage, suv + vec2(-r.x, r.y), lod).rgb
      + textureLod(uImage, suv + vec2(r.x, -r.y), lod).rgb
      + textureLod(uImage, suv + vec2(-r.x, -r.y), lod).rgb) / 6.0;
  } else {
    col = textureLod(uImage, suv, baseLod).rgb;
  }
  outColor = vec4(col * (1.0 + light * uAmp), 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function whenLoaded(image: HTMLImageElement) {
  if (image.complete && image.naturalWidth > 0) return Promise.resolve(image);
  return new Promise<HTMLImageElement>((resolve, reject) => {
    image.addEventListener("load", () => resolve(image), { once: true });
    image.addEventListener("error", reject, { once: true });
  });
}

// object-position comes back computed as percentages, e.g. "68% 50%".
function parsePosition(value: string): [number, number] {
  const [x = "50%", y = "50%"] = value.split(" ");
  const pct = (v: string) => (v.endsWith("%") ? parseFloat(v) / 100 : 0.5);
  return [pct(x), pct(y)];
}

export default function HeroArtMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const art = canvas?.parentElement?.querySelector("img");
    if (!canvas || !art) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let teardown: (() => void) | null = null;
    let cancelled = false;

    const start = async (animate: boolean) => {
      const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, premultipliedAlpha: false });
      if (!gl) return;

      const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
      const program = gl.createProgram();
      if (!vs || !fs || !program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
      gl.useProgram(program);

      const quad = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const aPos = gl.getAttribLocation(program, "aPos");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const u = (name: string) => gl.getUniformLocation(program, name);
      const uCanvas = u("uCanvas");
      const uOrigin = u("uOrigin");
      const uSize = u("uSize");
      const uTime = u("uTime");
      const uAmp = u("uAmp");
      const uFocus = u("uFocus");
      const uDof = u("uDof");
      const section = canvas.closest("section");
      gl.uniform2f(u("uArt"), ART_W, ART_H);
      gl.uniform1i(u("uImage"), 0);
      gl.uniform1i(u("uMask"), 1);

      const makeTexture = (unit: number, source: TexImageSource, mipmaps: boolean) => {
        const texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, source);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mipmaps ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
        if (mipmaps) gl.generateMipmap(gl.TEXTURE_2D);
        return texture;
      };

      let image: HTMLImageElement, mask: HTMLImageElement;
      try {
        // Reuse the exact pixels next/image already loaded, so the swap is invisible.
        [image, mask] = await Promise.all([whenLoaded(art), loadImage(MASK_SRC)]);
      } catch {
        return;
      }
      if (cancelled) return;

      let imageTexture = makeTexture(0, image, true);
      makeTexture(1, mask, false);

      // The browser may swap in a sharper srcset candidate after a resize.
      const onArtLoad = () => {
        gl.deleteTexture(imageTexture);
        imageTexture = makeTexture(0, art, true);
        if (!animate) render(0, 0);
      };
      art.addEventListener("load", onArtLoad);

      // Match the <img>'s object-fit: cover + object-position exactly.
      const layout = () => {
        const { clientWidth: w, clientHeight: h } = canvas;
        if (!w || !h) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(MAX_PIXELS / (w * h)));
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);

        const [px, py] = parsePosition(getComputedStyle(art).objectPosition);
        const scale = Math.max(canvas.width / ART_W, canvas.height / ART_H);
        const dw = ART_W * scale;
        const dh = ART_H * scale;
        gl.uniform2f(uCanvas, canvas.width, canvas.height);
        gl.uniform2f(uOrigin, (canvas.width - dw) * px, (canvas.height - dh) * py);
        gl.uniform2f(uSize, dw, dh);

        // Measure the copy against the section, not the canvas: the canvas sits in
        // a wrapper whose entrance animation scales it.
        // Height comes from the whole copy block, width from its widest line (the
        // headline) — the block itself spans the container.
        const copy = section?.querySelector("[data-hero-focus]");
        const widest = copy?.querySelector("h1");
        if (section && copy && widest && w >= DOF_MIN_WIDTH) {
          const s = section.getBoundingClientRect();
          const c = copy.getBoundingClientRect();
          const h1 = widest.getBoundingClientRect();
          gl.uniform4f(
            uFocus,
            (h1.left - s.left + h1.width / 2) * dpr,
            (c.top - s.top + c.height / 2) * dpr,
            (h1.width / 2) * 1.2 * dpr,
            (c.height / 2) * 1.15 * dpr,
          );
          gl.uniform1f(uDof, 1);
        } else {
          gl.uniform4f(uFocus, 0, 0, 1, 1);
          gl.uniform1f(uDof, 0);
        }
      };

      const render = (seconds: number, amp: number) => {
        gl.uniform1f(uTime, seconds + 11.0); // skip the shader's symmetric start
        gl.uniform1f(uAmp, amp);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        canvas.dataset.ready = "true";
      };

      layout();

      if (!animate) {
        // Reduced motion: one still frame (depth of field only), redrawn on resize.
        render(0, 0);
        const stillObserver = new ResizeObserver(() => {
          layout();
          render(0, 0);
        });
        stillObserver.observe(canvas);
        teardown = () => {
          stillObserver.disconnect();
          art.removeEventListener("load", onArtLoad);
          delete canvas.dataset.ready;
        };
        return;
      }

      const resizeObserver = new ResizeObserver(layout);
      resizeObserver.observe(canvas);

      let frame = 0;
      let last = 0;
      let visible = true;
      const t0 = performance.now();

      const draw = (now: number) => {
        frame = requestAnimationFrame(draw);
        if (!visible || now - last < FRAME_MS) return;
        last = now;
        const seconds = (now - t0) / 1000;
        const ramp = Math.min(1, seconds / RAMP_SECONDS);
        render(seconds, ramp * ramp * (3 - 2 * ramp));
      };
      frame = requestAnimationFrame(draw);

      // No work while the hero is scrolled away.
      const intersection = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      intersection.observe(canvas);

      teardown = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        intersection.disconnect();
        art.removeEventListener("load", onArtLoad);
        delete canvas.dataset.ready;
      };
    };

    const sync = () => {
      teardown?.();
      teardown = null;
      void start(!reducedMotion.matches);
    };
    sync();
    reducedMotion.addEventListener("change", sync);

    return () => {
      cancelled = true;
      reducedMotion.removeEventListener("change", sync);
      teardown?.();
    };
  }, []);

  // Hidden until the first frame lands; the static <img> underneath is the fallback.
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 size-full opacity-0 transition-opacity duration-700 data-[ready=true]:opacity-100"
    />
  );
}
