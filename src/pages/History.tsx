import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, OrbitControls, Sparkles, Text, Trail } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";

const chapters = [
  { n: "01", eyebrow: "EL ORIGEN", title: "Todo empezó con una pregunta.", text: "¿Cómo convertir esfuerzo en estructura, y estructura en crecimiento? A&O nació de esa búsqueda: construir algo que pudiera evolucionar sin perder el propósito humano que lo puso en marcha.", accent: "ORIGIN", color: "#ffffff" },
  { n: "02", eyebrow: "ACTIVAR", title: "Primero, aprender a decidir.", text: "Entendimos que crecer no comienza con una empresa. Comienza cuando una persona aprende a tomar mejores decisiones sobre su tiempo, su conocimiento y sus recursos.", accent: "INVERFACT", color: "#ff3030" },
  { n: "03", eyebrow: "OPORTUNIDADES", title: "El conocimiento necesitaba una vía de acción.", text: "Creamos espacios para conectar personas, talento y oportunidades. NomadHive representa esa convicción: el talento no tiene que esperar una oportunidad; puede prepararse para crearla.", accent: "NOMADHIVE", color: "#ff5b35" },
  { n: "04", eyebrow: "GENERAR", title: "Aprendimos a convertir atención en movimiento.", text: "Con ANMA llevamos estrategia, contenido, comunidad y comercio a un mismo sistema: crear demanda, generar conversaciones y convertirlas en resultados medibles.", accent: "ANMA", color: "#ff3030" },
  { n: "05", eyebrow: "INTEGRAR", title: "Las piezas empezaron a encontrarse.", text: "Una unidad podía educar. Otra desarrollar talento. Otra activar el mercado. Pero el verdadero valor apareció cuando las piezas comenzaron a trabajar juntas.", accent: "CONNECT", color: "#ffffff" },
  { n: "06", eyebrow: "ESCALAR", title: "A&O dejó de ser una idea y se convirtió en infraestructura.", text: "Estrategia, marketing, automatización, ventas y tecnología comenzaron a formar una arquitectura capaz de acompañar el crecimiento de personas, marcas y negocios.", accent: "SCALE", color: "#ff3030" },
  { n: "07", eyebrow: "ECOSISTEMA", title: "Hoy construimos sistemas que se conectan.", text: "A&O Ecosystem reúne unidades con propósitos distintos bajo una misma visión: crear estructuras que generen oportunidades, movimiento y crecimiento sostenible.", accent: "ECOSYSTEM", color: "#ffffff" },
  { n: "08", eyebrow: "LO QUE SIGUE", title: "El futuro todavía no tiene forma.", text: "Y precisamente por eso construimos un ecosistema capaz de adaptarse. No queremos adivinar el futuro. Queremos estar preparados para construirlo.", accent: "FUTURE", color: "#ff3030" },
];

const nodeData = [
  { id: "INVERFACT", position: [-3.15, 1.15, 0.25] as [number, number, number], color: "#ff3030" },
  { id: "NOMADHIVE", position: [3.05, 1.15, -0.35] as [number, number, number], color: "#ff653f" },
  { id: "ANMA", position: [-2.55, -1.75, 0.1] as [number, number, number], color: "#ff3030" },
  { id: "A&O", position: [2.65, -1.7, 0.2] as [number, number, number], color: "#ffffff" },
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? THREE.MathUtils.clamp(window.scrollY / max, 0, 1) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return progress;
}

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 1700;
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 8;
      const a = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 10;
      data[i * 3] = Math.cos(a) * r;
      data[i * 3 + 1] = y;
      data[i * 3 + 2] = Math.sin(a) * r - 2;
    }
    return data;
  }, []);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.008;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.035) * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} /></bufferGeometry>
      <pointsMaterial size={0.018} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Core({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!group.current || !shell.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.22 + progress * Math.PI * 1.5;
    group.current.rotation.x = Math.sin(t * 0.31) * 0.14 + progress * 0.45;
    group.current.position.y = Math.sin(t * 0.7) * 0.08;
    shell.current.rotation.z = -t * 0.18;
    shell.current.scale.setScalar(1.1 + Math.sin(t * 1.1) * 0.06 + progress * 0.18);
  });
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.12, 4]} />
        <meshPhysicalMaterial color="#e9e9e9" metalness={1} roughness={0.12} clearcoat={1} clearcoatRoughness={0.08} emissive="#510000" emissiveIntensity={0.3 + progress * 0.35} />
      </mesh>
      <mesh ref={shell} scale={1.34}>
        <icosahedronGeometry args={[1.12, 2]} />
        <meshBasicMaterial color="#ff2020" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh scale={1.62} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.12, 0.012, 12, 160]} />
        <meshBasicMaterial color="#ff3030" transparent opacity={0.75} />
      </mesh>
      <mesh scale={1.88} rotation={[0, Math.PI / 3, Math.PI / 5]}>
        <torusGeometry args={[1.12, 0.008, 10, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.28} />
      </mesh>
      <Text position={[0, 0, 1.18]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle" outlineWidth={0.012} outlineColor="#050506">A&O</Text>
    </group>
  );
}

