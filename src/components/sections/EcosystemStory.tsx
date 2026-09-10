import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const VIDEO_DESKTOP = "/eco-transition-desktop.mp4";
const VIDEO_MOBILE = "/eco-transition-mobile.mp4";
const POSTER = "/eco-transition-poster.jpg";

const MODELS = {
  ao: "/ao-logo-3d.glb",
  inverfact: "/unit-inverfact.glb",
  nomadhive: "/unit-nomadhive.glb",
  anma: "/unit-anma.glb",
} as const;

type Chapter = {
  id: string;
  kicker: string;
  brand: string;
  title: string;
  copy: string;
  meta: string;
  color: string;
  model?: keyof typeof MODELS;
  route?: string;
};

const CHAPTERS: Chapter[] = [
  { id: "01", kicker: "01 — EL ORIGEN", brand: "EL BIG BANG DE A&O", title: "Todo comenzó con una visión.", copy: "Antes de existir como ecosistema, A&O fue una idea: conectar personas, capital, conocimiento, tecnología y oportunidades dentro de una misma estructura.", meta: "SINGULARIDAD · BIG BANG · EXPANSIÓN", color: "#ff4038" },
  { id: "02", kicker: "02 — LA FORMA", brand: "A&O", title: "La visión tomó forma.", copy: "La identidad dejó de ser un símbolo para convertirse en una estructura preparada para conectar negocios, personas y sistemas.", meta: "VISIÓN · ESTRUCTURA · DIRECCIÓN", color: "#ff4038", model: "ao" },
  { id: "03", kicker: "03 — CAPITAL", brand: "INVERFACT", title: "Aprender a mover el capital cambia el juego.", copy: "INVERFACT abre la puerta al conocimiento financiero, la educación y una nueva relación con las decisiones sobre capital.", meta: "CAPITAL · EDUCACIÓN · COMUNIDAD", color: "#ffb21a", model: "inverfact", route: "/inverfact" },
  { id: "04", kicker: "04 — PERSONAS", brand: "NOMADHIVE", title: "El crecimiento nunca fue individual.", copy: "NOMADHIVE conecta talento, colaboración y oportunidades para construir una red que crece más allá de un solo lugar.", meta: "TALENTO · RED · OPORTUNIDAD", color: "#28e879", model: "nomadhive", route: "/nomadhive" },
  { id: "05", kicker: "05 — COMERCIO", brand: "ANMA SOLUCIONES", title: "Las ideas necesitan un motor para llegar al mercado.", copy: "ANMA convierte productos, marketing, ventas y tecnología en sistemas de comercio preparados para escalar.", meta: "CONTENIDO · COMUNIDAD · LANZAMIENTOS", color: "#ff8514", model: "anma", route: "/anma" },
  { id: "06", kicker: "06 — SISTEMAS", brand: "A&O SYSTEM TOOLS", title: "Y entonces construimos las herramientas.", copy: "Soluciones para organizar, automatizar, medir y multiplicar lo que ocurre dentro del ecosistema.", meta: "IA · DATOS · SISTEMAS · AUTOMATIZACIÓN", color: "#a997ff" },
  { id: "07", kicker: "07 — CONVERGENCIA", brand: "LA CONVERGENCIA", title: "Cuando todo se conecta, aparece el ecosistema.", copy: "Capital. Personas. Comercio. Tecnología. Cada unidad nació con un propósito distinto; juntas forman una estructura mayor.", meta: "CAPITAL · TALENTO · COMERCIO · SISTEMAS", color: "#f5efe7" },
  { id: "08", kicker: "08 — A&O ECOSYSTEM", brand: "A&O ECOSYSTEM", title: "No es una marca. Es una estructura.", copy: "A&O Ecosystem conecta negocios, tecnología, talento y oportunidades para construir lo que viene después.", meta: "TALENTO · TECNOLOGÍA · CONOCIMIENTO · CAPITAL", color: "#ffffff", model: "ao" },
];

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = (v: number) => { v = clamp(v); return v * v * (3 - 2 * v); };

function useStoryProgress(ref: React.RefObject<HTMLElement>) {
  const [target, setTarget] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const read = () => {
      const el = ref.current;
      if (!el) return;
      const top = window.scrollY + el.getBoundingClientRect().top;
      const max = Math.max(1, el.offsetHeight - window.innerHeight);
      setTarget(clamp((window.scrollY - top) / max));
    };
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        read();
      });
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", read);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setValue((v) => Math.abs(target - v) < 0.00015 ? target : v + (target - v) * 0.085);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return value;
}

