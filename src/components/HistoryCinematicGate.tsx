import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const LOADER_VIDEO = "/videos/transicion%202.mp4";
const AOT_LOGO = "/logo-ao-light.png";
const STORY_AUDIO = "/audio/track%201%20A%26O%20story%20telling.mp3";
const ORIGIN_VIDEO = "/videos/Digital_universe_birth_opening_v2.mp4";
const ARTIFACT_VIDEO = "/videos/Ecosystem_artifact_forming_in_space%20v2.mp4";

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = (v: number) => { v = clamp(v); return v * v * (3 - 2 * v); };

const PRELOADS = [
  { label: "ATMOSPHERE", url: LOADER_VIDEO, type: "video", weight: 42 },
  { label: "ORIGIN CINEMA", url: ORIGIN_VIDEO, type: "video", weight: 20 },
  { label: "A&O ARTIFACT", url: ARTIFACT_VIDEO, type: "video", weight: 15 },
  { label: "STORY AUDIO", url: STORY_AUDIO, type: "audio", weight: 13 },
  { label: "A&O IDENTITY", url: AOT_LOGO, type: "image", weight: 10 },
] as const;

type Asset = (typeof PRELOADS)[number];

function preloadAsset(asset: Asset, onProgress: (value: number) => void) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    const timeout = window.setTimeout(finish, 12000);

    if (asset.type === "image") {
      const img = new Image();
      img.onload = () => { window.clearTimeout(timeout); onProgress(1); finish(); };
      img.onerror = () => { window.clearTimeout(timeout); onProgress(1); finish(); };
      img.src = asset.url;
      return;
    }

    const media = document.createElement(asset.type === "video" ? "video" : "audio");
    media.preload = "auto";
    media.muted = true;
    if (media instanceof HTMLVideoElement) media.playsInline = true;
    const update = () => {
      if (media.duration && Number.isFinite(media.duration) && media.buffered.length) {
        onProgress(clamp(media.buffered.end(media.buffered.length - 1) / media.duration));
      }
    };
    media.addEventListener("progress", update);
    media.addEventListener("loadedmetadata", update);
    media.addEventListener("loadeddata", update);
    media.addEventListener("canplaythrough", () => { onProgress(1); window.clearTimeout(timeout); finish(); });
    media.addEventListener("error", () => { window.clearTimeout(timeout); onProgress(1); finish(); });
    media.src = asset.url;
    media.load();
  });
}

function LoaderOrb({ interactive }: { interactive: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const spikes = useMemo(() => Array.from({ length: 84 }, (_, i) => {
    const phi = Math.acos(1 - 2 * ((i + .5) / 84));
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    return { phi, theta, len: .38 + (i % 7) * .055, rot: (i % 5) * .35 };
  }), []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = e.clientX / innerWidth * 2 - 1;
      pointer.current.y = e.clientY / innerHeight * 2 - 1;
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y += .0035;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.current.y * .16, .035);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, pointer.current.x * .1, .035);
    const pulse = 1 + Math.sin(t * 1.8) * .018 + (interactive ? .035 : 0);
    group.current.scale.setScalar(pulse);
    if (core.current) core.current.rotation.y = t * .14;
  });

  return (
    <group ref={group} onClick={(e) => e.stopPropagation()}>
      <mesh ref={core}>
        <icosahedronGeometry args={[.9, 5]} />
        <meshPhysicalMaterial color="#071018" metalness={.85} roughness={.16} clearcoat={1} clearcoatRoughness={.08} emissive="#071018" emissiveIntensity={.25} />
      </mesh>
      <mesh scale={1.02}>
        <icosahedronGeometry args={[.9, 3]} />
        <meshBasicMaterial color="#43eaff" wireframe transparent opacity={.18} blending={THREE.AdditiveBlending} />
      </mesh>
      {spikes.map((s, i) => {
        const x = Math.sin(s.phi) * Math.cos(s.theta);
        const y = Math.cos(s.phi);
        const z = Math.sin(s.phi) * Math.sin(s.theta);
        return (
          <mesh key={i} position={[x * 1.04, y * 1.04, z * 1.04]} rotation={[s.phi + s.rot, s.theta, 0]}>
            <coneGeometry args={[.025, s.len, 5]} />
            <meshBasicMaterial color={i % 2 ? "#43eaff" : "#ff4eea"} transparent opacity={.72} blending={THREE.AdditiveBlending} />
          </mesh>
        );
      })}
      {[1.35, 1.58].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2 + i * .32, i * .55, 0]}>
          <torusGeometry args={[r, .012, 10, 160]} />
          <meshBasicMaterial color={i ? "#ff4eea" : "#43eaff"} transparent opacity={.6} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

