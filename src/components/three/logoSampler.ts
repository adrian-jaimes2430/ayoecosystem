/**
 * Robust browser-side image sampling: turns the real A&O logo PNG into a
 * point cloud of 3D positions. Used as the "identity mask" for particle
 * reassembly. Reusable for any brand of the ecosystem (Inverfact, NomadHive,
 * ANMA, Club Master Money) by passing a different source URL.
 */
export interface LogoSampleOptions {
  /** Target amount of points. The sampler oversamples then trims. */
  count: number;
  /** World-space width of the resulting cloud. */
  size?: number;
  /** Alpha (0-255) above which a pixel is considered part of the mark. */
  alphaThreshold?: number;
  /** Resolution used to rasterize the source image. */
  resolution?: number;
}

export interface LogoSample {
  /** xyz triplets, length = count * 3 */
  positions: Float32Array;
  /** 0..1 luminance per point, length = count */
  luminance: Float32Array;
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
    img.src = src;
  });

export async function sampleLogo(
  src: string,
  {
    count,
    size = 4.2,
    alphaThreshold = 24,
    resolution = 220,
  }: LogoSampleOptions,
): Promise<LogoSample> {
  const img = await loadImage(src);

  const canvas = document.createElement("canvas");
  const aspect = img.width / img.height || 1;
  const w = resolution;
  const h = Math.max(1, Math.round(resolution / aspect));
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 2D no disponible");
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;

  // Collect every opaque pixel, then pick `count` of them with a stable stride
  // so the silhouette stays evenly covered regardless of the requested count.
  const hits: number[] = [];
  const lum: number[] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const a = data[i + 3];
      if (a <= alphaThreshold) continue;
      hits.push(x, y);
      lum.push((data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255);
    }
  }

  const total = hits.length / 2;
  const positions = new Float32Array(count * 3);
  const luminance = new Float32Array(count);

  const scale = size / w;
  const halfW = w / 2;
  const halfH = h / 2;

  if (total === 0) {
    // Defensive fallback: never crash the scene if the mask cannot be read.
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      positions[i * 3] = Math.cos(t) * size * 0.4;
      positions[i * 3 + 1] = Math.sin(t) * size * 0.4;
      positions[i * 3 + 2] = 0;
      luminance[i] = 1;
    }
    return { positions, luminance };
  }

  for (let i = 0; i < count; i++) {
    // Golden-ratio stride gives a low-discrepancy pick over the hit list.
    const idx = Math.floor((i * 0.6180339887498949 * total + i) % total);
    const x = hits[idx * 2];
    const y = hits[idx * 2 + 1];
    // Sub-pixel jitter avoids a visible grid.
    const jx = (Math.random() - 0.5) * 0.9;
    const jy = (Math.random() - 0.5) * 0.9;
    positions[i * 3] = (x + jx - halfW) * scale;
    positions[i * 3 + 1] = -(y + jy - halfH) * scale;
    // Slight volumetric thickness so the mark has real depth.
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.14;
    luminance[i] = lum[idx];
  }

  return { positions, luminance };
}