function ScrollFilm({ progress }: { progress: number }) {
  const video = useRef<HTMLVideoElement>(null);
  const current = useRef(0);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const onMetadata = () => setReady(true);
    el.addEventListener("loadedmetadata", onMetadata);
    el.preload = "auto";
    el.load();
    if (el.readyState >= 1) setReady(true);
    return () => el.removeEventListener("loadedmetadata", onMetadata);
  }, [isMobile]);

  useEffect(() => {
    const el = video.current;
    if (!el || !ready || document.hidden || !Number.isFinite(el.duration) || el.duration <= 0) return;
    const target = progress * Math.max(0, el.duration - 0.05);
    current.current += (target - current.current) * 0.12;
    if (Math.abs(el.currentTime - current.current) > 0.035) {
      try { el.currentTime = current.current; } catch { /* media is still buffering */ }
    }
  }, [progress, ready]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-background">
      <video
        ref={video}
        src={isMobile ? VIDEO_MOBILE : VIDEO_DESKTOP}
        poster={POSTER}
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover scale-[1.025]"
      />
      <div className="absolute inset-0 bg-background/10" />
      <div className="story-vignette absolute inset-0" />
      <div className="story-scrim absolute inset-0" />
    </div>
  );
}

function SmokeField({ color, pointer }: { color: string; pointer: React.MutableRefObject<THREE.Vector2> }) {
  const points = useRef<THREE.Points>(null);
  const count = typeof window !== "undefined" && window.innerWidth < 768 ? 240 : 520;
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 1.4 + Math.random() * 5.5;
      const angle = Math.random() * Math.PI * 2;
      values[i * 3] = Math.cos(angle) * radius;
      values[i * 3 + 1] = (Math.random() - 0.5) * 5;
      values[i * 3 + 2] = Math.sin(angle) * radius - 1.5;
    }
    return values;
  }, [count]);

  useFrame((state, rawDelta) => {
    const field = points.current;
    if (!field) return;
    const delta = Math.min(rawDelta, 0.05);
    field.rotation.y += delta * 0.018;
    field.rotation.z += (pointer.current.x * 0.05 - field.rotation.z) * (1 - Math.exp(-2 * delta));
    field.position.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.18;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.085} transparent opacity={0.17} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function PointerRig({ pointer }: { pointer: React.MutableRefObject<THREE.Vector2> }) {
  useEffect(() => {
    const move = (e: PointerEvent) => pointer.current.set((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [pointer]);
  return null;
}

function Origin({ progress, pointer }: { progress: number; pointer: React.MutableRefObject<THREE.Vector2> }) {
  const core = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current || !core.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y += 0.0018;
    group.current.rotation.x += (pointer.current.y * 0.12 - group.current.rotation.x) * 0.025;
    core.current.scale.setScalar(0.2 + ease(progress) * 1.9 + Math.sin(t * 1.5) * 0.025);
  });
  return <group ref={group}>
    <Sparkles count={1800} scale={[10, 7, 7]} size={1.7} speed={0.22} color="#fff4eb" />
    <mesh ref={core}>
      <sphereGeometry args={[0.7, 48, 32]} />
      <meshBasicMaterial color="#ff4038" transparent opacity={0.16 + progress * 0.28} blending={THREE.AdditiveBlending} />
    </mesh>
    {[0, 1, 2].map((i) => <mesh key={i} rotation={[Math.PI / 2 + i * 0.45, i * 0.7, 0]} scale={0.8 + progress * 0.8}>
      <torusGeometry args={[1.1 + i * 0.55, 0.012, 12, 160]} />
      <meshBasicMaterial color={i === 1 ? "#ff4038" : "#fff4eb"} transparent opacity={0.28} blending={THREE.AdditiveBlending} />
    </mesh>)}
  </group>;
}

function GenericModel({ model, color, pointer, onClick }: { model: keyof typeof MODELS; color: string; pointer: React.MutableRefObject<THREE.Vector2>; onClick?: () => void }) {
  const { scene } = useGLTF(MODELS[model]);
  const root = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);
  const object = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size); box.getCenter(center); clone.position.sub(center);
    const wrapper = new THREE.Group(); wrapper.add(clone);
    wrapper.scale.setScalar(3.35 / (Math.max(size.x, size.y, size.z) || 1));
    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const base = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
      const mat = base as THREE.MeshStandardMaterial;
      mesh.material = new THREE.MeshPhysicalMaterial({
        map: mat?.map ?? null,
        color: mat?.map ? "#ffffff" : "#bfc4cc",
        metalness: 0.92,
        roughness: 0.17,
        clearcoat: 0.9,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.5,
        emissive: color,
        emissiveIntensity: 0.08,
        side: THREE.DoubleSide,
      });
    });
    return wrapper;
  }, [scene, color]);

  useFrame((state, delta) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime;
    const speed = hover ? 0.8 : 0.22;
    root.current.rotation.y += delta * speed;
    root.current.rotation.x += (pointer.current.y * 0.16 - root.current.rotation.x) * 0.035;
    root.current.rotation.z += (pointer.current.x * 0.08 - root.current.rotation.z) * 0.035;
    root.current.position.x += (pointer.current.x * 0.28 - root.current.position.x) * 0.025;
    root.current.position.y += (Math.sin(t * 0.7) * 0.09 - root.current.position.y) * 0.04;
    const scale = hover ? 1.1 : 1;
    root.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.08);
  });

  return <group ref={root} onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = onClick ? "pointer" : "grab"; }} onPointerOut={() => { setHover(false); document.body.style.cursor = ""; }} onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
    <primitive object={object} />
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.95, 0.014, 10, 180]} />
      <meshBasicMaterial color={color} transparent opacity={hover ? 0.75 : 0.24} blending={THREE.AdditiveBlending} />
    </mesh>
  </group>;
}