function LogoParticleReveal({ onComplete }: { onComplete: () => void }) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const done = useRef(false);
  const started = useRef(performance.now());

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImage(img);
    img.src = AOT_LOGO;
    return () => { img.onload = null; };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      const t = (performance.now() - started.current) / 1000;
      setElapsed(t);
      if (t > 5.8 && !done.current) { done.current = true; onComplete(); }
    }, 40);
    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <div className="ao-particle-stage">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 36 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <color attach="background" args={["#020204"]} />
        <ambientLight intensity={.18} />
        {image && <LogoParticles image={image} progress={clamp(elapsed / 4.6)} />}
      </Canvas>
      <div className="ao-particle-vignette" />
      <div className="ao-particle-copy">
        <span>A&O ECOSYSTEM</span>
        <b>THE ARCHITECTURE TAKES FORM</b>
      </div>
    </div>
  );
}

function LogoParticles({ image, progress }: { image: HTMLImageElement; progress: number }) {
  const points = useRef<THREE.Points>(null);
  const data = useMemo(() => {
    const canvas = document.createElement("canvas");
    const size = 320;
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    ctx.clearRect(0, 0, size, size);
    const ratio = Math.min(size / image.naturalWidth, size / image.naturalHeight);
    const dw = image.naturalWidth * ratio;
    const dh = image.naturalHeight * ratio;
    ctx.drawImage(image, (size - dw) / 2, (size - dh) / 2, dw, dh);
    const pixels = ctx.getImageData(0, 0, size, size).data;
    const target: number[] = [];
    const origin: number[] = [];
    for (let y = 0; y < size; y += 2) {
      for (let x = 0; x < size; x += 2) {
        const a = pixels[(y * size + x) * 4 + 3] / 255;
        if (a < .18) continue;
        const nx = (x / (size - 1) - .5) * 4.1;
        const ny = (.5 - y / (size - 1)) * 4.1;
        const nz = (Math.random() - .5) * .08;
        target.push(nx, ny, nz);
        const radius = 2.5 + Math.random() * 3.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        origin.push(radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
      }
    }
    return { target: new Float32Array(target), origin: new Float32Array(origin), count: target.length / 3 };
  }, [image]);

  const positions = useMemo(() => new Float32Array(data.origin), [data]);
  useEffect(() => {
    if (!points.current) return;
    points.current.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  }, [positions]);

  useFrame(({ clock }, delta) => {
    if (!points.current) return;
    const attr = points.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const p = ease(progress);
    const settle = Math.min(1, p * 1.35);
    for (let i = 0; i < data.count; i++) {
      const j = i * 3;
      const turbulence = (1 - settle) * .22 * Math.sin(clock.elapsedTime * 2 + i * .17);
      const tx = data.target[j] + Math.sin(clock.elapsedTime * .8 + i) * .008 * (1 - settle);
      const ty = data.target[j + 1] + Math.cos(clock.elapsedTime * .75 + i * .7) * .008 * (1 - settle);
      const tz = data.target[j + 2];
      const ox = data.origin[j] + turbulence;
      const oy = data.origin[j + 1] + turbulence;
      const oz = data.origin[j + 2] + turbulence;
      const k = Math.min(1, delta * (2.8 + settle * 4.5));
      arr[j] += ((ox * (1 - settle) + tx * settle) - arr[j]) * k;
      arr[j + 1] += ((oy * (1 - settle) + ty * settle) - arr[j + 1]) * k;
      arr[j + 2] += ((oz * (1 - settle) + tz * settle) - arr[j + 2]) * k;
    }
    attr.needsUpdate = true;
    points.current.rotation.y = Math.sin(clock.elapsedTime * .35) * .025 * (1 - settle);
    points.current.rotation.x = Math.cos(clock.elapsedTime * .3) * .018 * (1 - settle);
  });

  return <points ref={points} frustumCulled={false}>
    <pointsMaterial color="#f7f4ee" size={.025} sizeAttenuation transparent opacity={.94} depthWrite={false} blending={THREE.AdditiveBlending} />
  </points>;
}

export function ArtifactVideoBridge() {
  const video = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      setProgress(clamp(scrollY / max));
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true; v.playsInline = true; v.preload = "auto";
    const start = 1 / 7;
    const end = 2 / 7;
    const local = clamp((progress - start) / (end - start));
    if (!v.duration || !Number.isFinite(v.duration)) return;
    const target = Math.max(0, Math.min(v.duration - .04, local * v.duration));
    if (Math.abs(v.currentTime - target) > .18) v.currentTime = target;
  }, [progress]);

  const start = 1 / 7, end = 2 / 7;
  const local = clamp((progress - start) / (end - start));
  const opacity = local < .1 ? local / .1 : local > .86 ? (1 - local) / .14 : 1;
  if (opacity <= 0) return null;
  return <div className="artifact-video-bridge" style={{ opacity }} aria-hidden="true">
    <video ref={video} muted playsInline preload="auto" src={ARTIFACT_VIDEO} />
    <div className="artifact-video-veil" />
  </div>;
}

