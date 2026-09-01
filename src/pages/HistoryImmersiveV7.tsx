import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { Link } from "react-router-dom";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const scenes = [
  { id:"01", brand:"ORIGEN", kicker:"PRÓLOGO · 01", title:"Antes de existir una empresa, existía una posibilidad.", copy:"Una idea rompe la quietud. La energía aparece, se expande y busca una forma. El viaje comienza antes de que exista un nombre.", kind:"origin", color:"#ff4038", meta:"ENERGÍA · SINGULARIDAD · EXPANSIÓN", next:"A&O" },
  { id:"02", brand:"A&O", kicker:"ESTRUCTURA · 02", title:"La posibilidad encontró estructura.", copy:"El caos encontró dirección. A&O nace como arquitectura: visión, talento, tecnología, capital y ejecución empiezan a operar bajo una misma lógica.", kind:"ao", color:"#ff4038", meta:"VISIÓN · ESTRUCTURA · DIRECCIÓN", next:"INVERFACT" },
  { id:"03", brand:"INVERFACT", kicker:"ACTIVAR · 03", title:"La decisión se convierte en acción.", copy:"El conocimiento se encuentra con el capital y la comunidad. INVERFACT activa la dimensión financiera del sistema: aprender, analizar, decidir y participar.", kind:"inverfact", color:"#ffb21a", meta:"CAPITAL · EDUCACIÓN · COMUNIDAD", route:"/inverfact", cta:"ENTRAR EN INVERFACT", next:"NOMADHIVE" },
  { id:"04", brand:"NOMADHIVE", kicker:"CONECTAR · 04", title:"El talento se convierte en red.", copy:"Una persona se convierte en nodo. Los nodos forman una Hive. La red abre oportunidades y convierte capacidad individual en movimiento colectivo.", kind:"nomadhive", color:"#28e879", meta:"TALENTO · NODOS · RED · OPORTUNIDAD", route:"/nomadhive", cta:"ENTRAR EN NOMADHIVE", next:"ANMA" },
  { id:"05", brand:"ANMA SOLUCIONES", kicker:"MOVER · 05", title:"La atención se convierte en movimiento.", copy:"Marketing, contenido, producto, comercio y estrategia operan como un mismo flujo. La atención se transforma en interacción y la interacción en negocio.", kind:"anma", color:"#ff8514", meta:"MARKETING · PRODUCTO · COMERCIO · FLUJO", route:"/anma", cta:"ENTRAR EN ANMA", next:"A&O SYSTEM TOOLS" },
  { id:"06", brand:"A&O SYSTEM TOOLS", kicker:"HABILITAR · 06", title:"La experiencia se convierte en sistema.", copy:"Las herramientas convierten conocimiento, hábitos, datos y decisiones en capacidad operativa. A&O ST será el territorio donde las ideas se vuelven sistemas que ayudan al ecosistema a pensar, trabajar y crecer.", kind:"aost", color:"#b9a7ff", meta:"IA · DATOS · HÁBITOS · SISTEMAS · AUTOMATIZACIÓN", next:"CONVERGENCIA" },
  { id:"07", brand:"LA CONVERGENCIA", kicker:"INTEGRACIÓN · 07", title:"Las unidades dejan de verse separadas.", copy:"Capital y educación. Talento y red. Marketing y comercio. Sistemas y conocimiento. Cada unidad aporta una capacidad distinta; juntas forman una arquitectura mayor.", kind:"convergence", color:"#f5efe7", meta:"CAPITAL · TALENTO · COMERCIO · SISTEMAS", next:"A&O ECOSYSTEM" },
  { id:"08", brand:"A&O ECOSYSTEM", kicker:"EPÍLOGO · 08", title:"Lo que construimos hoy es el comienzo de lo que sigue.", copy:"Las piezas vuelven al centro. Personas, marcas, tecnología, conocimiento, comercio, inversión y comunidad funcionan como una sola arquitectura viva.", kind:"future", color:"#ffffff", meta:"TALENTO · TECNOLOGÍA · CONOCIMIENTO · COMERCIO · CAPITAL · COMUNIDAD", next:"INICIO" }
] as const;