function SystemCore({ pointer }: { pointer: React.MutableRefObject<THREE.Vector2> }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (!group.current) return; group.current.rotation.y += d * 0.18; group.current.rotation.x += (pointer.current.y * 0.12 - group.current.rotation.x) * 0.03; });
  return <group ref={group}>
    {[0,1,2,3,4].map((i) => <mesh key={i} rotation={[Math.PI / 2 + i * 0.25, i * 0.4, 0]}>
      <torusGeometry args={[1.2 + i * 0.38, 0.014, 12, 160]} />
      <meshBasicMaterial color={i % 2 ? "#a997ff" : "#f5efe7"} transparent opacity={0.3 - i * 0.03} blending={THREE.AdditiveBlending} />
    </mesh>)}
    <mesh><icosahedronGeometry args={[0.75, 2]} /><meshPhysicalMaterial color="#15131d" metalness={0.9} roughness={0.16} emissive="#a997ff" emissiveIntensity={0.35} /></mesh>
    <Sparkles count={900} scale={[5,5,5]} size={1.2} speed={0.15} color="#a997ff" />
  </group>;
}

function Convergence({ pointer }: { pointer: React.MutableRefObject<THREE.Vector2> }) {
  const group = useRef<THREE.Group>(null);
  const colors = ["#ffb21a", "#28e879", "#ff8514", "#a997ff"];
  useFrame((state, d) => { if (!group.current) return; group.current.rotation.y += d * 0.08; group.current.rotation.x += (pointer.current.y * 0.08 - group.current.rotation.x) * 0.03; group.current.position.x += (pointer.current.x * 0.2 - group.current.position.x) * 0.025; });
  return <group ref={group}>
    {colors.map((c, i) => <Float key={c} speed={1.2 + i * 0.15} rotationIntensity={0.4} floatIntensity={0.7}>
      <mesh position={[Math.cos(i * Math.PI / 2) * 2.0, Math.sin(i * Math.PI / 2) * 1.4, (i - 1.5) * 0.25]}>
        <sphereGeometry args={[0.32, 32, 24]} />
        <meshBasicMaterial color={c} transparent opacity={0.85} blending={THREE.AdditiveBlending} />
      </mesh>
    </Float>)}
    <mesh><sphereGeometry args={[0.72, 48, 32]} /><meshBasicMaterial color="#fff" transparent opacity={0.08} blending={THREE.AdditiveBlending} /></mesh>
    <Sparkles count={1600} scale={[7,5,7]} size={1.5} speed={0.18} color="#ffffff" />
  </group>;
}

function StoryWorld({ chapter, local, pointer, navigate }: { chapter: Chapter; local: number; pointer: React.MutableRefObject<THREE.Vector2>; navigate: (path: string) => void }) {
  const fade = Math.min(ease(local * 1.5), ease((1 - local) * 1.5));
  const onClick = chapter.route ? () => navigate(chapter.route!) : undefined;
  return <>
    <SmokeField color={chapter.color} pointer={pointer} />
    <group position={[0, (0.5 - local) * 0.35, -0.65 + fade * 0.65]} scale={0.78 + fade * 0.22}>
      {chapter.id === "01" && <Origin progress={local} pointer={pointer} />}
      {chapter.model && <GenericModel model={chapter.model} color={chapter.color} pointer={pointer} onClick={onClick} />}
      {chapter.id === "06" && <SystemCore pointer={pointer} />}
      {chapter.id === "07" && <Convergence pointer={pointer} />}
    </group>
  </>;
}

