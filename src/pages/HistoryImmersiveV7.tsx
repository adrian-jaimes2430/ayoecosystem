import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Float, Html } from "@react-three/drei";
import { Link } from "react-router-dom";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Scene = {
  id: string;
  brand: string;
  kicker: string;
  title: string;
  copy: string;
  color: string;
  kind: "origin" | "ao" | "inverfact" | "nomadhive" | "anma" | "aost" | "convergence" | "future";
  meta: string;
  route?: string;
  cta?: string;
};

const scenes: Scene[] = [
  { id:"01", brand:"ORIGEN", kicker:"PRÓLOGO · 01", title:"Antes de existir una empresa, existía una posibilidad.", copy:"Una idea rompe la quietud. La energía aparece, se expande y busca una forma. El viaje comienza antes de que exista un nombre.", kind:"origin", color:"#ff4038", meta:"ENERGÍA · SINGULARIDAD · EXPANSIÓN" },
  { id:"02", brand:"A&O", kicker:"ESTRUCTURA · 02", title:"La posibilidad encontró estructura.", copy:"El caos encontró dirección. A&O nace como arquitectura: visión, talento, tecnología, capital y ejecución empiezan a operar bajo una misma lógica.", kind:"ao", color:"#ff4038", meta:"VISIÓN · ESTRUCTURA · DIRECCIÓN" },
  { id:"03", brand:"INVERFACT", kicker:"ACTIVAR · 03", title:"La decisión se convierte en acción.", copy:"El conocimiento se encuentra con el capital y la comunidad. INVERFACT activa la dimensión financiera del sistema: aprender, analizar, decidir y participar.", kind:"inverfact", color:"#ffb21a", meta:"CAPITAL · EDUCACIÓN · COMUNIDAD", route:"/inverfact", cta:"ENTRAR EN INVERFACT" },
  { id:"04", brand:"NOMADHIVE", kicker:"CONECTAR · 04", title:"El talento se convierte en red.", copy:"Una persona se convierte en nodo. Los nodos forman una Hive. La red abre oportunidades y convierte capacidad individual en movimiento colectivo.", kind:"nomadhive", color:"#28e879", meta:"TALENTO · NODOS · RED · OPORTUNIDAD", route:"/nomadhive", cta:"ENTRAR EN NOMADHIVE" },
  { id:"05", brand:"ANMA SOLUCIONES", kicker:"MOVER · 05", title:"La atención se convierte en movimiento.", copy:"Marketing, contenido, producto, comercio y estrategia operan como un mismo flujo. La atención se transforma en interacción y la interacción en negocio.", kind:"anma", color:"#ff8514", meta:"MARKETING · PRODUCTO · COMERCIO · FLUJO", route:"/anma", cta:"ENTRAR EN ANMA" },
  { id:"06", brand:"A&O SYSTEM TOOLS", kicker:"HABILITAR · 06", title:"La experiencia se convierte en sistema.", copy:"Las herramientas convierten conocimiento, hábitos, datos y decisiones en capacidad operativa. A&O ST será el territorio donde las ideas se vuelven sistemas que ayudan al ecosistema a pensar, trabajar y crecer.", kind:"aost", color:"#b9a7ff", meta:"IA · DATOS · HÁBITOS · SISTEMAS · AUTOMATIZACIÓN" },
  { id:"07", brand:"LA CONVERGENCIA", kicker:"INTEGRACIÓN · 07", title:"Las unidades dejan de verse separadas.", copy:"Capital y educación. Talento y red. Marketing y comercio. Sistemas y conocimiento. Cada unidad aporta una capacidad distinta; juntas forman una arquitectura mayor.", kind:"convergence", color:"#f5efe7", meta:"CAPITAL · TALENTO · COMERCIO · SISTEMAS" },
  { id:"08", brand:"A&O ECOSYSTEM", kicker:"EPÍLOGO · 08", title:"Lo que construimos hoy es el comienzo de lo que sigue.", copy:"Las piezas vuelven al centro. Personas, marcas, tecnología, conocimiento, comercio, inversión y comunidad funcionan como una sola arquitectura viva.", kind:"future", color:"#ffffff", meta:"TALENTO · TECNOLOGÍA · CONOCIMIENTO · COMERCIO · CAPITAL · COMUNIDAD" }
];