const logoSrc: Record<string,string> = {
  INVERFACT:"/brands/inverfact.svg",
  NOMADHIVE:"/brands/nomadhive.svg",
  "ANMA SOLUCIONES":"/brands/anma.svg"
};

const clamp=(x:number,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=(x:number)=>{x=clamp(x);return x*x*(3-2*x)};

function useProgress(){
  const [value,setValue]=useState(0);
  useEffect(()=>{
    let raf=0;
    const update=()=>{
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(()=>{
        const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
        setValue(clamp(window.scrollY/max));
      });
    };
    update();
    window.addEventListener("scroll",update,{passive:true});
    window.addEventListener("resize",update);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("scroll",update);window.removeEventListener("resize",update)};
  },[]);
  return value;
}

function useSmooth(value:number){
  const [smooth,setSmooth]=useState(value);
  useEffect(()=>{
    let raf=0;
    const tick=()=>{
      setSmooth(prev=>{
        const next=THREE.MathUtils.damp(prev,value,2.8,1/60);
        return Math.abs(next-value)<.0001?value:next;
      });
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(raf);
  },[value]);
  return smooth;
}

function sceneAt(progress:number){
  const scaled=clamp(progress)*(scenes.length-1);
  const index=Math.min(scenes.length-1,Math.floor(scaled));
  return { index, local:scaled-index };
}

function ParticleField({color}:{color:string}){
  const ref=useRef<THREE.Points>(null);
  const positions=useMemo(()=>{
    const data=new Float32Array(2600*3);
    for(let i=0;i<2600;i++){
      const radius=7+Math.random()*18;
      const angle=Math.random()*Math.PI*2;
      data[i*3]=Math.cos(angle)*radius;
      data[i*3+1]=(Math.random()-.5)*13;
      data[i*3+2]=Math.sin(angle)*radius;
    }
    return data;
  },[]);
  useFrame((state,delta)=>{
    if(!ref.current)return;
    ref.current.rotation.y+=delta*.006;
    ref.current.rotation.x=Math.sin(state.clock.elapsedTime*.08)*.012;
  });
  return <points ref={ref}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]} count={positions.length/3}/></bufferGeometry>
    <pointsMaterial color={color} size={.016} transparent opacity={.3} depthWrite={false} blending={THREE.AdditiveBlending}/>
  </points>;
}

function OriginCore({phase}:{phase:number}){
  const ref=useRef<THREE.Points>(null);
  const positions=useMemo(()=>{
    const data=new Float32Array(6500*3);
    for(let i=0;i<6500;i++){
      const r=Math.pow(Math.random(),.48)*4.6;
      const t=Math.random()*Math.PI*2;
      const p=Math.acos(2*Math.random()-1);
      data[i*3]=r*Math.sin(p)*Math.cos(t);
      data[i*3+1]=r*Math.cos(p);
      data[i*3+2]=r*Math.sin(p)*Math.sin(t);
    }
    return data;
  },[]);
  useFrame((state)=>{
    if(!ref.current)return;
    ref.current.rotation.y=state.clock.elapsedTime*.045;
    ref.current.scale.setScalar(.02+ease(phase/.8)*2.35);
  });
  return <>
    <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]} count={positions.length/3}/></bufferGeometry><pointsMaterial color="#fff4eb" size={.019} transparent opacity={.06+ease(phase/.72)*.9} depthWrite={false} blending={THREE.AdditiveBlending}/></points>
    <pointLight color="#ff4038" intensity={4+phase*30} distance={15}/>
  </>;
}

