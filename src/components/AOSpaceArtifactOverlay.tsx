import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";

const clamp = (v:number,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease = (v:number)=>{v=clamp(v);return v*v*(3-2*v)};

function useChapterProgress(){
  const [p,setP]=useState(0);
  useEffect(()=>{let raf=0;const tick=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);setP(clamp((scrollY/max-1/7)/(1/7)));raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf)},[]);
  return p;
}

function ArtifactLogo({alpha}:{alpha:number}){
  const texture=useTexture("/logo-ao-light.png");
  useEffect(()=>{texture.colorSpace=THREE.SRGBColorSpace;texture.needsUpdate=true},[texture]);
  return <mesh position={[0,0,.58]}><planeGeometry args={[.86,.42]}/><meshBasicMaterial map={texture} transparent opacity={alpha*.95} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh>;
}

function ProceduralHalo({progress}:{progress:number}){
  const root=useRef<THREE.Group>(null); const pointer=useRef({x:0,y:0});
  const particles=useMemo(()=>{const count=1800,a=new Float32Array(count*3);for(let i=0;i<count;i++){const t=Math.random()*Math.PI*2,r=1.8+Math.random()*1.5,z=(Math.random()-.5)*.9;a[i*3]=Math.cos(t)*r;a[i*3+1]=Math.sin(t)*r;a[i*3+2]=z}return a},[]);
  useEffect(()=>{const move=(e:PointerEvent)=>{pointer.current.x=e.clientX/innerWidth*2-1;pointer.current.y=e.clientY/innerHeight*2-1};addEventListener("pointermove",move,{passive:true});return()=>removeEventListener("pointermove",move)},[]);
  useFrame(({clock})=>{if(!root.current)return;root.current.rotation.y+=(.0015+Math.abs(pointer.current.x)*.001);root.current.rotation.x+=(pointer.current.y*.1-root.current.rotation.x)*.03;root.current.rotation.z+=(pointer.current.x*.05-root.current.rotation.z)*.03;root.current.scale.setScalar(.95+Math.sin(clock.elapsedTime*1.3)*.015)});
  const alpha=ease(clamp((progress-.06)/.18))*(progress>.88?1-ease((progress-.94)/.06):1);
  return <group ref={root}><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[1.92,.022,12,180]}/><meshBasicMaterial color="#ffffff" transparent opacity={alpha*.3} blending={THREE.AdditiveBlending}/></mesh><mesh rotation={[Math.PI/2,.42,0]}><torusGeometry args={[2.08,.012,10,180]}/><meshBasicMaterial color="#ff3f46" transparent opacity={alpha*.5} blending={THREE.AdditiveBlending}/></mesh><points><bufferGeometry><bufferAttribute attach="attributes-position" args={[particles,3]} count={particles.length/3}/></bufferGeometry><pointsMaterial color="#f5f3ef" size={.018} transparent opacity={alpha*.5} depthWrite={false} blending={THREE.AdditiveBlending}/></points></group>;
}

function AOModel({progress}:{progress:number}){
  const {scene}=useGLTF("/api/ao-model");
  const clone=useMemo(()=>scene.clone(true),[scene]);
  const root=useRef<THREE.Group>(null); const pointer=useRef({x:0,y:0});
  useEffect(()=>{clone.traverse((obj)=>{const mesh=obj as THREE.Mesh;if(!mesh.isMesh)return;const mats=Array.isArray(mesh.material)?mesh.material:[mesh.material];mats.forEach((mat)=>{const m=mat as THREE.MeshStandardMaterial;m.metalness=.96;m.roughness=.13;m.envMapIntensity=2.2;m.transparent=true;m.opacity=1});mesh.castShadow=false;mesh.receiveShadow=true})},[clone]);
  useEffect(()=>{const move=(e:PointerEvent)=>{pointer.current.x=e.clientX/innerWidth*2-1;pointer.current.y=e.clientY/innerHeight*2-1};addEventListener("pointermove",move,{passive:true});return()=>removeEventListener("pointermove",move)},[]);
  useFrame(({clock})=>{if(!root.current)return;root.current.rotation.y+=(.002+Math.abs(pointer.current.x)*.0015);root.current.rotation.x+=(pointer.current.y*.13-root.current.rotation.x)*.035;root.current.rotation.z+=(pointer.current.x*.07-root.current.rotation.z)*.035;root.current.position.x+=(pointer.current.x*.16-root.current.position.x)*.025;root.current.position.y+=(-pointer.current.y*.08-root.current.position.y)*.025;root.current.scale.setScalar(2.15+Math.sin(clock.elapsedTime*1.15)*.025)});
  const alpha=ease(clamp((progress-.1)/.2))*(progress>.9?1-ease((progress-.95)/.05):1);
  clone.traverse((obj)=>{const mesh=obj as THREE.Mesh;if(!mesh.isMesh)return;const mats=Array.isArray(mesh.material)?mesh.material:[mesh.material];mats.forEach((mat)=>{(mat as THREE.Material).opacity=alpha})});
  return <group ref={root}><primitive object={clone}/><ArtifactLogo alpha={alpha}/></group>;
}

export default function AOSpaceArtifactOverlay(){
  const progress=useChapterProgress();
  if(progress<=0 || progress>=1)return null;
  return <div className="ao-artifact-overlay" aria-hidden="true"><Canvas dpr={[1,1.5]} camera={{position:[0,0,7],fov:38}} gl={{alpha:true,antialias:true,powerPreference:"high-performance"}}><ambientLight intensity={.22}/><directionalLight position={[3,4,6]} intensity={3.5}/><pointLight position={[-2,1,3]} color="#ff2430" intensity={5} distance={9}/><ProceduralHalo progress={progress}/><Suspense fallback={null}><AOModel progress={progress}/></Suspense></Canvas><div className="ao-artifact-mask"/><style>{`.ao-artifact-overlay{position:fixed;inset:0;z-index:2;pointer-events:none;overflow:hidden}.ao-artifact-overlay canvas{position:absolute;inset:0;width:100%!important;height:100%!important}.ao-artifact-mask{position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgba(2,2,4,.68) 0%,rgba(2,2,4,.28) 24%,transparent 46%);mix-blend-mode:multiply;pointer-events:none}`}</style></div>;
}
