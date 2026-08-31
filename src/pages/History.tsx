import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Sparkles, Text, Trail } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";

const chapters = [
  { n: "01", eyebrow: "EL ORIGEN", title: "Todo empezó con una pregunta.", text: "¿Cómo convertir esfuerzo en estructura, y estructura en crecimiento? A&O nació de esa búsqueda.", tag: "ORIGIN", accent: "#ff3b30" },
  { n: "02", eyebrow: "ACTIVAR", title: "Primero, aprender a decidir.", text: "Crecer comienza cuando una persona aprende a tomar mejores decisiones sobre su tiempo, conocimiento y recursos.", tag: "INVERFACT", accent: "#ff6b4f" },
  { n: "03", eyebrow: "OPORTUNIDADES", title: "El conocimiento necesitaba una vía de acción.", text: "El talento no tiene que esperar una oportunidad; puede prepararse para crearla.", tag: "NOMADHIVE", accent: "#f5c8a8" },
  { n: "04", eyebrow: "GENERAR", title: "Aprendimos a convertir atención en movimiento.", text: "Estrategia, contenido, comunidad y comercio comenzaron a trabajar como un mismo sistema.", tag: "ANMA", accent: "#ff3b30" },
  { n: "05", eyebrow: "INTEGRAR", title: "Las piezas empezaron a encontrarse.", text: "El verdadero valor apareció cuando las unidades dejaron de ser piezas aisladas y comenzaron a trabajar juntas.", tag: "CONNECT", accent: "#e8ddd2" },
  { n: "06", eyebrow: "ESCALAR", title: "La idea se convirtió en infraestructura.", text: "Estrategia, marketing, automatización, ventas y tecnología formaron una arquitectura para crecer.", tag: "SCALE", accent: "#ff5144" },
  { n: "07", eyebrow: "ECOSISTEMA", title: "Hoy construimos sistemas que se conectan.", text: "Un ecosistema de unidades distintas bajo una misma visión: crear movimiento y crecimiento sostenible.", tag: "ECOSYSTEM", accent: "#f4e8dc" },
  { n: "08", eyebrow: "LO QUE SIGUE", title: "El futuro todavía no tiene forma.", text: "No queremos adivinar el futuro. Queremos estar preparados para construirlo.", tag: "FUTURE", accent: "#ff3b30" },
];

function useProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? THREE.MathUtils.clamp(window.scrollY / max, 0, 1) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return progress;
}

function smoothStep(x: number) { return x * x * (3 - 2 * x); }
function damp(current: number, target: number, lambda: number, delta: number) { return THREE.MathUtils.damp(current, target, lambda, delta); }

function useShot(progress: number) {
  const scaled = progress * chapters.length;
  const index = Math.min(chapters.length - 1, Math.floor(scaled));
  const local = scaled - Math.floor(scaled);
  const entry = smoothStep(THREE.MathUtils.clamp(local / 0.24, 0, 1));
  const exit = smoothStep(THREE.MathUtils.clamp((1 - local) / 0.24, 0, 1));
  return { index, local, entry, exit, scaled };
}

function Dust({ density = 1400 }: { density?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(density * 3);
    for (let i = 0; i < density; i++) {
      const r = 3 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      a[i * 3] = Math.cos(theta) * r;
      a[i * 3 + 1] = (Math.random() - .5) * 12;
      a[i * 3 + 2] = Math.sin(theta) * r - 3;
    }
    return a;
  }, [density]);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * .008;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * .025) * .015;
  });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} /></bufferGeometry><pointsMaterial color="#fff1e6" size={.018} transparent opacity={.48} sizeAttenuation /></points>;
}