function Orbital({kind,phase,color}:{kind:string;phase:number;color:string}){
  const group=useRef<THREE.Group>(null);
  useFrame((state,delta)=>{
    if(!group.current)return;
    group.current.rotation.y+=delta*(.045+phase*.035);
    group.current.rotation.x=Math.sin(state.clock.elapsedTime*.23)*.04;
    group.current.scale.setScalar(.82+ease(phase)*.25);
  });

  if(kind==="ao") return <group ref={group}>
    <mesh><icosahedronGeometry args={[1.15,4]}/><meshPhysicalMaterial color="#f7eee8" metalness={1} roughness={.08} clearcoat={1} emissive="#81100b" emissiveIntensity={.8}/></mesh>
    {[1.5,2,2.5].map((radius,index)=><mesh key={radius} rotation={[index*.7,index*.5,index*.2]}><torusGeometry args={[radius,.014,10,180]}/><meshBasicMaterial color={index===1?"#ff4038":"#d8d0ca"} transparent opacity={index===1?.72:.18}/></mesh>)}
    <pointLight color="#ff4038" intensity={10+phase*18} distance={12}/>
  </group>;

  if(kind==="inverfact") return <group ref={group}>
    <mesh><sphereGeometry args={[1.5,40,28]}/><meshPhysicalMaterial color="#70470c" metalness={.78} roughness={.2} clearcoat={1}/></mesh>
    <mesh><sphereGeometry args={[1.54,40,28]}/><meshBasicMaterial color="#ffb21a" wireframe transparent opacity={.38+phase*.18}/></mesh>
    {Array.from({length:24},(_,i)=>{const a=i/24*Math.PI*2;const r=1.8+(i%4)*.2;return <mesh key={i} position={[Math.cos(a)*r,Math.sin(i*1.7)*.7,Math.sin(a)*r]}><sphereGeometry args={[.06,10,10]}/><meshBasicMaterial color={color}/></mesh>})}
    <pointLight color={color} intensity={12+phase*18} distance={12}/>
  </group>;

  if(kind==="nomadhive") return <group ref={group}>
    {Array.from({length:30},(_,i)=>{const a=i/30*Math.PI*2;const r=1.25+(i%6)*.32;return <mesh key={i} position={[Math.cos(a)*r,Math.sin(a)*r*.62,(i%5-2)*.16]} rotation={[0,0,Math.PI/6]}><cylinderGeometry args={[.22,.22,.12,6]}/><meshPhysicalMaterial color={color} metalness={.72} roughness={.2} emissive={color} emissiveIntensity={.14}/></mesh>})}
    <mesh><sphereGeometry args={[.35,24,18]}/><meshPhysicalMaterial color="#effff5" metalness={.2} roughness={.12}/></mesh>
    <pointLight color={color} intensity={12+phase*18} distance={12}/>
  </group>;

  if(kind==="anma") return <group ref={group}>
    {Array.from({length:34},(_,i)=>{const a=i/34*Math.PI*2;const r=1.1+(i%7)*.3;return <mesh key={i} position={[Math.cos(a)*r,Math.sin(i*1.7)*.68,Math.sin(a)*r]} rotation={[i*.15,i*.2,i*.08]}><boxGeometry args={[.18,.18,.18]}/><meshPhysicalMaterial color={color} metalness={.8} roughness={.17} emissive="#762803" emissiveIntensity={.28}/></mesh>})}
    <mesh><octahedronGeometry args={[.78,2]}/><meshPhysicalMaterial color="#fff0e6" metalness={.9} roughness={.08} emissive="#7b2c03" emissiveIntensity={.55}/></mesh>
    <pointLight color={color} intensity={12+phase*18} distance={12}/>
  </group>;

  if(kind==="aost") return <group ref={group}>
    {Array.from({length:9},(_,i)=>{const a=i/9*Math.PI*2;const r=1.65;return <mesh key={i} position={[Math.cos(a)*r,Math.sin(i*1.3)*.72,Math.sin(a)*r]} rotation={[i*.2,i*.15,i*.08]}><octahedronGeometry args={[.29,1]}/><meshPhysicalMaterial color="#eeeaff" metalness={.9} roughness={.1} emissive="#6046d2" emissiveIntensity={.6}/></mesh>})}
    <mesh><icosahedronGeometry args={[.92,3]}/><meshPhysicalMaterial color="#faf7ff" metalness={.95} roughness={.07} clearcoat={1} emissive="#5e45cf" emissiveIntensity={.8}/></mesh>
    <pointLight color={color} intensity={13+phase*18} distance={13}/>
  </group>;

  return <group ref={group}/>;
}

