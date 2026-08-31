import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Sparkles, Trail } from "@react-three/drei";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Chapter = {
  id: string;
  label: string;
  title: string;
  copy: string;
  kind: "bang" | "object" | "inverfact" | "nomadhive" | "anma" | "master" | "convergence" | "final";
  color: string;
  route?: string;
  cta?: string;
  material: string;
};

const chapters: Chapter[] = [
  { id: "01", label: "EL BIG BANG", title: "Antes de existir A&O, existía una posibilidad.", copy: "Todo empezó con una pregunta: ¿cómo convertir esfuerzo en estructura, y estructura en crecimiento?", kind: "bang", color: "#ff4038", material: "PARTÍCULAS · SINGULARIDAD · EXPANSIÓN" },
  { id: "02", label: "A&O", title: "La materia encontró una forma.", copy: "La energía se organizó. El caos encontró dirección. A&O nació como una arquitectura para crear movimiento.", kind: "object", color: "#ff4038", material: "PARTÍCULAS · WIREFRAME · MATERIA" },
  { id: "03", label: "INVERFACT", title: "El primer universo: aprender a decidir.", copy: "El conocimiento necesitaba convertirse en acción. Capital, educación y comunidad comenzaron a encontrarse.", kind: "inverfact", color: "#d7a84d", material: "ORO · DATOS · MUNDO", route: "/inverfact", cta: "ENTRAR EN INVERFACT" },
  { id: "04", label: "NOMADHIVE", title: "Una persona. Una conexión. Una red.", copy: "El talento no tiene que esperar una oportunidad; puede prepararse para crearla.", kind: "nomadhive", color: "#36d6a0", material: "NODOS · TALENTO · HIVE", route: "/nomadhive", cta: "ENTRAR EN NOMADHIVE" },
  { id: "05", label: "ANMA", title: "La energía se convirtió en movimiento.", copy: "Estrategia, contenido, comunidad y comercio comenzaron a trabajar como un mismo sistema.", kind: "anma", color: "#ff6a24", material: "PRODUCTO · RED · FLUJO", route: "/anma", cta: "ENTRAR EN ANMA" },
  { id: "06", label: "CLUB MASTER MONEY", title: "El conocimiento también construye patrimonio.", copy: "Una biblioteca futurista donde las ideas, las decisiones y el crecimiento se encuentran.", kind: "master", color: "#e9d6a1", material: "LIBROS · ORO · CONOCIMIENTO", cta: "PRÓXIMAMENTE" },
  { id: "07", label: "LA CONVERGENCIA", title: "Las piezas empezaron a encontrarse.", copy: "No son empresas separadas. Son órganos de un mismo sistema.", kind: "convergence", color: "#ffffff", material: "ORO · VERDE · NARANJA · LUZ" },
  { id: "08", label: "A&O ECOSYSTEM", title: "Lo que construimos hoy no termina aquí.", copy: "Las partículas de talento, tecnología, conocimiento, comercio, inversión y comunidad vuelven al centro.", kind: "final", color: "#ffffff", material: "TALENTO · TECNOLOGÍA · CONOCIMIENTO · COMUNIDAD" },
];

function useProgress() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setValue(max > 0 ? THREE.MathUtils.clamp(window.scrollY / max, 0, 1) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return value;
}

function chapterAt(progress: number) {
  const scaled = progress * (chapters.length - 0.0001);
  const index = Math.min(chapters.length - 1, Math.floor(scaled));
  return { index, local: scaled - index };
}

