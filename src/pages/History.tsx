import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Text, Trail } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";

const chapters = [
  { n: "01", eyebrow: "EL ORIGEN", title: "Todo empezó con una pregunta.", text: "¿Cómo convertir esfuerzo en estructura, y estructura en crecimiento? A&O nació de esa búsqueda: construir algo que pudiera evolucionar sin perder el propósito humano que lo puso en marcha.", tag: "ORIGIN", theme: "origin" },
  { n: "02", eyebrow: "ACTIVAR", title: "Primero, aprender a decidir.", text: "Entendimos que crecer no comienza con una empresa. Comienza cuando una persona aprende a tomar mejores decisiones sobre su tiempo, su conocimiento y sus recursos.", tag: "INVERFACT", theme: "inverfact" },
  { n: "03", eyebrow: "OPORTUNIDADES", title: "El conocimiento necesitaba una vía de acción.", text: "Creamos espacios para conectar personas, talento y oportunidades. NomadHive representa esa convicción: el talento no tiene que esperar una oportunidad; puede prepararse para crearla.", tag: "NOMADHIVE", theme: "nomadhive" },
  { n: "04", eyebrow: "GENERAR", title: "Aprendimos a convertir atención en movimiento.", text: "Con ANMA llevamos estrategia, contenido, comunidad y comercio a un mismo sistema: crear demanda, generar conversaciones y convertirlas en resultados medibles.", tag: "ANMA", theme: "anma" },
  { n: "05", eyebrow: "INTEGRAR", title: "Las piezas empezaron a encontrarse.", text: "Una unidad podía educar. Otra desarrollar talento. Otra activar el mercado. Pero el verdadero valor apareció cuando las piezas comenzaron a trabajar juntas.", tag: "CONNECT", theme: "connect" },
  { n: "06", eyebrow: "ESCALAR", title: "A&O dejó de ser una idea y se convirtió en infraestructura.", text: "Estrategia, marketing, automatización, ventas y tecnología comenzaron a formar una arquitectura capaz de acompañar el crecimiento de personas, marcas y negocios.", tag: "SCALE", theme: "scale" },
  { n: "07", eyebrow: "ECOSISTEMA", title: "Hoy construimos sistemas que se conectan.", text: "A&O Ecosystem reúne unidades con propósitos distintos bajo una misma visión: crear estructuras que generen oportunidades, movimiento y crecimiento sostenible.", tag: "ECOSYSTEM", theme: "ecosystem" },
  { n: "08", eyebrow: "LO QUE SIGUE", title: "El futuro todavía no tiene forma.", text: "Y precisamente por eso construimos un ecosistema capaz de adaptarse. No queremos adivinar el futuro. Queremos estar preparados para construirlo.", tag: "FUTURE", theme: "future" },
];

const nodeData = [
  { id: "INVERFACT", position: [-3.15, 1.25, 0.25] as [number, number, number], color: "#ff3b30" },
  { id: "NOMADHIVE", position: [3.05, 1.15, -0.35] as [number, number, number], color: "#ff6a4a" },
  { id: "ANMA", position: [-2.55, -1.75, 0.1] as [number, number, number], color: "#ff3b30" },
  { id: "A&O", position: [2.65, -1.7, 0.2] as [number, number, number], color: "#f3e8da" },
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
    const count = 1800;
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 9;
      const angle = Math.random() * Math.PI * 2;
      data[i * 3] = Math.cos(angle) * radius;
      data[i * 3 + 1] = (Math.random() - 0.5) * 11;
      data[i * 3 + 2] = Math.sin(angle) * radius - 2;
    }
    return data;
  }, []);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.007;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.035;
  });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} /></bufferGeometry>
      <pointsMaterial size={0.018} color="#fff5e8" transparent opacity={0.62} sizeAttenuation />
    </points>
  );
}

function Core({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!group.current || !shell.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.2 + progress * Math.PI * 1.5;
    group.current.rotation.x = Math.sin(t * 0.3) * 0.13 + progress * 0.38;
    group.current.position.y = Math.sin(t * 0.7) * 0.07;
    shell.current.rotation.z = -t * 0.18;
    shell.current.scale.setScalar(1.1 + Math.sin(t * 1.1) * 0.06 + progress * 0.16);
  });
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.12, 4]} />
        <meshPhysicalMaterial color="#eee8df" metalness={1} roughness={0.12} clearcoat={1} clearcoatRoughness={0.06} emissive="#5a0703" emissiveIntensity={0.35 + progress * 0.3} />
      </mesh>
      <mesh ref={shell} scale={1.34}>
        <icosahedronGeometry args={[1.12, 2]} />
        <meshBasicMaterial color="#ff3b30" wireframe transparent opacity={0.24} />
      </mesh>
      <mesh scale={1.62} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.12, 0.012, 12, 160]} />
        <meshBasicMaterial color="#ff3b30" transparent opacity={0.78} />
      </mesh>
      <mesh scale={1.9} rotation={[0, Math.PI / 3, Math.PI / 5]}>
        <torusGeometry args={[1.12, 0.008, 10, 160]} />
        <meshBasicMaterial color="#fff1e5" transparent opacity={0.3} />
      </mesh>
      <Text position={[0, 0, 1.18]} fontSize={0.3} color="#fff7ee" anchorX="center" anchorY="middle" outlineWidth={0.012} outlineColor="#050505">A&O</Text>
    </group>
  );
}

