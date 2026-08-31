import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Text } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";

const chapters = [
  { n: "01", eyebrow: "EL ORIGEN", title: "Todo empezó con una pregunta.", text: "¿Cómo convertir esfuerzo en estructura, y estructura en crecimiento? A&O nació de esa búsqueda: construir algo que pudiera evolucionar sin perder el propósito humano que lo puso en marcha.", accent: "ORIGIN" },
  { n: "02", eyebrow: "ACTIVAR", title: "Primero, aprender a decidir.", text: "Entendimos que crecer no comienza con una empresa. Comienza cuando una persona aprende a tomar mejores decisiones sobre su tiempo, su conocimiento y sus recursos.", accent: "INVERFACT" },
  { n: "03", eyebrow: "OPORTUNIDADES", title: "El conocimiento necesitaba una vía de acción.", text: "Creamos espacios para conectar personas, talento y oportunidades. NomadHive representa esa convicción: el talento no tiene que esperar una oportunidad; puede prepararse para crearla.", accent: "NOMADHIVE" },
  { n: "04", eyebrow: "GENERAR", title: "Aprendimos a convertir atención en movimiento.", text: "Con ANMA llevamos estrategia, contenido, comunidad y comercio a un mismo sistema: crear demanda, generar conversaciones y convertirlas en resultados medibles.", accent: "ANMA" },
  { n: "05", eyebrow: "INTEGRAR", title: "Las piezas empezaron a encontrarse.", text: "Una unidad podía educar. Otra desarrollar talento. Otra activar el mercado. Pero el verdadero valor apareció cuando las piezas comenzaron a trabajar juntas.", accent: "CONNECT" },
  { n: "06", eyebrow: "ESCALAR", title: "A&O dejó de ser una idea y se convirtió en infraestructura.", text: "Estrategia, marketing, automatización, ventas y tecnología comenzaron a formar una arquitectura capaz de acompañar el crecimiento de personas, marcas y negocios.", accent: "SCALE" },
  { n: "07", eyebrow: "ECOSISTEMA", title: "Hoy construimos sistemas que se conectan.", text: "A&O Ecosystem reúne unidades con propósitos distintos bajo una misma visión: crear estructuras que generen oportunidades, movimiento y crecimiento sostenible.", accent: "ECOSYSTEM" },
  { n: "08", eyebrow: "LO QUE SIGUE", title: "El futuro todavía no tiene forma.", text: "Y precisamente por eso construimos un ecosistema capaz de adaptarse. No queremos adivinar el futuro. Queremos estar preparados para construirlo.", accent: "FUTURE" },
];

function Core() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.16;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.9} roughness={0.18} emissive="#8b0000" emissiveIntensity={0.24} />
      </mesh>
      <mesh scale={1.38}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#ff2020" wireframe transparent opacity={0.28} />
      </mesh>
      <Text position={[0, 0, 1.2]} fontSize={0.26} color="#ffffff" anchorX="center" anchorY="middle">A&O</Text>
    </group>
  );
}

function OrbitingNodes() {
  const nodes = useMemo(() => [
    ["INVERFACT", -3.0, 1.15, 0.2],
    ["NOMADHIVE", 2.85, 1.1, -0.3],
    ["ANMA", -2.25, -1.7, 0.1],
    ["A&O", 2.45, -1.65, 0.2],
  ] as const, []);
  return <>
    {nodes.map(([label, x, y, z], i) => (
      <Float key={label} speed={0.8 + i * 0.15} rotationIntensity={0.45} floatIntensity={0.55}>
        <group position={[x, y, z]}>
          <mesh>
            <sphereGeometry args={[0.22 + i * 0.025, 32, 32]} />
            <meshStandardMaterial color={i === 3 ? "#ffffff" : "#d41414"} emissive={i === 3 ? "#ffffff" : "#7a0000"} emissiveIntensity={0.7} metalness={0.65} roughness={0.2} />
          </mesh>
          <Text position={[0, -0.48, 0]} fontSize={0.16} color="#d7d7d7" anchorX="center">{label}</Text>
        </group>
      </Float>
    ))}
  </>;
}

function Scene() {
  const lines = useMemo(() => {
    const points = [
      new THREE.Vector3(-3, 1.15, 0.2),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(2.85, 1.1, -0.3),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-2.25, -1.7, 0.1),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(2.45, -1.65, 0.2),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);
  return <>
    <ambientLight intensity={0.45} />
    <pointLight position={[3, 3, 4]} intensity={25} distance={12} color="#ff3030" />
    <pointLight position={[-4, -2, 2]} intensity={14} distance={10} color="#ffffff" />
    <Sparkles count={650} scale={[12, 8, 8]} size={1.5} speed={0.28} color="#ffffff" />
    <line geometry={lines}>
      <lineBasicMaterial color="#a90d0d" transparent opacity={0.34} />
    </line>
    <Core />
    <OrbitingNodes />
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.18} />
  </>;
}