function CinematicCore({ energy, shot }: { energy: number; shot: number }) {
  const group = useRef<THREE.Group>(null);
  const crystal = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!group.current || !crystal.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = damp(group.current.rotation.y, t * (.12 + energy * .12) + shot * .42, 2.2, delta);
    group.current.rotation.x = damp(group.current.rotation.x, Math.sin(t * .22) * .12 + energy * .3, 2.2, delta);
    group.current.position.y = damp(group.current.position.y, Math.sin(t * .55) * .08, 3, delta);
    crystal.current.scale.setScalar(1 + energy * .22 + Math.sin(t * 1.4) * .035);
  });
  return <group ref={group}>
    <mesh ref={crystal}><icosahedronGeometry args={[1.05, 4]} /><meshPhysicalMaterial color="#eee7df" metalness={1} roughness={.09} clearcoat={1} clearcoatRoughness={.04} emissive="#5d0905" emissiveIntensity={.24 + energy * .7} /></mesh>
    <mesh scale={1.22} rotation={[.2, .4, .1]}><icosahedronGeometry args={[1.05, 2]} /><meshBasicMaterial color="#ff3b30" wireframe transparent opacity={.24 + energy * .18} /></mesh>
    <mesh scale={1.42} rotation={[Math.PI / 3, 0, .2]}><torusGeometry args={[1.05, .014, 10, 180]} /><meshBasicMaterial color="#ff3b30" transparent opacity={.82} /></mesh>
    <mesh scale={1.8} rotation={[0, Math.PI / 2.7, Math.PI / 6]}><torusGeometry args={[1.05, .007, 8, 180]} /><meshBasicMaterial color="#fff3e7" transparent opacity={.36} /></mesh>
    <pointLight color="#ff3b30" intensity={energy * 18 + 4} distance={6} />
  </group>;
}

function OrbitArchitecture({ progress, shot }: { progress: number; shot: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = damp(ref.current.rotation.y, t * .035 + progress * 2.6, 1.8, delta);
    ref.current.rotation.x = damp(ref.current.rotation.x, Math.sin(t * .18) * .08 + shot * .045, 1.8, delta);
  });
  return <group ref={ref}>
    {[2.15, 2.75, 3.4, 4.1].map((r, i) => <mesh key={r} rotation={[i * .37, i * .61, i * .2]}><torusGeometry args={[r, i === 2 ? .018 : .008, 8, 220]} /><meshBasicMaterial color={i === 2 ? "#ff3b30" : "#fff0e2"} transparent opacity={i === 2 ? .34 : .13} /></mesh>)}
    <mesh rotation={[Math.PI / 2, 0, 0]}><ringGeometry args={[3.5, 3.52, 160]} /><meshBasicMaterial color="#ff3b30" transparent opacity={.16} side={THREE.DoubleSide} /></mesh>
  </group>;
}

function RibbonField({ intensity, shot }: { intensity: number; shot: number }) {
  const group = useRef<THREE.Group>(null);
  const curves = useMemo(() => Array.from({ length: 5 }, (_, i) => {
    const pts: THREE.Vector3[] = [];
    for (let j = 0; j < 48; j++) {
      const z = -7 + j * .28;
      const x = Math.sin(j * .23 + i * 1.15) * (1.15 + i * .25) + (i - 2) * .6;
      const y = Math.cos(j * .18 + i) * .7 + (i - 2) * .5;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(pts);
  }), []);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * .18) * .035;
    group.current.position.x = Math.sin(state.clock.elapsedTime * .25) * .12;
  });
  return <group ref={group} rotation={[.12, shot * .05, 0]}>
    {curves.map((curve, i) => <mesh key={i} visible={intensity > .05}><tubeGeometry args={[curve, 120, .018 + intensity * .025, 6, false]} /><meshBasicMaterial color={i === 2 ? "#ff3b30" : "#f1dfd0"} transparent opacity={(.08 + intensity * .16) * (i === 2 ? 1.7 : 1)} /></mesh>)}
  </group>;
}

function ParticleRiver({ progress, shot }: { progress: number; shot: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 900;
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const z = -8 + Math.random() * 15;
      const spread = .7 + Math.random() * 2.6;
      const angle = Math.random() * Math.PI * 2;
      a[i * 3] = Math.cos(angle) * spread;
      a[i * 3 + 1] = Math.sin(angle) * spread * .62;
      a[i * 3 + 2] = z;
    }
    return a;
  }, []);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * (.025 + shot * .004);
    ref.current.position.z = Math.sin(progress * Math.PI * 2) * .4;
    ref.current.position.x = damp(ref.current.position.x, Math.sin(progress * Math.PI * 5) * .25, 2, delta);
  });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} /></bufferGeometry><pointsMaterial color="#ff6655" size={.025 + shot * .002} transparent opacity={.3 + shot * .025} sizeAttenuation /></points>;
}