const logoSrc: Record<string, string> = {
  INVERFACT: "/brands/inverfact.svg",
  NOMADHIVE: "/brands/nomadhive.svg",
  "ANMA SOLUCIONES": "/brands/anma.svg",
  "A&O SYSTEM TOOLS": "/brands/aost.svg"
};

const clamp = (x:number,a=0,b=1) => Math.max(a,Math.min(b,x));
const smoothstep = (x:number) => { x=clamp(x); return x*x*(3-2*x); };

function useScrollProgress(){
  const [p,setP] = useState(0);
  useEffect(()=>{
    let raf=0;
    const update=()=>{
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(()=>{
        const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
        setP(clamp(window.scrollY/max));
      });
    };
    update();
    window.addEventListener("scroll",update,{passive:true});
    window.addEventListener("resize",update);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("scroll",update);window.removeEventListener("resize",update)};
  },[]);
  return p;
}

function useAudio(){
  const audio=useRef<HTMLAudioElement|null>(null);
  const [on,setOn]=useState(false);
  const [started,setStarted]=useState(false);
  useEffect(()=>{
    const el=new Audio("/audio/track%201%20A%26O%20story%20telling.mp3");
    el.loop=true; el.preload="auto"; el.volume=.42; audio.current=el;
    const start=()=>{
      if(started)return;
      setStarted(true);
      el.play().then(()=>setOn(true)).catch(()=>setOn(false));
    };
    window.addEventListener("scroll",start,{passive:true,once:true});
    window.addEventListener("wheel",start,{passive:true,once:true});
    window.addEventListener("touchstart",start,{passive:true,once:true});
    window.addEventListener("pointerdown",start,{passive:true,once:true});
    return()=>{el.pause();el.src="";window.removeEventListener("scroll",start);window.removeEventListener("wheel",start);window.removeEventListener("touchstart",start);window.removeEventListener("pointerdown",start)};
  },[started]);
  const toggle=()=>{
    const el=audio.current; if(!el)return;
    if(el.paused){el.play().then(()=>{setOn(true);setStarted(true)}).catch(()=>{});}else{el.pause();setOn(false);}
  };
  return {on,toggle};
}

function Starfield({color}:{color:string}){
  return <Sparkles count={260} scale={[18,10,12]} size={1.15} speed={.08} opacity={.35} color={color}/>;
}

function ParticleSphere({color,phase=1}:{color:string;phase?:number}){
  const ref=useRef<THREE.Points>(null);
  const positions=useMemo(()=>{
    const n=3200, a=new Float32Array(n*3);
    for(let i=0;i<n;i++){
      const r=Math.pow(Math.random(),.48)*3.5, t=Math.random()*Math.PI*2, p=Math.acos(2*Math.random()-1);
      a[i*3]=r*Math.sin(p)*Math.cos(t); a[i*3+1]=r*Math.cos(p); a[i*3+2]=r*Math.sin(p)*Math.sin(t);
    }
    return a;
  },[]);
  useFrame((s)=>{ if(!ref.current)return; ref.current.rotation.y=s.clock.elapsedTime*.08; ref.current.rotation.x=Math.sin(s.clock.elapsedTime*.2)*.08; ref.current.scale.setScalar(.2+smoothstep(phase)*1.25); });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]} count={positions.length/3}/></bufferGeometry><pointsMaterial color={color} size={.025} transparent opacity={.7} depthWrite={false} blending={THREE.AdditiveBlending}/></points>;
}