function Convergence({phase}:{phase:number}){
  const group=useRef<THREE.Group>(null);
  const colors=["#ffb21a","#28e879","#ff8514","#b9a7ff"];
  useFrame((state,delta)=>{
    if(!group.current)return;
    group.current.rotation.y+=delta*.035;
    group.current.rotation.x=Math.sin(state.clock.elapsedTime*.18)*.035;
  });
  return <group ref={group}>
    {colors.map((color,index)=>{const angle=index/4*Math.PI*2;const radius=3.5*(1-ease(phase)*.78);const p:[number,number,number]=[Math.cos(angle)*radius,Math.sin(index*1.25)*.7,Math.sin(angle)*radius];return <group key={color}><mesh position={p}><sphereGeometry args={[.16,18,18]}/><meshBasicMaterial color={color}/></mesh><mesh position={p}><torusGeometry args={[.23,.012,8,48]}/><meshBasicMaterial color={color} transparent opacity={.5}/></mesh></group>})}
    <mesh scale={.7+ease(phase)*1.3}><icosahedronGeometry args={[1,4]}/><meshPhysicalMaterial color="#f8efe8" metalness={1} roughness={.07} clearcoat={1} emissive="#8e100b" emissiveIntensity={.8}/></mesh>
    <pointLight color="#fff" intensity={8+phase*20} distance={14}/>
  </group>;
}

function CameraRig({progress}:{progress:number}){
  const {camera}=useThree();
  useFrame((state,delta)=>{
    const {index,local}=sceneAt(progress);
    const targets:[[number,number,number],[number,number,number]]=[[-.6,.1,8.6],[1,.1,7]];
    if(index===1)targets[0]=[1.8,.15,6.7];
    if(index===2)targets[0]=[-1.7,.15,6.5];
    if(index===3)targets[0]=[1.65,.05,6.7];
    if(index===4)targets[0]=[-1.55,.12,6.3];
    if(index===5)targets[0]=[1.5,.15,6.8];
    if(index>=6)targets[0]=[0,.1,7.6];
    const target=targets[0];
    const edge=local<.2?ease(local/.2):local>.8?ease((1-local)/.2):1;
    camera.position.x=THREE.MathUtils.damp(camera.position.x,target[0]+state.pointer.x*.22*edge,2.4,delta);
    camera.position.y=THREE.MathUtils.damp(camera.position.y,target[1]-state.pointer.y*.13,2.4,delta);
    camera.position.z=THREE.MathUtils.damp(camera.position.z,target[2],2.4,delta);
    camera.lookAt(0,0,0);
  });
  return null;
}

function World({progress}:{progress:number}){
  const {index,local}=sceneAt(progress);
  const scene=scenes[index];
  return <>
    <color attach="background" args={["#010101"]}/>
    <fog attach="fog" args={["#010101",7,27]}/>
    <ambientLight intensity={.09}/>
    <directionalLight position={[4,6,7]} intensity={1.2}/>
    <ParticleField color={scene.color}/>
    <Sparkles count={650} scale={[20,12,20]} size={1} speed={.08+local*.3} color={scene.color}/>
    <CameraRig progress={progress}/>
    {index===0&&<OriginCore phase={local}/>} 
    {index>=1&&index<=5&&<Orbital kind={scene.kind} phase={local} color={scene.color}/>} 
    {index===6&&<Convergence phase={local}/>} 
    {index===7&&<><Orbital kind="ao" phase={1} color="#fff"/><Convergence phase={.98}/></>}
  </>;
}

function AudioControl(){
  const [playing,setPlaying]=useState(false);
  const audio=useRef<HTMLAudioElement|null>(null);
  useEffect(()=>{
    const element=new Audio("/audio/track%201%20A%26O%20story%20telling.mp3");
    element.loop=true;element.preload="auto";element.volume=.38;element.addEventListener("play",()=>setPlaying(true));element.addEventListener("pause",()=>setPlaying(false));audio.current=element;
    return()=>{element.pause();element.src=""};
  },[]);
  const toggle=()=>{
    const element=audio.current;if(!element)return;
    if(element.paused)element.play().catch(()=>setPlaying(false));else element.pause();
  };
  return <button className={`audio ${playing?"on":""}`} onClick={toggle} aria-label="Controlar sonido"><span><i/><i/><i/></span>{playing?"SOUND ON":"SOUND"}</button>;
}