export default function History() {
  return (
    <main className="ao-history">
      <style>{`
        .ao-history{min-height:100vh;background:#050506;color:#f5f5f5;overflow:hidden;font-family:Inter,ui-sans-serif,system-ui,sans-serif}
        .ao-history canvas{position:fixed!important;inset:0;z-index:0}
        .ao-history:before{content:"";position:fixed;inset:0;z-index:1;pointer-events:none;background:radial-gradient(circle at 50% 42%,rgba(170,0,0,.18),transparent 34%),linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,.72))}
        .ao-top{position:fixed;z-index:5;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:24px 5vw;font-size:12px;letter-spacing:.18em;text-transform:uppercase}
        .ao-brand{font-weight:800;font-size:16px;letter-spacing:.08em}.ao-brand span{color:#ff2525}.ao-back{color:#fff;text-decoration:none;opacity:.75}.ao-back:hover{opacity:1}
        .ao-scroll{position:relative;z-index:3}.ao-chapter{min-height:100vh;display:flex;align-items:center;padding:12vh 9vw;box-sizing:border-box}.ao-copy{max-width:720px}.ao-num{font-size:11px;letter-spacing:.28em;color:#ff3030;font-weight:700}.ao-eyebrow{margin:12px 0 18px;font-size:12px;letter-spacing:.24em;color:#b9b9b9}.ao-title{font-size:clamp(42px,7vw,94px);line-height:.94;letter-spacing:-.055em;margin:0 0 28px;font-weight:750;text-wrap:balance}.ao-text{font-size:clamp(17px,2vw,23px);line-height:1.55;color:#c6c6c8;max-width:650px}.ao-accent{margin-top:30px;display:inline-flex;border:1px solid rgba(255,255,255,.18);padding:9px 13px;border-radius:999px;font-size:10px;letter-spacing:.18em;color:#fff;background:rgba(255,255,255,.035);backdrop-filter:blur(12px)}
        .ao-intro{height:100vh;position:relative;z-index:3;display:flex;align-items:flex-end;padding:0 9vw 12vh;box-sizing:border-box}.ao-intro h1{font-size:clamp(56px,10vw,150px);line-height:.84;letter-spacing:-.07em;margin:0;max-width:900px}.ao-intro p{font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#aaa;margin:24px 0 0}.ao-scrollhint{position:absolute;right:5vw;bottom:34px;font-size:10px;letter-spacing:.2em;color:#999;writing-mode:vertical-rl}.ao-end{min-height:85vh;display:flex;align-items:center;padding:10vh 9vw;position:relative;z-index:3}.ao-end h2{font-size:clamp(48px,8vw,110px);line-height:.9;letter-spacing:-.06em;margin:0 0 25px}.ao-end p{color:#aaa;font-size:18px;max-width:600px;line-height:1.6}.ao-cta{display:inline-block;margin-top:30px;padding:14px 22px;background:#fff;color:#050506;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;border-radius:999px}.ao-footer{padding:30px 9vw 60px;position:relative;z-index:3;color:#777;font-size:11px;letter-spacing:.12em;text-transform:uppercase}
        @media(max-width:700px){.ao-top{padding:18px 5vw}.ao-chapter{padding:15vh 7vw}.ao-intro{padding:0 7vw 14vh}.ao-title{font-size:clamp(40px,12vw,64px)}.ao-text{font-size:17px}.ao-history canvas{opacity:.78}.ao-scrollhint{display:none}}
      `}</style>
      <div className="ao-top"><div className="ao-brand">A<span>&</span>O ECOSYSTEM</div><Link className="ao-back" to="/">Volver al ecosistema</Link></div>
      <Canvas camera={{ position: [0, 0, 7], fov: 48 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#050506"]} />
        <Scene />
      </Canvas>
      <section className="ao-intro"><div><div className="ao-num">ARCHIVO VIVO · 2026</div><h1>La historia de<br/><span style={{color:"#ff3030"}}>A&O.</span></h1><p>No es una línea de tiempo. Es una evolución.</p></div><div className="ao-scrollhint">SCROLL · DESCUBRE</div></section>
      <div className="ao-scroll">
        {chapters.map((c) => <section className="ao-chapter" key={c.n}><div className="ao-copy"><div className="ao-num">{c.n}</div><div className="ao-eyebrow">{c.eyebrow}</div><h2 className="ao-title">{c.title}</h2><p className="ao-text">{c.text}</p><span className="ao-accent">{c.accent}</span></div></section>)}
      </div>
      <section className="ao-end"><div><div className="ao-num">EPÍLOGO</div><h2>ex Structura,<br/><span style={{color:"#ff3030"}}>Prosperitas.</span></h2><p>La prosperidad no aparece por accidente. Se construye. Y esta historia apenas está comenzando.</p><Link className="ao-cta" to="/">Entrar al ecosistema</Link></div></section>
      <footer className="ao-footer">A&O Ecosystem · People · Systems · Growth</footer>
    </main>
  );
}