function EnergyCore({color}:{color:string}){
  const ref=useRef<THREE.Mesh>(null);
  useFrame((s)=>{if(ref.current){ref.current.rotation.x=s.clock.elapsedTime*.17;ref.current.rotation.y=s.clock.elapsedTime*.23;}});
  return <group><mesh ref={ref}><icosahedronGeometry args={[1.25,4]}/><meshPhysicalMaterial color="#f8f2ec" metalness={1} roughness={.08} clearcoat={1} emissive={color} emissiveIntensity={1.1}/></mesh><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[2.05,.012,12,180]}/><meshBasicMaterial color={color} transparent opacity={.65}/></mesh><pointLight color={color} intensity={12} distance={12}/></group>;
}

function BrandObject({scene,phase,onEnter,onLeave}:{scene:Scene;phase:number;onEnter:()=>void;onLeave:()=>void}){
  const group=useRef<THREE.Group>(null);
  useFrame((s,d)=>{if(!group.current)return;group.current.rotation.y+=d*.12;group.current.rotation.x=Math.sin(s.clock.elapsedTime*.22)*.045;});
  const color=scene.color;
  const interactive=!!scene.route;
  const eventProps=interactive?{onPointerEnter:onEnter,onPointerLeave:onLeave,onClick:()=>{window.location.href=scene.route!}}:{};
  if(scene.kind==="origin") return <group ref={group}><ParticleSphere color="#fff4eb" phase={phase}/><pointLight color="#ff4038" intensity={5+phase*22} distance={14}/></group>;
  if(scene.kind==="ao") return <group ref={group} {...eventProps}><EnergyCore color="#ff4038"/><Float speed={1.2} rotationIntensity={.15} floatIntensity={.3}><Html center distanceFactor={7} style={{pointerEvents:"none"}}><div style={{fontFamily:"Arial,sans-serif",fontWeight:700,fontSize:"92px",letterSpacing:"-9px",color:"#f8f2ec",textShadow:"0 0 32px rgba(255,64,56,.8)"}}>A<span style={{color:"#ff4038"}}>&amp;</span>O</div></Html></Float></group>;
  if(scene.kind==="inverfact") return <group ref={group} {...eventProps}><mesh><sphereGeometry args={[1.7,48,32]}/><meshPhysicalMaterial color="#8a5a0a" metalness={.85} roughness={.16} clearcoat={1}/></mesh><mesh><sphereGeometry args={[1.73,48,32]}/><meshBasicMaterial color="#ffb21a" wireframe transparent opacity={.5}/></mesh><ParticleSphere color="#ffb21a" phase={phase}/><pointLight color="#ffb21a" intensity={16} distance={14}/></group>;
  if(scene.kind==="nomadhive") return <group ref={group} {...eventProps}>{Array.from({length:24},(_,i)=>{const a=i/24*Math.PI*2,r=1.4+(i%4)*.28;return <mesh key={i} position={[Math.cos(a)*r,Math.sin(a)*r*.62,(i%5-2)*.16]} rotation={[0,0,Math.PI/6]}><cylinderGeometry args={[.23,.23,.12,6]}/><meshPhysicalMaterial color={color} metalness={.75} roughness={.2} emissive={color} emissiveIntensity={.18}/></mesh>})}<ParticleSphere color={color} phase={phase}/><pointLight color={color} intensity={14} distance={14}/></group>;
  if(scene.kind==="anma") return <group ref={group} {...eventProps}>{Array.from({length:30},(_,i)=>{const a=i/30*Math.PI*2,r=1.2+(i%6)*.32;return <mesh key={i} position={[Math.cos(a)*r,Math.sin(i*1.7)*.7,Math.sin(a)*r]} rotation={[i*.15,i*.2,i*.08]}><boxGeometry args={[.2,.2,.2]}/><meshPhysicalMaterial color={color} metalness={.82} roughness={.16} emissive="#7a2600" emissiveIntensity={.3}/></mesh>})}<EnergyCore color={color}/></group>;
  if(scene.kind==="aost") return <group ref={group} {...eventProps}>{Array.from({length:10},(_,i)=>{const a=i/10*Math.PI*2,r=1.8;return <mesh key={i} position={[Math.cos(a)*r,Math.sin(i*1.3)*.7,Math.sin(a)*r]}><octahedronGeometry args={[.27,1]}/><meshPhysicalMaterial color="#f5f1ff" metalness={.92} roughness={.08} emissive="#6549e8" emissiveIntensity={.65}/></mesh>})}<EnergyCore color="#8e7aff"/></group>;
  if(scene.kind==="convergence") return <group ref={group}><ParticleSphere color="#fff" phase={phase}/>{["#ffb21a","#28e879","#ff8514","#b9a7ff"].map((c,i)=>{const a=i/4*Math.PI*2,r=3*(1-smoothstep(phase)*.78);return <mesh key={c} position={[Math.cos(a)*r,Math.sin(i*1.3)*.6,Math.sin(a)*r]}><sphereGeometry args={[.16,18,18]}/><meshBasicMaterial color={c}/></mesh>})}<pointLight color="#fff" intensity={20} distance={16}/></group>;
  return <group ref={group}><EnergyCore color="#ff4038"/><ParticleSphere color="#fff" phase={phase}/></group>;
}