function Portal({scene}:{scene:typeof scenes[number]}){
  if(!scene.route)return null;
  return <Link to={scene.route} className={`portal portal-${scene.kind}`} style={{"--brand":scene.color} as React.CSSProperties}>
    <div className="portal-object" aria-hidden="true">
      {scene.kind==="inverfact"&&<><i className="orbit"/><b/></>}
      {scene.kind==="nomadhive"&&[1,2,3,4,5].map(n=><i key={n}/>) }
      {scene.kind==="anma"&&<div className="portal-grid">{Array.from({length:9},(_,n)=><i key={n}/>)}</div>}
    </div>
    <span>{scene.brand}</span><strong>{scene.cta}</strong><b>↗</b>
  </Link>;
}

function Brand({scene}:{scene:typeof scenes[number]}){
  const src=logoSrc[scene.brand];
  if(src)return <div className="brand-art"><img src={src} alt={scene.brand}/></div>;
  if(scene.brand==="A&O"||scene.brand==="A&O ECOSYSTEM")return <div className="brand-art ao-brand"><img src="/logo-ao-light.png" alt={scene.brand}/></div>;
  return <div className={`brand-word brand-${scene.kind}`}>{scene.brand}</div>;
}

function WebGLFallback(){return <div className="webgl-fallback"><span>EXPERIENCE INITIALIZING</span></div>}

export default function HistoryImmersiveV7(){
  const raw=useProgress();
  const progress=useSmooth(raw);
  const {index}=sceneAt(progress);
  const current=scenes[index];
  const go=(index:number)=>{
    const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    window.scrollTo({top:max*(index/(scenes.length-1)),behavior:"smooth"});
  };
  useEffect(()=>{document.title="A&O Ecosystem — Immersive History";return()=>{document.title="A&O Ecosystem"}},[]);
  return <div className="history-v7">
    <style>{css}</style>
    <div className="stage">
      <Canvas dpr={[1,1.5]} camera={{position:[0,0,8],fov:43}} gl={{antialias:true,powerPreference:"high-performance"}} fallback={<WebGLFallback/>}>
        <Suspense fallback={null}><World progress={progress}/></Suspense>
      </Canvas>
    </div>
    <header className="hud"><Link to="/" className="ao-mini">A<span>&</span>O</Link><div className="hud-title"><span>A&O HISTORY</span><em>{current.kicker}</em></div><AudioControl/></header>
    <aside className="rail">{scenes.map((scene,n)=><button key={scene.id} className={n===index?"active":""} onClick={()=>go(n)}><span>{scene.id}</span><i style={{background:scene.color}}/><b>{scene.brand}</b></button>)}</aside>
    <main className="story">{scenes.map((scene,n)=><section className="scene" key={scene.id}><div className="copy"><div className="kicker"><i style={{background:scene.color}}/>{scene.kicker}</div><Brand scene={scene}/><h1>{scene.title}</h1><p>{scene.copy}</p><div className="meta">{scene.meta}</div><div className="reveal">{n===0&&"LA PRIMERA SEÑAL · UNA VISIÓN · EL PUNTO DE PARTIDA"}{n===1&&"ARQUITECTURA · TECNOLOGÍA · DIRECCIÓN"}{n===2&&"EDUCACIÓN · COMUNIDAD · CAPITAL"}{n===3&&"TALENTO · NODOS · OPORTUNIDAD"}{n===4&&"ATENCIÓN · PRODUCTO · CONVERSIÓN"}{n===5&&"IA · DATOS · SISTEMAS · FUTURO"}{n===6&&"INVERFACT · NOMADHIVE · ANMA · A&O ST"}{n===7&&"UNA ARQUITECTURA VIVA · UN SISTEMA QUE SIGUE CRECIENDO"}</div><Portal scene={scene}/><button className="next" onClick={()=>go(Math.min(7,n+1))}><span>SUCEDE DESPUÉS</span><strong style={{color:scene.color}}>{scene.next}</strong><b>↘</b></button></div></section>)}</main>
    <div className="left-progress"><span style={{transform:`scaleY(${progress})`}}/></div><div className="counter">{String(index+1).padStart(2,"0")} <em>/</em> 08</div><footer><span>ex Structura, Prosperitas</span><span>A&O ECOSYSTEM · LIVING HISTORY</span></footer>
  </div>;
}