function EnergyNode({ label, position, color, index, progress }: { label: string; position: [number, number, number]; color: string; index: number; progress: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    const target = new THREE.Vector3(...position).multiplyScalar(1 + Math.sin(progress * Math.PI) * 0.18);
    ref.current.position.lerp(target, Math.min(1, delta * 2.8));
    ref.current.rotation.y = state.clock.elapsedTime * (0.16 + index * 0.04);
  });
  return (
    <group ref={ref} position={position}>
      <Trail width={1.15} length={5} color={color} attenuation={(v) => v * v}>
        <Float speed={1 + index * 0.15} rotationIntensity={0.55} floatIntensity={0.45}>
          <mesh>
            <sphereGeometry args={[0.18 + index * 0.018, 32, 32]} />
            <meshPhysicalMaterial color={color} emissive={color} emissiveIntensity={0.72} metalness={0.86} roughness={0.12} />
          </mesh>
        </Float>
      </Trail>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.34, 0.008, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.42} />
      </mesh>
      <Text position={[0, -0.52, 0]} fontSize={0.145} color="#d8cfc6" anchorX="center" outlineWidth={0.005} outlineColor="#050505">{label}</Text>
    </group>
  );
}

function Network({ progress }: { progress: number }) {
  const geometry = useMemo(() => {
    const center = new THREE.Vector3(0, 0, 0);
    const curves = nodeData.map((node) => new THREE.CatmullRomCurve3([
      new THREE.Vector3(...node.position),
      new THREE.Vector3(node.position[0] * 0.3, node.position[1] * 0.3, 0.28),
      center,
    ]));
    return new THREE.BufferGeometry().setFromPoints(curves.flatMap((curve) => curve.getPoints(34)));
  }, []);
  const ref = useRef<THREE.Line>(null);
  useFrame((state) => {
    if (!ref.current) return;
    (ref.current.material as THREE.LineBasicMaterial).opacity = 0.1 + progress * 0.2 + Math.sin(state.clock.elapsedTime * 1.2) * 0.035;
  });
  return <line ref={ref} geometry={geometry}><lineBasicMaterial color="#ff3b30" transparent opacity={0.18} /></line>;
}