export function CinematicGate({ onEnter }: { onEnter: () => void }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [hover, setHover] = useState(false);
  const [entered, setEntered] = useState(false);
  const [phase, setPhase] = useState("CALIBRATING THE EXPERIENCE");
  const [showOrb, setShowOrb] = useState(false);
  const [logoReveal, setLogoReveal] = useState(false);

  useEffect(() => {
    let mounted = true;
    const values = PRELOADS.map(() => 0);
    const recompute = () => {
      const total = PRELOADS.reduce((sum, a, i) => sum + a.weight * values[i], 0);
      if (mounted) setProgress(Math.min(99.2, total));
    };
    (async () => {
      for (let i = 0; i < PRELOADS.length; i++) {
        setPhase(PRELOADS[i].label);
        await preloadAsset(PRELOADS[i], (v) => { values[i] = v; recompute(); });
        values[i] = 1; recompute();
      }
      if (!mounted) return;
      setProgress(100); setReady(true); setPhase("EXPERIENCE READY");
    })();
    const revealTimer = window.setTimeout(() => setShowOrb(true), 850);
    return () => { mounted = false; window.clearTimeout(revealTimer); };
  }, []);

  const enter = () => {
    if (!ready || !hover || entered) return;
    setEntered(true);
    window.setTimeout(() => setLogoReveal(true), 520);
  };

  if (logoReveal) return <LogoParticleReveal onComplete={onEnter} />;

  return <div className={`history-loader ${entered ? "history-loader--exit" : ""}`}>
    <video className="history-loader__video" muted playsInline autoPlay loop preload="auto" src={LOADER_VIDEO} />
    <div className="history-loader__veil" />
    <div className="history-loader__header"><span>A&O ECOSYSTEM</span><span>HISTORY / 01—08</span></div>
    <div className={`history-loader__orb ${showOrb ? "is-visible" : ""}`} onPointerEnter={() => { if (ready) { setHover(true); document.body.style.cursor = "none"; } }} onPointerLeave={() => setHover(false)}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.8], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={.15} />
        <LoaderOrb interactive={ready && hover} />
      </Canvas>
      {ready && hover && <button type="button" className="history-loader__press" onClick={enter}>PRESS ON</button>}
    </div>
    <div className="history-loader__status">
      <span>{phase}</span>
      <div className="history-loader__progress"><i style={{ transform: `scaleX(${progress / 100})` }} /></div>
      <div className="history-loader__meta"><b>{String(Math.round(progress)).padStart(3, "0")}%</b><em>{ready ? "READY" : "LOADING CORE ASSETS"}</em></div>
    </div>
    <div className="history-loader__footer"><span>WEBGL / REALTIME / CINEMATIC</span><span>MOVE THROUGH THE STORY</span></div>
    <style>{CSS}</style>
  </div>;
}