const css=`
*{box-sizing:border-box}.history-v7{min-height:800vh;background:#010101;color:#f2ece7;overflow-x:hidden;font-family:Inter,ui-sans-serif,system-ui,sans-serif}.stage{position:fixed;inset:0;z-index:0;background:#010101}.stage canvas{width:100%!important;height:100%!important;display:block}.story{position:relative;z-index:2}.scene{height:100vh;min-height:720px;display:flex;align-items:center;padding:9vh 8vw;pointer-events:none}.copy{width:min(620px,49vw);pointer-events:auto;transform:translateY(3vh)}.kicker{display:flex;align-items:center;gap:12px;color:#756e69;font-size:9px;letter-spacing:.3em}.kicker i{width:42px;height:1px}.brand-art{width:min(460px,36vw);height:92px;margin:22px 0 20px;display:flex;align-items:center}.brand-art img{max-width:100%;max-height:92px;object-fit:contain;object-position:left center;filter:drop-shadow(0 0 22px rgba(255,255,255,.08))}.ao-brand img{max-width:230px}.brand-word{font-size:clamp(34px,4vw,58px);letter-spacing:-.05em;font-weight:500;margin:23px 0 21px}.brand-inverfact{color:#ffb21a}.brand-nomadhive{color:#28e879}.brand-anma{color:#ff8514}.story h1{font-size:clamp(40px,5.3vw,78px);line-height:.97;letter-spacing:-.055em;font-weight:400;margin:0 0 21px;max-width:730px;text-wrap:balance}.story p{font-size:15px;line-height:1.73;color:#aaa09a;max-width:585px}.meta{margin-top:22px;border-top:1px solid #fff2;padding-top:13px;font-size:8px;letter-spacing:.26em;color:#5e5853}.reveal{margin-top:13px;min-height:21px;color:#716964;font-size:8px;letter-spacing:.18em;line-height:2}.portal{position:relative;display:grid;grid-template-columns:130px 1fr 28px;align-items:center;width:min(600px,47vw);min-height:94px;margin-top:26px;padding:0 16px;border-top:1px solid #fff2;border-bottom:1px solid #fff2;color:inherit;text-decoration:none;overflow:hidden;background:linear-gradient(90deg,transparent,rgba(255,255,255,.016),transparent);transition:transform .6s,border-color .5s}.portal:hover{transform:translateX(12px);border-top-color:var(--brand)}.portal>span{font-size:8px;letter-spacing:.2em;color:var(--brand);z-index:2}.portal>strong{font-size:10px;letter-spacing:.2em;font-weight:500;color:#d8d0ca;z-index:2}.portal>b{font-size:22px;color:var(--brand);font-weight:300;z-index:2}.portal-object{position:absolute;left:31px;top:15px;width:76px;height:64px;z-index:1;opacity:.6}.portal-inverfact .orbit{position:absolute;width:54px;height:54px;border:1px solid var(--brand);border-radius:50%;left:10px;top:5px;animation:spin 7s linear infinite}.portal-inverfact .orbit:after{content:"";position:absolute;width:7px;height:7px;border-radius:50%;background:var(--brand);left:50%;top:-4px}.portal-inverfact .portal-object>b{position:absolute;width:9px;height:9px;border-radius:50%;background:#fff4;left:34px;top:28px}.portal-nomadhive i{position:absolute;width:22px;height:19px;clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);background:var(--brand)}.portal-nomadhive i:nth-child(1){left:27px;top:3px}.portal-nomadhive i:nth-child(2){left:6px;top:19px}.portal-nomadhive i:nth-child(3){left:48px;top:19px}.portal-nomadhive i:nth-child(4){left:27px;top:35px;opacity:.55}.portal-nomadhive i:nth-child(5){left:69px;top:35px;opacity:.75}.portal-grid{position:absolute;left:8px;top:7px;width:72px;height:51px;display:grid;grid-template-columns:repeat(3,1fr);gap:4px;transform:perspective(220px) rotateX(58deg) rotateZ(-3deg)}.portal-grid i{border:1px solid var(--brand);box-shadow:inset 0 0 12px rgba(255,133,20,.12)}.next{display:flex;align-items:center;gap:11px;margin-top:19px;border:0;background:none;color:#605a55;font-size:8px;letter-spacing:.18em;cursor:pointer;padding:6px 0}.next strong{font-size:9px;letter-spacing:.16em}.next b{font-size:18px;font-weight:300;margin-left:auto}.hud{position:fixed;z-index:10;left:0;right:0;top:0;height:70px;display:flex;align-items:center;justify-content:space-between;padding:0 27px;border-bottom:1px solid #fff1;background:linear-gradient(180deg,rgba(0,0,0,.7),transparent);backdrop-filter:blur(9px)}.ao-mini{font-weight:800;font-size:22px;letter-spacing:-.17em;text-decoration:none;color:#eee9e4}.ao-mini span{color:#ff4038}.hud-title{position:absolute;left:50%;transform:translateX(-50%);display:flex;gap:28px;font-size:8px;letter-spacing:.23em;color:#68615c}.hud-title em{font-style:normal;color:#a29a93}.audio{background:none;border:0;color:#756e68;cursor:pointer;font-size:8px;letter-spacing:.2em;display:flex;align-items:center;gap:10px}.audio span{display:flex;align-items:flex-end;gap:2px;height:11px}.audio i{width:2px;height:4px;background:#6e6761}.audio.on{color:#eee}.audio.on i:nth-child(1){height:7px}.audio.on i:nth-child(2){height:10px}.audio.on i:nth-child(3){height:6px}.rail{position:fixed;z-index:9;right:24px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:4px}.rail button{display:grid;grid-template-columns:21px 3px 1fr;align-items:center;gap:8px;width:185px;padding:7px 0;border:0;background:none;color:#504b47;text-align:left;cursor:pointer}.rail button span{font-size:8px;letter-spacing:.18em}.rail button i{width:3px;height:3px;border-radius:50%;opacity:.35;transition:.35s}.rail button b{font-size:8px;font-weight:500;letter-spacing:.12em;opacity:.45;white-space:nowrap}.rail button.active i{height:18px;opacity:1}.rail button.active b{color:#eee7e0;opacity:1}.left-progress{position:fixed;z-index:8;left:17px;top:90px;bottom:56px;width:1px;background:#fff1}.left-progress span{display:block;height:100%;width:1px;transform-origin:top;background:#eee7df}.counter{position:fixed;z-index:9;left:27px;bottom:43px;font-size:9px;letter-spacing:.2em;color:#aaa19a}.counter em{font-style:normal;color:#4f4944;margin:0 7px}footer{position:fixed;z-index:9;bottom:0;left:0;right:0;height:28px;padding:0 27px;display:flex;align-items:center;justify-content:space-between;font-size:7px;letter-spacing:.23em;color:#48423f;pointer-events:none}.webgl-fallback{position:absolute;inset:0;display:grid;place-items:center;color:#6b645f;font-size:8px;letter-spacing:.3em}@keyframes spin{to{transform:rotate(360deg)}}@media(max-width:900px){.hud-title{display:none}.scene{padding:17vh 8vw 16vh}.copy{width:73vw}.portal{width:74vw}.rail{right:10px}.rail button{width:105px}.rail button b{font-size:7px}.brand-art{width:58vw}}@media(max-width:600px){.hud{height:62px;padding:0 16px}.ao-mini{font-size:18px}.audio{font-size:7px}.scene{height:100svh;min-height:680px;padding:16vh 7vw 19vh}.copy{width:86vw}.story h1{font-size:clamp(32px,10vw,50px)}.story p{font-size:13px;line-height:1.65}.brand-art{width:76vw;height:70px}.brand-art img{max-height:70px}.portal{width:86vw;min-height:76px;grid-template-columns:88px 1fr 22px;padding:0 10px}.portal-object{left:17px;transform:scale(.82)}.portal>strong{font-size:8px}.rail{top:auto;bottom:46px;left:16px;right:16px;transform:none;flex-direction:row;justify-content:space-between}.rail button{width:auto;display:block}.rail button b{display:none}.rail button i{display:block;width:18px;height:1px!important;margin-top:4px}.left-progress{display:none}.counter{left:auto;right:16px;bottom:14px}footer{display:none}}
`;