function Monument({ progress, shot }: { progress: number; shot: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y = damp(group.current.rotation.y, -progress * Math.PI * 1.3, 1.2, delta);
    group.current.position.y = damp(group.current.position.y, Math.sin(state.clock.elapsedTime * .25) * .06, 2, delta);
  });
  return <group ref={group} scale={1 + shot * .02}>
    <mesh position={[-2.6, -1.2, -1.5]} rotation={[0, .3, -.12]}><boxGeometry args={[.055, 3.2, .055]} /><meshBasicMaterial color="#fff0e2" transparent opacity={.26} /></mesh>
    <mesh position={[2.6, -1.2, -1.5]} rotation={[0, -.3, .12]}><boxGeometry args={[.055, 3.2, .055]} /><meshBasicMaterial color="#fff0e2" transparent opacity={.26} /></mesh>
    <mesh position={[0, .4, -1.2]}><boxGeometry args={[5.3, .035, .035]} /><meshBasicMaterial color="#ff3b30" transparent opacity={.6} /></mesh>
    <mesh position={[0, -1.65, -1.2]}><boxGeometry args={[5.3, .02, 2.2]} /><meshBasicMaterial color="#130605" transparent opacity={.5} /></mesh>
  </group>;
}

function NetworkConstellation({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(() => [
    [-2.9, 1.25, -1], [2.9, 1.1, -.7], [-2.4, -1.35, -.4], [2.4, -1.45, -.2], [0, .1, .2], [0, -2.1, -1]
  ] as [number, number, number][], []);
  const lineGeometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (const p of nodes) pts.push(new THREE.Vector3(...p), new THREE.Vector3(0, .1, .2));
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [nodes]);
  useFrame((state, delta) => { if (group.current) group.current.rotation.y = damp(group.current.rotation.y, progress * Math.PI * .8, 1.5, delta); });
  return <group ref={group}>
    <lineSegments geometry={lineGeometry}><lineBasicMaterial color="#ff3b30" transparent opacity={.12 + progress * .18} /></lineSegments>
    {nodes.map((p, i) => <group key={i} position={p}><Trail width={.8} length={4} color={i === 4 ? "#fff0e2" : "#ff3b30"}><mesh><sphereGeometry args={[i === 4 ? .12 : .075, 16, 16]} /><meshBasicMaterial color={i === 4 ? "#fff0e2" : "#ff3b30"} /></mesh></Trail></group>)}
  </group>;
}

function CameraDirector({ progress }: { progress: number }) {
  const { camera } = useThree();
  const current = useRef(new THREE.Vector3(0, 0, 7.8));
  const target = useRef(new THREE.Vector3());
  useFrame((state, delta) => {
    const s = progress * (chapters.length - .18);
    const shot = Math.min(chapters.length - 1, Math.floor(s));
    const local = s - Math.floor(s);
    const cinematic = smoothStep(THREE.MathUtils.clamp(local, 0, 1));
    const shots = [
      [0, .05, 8.6, 0, 0, 0], [2.2, .7, 6.2, .2, .15, -.1], [-2.1, -.35, 5.8, -.15, -.08, .12], [1.8, 1.1, 6.7, .12, -.12, -.2], [-1.9, -.9, 5.5, -.1, .12, .15], [0, .3, 4.8, .0, .0, 0], [2.8, -.1, 7.2, .18, -.1, -.12], [0, .0, 10.5, 0, 0, 0]
    ];
    const a = shots[shot];
    const b = shots[Math.min(shots.length - 1, shot + 1)];
    const mix = cinematic * .62;
    const x = THREE.MathUtils.lerp(a[0], b[0], mix);
    const y = THREE.MathUtils.lerp(a[1], b[1], mix);
    const z = THREE.MathUtils.lerp(a[2], b[2], mix);
    const mouseX = state.pointer.x * .45;
    const mouseY = state.pointer.y * .25;
    target.current.set(x + mouseX, y - mouseY, z);
    current.current.lerp(target.current, 1 - Math.exp(-3.4 * delta));
    camera.position.copy(current.current);
    const look = new THREE.Vector3(
      THREE.MathUtils.lerp(a[3], b[3], mix),
      THREE.MathUtils.lerp(a[4], b[4], mix),
      THREE.MathUtils.lerp(a[5], b[5], mix)
    );
    camera.lookAt(look.x, look.y, look.z);
    camera.rotation.z = THREE.MathUtils.damp(camera.rotation.z, Math.sin(progress * Math.PI * 6) * .012, 2.4, delta);
  });
  return null;
}