function ParticleLogo({ phase, color = "#fff1e6", scale = 2.2 }: { phase: number; color?: string; scale?: number }) {
  const ref = useRef<THREE.Points>(null);
  const [shape, setShape] = useState<Float32Array | null>(null);

  useEffect(() => {
    let active = true;
    const image = new Image();
    image.src = "/logo-ao-light.png";
    image.onload = () => {
      if (!active) return;
      const canvas = document.createElement("canvas");
      const width = 180;
      const height = Math.max(1, Math.min(180, Math.round((image.height / image.width) * width)));
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.drawImage(image, 0, 0, width, height);
      const data = context.getImageData(0, 0, width, height).data;
      const samples: number[] = [];
      const step = 2;
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const offset = (y * width + x) * 4;
          const alpha = data[offset + 3];
          if (alpha > 35) samples.push((x / width - 0.5) * 2.7, (0.5 - y / height) * 2.7);
        }
      }
      setShape(Float32Array.from(samples));
    };
    return () => { active = false; image.onload = null; };
  }, []);

  const base = useMemo(() => {
    const count = shape ? shape.length / 2 : 5000;
    const result = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = Math.pow(Math.random(), 0.45) * 3.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      result[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      result[i * 3 + 1] = radius * Math.cos(phi);
      result[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return result;
  }, [shape]);

  useFrame((state) => {
    if (!ref.current) return;
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const count = positions.length / 3;
    const morph = THREE.MathUtils.smoothstep(phase, 0, 1);
    for (let i = 0; i < count; i += 1) {
      const bx = base[i * 3];
      const by = base[i * 3 + 1];
      const bz = base[i * 3 + 2];
      let tx = bx; let ty = by; let tz = bz;
      if (shape) {
        const sample = (i % (shape.length / 2)) * 2;
        tx = shape[sample] * scale;
        ty = shape[sample + 1] * scale;
        tz = Math.sin(i * 12.7) * 0.018 * scale;
      }
      positions[i * 3] = THREE.MathUtils.lerp(bx, tx, morph);
      positions[i * 3 + 1] = THREE.MathUtils.lerp(by, ty, morph);
      positions[i * 3 + 2] = THREE.MathUtils.lerp(bz, tz, morph);
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = state.clock.elapsedTime * 0.06;
  });

  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[base, 3]} count={base.length / 3} /></bufferGeometry><pointsMaterial color={color} size={0.024} transparent opacity={0.9} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} /></points>;
}

function BigBang({ phase }: { phase: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 7000;
    const result = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = Math.pow(Math.random(), 0.35) * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      result[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      result[i * 3 + 1] = radius * Math.cos(phi);
      result[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return result;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const burst = THREE.MathUtils.smoothstep(phase, 0.18, 0.5);
    ref.current.scale.setScalar(0.04 + burst * 2.0);
    ref.current.rotation.y = state.clock.elapsedTime * 0.025;
  });

  return <><points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} /></bufferGeometry><pointsMaterial color="#fff5ed" size={0.018} transparent opacity={0.15 + THREE.MathUtils.smoothstep(phase, 0.05, 0.42) * 0.7} blending={THREE.AdditiveBlending} depthWrite={false} /></points><pointLight color="#ff4038" intensity={5 + phase * 30} distance={10} /></>;
}

function Singularity({ phase }: { phase: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.1;
    ref.current.rotation.y = state.clock.elapsedTime * 0.08;
    const collapse = 1 - THREE.MathUtils.smoothstep(phase, 0.04, 0.3);
    ref.current.scale.setScalar(0.35 + collapse * 2.7);
  });
  return <group ref={ref}><mesh><sphereGeometry args={[0.42, 48, 48]} /><meshBasicMaterial color="#ffffff" /></mesh>{[0.8, 1.2, 1.7, 2.25].map((radius, i) => <mesh key={radius} rotation={[i * 0.5, i * 0.7, i * 0.2]}><torusGeometry args={[radius, 0.012, 8, 160]} /><meshBasicMaterial color={i % 2 ? "#ff4038" : "#fff1e8"} transparent opacity={0.2} /></mesh>)}</group>;
}