function CinematicCanvas({progress,hover}:{progress:number;hover:boolean}){
  const scaled=progress*(scenes.length-1); const index=Math.min(scenes.length-1,Math.floor(scaled)); const local=scaled-index; const scene=scenes[index];
  return <Canvas dpr={[1,1.7]} camera={{position:[0,0,8],fov:42}} gl={{antialias:true,alpha:false,powerPreference:"high-performance"}} style={{position:"fixed",inset:0,zIndex:0,background:"#020202",transition:"filter .7s ease"}}>
    <color attach="background" args={["#020202"]}/><fog attach="fog" args={["#020202",7,24]}/><ambientLight intensity={.35}/><Starfield color={scene.color}/><CinematicLights color={scene.color}/>
    <group position={[1.5,.1,0]} scale={hover?1.06:1}><BrandObject scene={scene} phase={local} onEnter={()=>{}} onLeave={()=>{}}/></group>
    <CameraMotion progress={progress}/>
  </Canvas>;
}

function CinematicLights({color}:{color:string}){return <><pointLight position={[3,2,4]} color={color} intensity={4} distance={14}/><pointLight position={[-4,-2,2]} color="#ffffff" intensity={1.2} distance={12}/></>}
function CameraMotion({progress}:{progress:number}){const ref=useRef<THREE.Group>(null);useFrame((s)=>{if(ref.current){ref.current.rotation.z=Math.sin(progress*Math.PI*2)*.015;ref.current.position.x=Math.sin(progress*Math.PI*2)*.12;ref.current.position.y=Math.cos(progress*Math.PI*2)*.06;}});return <group ref={ref}/>}