function Scene({ progress }: { progress: number }) {
  const { index, local } = useShot(progress);
  const energy = Math.max(.15, Math.sin(local * Math.PI));
  return <>
    <color attach="background" args={["#010102"]} />
    <fog attach="fog" args={["#010102", 4, 24]} />
    <ambientLight intensity={.12} />
    <hemisphereLight intensity={.2} groundColor="#010102" color="#fff5ed" />
    <spotLight position={[4, 7, 6]} angle={.32} penumbra={1} intensity={32} color="#fff1e3" />
    <pointLight position={[-4, 2, 4]} intensity={18 + energy * 18} distance={12} color="#ff3b30" />
    <pointLight position={[3, -4, 1]} intensity={10} distance={9} color="#ff6b4f" />
    <Environment preset="night" environmentIntensity={.18} />
    <Dust density={index > 5 ? 2200 : 1500} />
    <Sparkles count={650 + index * 70} scale={[15, 11, 15]} size={1.4} speed={.12 + energy * .2} color="#fff1e6" />
    <ParticleRiver progress={progress} shot={index} />
    <OrbitArchitecture progress={progress} shot={index} />
    <RibbonField intensity={energy} shot={index} />
    <Monument progress={progress} shot={index} />
    <NetworkConstellation progress={progress} />
    <CinematicCore energy={energy} shot={index} />
    <CameraDirector progress={progress} />
  </>;
}

