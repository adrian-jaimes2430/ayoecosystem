import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";

const clamp = (v:number,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease = (v:number)=>{v=clamp(v);return v*v*(3-2*v)};

function useChapterProgress(){
  const [p,setP]=useState(0);
  useEffect(()=>{
    let raf=0;
    const tick=()=>{
      const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
      const global=clamp(scrollY/max);
      setP(clamp((global-1/7)/(1/7)));
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(raf);
  },[]);
  return p;
}

function Artifact({progress}:{progress:number}){
  const root=useRef<THREE.Group>(null);
  const outer=useRef<THREE.Group>(null);
  const pointer=useRef({x:0,y:0});
  const particles=useMemo(()=>{
    const count=1800; const a=new Float32Array(count*3);
    for(let i=0;i<count;i++){
      const t=Math.random()*Math.PI*2;
      const r=1.75+Math.random()*1.55;
      const z=(Math.random()-.5)*.9;
      a[i*3]=Math.cos(t)*r; a[i*3+1]=Math.sin(t)*r; a[i*3+2]=z;
    }
    return a;
  },[]);
  useEffect(()=>{
    const move=(e:PointerEvent)=>{pointer.current.x=e.clientX/innerWidth*2-1;pointer.current.y=e.clientY/innerHeight*2-1};
    addEventListener("pointermove",move,{passive:true});
    return()=>removeEventListener("pointermove",move);
  },[]);
  useFrame(({clock})=>{
    if(!root.current)return;
    const p=ease(progress);
    root.current.rotation.y += .0018;
    root.current.rotation.x += (pointer.current.y*.12-root.current.rotation.x)*.035;
    root.current.rotation.z += (pointer.current.x*.06-root.current.rotation.z)*.035;
    root.current.position.x += (pointer.current.x*.18-root.current.position.x)*.025;
    root.current.position.y += (-pointer.current.y*.1-root.current.position.y)*.025;
    root.current.scale.setScalar(.88+p*.16+Math.sin(clock.elapsedTime*1.3)*.012);
    if(outer.current){outer.current.rotation.z=clock.elapsedTime*.08;outer.current.rotation.y=clock.elapsedTime*.12;}
  });
  const alpha=ease(clamp((progress-.06)/.18))*(progress>.88?1-ease((progress-.94)/.06):1);
  return <group ref={root} scale={.88}>
    <group ref={outer}>
      <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[1.75,.12,32,160]}/><meshPhysicalMaterial color="#d7d8dc" metalness={1} roughness={.12} clearcoat={1} clearcoatRoughness={.05} transparent opacity={alpha}/></mesh>
      <mesh rotation={[Math.PI/2,.18,0]}><torusGeometry args={[1.48,.028,16,160]}/><meshBasicMaterial color="#ffffff" transparent opacity={alpha*.7} blending={THREE.AdditiveBlending}/></mesh>
      <mesh rotation={[Math.PI/2,-.24,0]}><torusGeometry args={[1.9,.018,12,160]}/><meshBasicMaterial color="#ffffff" transparent opacity={alpha*.34} blending={THREE.AdditiveBlending}/></mesh>
    </group>
    <mesh scale={[1.34,1.34,.38]}><sphereGeometry args={[1,64,40]}/><meshPhysicalMaterial color="#050609" metalness={.92} roughness={.16} clearcoat={1} clearcoatRoughness={.08} transparent opacity={alpha}/></mesh>
    <mesh position={[0,0,.37]} scale={[.68,.68,.12]}><cylinderGeometry args={[1,1,1,96]}/><meshPhysicalMaterial color="#0b0d11" metalness={.98} roughness={.1} clearcoat={1} transparent opacity={alpha}/></mesh>
    <mesh position={[0,0,.49]}><torusGeometry args={[.48,.055,20,96]}/><meshPhysicalMaterial color="#b51e25" emissive="#ff2430" emissiveIntensity={2.2} metalness={.82} roughness={.16} transparent opacity={alpha}/></mesh>
    <mesh position={[0,0,.52]}><torusGeometry args={[.25,.018,12,96]}/><meshBasicMaterial color="#ff6a70" transparent opacity={alpha*.9} blending={THREE.AdditiveBlending}/></mesh>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[particles,3]} count={particles.length/3}/></bufferGeometry><pointsMaterial color="#f5f3ef" size={.018} transparent opacity={alpha*.55} depthWrite={false} blending={THREE.AdditiveBlending}/></points>
    {[0,1,2].map(i=><mesh key={i} rotation={[Math.PI/2+i*.42,i*.7,0]}><torusGeometry args={[1.9+i*.18,.012,10,180]}/><meshBasicMaterial color={i===1?"#ff3f46":"#ffffff"} transparent opacity={alpha*(i===1?.58:.28)} blending={THREE.AdditiveBlending}/></mesh>)}
  </group>;
}

export default function AOSpaceArtifactOverlay(){
  const progress=useChapterProgress();
  if(progress<=0 || progress>=1)return null;
  return <div className="ao-artifact-overlay" aria-hidden="true">
    <Canvas dpr={[1,1.5]} camera={{position:[0,0,7],fov:38}} gl={{alpha:true,antialias:true,powerPreference:"high-performance"}}>
      <ambientLight intensity={.22}/><directionalLight position={[3,4,6]} intensity={3.2}/><pointLight position={[-2,1,3]} color="#ff2430" intensity={4.5} distance={8}/><Artifact progress={progress}/>
    </Canvas>
    <div className="ao-artifact-mask"/>
    <style>{`.ao-artifact-overlay{position:fixed;inset:0;z-index:2;pointer-events:none;overflow:hidden}.ao-artifact-overlay canvas{position:absolute;inset:0;width:100%!important;height:100%!important}.ao-artifact-mask{position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgba(2,2,4,.72) 0%,rgba(2,2,4,.34) 24%,transparent 46%);mix-blend-mode:multiply;pointer-events:none}`}</style>
  </div>;
}