export default function HistoryImmersiveV7(){
  const progress=useScrollProgress();
  const {on,toggle}=useAudio();
  const [hover,setHover]=useState(false);
  const scaled=progress*(scenes.length-1); const index=Math.min(scenes.length-1,Math.floor(scaled)); const scene=scenes[index];
  const local=scaled-index;
  useEffect(()=>{document.body.style.background="#020202";document.body.style.overflowX="hidden";return()=>{document.body.style.background="";document.body.style.overflowX=""}},[]);
  return <main style={{background:"#020202",color:"#f4efe9",minHeight:`${scenes.length*118}vh`,fontFamily:"Inter,Arial,sans-serif"}}>
    <style>{`*{box-sizing:border-box}html{scroll-behavior:auto}body{margin:0;background:#020202}::selection{background:${scene.color};color:#050505}.history-copy{transition:opacity .55s ease,transform .7s cubic-bezier(.2,.75,.2,1),filter .7s ease}.history-link{display:flex;align-items:center;justify-content:space-between;text-decoration:none;color:#f4efe9;border-top:1px solid rgba(255,255,255,.16);border-bottom:1px solid rgba(255,255,255,.12);padding:22px 2px;transition:all .45s ease}.history-link:hover{padding-left:12px;border-color:${scene.color};color:${scene.color}}.history-meta{font-size:10px;letter-spacing:.25em;color:rgba(255,255,255,.42)}@media(max-width:760px){.history-copy{max-width:92vw!important}.history-copy h1{font-size:clamp(42px,12vw,76px)!important}.history-visual{left:8%!important;top:52%!important;transform:scale(.72)!important}.history-top{padding:18px!important}}`}</style>
    <div className="history-top" style={{position:"fixed",top:0,left:0,right:0,zIndex:5,padding:"24px 34px",display:"flex",justifyContent:"space-between",fontSize:10,letterSpacing:".28em",color:"rgba(255,255,255,.48)",pointerEvents:"none"}}><span>A&O ECOSYSTEM</span><span>HISTORY / IMMERSIVE ARCHIVE</span><span>SCROLL TO ENTER</span></div>
    <div style={{position:"fixed",right:28,top:28,zIndex:20}}><button aria-label={on?"Silenciar música":"Activar música"} onClick={toggle} style={{width:44,height:44,borderRadius:999,border:`1px solid ${on?scene.color:"rgba(255,255,255,.25)"}`,background:"rgba(0,0,0,.42)",color:on?scene.color:"#fff",cursor:"pointer",backdropFilter:"blur(12px)"}}>{on?"♫":"◌"}</button></div>
    <div style={{position:"fixed",inset:0,zIndex:1,pointerEvents:"none"}}><CinematicCanvas progress={progress} hover={hover}/></div>
    <section style={{position:"sticky",top:0,height:"100vh",zIndex:3,pointerEvents:"none",display:"flex",alignItems:"center",padding:"8vh 6vw"}}>
      <div className="history-copy" key={scene.id} style={{maxWidth:"58vw",transform:`translateY(${(local<.5?1-local*2:0)*10}px)`,opacity:local>.9?.65:1,filter:hover?"blur(.1px)":"none"}}>
        <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:28}}><span style={{display:"inline-block",width:44,height:1,background:scene.color}}/><span className="history-meta">{scene.kicker}</span></div>
        <div style={{fontSize:12,letterSpacing:".28em",color:scene.color,fontWeight:600,marginBottom:16}}>{scene.brand}</div>
        <h1 style={{fontSize:"clamp(52px,6.6vw,108px)",lineHeight:.92,letterSpacing:"-.055em",fontWeight:400,margin:"0 0 26px",maxWidth:"1000px"}}>{scene.title}</h1>
        <p style={{fontSize:"clamp(16px,1.35vw,21px)",lineHeight:1.65,color:"rgba(244,239,233,.67)",maxWidth:720,margin:0}}>{scene.copy}</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(160px,1fr))",gap:18,maxWidth:720,marginTop:36}}>{scene.meta.split(" · ").map((m,i)=><div key={m} className="history-meta" style={{borderTop:"1px solid rgba(255,255,255,.12)",paddingTop:12}}><span style={{color:scene.color,marginRight:8}}>0{i+1}</span>{m}</div>)}</div>
        {scene.route&&<div style={{pointerEvents:"auto",marginTop:42,maxWidth:720}} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}><Link className="history-link" to={scene.route}><span style={{display:"flex",alignItems:"center",gap:18}}>{logoSrc[scene.brand]?<img src={logoSrc[scene.brand]} alt={scene.brand} style={{width:105,height:32,objectFit:"contain"}}/>:<span style={{fontSize:11,letterSpacing:".2em"}}>{scene.brand}</span>}<span style={{fontSize:11,letterSpacing:".2em"}}>{scene.cta}</span></span><span style={{fontSize:26,color:scene.color}}>↗</span></Link></div>}
      </div>
    </section>
    {scenes.map((s,i)=><div key={s.id} style={{height:"118vh",position:"relative",zIndex:2,pointerEvents:"none"}} aria-hidden="true"/>)}
    <div style={{position:"fixed",left:34,bottom:28,zIndex:10,fontSize:10,letterSpacing:".24em",color:"rgba(255,255,255,.4)"}}>{String(index+1).padStart(2,"0")} / {String(scenes.length).padStart(2,"0")}</div>
  </main>;
}