function EnergyNode({ label, position, color, index, progress }: { label: string; position: [number, number, number]; color: string; index: number; progress: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const p = new THREE.Vector3(...position);
    const spread = 1 + Math.sin(progress * Math.PI) * 0.18;
    ref.current.position.lerp(p.multiplyScalar(spread), 0.045);
    ref.current.rotation.y = t * (0.2 + index * 0.04);
  });
  return (
    <group ref={ref} position={position}>
      <Trail width={1.2} length={5} color={color} attenuation={(v) => v * v}>
        <Float speed={1.2 + index * 0.15} rotationIntensity={0.6} floatIntensity={0.45}>
          <mesh>
            <sphereGeometry args={[0.18 + index * 0.018, 32, 32]} />
            <meshPhysicalMaterial color={color} emissive={color} emissiveIntensity={0.75} metalness={0.85} roughness={0.12} />
          </mesh>
        </Float>
      </Trail>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.34, 0.008, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.45} />
      </mesh>
      <Text position={[0, -0.52, 0]} fontSize={0.145} color="#d9d9d9" anchorX="center" outlineWidth={0.005} outlineColor="#050506">{label}</Text>
    </group>
  );
}

function Network({ progress }: { progress: number }) {
  const geometry = useMemo(() => {
    const center = new THREE.Vector3(0, 0, 0);
    const curves = nodeData.map((n) => new THREE.CatmullRomCurve3([new THREE.Vector3(...n.position), new THREE.Vector3(n.position[0] * 0.28, n.position[1] * 0.28, 0.25), center]));
    const pts = curves.flatMap((curve) => curve.getPoints(32));
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);
  const ref = useRef<THREE.LineSegments>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.material.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 1.2) * 0.05 + progress * 0.12;
  });
  return <lineSegments ref={ref} geometry={geometry}><lineBasicMaterial color="#ff3030" transparent opacity={0.16} /></lineSegments>;
}

function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();
  useFrame(() => {
    const chapter = progress * (chapters.length + 1);
    const x = Math.sin(chapter * 0.72) * 0.9;
    const y = Math.cos(chapter * 0.48) * 0.55;
    const z = 7.2 - Math.sin(chapter * 0.34) * 0.7;
    camera.position.lerp(new THREE.Vector3(x, y, z), 0.035);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function XRButton() {
  const { gl } = useThree();
  const [supported, setSupported] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!navigator.xr) return;
    navigator.xr.isSessionSupported("immersive-vr").then(setSupported).catch(() => setSupported(false));
  }, []);
  useEffect(() => {
    if (!supported) return;
    const button = document.getElementById("ao-xr");
    if (!button) return;
    const enter = async () => {
      try {
        gl.xr.enabled = true;
        const session = await navigator.xr!.requestSession("immersive-vr", { optionalFeatures: ["local-floor"] });
        session.addEventListener("end", () => setActive(false));
        await gl.xr.setSession(session);
        setActive(true);
      } catch { setActive(false); }
    };
    button.addEventListener("click", enter);
    return () => button.removeEventListener("click", enter);
  }, [gl, supported]);
  return null;
}