function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();
  useFrame(() => {
    const phase = progress * (chapters.length + 1);
    const target = new THREE.Vector3(Math.sin(phase * 0.7) * 0.75, Math.cos(phase * 0.46) * 0.48, 7.15 - Math.sin(phase * 0.34) * 0.62);
    camera.position.lerp(target, 0.035);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene({ progress }: { progress: number }) {
  return (
    <>
      <color attach="background" args={["#020204"]} />
      <fog attach="fog" args={["#020204", 7, 22]} />
      <ambientLight intensity={0.22} />
      <hemisphereLight intensity={0.28} groundColor="#020204" color="#fff7ed" />
      <pointLight position={[4, 3, 4]} intensity={36} distance={14} color="#ff3b30" />
      <pointLight position={[-4, -2, 3]} intensity={20} distance={12} color="#fff2e4" />
      <pointLight position={[0, 0, 6]} intensity={12} distance={10} color="#ff6a4a" />
      <StarField />
      <Sparkles count={850} scale={[13, 9, 10]} size={1.25} speed={0.2} color="#fff5ea" />
      <Network progress={progress} />
      <Core progress={progress} />
      {nodeData.map((node, index) => <EnergyNode key={node.id} {...node} index={index} progress={progress} />)}
      <CameraRig progress={progress} />
      <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.05} maxPolarAngle={Math.PI * 0.64} minPolarAngle={Math.PI * 0.36} />
    </>
  );
}

export default function History() {
  const progress = useScrollProgress();
  const activeChapter = Math.min(chapters.length - 1, Math.max(0, Math.floor(progress * chapters.length)));
  return (
    <main className="ao-immersive-history">
      <style>{`
        :root{--void:#020204;--cream:#ffeddc;--muted:#968b81;--border:rgba(255,237,220,.17);--red:#dc3b30}
        *{box-sizing:border-box}.ao-immersive-history{min-height:100vh;background:var(--void);color:var(--cream);overflow-x:hidden;font-family:Inter,ui-sans-serif,system-ui,sans-serif}.ao-immersive-history canvas{position:fixed!important;inset:0;z-index:0}.ao-immersive-history:after{content:"";position:fixed;inset:0;z-index:1;pointer-events:none;background:radial-gradient(circle at 50% 48%,transparent 0,rgba(2,2,4,.04) 42%,rgba(0,0,0,.72) 100%)}
        .ao-ui{position:fixed;inset:0;z-index:8;pointer-events:none}.ao-ui>*{pointer-events:auto}.ao-nav{position:absolute;top:0;left:0;right:0;height:88px;display:flex;align-items:center;justify-content:space-between;padding:0 4.5vw;font-size:10px;letter-spacing:.2em;text-transform:uppercase;mix-blend-mode:difference}.ao-brand{font-weight:800;font-size:15px;letter-spacing:.08em}.ao-brand b{color:var(--red)}.ao-nav-right{display:flex;gap:8px}.ao-ghost{border:1px solid rgba(255,237,220,.25);background:rgba(2,2,4,.18);backdrop-filter:blur(8px);color:var(--cream);padding:7px 11px;border-radius:999px;text-decoration:none;font-size:9px;letter-spacing:.16em}.ao-ghost:hover{border-color:rgba(255,237,220,.62)}
        .ao-progress{position:absolute;right:4.5vw;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:10px}.ao-progress-line{width:1px;height:180px;background:rgba(255,237,220,.14);position:relative}.ao-progress-fill{position:absolute;left:0;top:0;width:1px;background:var(--red);transition:height .15s ease}.ao-progress-count{font-size:9px;color:#746b63;letter-spacing:.1em}.ao-progress-count b{color:var(--cream)}.ao-scrollhint{position:absolute;left:4.5vw;bottom:30px;font-size:9px;color:#716961;letter-spacing:.18em;text-transform:uppercase}.ao-xr{position:absolute;right:4.5vw;bottom:25px;border:1px solid rgba(255,237,220,.25);background:rgba(2,2,4,.38);backdrop-filter:blur(9px);color:var(--cream);padding:9px 13px;border-radius:999px;font-size:9px;letter-spacing:.14em;cursor:pointer;text-transform:uppercase}
        .ao-story{position:relative;z-index:3}.ao-hero,.ao-chapter,.ao-epilogue{height:100vh;min-height:680px;position:relative;display:flex;align-items:center;padding:0 10vw}.ao-hero-content{max-width:700px;margin-top:10vh}.ao-kicker{font-size:9px;letter-spacing:.3em;color:#ff7669;text-transform:uppercase;margin-bottom:22px}.ao-hero-title{font-size:clamp(60px,9.3vw,150px);font-weight:500;line-height:.84;letter-spacing:-.065em;margin:0;color:var(--cream)}.ao-hero-title span{color:var(--red)}.ao-hero-copy{font-family:Georgia,serif;font-size:clamp(17px,1.6vw,23px);line-height:1.68;max-width:560px;color:#b9aea4;margin-top:30px}.ao-meta{display:flex;gap:24px;margin-top:38px;color:#6e665f;font-size:9px;letter-spacing:.15em;text-transform:uppercase}.ao-meta strong{color:#d5cabf;font-weight:500}
        .ao-chapter{justify-content:space-between}.ao-chapter-copy{width:min(52vw,700px)}.ao-index{font-size:10px;letter-spacing:.3em;color:var(--red);margin-bottom:18px}.ao-eyebrow{font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#82786f;margin-bottom:18px}.ao-title{font-size:clamp(43px,5.5vw,88px);font-weight:500;line-height:.91;letter-spacing:-.055em;margin:0;color:var(--cream)}.ao-text{font-family:Georgia,serif;font-size:clamp(17px,1.55vw,23px);line-height:1.68;color:#b9aea4;max-width:600px;margin:30px 0 0}.ao-tag{display:inline-flex;margin-top:30px;border:1px solid rgba(255,237,220,.2);padding:7px 12px;border-radius:999px;color:#bdb2a8;font-size:9px;letter-spacing:.18em;background:rgba(255,237,220,.025);backdrop-filter:blur(5px)}.ao-side{position:absolute;right:10vw;top:50%;transform:translateY(-50%);width:190px;text-align:right;color:#6d655e;font-size:9px;line-height:1.8;letter-spacing:.16em;text-transform:uppercase}.ao-side strong{display:block;color:#d8cec3;font-size:11px;font-weight:500;margin-bottom:6px}.ao-dash{position:absolute;left:10vw;right:10vw;bottom:0;border-top:1px dashed rgba(255,237,220,.13)}
        .ao-epilogue{justify-content:center;text-align:center}.ao-epilogue-inner{max-width:850px}.ao-epilogue-title{font-size:clamp(55px,9vw,138px);line-height:.84;letter-spacing:-.065em;font-weight:500;margin:20px 0}.ao-epilogue-title span{color:var(--red)}.ao-epilogue-copy{font-family:Georgia,serif;color:#b9aea4;font-size:20px;line-height:1.65;max-width:620px;margin:0 auto}.ao-cta{display:inline-flex;margin-top:34px;background:var(--cream);color:#16100c;padding:12px 20px;border-radius:999px;text-decoration:none;font-size:10px;font-weight:700;letter-spacing:.15em;text-transform:uppercase}.ao-footer{height:160px;position:relative;z-index:3;border-top:1px dashed rgba(255,237,220,.12);display:flex;align-items:center;justify-content:center;color:#625b55;font-size:9px;letter-spacing:.22em;text-transform:uppercase}
        @media(max-width:800px){.ao-hero,.ao-chapter,.ao-epilogue{padding:0 7vw;min-height:700px}.ao-hero-title{font-size:clamp(58px,16vw,94px)}.ao-chapter{align-items:flex-end;padding-bottom:15vh}.ao-chapter-copy{width:100%}.ao-title{font-size:clamp(42px,12vw,68px)}.ao-text{font-size:17px;line-height:1.6}.ao-side{display:none}.ao-progress{right:4vw}.ao-progress-line{height:120px}.ao-nav{padding:0 5vw}.ao-nav-right .ao-ghost:first-child{display:none}.ao-scrollhint{left:5vw}.ao-xr{right:5vw}.ao-dash{left:7vw;right:7vw}}
        @media(prefers-reduced-motion:reduce){.ao-immersive-history canvas{opacity:.86}.ao-progress-fill{transition:none}}
      `}</style>
      <div className="ao-ui">
        <nav className="ao-nav"><Link className="ao-ghost" to="/">A<span>&</span>O ECOSYSTEM</Link><div className="ao-nav-right"><span className="ao-ghost">ARCHIVE · 2026</span><Link className="ao-ghost" to="/">EXIT</Link></div></nav>
        <div className="ao-progress"><div className="ao-progress-line"><div className="ao-progress-fill" style={{height:`${progress*100}%`}} /></div><div className="ao-progress-count"><b>{String(activeChapter + 1).padStart(2,"0")}</b> / 08</div></div>
        <div className="ao-scrollhint">SCROLL TO CONTINUE</div>
        <button id="ao-xr" className="ao-xr" type="button" onClick={() => { if (!navigator.xr) return; navigator.xr.requestSession("immersive-vr", { optionalFeatures:["local-floor"] }).then(() => {}).catch(() => {}); }}>WEBXR · ENTRAR EN 3D</button>
      </div>
      <Canvas camera={{position:[0,0,7.2],fov:42}} dpr={[1,1.75]} gl={{antialias:true,alpha:false,powerPreference:"high-performance"}}>
        <Scene progress={progress} />
      </Canvas>
      <div className="ao-story">
        <section className="ao-hero"><div className="ao-hero-content"><div className="ao-kicker">A&O ECOSYSTEM · ARCHIVO VIVO · 2026</div><h1 className="ao-hero-title">La historia<br/>de <span>A&O.</span></h1><p className="ao-hero-copy">No es una línea de tiempo. Es la evolución de una idea que aprendió a convertirse en estructura, y de una estructura que aprendió a convertirse en ecosistema.</p><div className="ao-meta"><span>01 <strong>ORIGEN</strong></span><span>∞ <strong>EVOLUCIÓN</strong></span><span>XR <strong>READY</strong></span></div></div></section>
        {chapters.map((chapter,index) => <section className="ao-chapter" data-chapter={index} key={chapter.n}><div className="ao-chapter-copy" style={{opacity:activeChapter===index?1:.58,transform:`translateY(${activeChapter===index?0:18}px)`,transition:"opacity .7s ease, transform .7s ease"}}><div className="ao-index">{chapter.n} / 08</div><div className="ao-eyebrow">{chapter.eyebrow}</div><h2 className="ao-title">{chapter.title}</h2><p className="ao-text">{chapter.text}</p><span className="ao-tag">{chapter.tag}</span></div><div className="ao-side"><strong>{chapter.tag}</strong>{chapter.theme}<br/>STRUCTURE / MOTION / PEOPLE</div><div className="ao-dash" /></section>)}
        <section className="ao-epilogue"><div className="ao-epilogue-inner"><div className="ao-kicker">EPÍLOGO · EL FUTURO</div><h2 className="ao-epilogue-title">ex Structura,<br/><span>Prosperitas.</span></h2><p className="ao-epilogue-copy">La prosperidad no aparece por accidente. Se construye. Y esta historia apenas está comenzando.</p><Link className="ao-cta" to="/">Entrar al ecosistema</Link></div></section>
        <footer className="ao-footer">A&O Ecosystem · People · Systems · Growth · WebGL / WebXR</footer>
      </div>
    </main>
  );
}