function AOObject({ phase }: { phase: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.1;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.12;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
  });
  return <group ref={ref} scale={0.75 + phase * 0.3}><ParticleLogo phase={phase} /><mesh scale={1.08}><icosahedronGeometry args={[2.05, 2]} /><meshBasicMaterial color="#ff4038" wireframe transparent opacity={0.18 + phase * 0.14} /></mesh>{[2.5, 3.1, 3.75].map((radius, i) => <mesh key={radius} rotation={[i * 0.5, i * 0.7, i * 0.2]}><torusGeometry args={[radius, i === 1 ? 0.018 : 0.008, 8, 180]} /><meshBasicMaterial color={i === 1 ? "#ff4038" : "#fff1e6"} transparent opacity={i === 1 ? 0.4 : 0.14} /></mesh>)}<pointLight color="#ff4038" intensity={7 + phase * 18} distance={9} /></group>;
}

function Finance({ phase }: { phase: number }) {
  const ref = useRef<THREE.Group>(null);
  const bars = useMemo(() => Array.from({ length: 38 }, (_, i) => ({ x: (i - 19) * 0.18, h: 0.2 + Math.random() * 1.8 })), []);
  useFrame((state, delta) => { if (ref.current) { ref.current.rotation.y += delta * 0.07; ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.05; ref.current.scale.setScalar(0.65 + phase * 0.5); } });
  return <group ref={ref}>{bars.map((bar, i) => <mesh key={i} position={[bar.x, bar.h / 2 - 1.05, 0]}><boxGeometry args={[0.07, bar.h, 0.07]} /><meshStandardMaterial color="#d7a84d" metalness={0.9} roughness={0.18} emissive="#5d3905" emissiveIntensity={0.3} /></mesh>)}<mesh position={[0, -1.05, 0]} rotation={[Math.PI / 2, 0, 0]}><sphereGeometry args={[2.2, 32, 16]} /><meshBasicMaterial color="#b17b25" wireframe transparent opacity={0.18} /></mesh><pointLight color="#d7a84d" intensity={8 + phase * 12} distance={9} /></group>;
}

function Hive({ phase }: { phase: number }) {
  const ref = useRef<THREE.Group>(null);
  const cells = useMemo(() => Array.from({ length: 32 }, (_, i) => { const a = (i / 32) * Math.PI * 2; const r = 1.3 + (i % 4) * 0.48; return [Math.cos(a) * r, Math.sin(a) * r * 0.65, ((i % 5) - 2) * 0.25] as [number, number, number]; }), []);
  useFrame((state, delta) => { if (ref.current) { ref.current.rotation.y += delta * 0.05; ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.16) * 0.03; } });
  return <group ref={ref}>{cells.map((position, i) => <Trail key={i} width={0.09} length={2.2} color="#36d6a0"><mesh position={position} scale={0.75 + phase * 0.3}><cylinderGeometry args={[0.27, 0.27, 0.12, 6]} /><meshBasicMaterial color="#36d6a0" transparent opacity={0.5 + phase * 0.4} /></mesh></Trail>)}<pointLight color="#36d6a0" intensity={6 + phase * 12} distance={9} /></group>;
}

function Commerce({ phase }: { phase: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => { if (ref.current) { ref.current.rotation.y += delta * 0.12; ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.12; } });
  return <group ref={ref}>{Array.from({ length: 30 }, (_, i) => { const a = (i / 30) * Math.PI * 2; const r = 1.25 + (i % 4) * 0.43; return <mesh key={i} position={[Math.cos(a) * r, Math.sin(i * 1.7) * 0.8, Math.sin(a) * r]} scale={0.7 + phase * 0.35}><boxGeometry args={[0.22, 0.22, 0.22]} /><meshStandardMaterial color="#ff6a24" metalness={0.72} roughness={0.25} emissive="#6b2107" emissiveIntensity={0.32 + phase * 0.35} /></mesh>; })}<pointLight color="#ff6a24" intensity={7 + phase * 12} distance={9} /></group>;
}