function ModelPreloader({ index }: { index: number }) {
  useEffect(() => {
    const current = CHAPTERS[index]?.model;
    const next = CHAPTERS[index + 1]?.model;
    if (current) useGLTF.preload(MODELS[current]);
    if (next) window.setTimeout(() => useGLTF.preload(MODELS[next]), 180);
  }, [index]);
  return null;
}

export default function EcosystemStory() {
  const ref = useRef<HTMLElement>(null);
  const progress = useStoryProgress(ref);
  const pointer = useRef(new THREE.Vector2());
  const navigate = useNavigate();
  const raw = clamp(progress * CHAPTERS.length);
  const index = Math.min(CHAPTERS.length - 1, Math.floor(raw));
  const local = raw - index;
  const chapter = CHAPTERS[index];

  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return <section id="historia" ref={ref} className="relative min-h-[900svh] overflow-hidden bg-background text-foreground">
    <div className="sticky top-0 h-[100svh] overflow-hidden">
      <ScrollFilm progress={progress} />
      <div className="story-depth absolute inset-0 pointer-events-none" />

      <Canvas
        dpr={reduced ? 1 : [1, 1.5]}
        frameloop={document.hidden ? "never" : "always"}
        camera={{ position: [0, 0.1, 7.5], fov: 38, near: 0.1, far: 80 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}
        className="absolute inset-0"
      >
        <PointerRig pointer={pointer} />
        <ambientLight intensity={0.28} />
        <directionalLight position={[4, 5, 7]} intensity={2.2} />
        <pointLight position={[-4, 1, 4]} intensity={4.5} color={chapter.color} distance={12} />
        <Environment resolution={64}>
          <EnvironmentFiles />
        </Environment>
        <Suspense fallback={<SmokeField color={chapter.color} pointer={pointer} />}>
          <StoryWorld key={chapter.id} chapter={chapter} local={reduced ? 0.5 : local} pointer={pointer} navigate={navigate} />
        </Suspense>
      </Canvas>

      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5 md:p-8 pointer-events-none">
        <div className="text-[9px] uppercase tracking-[0.4em] text-foreground/45">A&O ECOSYSTEM · HISTORIA</div>
        <div className="text-[9px] uppercase tracking-[0.32em] text-foreground/45">{chapter.id} / 08</div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-8 md:px-10 md:pb-10 pointer-events-none">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-8">
          <div key={chapter.id} className="story-copy max-w-2xl">
            <div className="text-[10px] uppercase tracking-[0.36em]" style={{ color: chapter.color }}>{chapter.kicker}</div>
            <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-[0.98] sm:text-5xl md:text-6xl">{chapter.title}</h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/70 md:text-base">{chapter.copy}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-foreground/45">
              <span>{chapter.meta}</span>
              {chapter.route && <span className="rounded-full border border-border/70 px-3 py-1.5 text-foreground/75">Mover el cursor · Explorar</span>}
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end gap-3 text-right text-[9px] uppercase tracking-[0.25em] text-foreground/40">
            <span>{Math.round(progress * 100)}%</span>
            <div className="h-24 w-px bg-foreground/15"><div className="w-px bg-foreground/80" style={{ height: `${(index + local) / CHAPTERS.length * 100}%` }} /></div>
            <span>scroll</span>
          </div>
        </div>
      </div>

      <div className="absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-2 sm:flex pointer-events-none">
        {CHAPTERS.map((item, i) => <div key={item.id} className="flex items-center gap-2"><span className="h-px transition-all duration-500" style={{ width: i === index ? 26 : 8, background: i === index ? item.color : "rgba(255,255,255,.2)" }} /><span className={`text-[8px] tracking-[0.18em] transition-opacity ${i === index ? "opacity-100" : "opacity-0"}`}>{item.brand}</span></div>)}
      </div>

      {chapter.route && <Button type="button" variant="glass" size="sm" onClick={() => navigate(chapter.route!)} className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 items-center gap-2 text-[9px] uppercase tracking-[0.25em] md:flex">
        Explorar {chapter.brand} <ArrowUpRight className="h-3.5 w-3.5" />
      </Button>}

      <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-foreground/35 pointer-events-none">
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </div>
      <ModelPreloader index={index} />
    </div>
  </section>;
}

function EnvironmentFiles() {
  return <>
    <mesh position={[0, 5, -4]}><planeGeometry args={[10, 10]} /><meshBasicMaterial color="#ffffff" /></mesh>
    <mesh position={[-5, 0, -2]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[8, 8]} /><meshBasicMaterial color="#8f949d" /></mesh>
    <mesh position={[5, 0, -2]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[8, 8]} /><meshBasicMaterial color="#ff4038" /></mesh>
  </>;
}