export default function History() {
  const progress = useProgress();
  const { index, local } = useShot(progress);
  const chapter = chapters[index];
  const next = chapters[Math.min(chapters.length - 1, index + 1)];
  const copyOpacity = Math.min(1, Math.max(.15, 1 - Math.abs(local - .42) * 1.75));
  return <main className="ao-cinematic-history">
    <div className="ao-stage"><Canvas dpr={[1, 1.65]} gl={{ antialias: true, powerPreference: "high-performance" }} camera={{ position: [0, 0, 8], fov: 42 }}><Scene progress={progress} /></Canvas></div>
    <div className="ao-vignette" />
    <div className="ao-grain" />
    <header className="ao-cine-nav">
      <Link to="/" className="ao-cine-logo">A<span>&</span>O</Link>
      <div className="ao-cine-center">THE ECOSYSTEM / <b>AN IMMERSIVE STORY</b></div>
      <Link to="/" className="ao-cine-exit">EXIT EXPERIENCE</Link>
    </header>
    <div className="ao-shot-index"><span>CHAPTER</span><strong>{chapter.n}</strong><i /> <span>08</span></div>
    <div className="ao-cine-copy" style={{ opacity: copyOpacity }}>
      <div className="ao-copy-kicker"><span>{chapter.eyebrow}</span><em>{chapter.tag}</em></div>
      <h1>{chapter.title}</h1>
      <p>{chapter.text}</p>
      <div className="ao-copy-line"><span /> <small>SCROLL TO CONTINUE</small></div>
    </div>
    <div className="ao-next-shot" style={{ opacity: Math.max(0, (local - .72) / .28) }}>
      <span>NEXT</span><b>{next.n}</b><em>{next.eyebrow}</em>
    </div>
    <div className="ao-bottom-meta"><span>EX STRUCTURA, PROSPERITAS</span><span>{String(Math.round(progress * 100)).padStart(2, "0")} / 100</span></div>
    <div className="ao-scroll-rail" aria-hidden="true"><div style={{ transform: `scaleY(${progress})` }} /></div>
    <div className="ao-story-length" aria-hidden="true">{chapters.map((_, i) => <section key={i} />)}</div>
    <style>{`
      :root{--void:#010102;--ink:#f5ece3;--muted:rgba(245,236,227,.5);--red:#ff3b30}
      *{box-sizing:border-box}.ao-cinematic-history{position:relative;min-height:800vh;background:var(--void);color:var(--ink);overflow-x:hidden;font-family:Inter,ui-sans-serif,system-ui,sans-serif}.ao-stage{position:fixed;inset:0;z-index:0;background:#010102}.ao-stage canvas{position:absolute!important;inset:0}.ao-vignette,.ao-grain{position:fixed;inset:0;pointer-events:none}.ao-vignette{z-index:2;background:radial-gradient(circle at 50% 48%,transparent 20%,rgba(0,0,0,.08) 55%,rgba(0,0,0,.82) 100%)}.ao-grain{z-index:3;opacity:.08;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E");mix-blend-mode:screen}.ao-cine-nav{position:fixed;z-index:8;top:0;left:0;right:0;height:92px;padding:0 4vw;display:flex;align-items:center;justify-content:space-between;text-transform:uppercase;letter-spacing:.18em;font-size:9px}.ao-cine-logo{color:var(--ink);text-decoration:none;font-size:17px;font-weight:800;letter-spacing:.04em}.ao-cine-logo span{color:var(--red)}.ao-cine-center{position:absolute;left:50%;transform:translateX(-50%);color:rgba(245,236,227,.42)}.ao-cine-center b{color:rgba(245,236,227,.82);font-weight:500}.ao-cine-exit{color:rgba(245,236,227,.62);text-decoration:none;border-bottom:1px solid rgba(245,236,227,.2);padding-bottom:5px}.ao-cine-exit:hover{color:#fff}.ao-shot-index{position:fixed;z-index:8;right:4vw;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:8px;font-size:8px;letter-spacing:.18em;color:rgba(245,236,227,.35);writing-mode:vertical-rl}.ao-shot-index strong{font-size:24px;color:var(--ink);font-weight:400;letter-spacing:.02em}.ao-shot-index i{width:1px;height:55px;background:rgba(245,236,227,.2)}.ao-cine-copy{position:fixed;z-index:7;left:8vw;top:50%;width:min(560px,48vw);transform:translateY(-45%);transition:opacity .12s linear;pointer-events:none}.ao-copy-kicker{display:flex;align-items:center;gap:16px;font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:rgba(245,236,227,.5);margin-bottom:20px}.ao-copy-kicker span{color:var(--red)}.ao-copy-kicker em{font-style:normal;padding-left:16px;border-left:1px solid rgba(245,236,227,.2)}.ao-cine-copy h1{font-family:Georgia,'Times New Roman',serif;font-size:clamp(42px,5.6vw,88px);line-height:.92;font-weight:400;letter-spacing:-.045em;margin:0 0 26px;max-width:670px;text-wrap:balance}.ao-cine-copy p{font-size:14px;line-height:1.65;color:rgba(245,236,227,.62);max-width:430px;margin:0}.ao-copy-line{display:flex;align-items:center;gap:12px;margin-top:38px;color:rgba(245,236,227,.32);font-size:8px;letter-spacing:.18em}.ao-copy-line span{display:block;width:42px;height:1px;background:var(--red)}.ao-next-shot{position:fixed;z-index:7;right:8vw;bottom:15vh;display:flex;flex-direction:column;gap:5px;text-align:right;text-transform:uppercase;transition:opacity .2s}.ao-next-shot span{font-size:8px;letter-spacing:.22em;color:var(--red)}.ao-next-shot b{font-size:30px;font-weight:300}.ao-next-shot em{font-size:9px;letter-spacing:.18em;color:rgba(245,236,227,.5);font-style:normal}.ao-bottom-meta{position:fixed;z-index:8;bottom:27px;left:4vw;right:4vw;display:flex;justify-content:space-between;color:rgba(245,236,227,.28);font-size:8px;letter-spacing:.2em;text-transform:uppercase}.ao-scroll-rail{position:fixed;z-index:8;left:4vw;top:50%;height:160px;width:1px;background:rgba(245,236,227,.12);transform:translateY(-50%)}.ao-scroll-rail div{position:absolute;left:0;top:0;width:1px;height:100%;background:var(--red);transform-origin:top}.ao-story-length{position:relative;z-index:1;height:800vh;pointer-events:none}.ao-story-length section{height:100vh}.ao-story-length section:last-child{height:100vh}
      @media(max-width:900px){.ao-cine-center{display:none}.ao-cine-copy{left:7vw;right:12vw;width:auto;top:58%}.ao-cine-copy h1{font-size:clamp(40px,11vw,70px)}.ao-cine-copy p{font-size:13px;max-width:360px}.ao-next-shot{right:9vw;bottom:12vh}.ao-shot-index{right:4vw}.ao-stage canvas{filter:saturate(.92)}.ao-cine-nav{height:72px}.ao-cine-exit{font-size:8px}.ao-scroll-rail{left:4vw;height:120px}}
      @media(prefers-reduced-motion:reduce){.ao-cinematic-history{min-height:100vh}.ao-story-length{display:none}.ao-stage{position:absolute;height:100vh}.ao-cine-copy{transition:none}.ao-grain{display:none}}
    `}</style>
  </main>;
}