function Library({ phase }: { phase: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => { if (ref.current) { ref.current.rotation.y += delta * 0.025; ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08; } });
  return <group ref={ref}>{Array.from({ length: 18 }, (_, i) => { const x = (i % 6 - 2.5) * 0.55; const z = (Math.floor(i / 6) - 1) * 0.8; return <mesh key={i} position={[x, Math.sin(i) * 0.08, z]}><boxGeometry args={[0.42, 1.6 + (i % 3) * 0.25, 0.16]} /><meshStandardMaterial color="#c9a45d" metalness={0.75} roughness={0.28} /></mesh>; })}<mesh position={[0, 0.1, 0.8]} scale={0.85 + phase * 0.25}><cylinderGeometry args={[0.55, 0.55, 0.12, 64]} /><meshStandardMaterial color="#f0d58c" metalness={1} roughness={0.12} emissive="#8d6214" emissiveIntensity={0.35} /></mesh><pointLight color="#f0d58c" intensity={6 + phase * 10} distance={9} /></group>;
}

function Convergence({ phase }: { phase: number }) {
  const ref = useRef<THREE.Group>(null);
  const colors = ["#d7a84d", "#36d6a0", "#ff6a24", "#e9d6a1"];
  useFrame((state, delta) => { if (ref.current) { ref.current.rotation.y += delta * 0.025; ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.04; } });
  return <group ref={ref}>{colors.map((color, i) => { const a = (i / 4) * Math.PI * 2; const r = 3.2 * (1 - phase * 0.72); return <Trail key={color} width={0.12} length={4.5} color={color}><mesh position={[Math.cos(a) * r, Math.sin(i * 1.4) * 1.4, Math.sin(a) * r]}><sphereGeometry args={[0.11, 20, 20]} /><meshBasicMaterial color={color} /></mesh></Trail>; })}<mesh scale={0.75 + phase * 0.75}><icosahedronGeometry args={[0.75, 4]} /><meshPhysicalMaterial color="#eee7df" metalness={1} roughness={0.08} clearcoat={1} emissive="#6a0905" emissiveIntensity={0.55 + phase * 0.45} /></mesh><pointLight color="#ffffff" intensity={5 + phase * 15} distance={10} /></group>;
}

function FinalScene({ phase }: { phase: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => { if (ref.current) { ref.current.rotation.y += delta * 0.035; ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.04; } });
  const colors = ["#ffffff", "#d7a84d", "#36d6a0", "#ff6a24", "#ff4038"];
  return <group ref={ref}>{colors.map((color, i) => <Trail key={color} width={0.08} length={5} color={color}><mesh position={[(i - 2) * 1.1, Math.sin(i * 2) * 0.9, Math.cos(i * 1.3) * 1.6]}><sphereGeometry args={[0.08 + phase * 0.03, 16, 16]} /><meshBasicMaterial color={color} /></mesh></Trail>)}<ParticleLogo phase={phase} color="#fff8f0" scale={2.1} /><pointLight color="#ff4038" intensity={5 + phase * 15} distance={10} /></group>;
}