function Scene({ progress }: { progress: number }) {
  return (
    <>
      <color attach="background" args={["#020204"]} />
      <fog attach="fog" args={["#020204", 7, 22]} />
      <ambientLight intensity={0.24} />
      <hemisphereLight intensity={0.28} groundColor="#020204" color="#ffffff" />
      <pointLight position={[4, 3, 4]} intensity={38} distance={14} color="#ff3030" />
      <pointLight position={[-4, -2, 3]} intensity={20} distance={12} color="#ffffff" />
      <pointLight position={[0, 0, 6]} intensity={12} distance={10} color="#ff5b35" />
      <StarField />
      <Sparkles count={900} scale={[13, 9, 10]} size={1.25} speed={0.22} color="#ffffff" />
      <Network progress={progress} />
      <Core progress={progress} />
      {nodeData.map((node, i) => <EnergyNode key={node.id} {...node} index={i} progress={progress} />)}
      <CameraRig progress={progress} />
      <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.05} maxPolarAngle={Math.PI * 0.64} minPolarAngle={Math.PI * 0.36} />
      <XRButton />
    </>
  );
}

export default function History() {
  const progress = useScrollProgress();
  const activeChapter = Math.min(chapters.length - 1, Math.max(0, Math.floor(progress * chapters.length)));
  return (
    <main className="ao-history">
      <style>{`
        .ao-history{min-height:100vh;background:#020204;color:#f7f7f7;overflow-x:hidden;font-family:Inter,ui-sans-serif,system-ui,sans-serif}
        .ao-history canvas{position:fixed!important;inset:0;z-index:0}
        .ao-history:after{content:"";position:fixed;inset:0;z-index:1;pointer-events:none;background:radial-gradient(circle at 50% 45%,rgba(255,20,20,.11),transparent 30%),radial-gradient(circle at 50% 50%,transparent 35%,rgba(0,0,0,.68) 100%);mix-blend-mode:screen;opacity:.72}
        .ao-top{position:fixed;z-index:8;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:25px 5vw;font-size:10px;letter-spacing:.2em;text-transform:uppercase;mix-blend-mode:difference}
        .ao-brand{font-weight:800;font-size:15px;letter-spacing:.08em}.ao-brand span{color:#ff3030}.ao-back{color:#fff;text-decoration:none;opacity:.72}.ao-back:hover{opacity:1}
        .ao-xr{position:fixed;z-index:8;right:5vw;top:70px;border:1px solid rgba(255,255,255,.2);background:rgba(5,5,7,.45);backdrop-filter:blur(14px);color:#fff;border-radius:999px;padding:10px 14px;font-size:9px;letter-spacing:.16em;text-transform:uppercase;cursor:pointer}
        .ao-progress{position:fixed;z-index:8;left:5vw;top:50%;width:2px;height:110px;background:rgba(255,255,255,.14);transform:translateY(-50%)}.ao-progress span{display:block;width:100%;background:#ff3030;transform-origin:top;transform:scaleY(var(--p));height:100%}
        .ao-scroll{position:relative;z-index:3}.ao-intro{height:100vh;position:relative;display:flex;align-items:flex-end;padding:0 9vw 13vh;box-sizing:border-box}.ao-intro-inner{max-width:980px}.ao-kicker{font-size:10px;letter-spacing:.34em;color:#ff3030;font-weight:700;margin-bottom:18px}.ao-intro h1{font-size:clamp(62px,11vw,168px);line-height:.82;letter-spacing:-.075em;margin:0;font-weight:760}.ao-intro h1 em{font-style:normal;color:#ff3030}.ao-intro p{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#9d9da2;margin:30px 0 0}.ao-scrollhint{position:absolute;right:5vw;bottom:36px;font-size:9px;letter-spacing:.2em;color:#888;writing-mode:vertical-rl}
        .ao-chapter{min-height:105vh;display:flex;align-items:center;padding:12vh 9vw;box-sizing:border-box}.ao-copy{max-width:720px;padding:30px 0}.ao-num{font-size:10px;letter-spacing:.3em;color:#ff3030;font-weight:800}.ao-eyebrow{margin:13px 0 19px;font-size:11px;letter-spacing:.25em;color:#b2b2b7}.ao-title{font-size:clamp(42px,6.5vw,94px);line-height:.93;letter-spacing:-.06em;margin:0 0 27px;font-weight:750;text-wrap:balance}.ao-text{font-size:clamp(17px,1.8vw,22px);line-height:1.55;color:#c3c3c7;max-width:650px}.ao-accent{margin-top:31px;display:inline-flex;border:1px solid rgba(255,255,255,.18);padding:9px 13px;border-radius:999px;font-size:9px;letter-spacing:.2em;color:#fff;background:rgba(255,255,255,.035);backdrop-filter:blur(16px)}
        .ao-end{min-height:95vh;display:flex;align-items:center;padding:10vh 9vw;position:relative;z-index:3}.ao-end h2{font-size:clamp(54px,8.5vw,122px);line-height:.87;letter-spacing:-.07em;margin:0 0 25px}.ao-end h2 span{color:#ff3030}.ao-end p{color:#a7a7ad;font-size:18px;max-width:600px;line-height:1.6}.ao-cta{display:inline-block;margin-top:30px;padding:14px 22px;background:#fff;color:#050506;text-decoration:none;font-size:10px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;border-radius:999px}.ao-footer{padding:30px 9vw 60px;position:relative;z-index:3;color:#666;font-size:9px;letter-spacing:.16em;text-transform:uppercase}
        @media(max-width:700px){.ao-top{padding:18px 5vw}.ao-xr{top:60px;right:5vw}.ao-progress{left:4vw;height:70px}.ao-chapter{padding:15vh 7vw}.ao-intro{padding:0 7vw 15vh}.ao-intro h1{font-size:clamp(54px,14vw,78px)}.ao-title{font-size:clamp(40px,12vw,64px)}.ao-text{font-size:17px}.ao-history canvas{opacity:.86}.ao-scrollhint{display:none}}
        @media(prefers-reduced-motion:reduce){.ao-history canvas{opacity:.6}}
      `}</style>
      <div className="ao-top"><div className="ao-brand">A<span>&</span>O ECOSYSTEM</div><Link className="ao-back" to="/">Volver al ecosistema</Link></div>
      <button id="ao-xr" className="ao-xr" type="button">WEBXR · ENTRAR EN 3D</button>
      <div className="ao-progress" aria-hidden="true" style={{"--p": progress} as React.CSSProperties}><span /></div>
      <Canvas camera={{ position: [0, 0, 7.2], fov: 48 }} dpr={[1, 2]} gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}>
        <Scene progress={progress} />
      </Canvas>
      <div className="ao-scroll">
        <section className="ao-intro"><div className="ao-intro-inner"><div className="ao-kicker">ARCHIVO VIVO · 2026 · WEBGL / WEBXR</div><h1>La historia de<br/><em>A&O.</em></h1><p>No es una línea de tiempo. Es una evolución.</p></div><div className="ao-scrollhint">SCROLL · ENTRA EN LA HISTORIA</div></section>
        {chapters.map((c, i) => <section className="ao-chapter" key={c.n}><div className="ao-copy" style={{opacity: activeChapter === i ? 1 : .62, transform: `translateY(${activeChapter === i ? 0 : 22}px)`, transition: "opacity .7s ease, transform .7s ease"}}><div className="ao-num">{c.n}</div><div className="ao-eyebrow">{c.eyebrow}</div><h2 className="ao-title">{c.title}</h2><p className="ao-text">{c.text}</p><span className="ao-accent">{c.accent}</span></div></section>)}
        <section className="ao-end"><div><div className="ao-num">EPÍLOGO · 08</div><h2>ex Structura,<br/><span>Prosperitas.</span></h2><p>La prosperidad no aparece por accidente. Se construye. Y esta historia apenas está comenzando.</p><Link className="ao-cta" to="/">Entrar al ecosistema</Link></div></section>
        <footer className="ao-footer">A&O Ecosystem · People · Systems · Growth · WebGL / WebXR</footer>
      </div>
    </main>
  );
}
