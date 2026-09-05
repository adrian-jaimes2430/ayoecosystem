import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";

const clamp=(v:number,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease=(v:number)=>{v=clamp(v);return v*v*(3-2*v)};

function useChapterProgress(){
 const [p,setP]=useState(0);
 useEffect(()=>{let raf=0;const tick=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);setP(clamp((scrollY/max-1/7)/(1/7)));raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf)},[]);
 return p;
}

function ArtifactLogo({alpha}:{alpha:number}){
 const texture=useTexture("/logo-ao-light.png");
 useEffect(()=>{texture.colorSpace=THREE.SRGBColorSpace;texture.needsUpdate=true},[texture]);
 return <mesh position={[0,0,.62]}><planeGeometry args={[.92,.45]}/><meshBasicMaterial map={texture} transparent opacity={alpha*.95} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh>;
}

function Artifact({progress}:{progress:number}){
 const root=useRef<THREE.Group>(null); const pointer=useRef({x:0,y:0});
 const particles=useMemo(()=>{const count=2400,a=new Float32Array(count*3);for(let i=0;i<count;i++){const t=Math.random()*Math.PI*2,r=1.75+Math.random()*1.75,z=(Math.random()-.5)*.85;a[i*3]=Math.cos(t)*r;a[i*3+1]=Math.sin(t)*r;a[i*3+2]=z}return a},[]);
 useEffect(()=>{const move=(e:PointerEvent)=>{pointer.current.x=e.clientX/innerWidth*2-1;pointer.current.y=e.clientY/innerHeight*2-1};addEventListener("pointermove",move,{passive:true});return()=>removeEventListener("pointermove",move)},[]);
 useFrame(({clock})=>{if(!root.current)return;root.current.rotation.y+=(.0018+Math.abs(pointer.current.x)*.001);root.current.rotation.x+=(pointer.current.y*.13-root.current.rotation.x)*.035;root.current.rotation.z+=(pointer.current.x*.07-root.current.rotation.z)*.035;root.current.position.x+=(pointer.current.x*.2-root.current.position.x)*.025;root.current.position.y+=(-pointer.current.y*.1-root.current.position.y)*.025;root.current.scale.setScalar(.92+ease(progress)*.12+Math.sin(clock.elapsedTime*1.2)*.012)});
 const alpha=ease(clamp((progress-.04)/.2))*(progress>.9?1-ease((progress-.95)/.05):1);
 return <group ref={root}>
  <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[1.72,.12,32,160]}/><meshPhysicalMaterial color="#d8d9dd" metalness={1} roughness={.1} clearcoat={1} clearcoatRoughness={.04} transparent opacity={alpha}/></mesh>
  <mesh rotation={[Math.PI/2,.18,0]}><torusGeometry args={[1.48,.025,16,160]}/><meshBasicMaterial color="#fff" transparent opacity={alpha*.7} blending={THREE.AdditiveBlending}/></mesh>
  <mesh rotation={[Math.PI/2,-.26,0]}><torusGeometry args={[1.92,.016,12,180]}/><meshBasicMaterial color="#fff" transparent opacity={alpha*.32} blending={THREE.AdditiveBlending}/></mesh>
  <mesh scale={[1.3,1.3,.38]}><sphereGeometry args={[1,64,40]}/><meshPhysicalMaterial color="#050609" metalness={.94} roughness={.15} clearcoat={1} transparent opacity={alpha}/></mesh>
  <mesh position={[0,0,.38]} scale={[.72,.72,.1]}><cylinderGeometry args={[1,1,1,96]}/><meshPhysicalMaterial color="#0a0c10" metalness={1} roughness={.08} transparent opacity={alpha}/></mesh>
  <mesh position={[0,0,.5]}><torusGeometry args={[.5,.052,20,96]}/><meshPhysicalMaterial color="#b51e25" emissive="#ff2630" emissiveIntensity={2.4} metalness={.85} roughness={.14} transparent opacity={alpha}/></mesh>
  <mesh position={[0,0,.53]}><torusGeometry args={[.27,.016,12,96]}/><meshBasicMaterial color="#ff7178" transparent opacity={alpha*.9} blending={THREE.AdditiveBlending}/></mesh>
  <ArtifactLogo alpha={alpha}/>
  <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[particles,3]} count={particles.length/3}/></bufferGeometry><pointsMaterial color="#f5f3ef" size={.018} transparent opacity={alpha*.58} depthWrite={false} blending={THREE.AdditiveBlending}/></points>
  {[0,1,2].map(i=><mesh key={i} rotation={[Math.PI/2+i*.42,i*.7,0]}><torusGeometry args={[1.92+i*.17,.011,10,180]}/><meshBasicMaterial color={i===1?"#ff3f46":"#fff"} transparent opacity={alpha*(i===1?.62:.25)} blending={THREE.AdditiveBlending}/></mesh>)}
 </group>;
}

export default function AOSpaceArtifactOverlay(){
 const progress=useChapterProgress();
 if(progress<=0 || progress>=1)return null;
 return <div className="ao-artifact-overlay" aria-hidden="true"><Canvas dpr={[1,1.5]} camera={{position:[0,0,7],fov:38}} gl={{alpha:true,antialias:true,powerPreference:"high-performance"}}><ambientLight intensity={.2}/><directionalLight position={[3,4,6]} intensity={3.8}/><pointLight position={[-2,1,3]} color="#ff2430" intensity={5.5} distance={9}/><Artifact progress={progress}/></Canvas><div className="ao-artifact-mask"/><style>{`.ao-artifact-overlay{position:fixed;inset:0;z-index:2;pointer-events:none;overflow:hidden}.ao-artifact-overlay canvas{position:absolute;inset:0;width:100%!important;height:100%!important}.ao-artifact-mask{position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgba(2,2,4,.7) 0%,rgba(2,2,4,.25) 25%,transparent 48%);mix-blend-mode:multiply;pointer-events:none}`}</style></div>;
}