function CameraDirector({ progress }: { progress: number }) {
  const { camera } = useThree();
  const current = useRef(new THREE.Vector3(0, 0, 8));
  useFrame((state, delta) => {
    const { index, local } = chapterAt(progress);
    const shots: [number, number, number][] = [[0, 0, 8.8], [1.8, 0.35, 6.2], [-2.2, 0.25, 6], [2.1, -0.15, 6.1], [-1.8, 0.2, 5.8], [0, 0.35, 6], [0, 0.1, 7], [0, 0, 8.5]];
    const a = shots[index]; const b = shots[Math.min(7, index + 1)]; const blend = local * local * (3 - 2 * local);
    const target = new THREE.Vector3(THREE.MathUtils.lerp(a[0], b[0], blend) + state.pointer.x * 0.25, THREE.MathUtils.lerp(a[1], b[1], blend) - state.pointer.y * 0.18, THREE.MathUtils.lerp(a[2], b[2], blend));
    current.current.lerp(target, 1 - Math.exp(-3.2 * delta));
    camera.position.copy(current.current); camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene({ progress }: { progress: number }) {
  const { index, local } = chapterAt(progress);
  const chapter = chapters[index];
  return <>
    <color attach="background" args={["#020202"]} />
    <fog attach="fog" args={["#020202", 5, 20]} />
    <ambientLight intensity={0.16} />
    <hemisphereLight intensity={0.16} groundColor="#010101" color="#fff5ed" />
    <directionalLight position={[4, 6, 5]} intensity={1.1} />
    <Environment preset="night" environmentIntensity={0.14} />
    <Sparkles count={1100} scale={[15, 10, 15]} size={1.3} speed={0.12 + local * 0.2} color="#fff4eb" />
    {chapter.kind === "bang" && <><BigBang phase={local} /><Singularity phase={local} /></>}
    {chapter.kind === "object" && <AOObject phase={local} />}
    {chapter.kind === "inverfact" && <><Finance phase={local} /><ParticleLogo phase={local} color="#f3d27e" scale={1.85} /></>}
    {chapter.kind === "nomadhive" && <><Hive phase={local} /><ParticleLogo phase={local} color="#a6ffe3" scale={1.75} /></>}
    {chapter.kind === "anma" && <><Commerce phase={local} /><ParticleLogo phase={local} color="#ffad7d" scale={1.85} /></>}
    {chapter.kind === "master" && <><Library phase={local} /><ParticleLogo phase={local} color="#f6e4b2" scale={1.8} /></>}
    {chapter.kind === "convergence" && <Convergence phase={local} />}
    {chapter.kind === "final" && <FinalScene phase={local} />}
    <CameraDirector progress={progress} />
  </>;
}

export default function HistoryImmersiveV3() {
  const progress = useProgress();
  const { index, local } = chapterAt(progress);
  const chapter = chapters[index];
  const next = chapters[Math.min(7, index + 1)];

  return <main className="ao-history-v3">
    <div className="stage"><Canvas dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }} camera={{ position: [0, 0, 8], fov: 42 }}><Scene progress={progress} /></Canvas></div>
    <div className="vignette" />
    <header><Link to="/" className="brand">A<span>&amp;</span>O</Link><div className="count">THE ECOSYSTEM <b>/ 08 CHAPTERS</b></div><Link to="/" className="exit">EXIT EXPERIENCE</Link></header>
    <aside className="index"><span>CHAPTER</span><strong>{chapter.id}</strong><i /><span>08</span></aside>
    <section className="copy">
      <div className="kicker"><span>{chapter.label}</span><em>{chapter.kind.toUpperCase()}</em></div>
      <div className="material">{chapter.material}</div>
      <h1>{chapter.title}</h1><p>{chapter.copy}</p>
      {chapter.route ? <div className="gate" style={{ "--accent": chapter.color } as React.CSSProperties}><span className="gate-line" /><Link to={chapter.route}>{chapter.cta} <b>↗</b></Link></div> : <div className="cue"><span />{chapter.cta === "PRÓXIMAMENTE" ? <small>CLUB MASTER MONEY · PRÓXIMAMENTE</small> : <small>SCROLL TO CONTINUE</small>}</div>}
    </section>
    <div className="next" style={{ opacity: Math.max(0, (local - 0.72) / 0.28) }}><span>NEXT</span><b>{next.id}</b><em>{next.label}</em></div>
    <footer><span>EX STRUCTURA, PROSPERITAS</span><span>{String(Math.round(progress * 100)).padStart(2, "0")} / 100</span></footer>
    <div className="rail"><div style={{ transform: `scaleY(${progress})` }} /></div>
    <div className="length" aria-hidden="true">{chapters.map((item) => <section key={item.id} />)}</div>
    <style>{`*{box-sizing:border-box}.ao-history-v3{min-height:800vh;background:#020202;color:#f5ece3;overflow-x:hidden;font-family:Inter,ui-sans-serif,system-ui,sans-serif}.stage{position:fixed;inset:0;z-index:0}.stage canvas{position:absolute!important;inset:0}.vignette{position:fixed;inset:0;z-index:2;pointer-events:none;background:radial-gradient(circle at 50% 48%,transparent 15%,rgba(0,0,0,.1) 52%,rgba(0,0,0,.88) 100%)}header{position:fixed;z-index:8;top:0;left:0;right:0;height:92px;padding:0 4vw;display:flex;align-items:center;justify-content:space-between;text-transform:uppercase;letter-spacing:.18em;font-size:9px}.brand{color:#f5ece3;text-decoration:none;font-size:17px;font-weight:800;letter-spacing:.04em}.brand span{color:#ff3b30}.count{position:absolute;left:50%;transform:translateX(-50%);color:rgba(245,236,227,.4)}.count b{color:rgba(245,236,227,.85);font-weight:500}.exit{color:rgba(245,236,227,.6);text-decoration:none;border-bottom:1px solid rgba(245,236,227,.2);padding-bottom:5px}.index{position:fixed;z-index:8;right:4vw;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:8px;font-size:8px;letter-spacing:.18em;color:rgba(245,236,227,.35);writing-mode:vertical-rl}.index strong{font-size:24px;color:#f5ece3;font-weight:400}.index i{width:1px;height:55px;background:rgba(245,236,227,.2)}.copy{position:fixed;z-index:7;left:8vw;top:50%;width:min(650px,52vw);transform:translateY(-44%)}.kicker{display:flex;gap:16px;align-items:center;font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:rgba(245,236,227,.5);margin-bottom:16px}.kicker span{color:#ff3b30}.kicker em{font-style:normal;padding-left:16px;border-left:1px solid rgba(245,236,227,.2)}.material{font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:rgba(245,236,227,.36);margin-bottom:18px}.copy h1{font-family:Georgia,'Times New Roman',serif;font-size:clamp(44px,5.7vw,88px);line-height:.92;font-weight:400;letter-spacing:-.045em;margin:0 0 25px}.copy p{font-size:14px;line-height:1.65;color:rgba(245,236,227,.62);max-width:470px;margin:0}.gate{display:flex;gap:14px;align-items:center;margin-top:34px}.gate-line{width:42px;height:1px;background:var(--accent);box-shadow:0 0 12px var(--accent)}.gate a{color:var(--accent);text-decoration:none;font-size:10px;letter-spacing:.16em;font-weight:600}.gate a b{margin-left:8px;font-size:14px}.cue{display:flex;gap:12px;align-items:center;margin-top:38px;color:rgba(245,236,227,.3);font-size:8px;letter-spacing:.18em}.cue span{width:42px;height:1px;background:#ff3b30}.next{position:fixed;z-index:7;right:8vw;bottom:15vh;text-align:right;display:flex;flex-direction:column;gap:5px;text-transform:uppercase}.next span{font-size:8px;color:#ff3b30;letter-spacing:.18em}.next b{font-size:30px;font-weight:300}.next em{font-size:9px;letter-spacing:.18em;color:rgba(245,236,227,.5);font-style:normal}footer{position:fixed;z-index:8;bottom:27px;left:4vw;right:4vw;display:flex;justify-content:space-between;color:rgba(245,236,227,.28);font-size:8px;letter-spacing:.2em;text-transform:uppercase}.rail{position:fixed;z-index:8;left:4vw;top:50%;height:160px;width:1px;background:rgba(245,236,227,.12);transform:translateY(-50%)}.rail div{height:100%;width:1px;background:#ff3b30;transform-origin:top}.length{height:800vh;position:relative;z-index:1}.length section{height:100vh}@media(max-width:900px){.count{display:none}.copy{left:7vw;right:13vw;width:auto;top:57%}.copy h1{font-size:clamp(40px,11vw,70px)}.copy p{font-size:13px;max-width:390px}.index{right:4vw}.next{right:9vw;bottom:12vh}header{height:72px}.rail{left:4vw;height:120px}}`}</style>
  </main>;
}