const CSS = `
.history-loader{position:fixed;inset:0;z-index:9999;overflow:hidden;background:#020204;color:#f5f2ec;opacity:1;visibility:visible;transition:opacity .7s cubic-bezier(.22,1,.36,1),visibility .7s;cursor:none}.history-loader--exit{opacity:0;visibility:hidden;pointer-events:none}.history-loader__video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.9) contrast(1.04);opacity:.82}.history-loader__veil{position:absolute;inset:0;background:radial-gradient(circle at 50% 48%,rgba(0,0,0,.04),rgba(0,0,0,.42) 58%,rgba(0,0,0,.78)),linear-gradient(180deg,rgba(0,0,0,.38),transparent 35%,rgba(0,0,0,.48));pointer-events:none}.history-loader__header,.history-loader__footer{position:absolute;left:28px;right:28px;display:flex;justify-content:space-between;font:500 9px/1.2 Inter,system-ui,sans-serif;letter-spacing:.22em;text-transform:uppercase;opacity:.62}.history-loader__header{top:25px}.history-loader__footer{bottom:25px}.history-loader__orb{position:absolute;left:50%;top:46%;width:min(410px,62vw);height:min(410px,62vw);transform:translate(-50%,-50%) scale(.88);opacity:0;transition:opacity 1.2s ease,transform 1.2s cubic-bezier(.22,1,.36,1);filter:drop-shadow(0 0 40px rgba(53,224,255,.16))}.history-loader__orb.is-visible{opacity:1;transform:translate(-50%,-50%) scale(1)}.history-loader__press{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border:1px solid rgba(255,255,255,.65);background:rgba(3,4,8,.16);backdrop-filter:blur(8px);color:#fff;padding:12px 22px;font:600 9px/1 Inter,system-ui,sans-serif;letter-spacing:.3em;cursor:none;transition:background .25s,letter-spacing .25s,transform .25s}.history-loader__press:hover{background:rgba(255,255,255,.12);letter-spacing:.4em;transform:translate(-50%,-50%) scale(1.04)}.history-loader__status{position:absolute;left:50%;bottom:13.5%;width:min(460px,72vw);transform:translateX(-50%);text-align:center}.history-loader__status>span{display:block;font:500 8px/1.4 Inter,system-ui,sans-serif;letter-spacing:.28em;text-transform:uppercase;opacity:.66;margin-bottom:14px}.history-loader__progress{height:1px;background:rgba(255,255,255,.18);overflow:hidden}.history-loader__progress i{display:block;width:100%;height:100%;background:#fff;transform-origin:left;transition:transform .28s ease;box-shadow:0 0 16px rgba(255,255,255,.55)}.history-loader__meta{display:flex;justify-content:space-between;margin-top:8px;font:500 8px/1 Inter,system-ui,sans-serif;letter-spacing:.18em;opacity:.46}.history-loader__meta b{font-weight:600}.history-loader__meta em{font-style:normal}.ao-particle-stage{position:fixed;inset:0;z-index:10000;background:#020204;overflow:hidden}.ao-particle-stage canvas{position:absolute!important;inset:0}.ao-particle-vignette{position:absolute;inset:0;background:radial-gradient(circle at 50% 48%,transparent 18%,rgba(0,0,0,.18) 55%,rgba(0,0,0,.82) 100%),linear-gradient(180deg,rgba(0,0,0,.3),transparent 35%,rgba(0,0,0,.55));pointer-events:none}.ao-particle-copy{position:absolute;left:50%;bottom:7.5%;transform:translateX(-50%);display:flex;flex-direction:column;gap:9px;align-items:center;white-space:nowrap;font:500 8px/1 Inter,system-ui,sans-serif;letter-spacing:.28em;text-transform:uppercase;opacity:.5}.ao-particle-copy b{font-size:9px;font-weight:500;letter-spacing:.34em;color:rgba(255,255,255,.75)}.artifact-video-bridge{position:fixed;inset:0;z-index:1;pointer-events:none;overflow:hidden;background:#020202}.artifact-video-bridge video{width:100%;height:100%;object-fit:cover;display:block}.artifact-video-veil{position:absolute;inset:0;background:radial-gradient(circle at 50% 48%,transparent 20%,rgba(0,0,0,.08) 60%,rgba(0,0,0,.68) 100%),linear-gradient(180deg,rgba(0,0,0,.18),transparent 32%,rgba(0,0,0,.42));pointer-events:none}@media(max-width:700px){.history-loader__header,.history-loader__footer{left:17px;right:17px;font-size:7px}.history-loader__header{top:18px}.history-loader__footer{bottom:18px}.history-loader__orb{width:78vw;height:78vw}.history-loader__status{bottom:14%;width:78vw}.ao-particle-copy{font-size:7px}.ao-particle-copy b{font-size:8px}}@media(prefers-reduced-motion:reduce){.history-loader__orb{transition:none}.history-loader{transition:none}}
`;
