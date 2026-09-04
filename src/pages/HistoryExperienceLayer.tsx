import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, useGLTF } from "@react-three/drei";
import React, { ReactNode, Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import HistoryImmersiveV8 from "./HistoryImmersiveV8";

/** Asset registry: Drive remains the master source; the app consumes public CDN/Vercel asset paths. */
export const HISTORY_DRIVE_ASSETS = {
  modelsFolder: "https://drive.google.com/drive/folders/1HH7wCpirgoMoIi4D3GGq3CSMT8WGq1XU",
  videosFolder: "https://drive.google.com/drive/folders/12QNfs1U_dQtXGf7wlmTvZ5L0oZptx94_",
  models: {
    inverfact: "1edws1SfhUwgKFTp-qzjTrvlfs7AMOJFj",
    anma: "1EQYHKeBFuIv7FfPKGpKkyQv8PpUYgaY-",
    ao: "1-jzHuDPHk3KjTRzXJFQMZxBSEtTIF1cw",
    bee: "1PQ3wbbfGRSdEsFJlZw0FavVXR24Khxlt",
    hive: "1uKTtFBXG8vFU9CoHsiG4hZrD7AzeD8PS",
  },
} as const;

const LOCAL_MODELS = {
  ao: "/models/3D/LOGO_Company_A_Ecosystem_texture.glb",
  inverfact: "/models/3D/_InverFact_texture.glb",
  anma: "/models/3D/LOGO_ANMA_texture.glb",
  hive: "/models/3D/Nomad_Hive_texture.glb",
  bee: "/models/3D/LOGO_Nomad_Hive_ABEJA_texture.glb",
};

const VIDEO_SLOTS = {
  origin: "/video/history/01-origin.mp4",
  ao: "/video/history/02-ao.mp4",
  inverfact: "/video/history/03-inverfact.mp4",
  nomadhive: "/video/history/04-nomadhive.mp4",
  anma: "/video/history/05-anma.mp4",
  aost: "/video/history/06-aost.mp4",
  convergence: "/video/history/07-convergence.mp4",
  future: "/video/history/08-future.mp4",
};

const KINDS = ["origin","ao","inverfact","nomadhive","anma","aost","convergence","future"] as const;
type Kind = typeof KINDS[number];

function clamp(v:number,a=0,b=1){return Math.max(a,Math.min(b,v))}
function damp(a:number,b:number,k:number){return a+(b-a)*(1-Math.exp(-k))}

function useSceneProgress(){
  const [target,setTarget]=useState(0),[value,setValue]=useState(0);
  useEffect(()=>{let raf=0;const read=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);setTarget(clamp(scrollY/max))})};read();addEventListener("scroll",read,{passive:true});addEventListener("resize",read);return()=>{cancelAnimationFrame(raf);removeEventListener("scroll",read);removeEventListener("resize",read)}},[]);
  useEffect(()=>{let raf=0,last=0;const tick=(now:number)=>{const dt=Math.min(100,now-(last||now));last=now;setValue(v=>{const n=v+(target-v)*(1-Math.pow(1-.12,dt/16.667));return Math.abs(target-n)<.00015?target:n});if(Math.abs(target-value)>.00015)raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf)},[target,value]);
  return value;
}

class Boundary extends React.Component<{children:ReactNode;fallback:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return{failed:true}};componentDidCatch(e:unknown){console.warn("History 3D asset fallback",e)}render(){return this.state.failed?this.props.fallback:this.props.children}}

function Actor({src,kind}:{src:string;kind:Kind}){const {scene}=useGLTF(src);const clone=useMemo(()=>scene.clone(true),[scene]);useEffect(()=>{clone.traverse(o=>{const m=o as THREE.Mesh;if(m.isMesh){m.castShadow=true;m.receiveShadow=true}})},[clone]);useFrame((s)=>{clone.rotation.y=damp(clone.rotation.y,.18+Math.sin(s.clock.elapsedTime*.35)*.12,.035);clone.rotation.x=damp(clone.rotation.x,Math.sin(s.clock.elapsedTime*.28)*.035,.03);clone.position.y=Math.sin(s.clock.elapsedTime*.9)*.07});return <primitive object={clone} scale={kind==="hive"?1.45:1.35}/>}

function AssetActor({kind}:{kind:Kind}){const key=kind as keyof typeof LOCAL_MODELS;const src=LOCAL_MODELS[key];if(!src)return null;const fallback=<mesh><icosahedronGeometry args={[.82,4]}/><meshPhysicalMaterial color={kind==="inverfact"?"#ffb21a":kind==="anma"?"#ff8514":"#ff4038"} metalness={1} roughness={.12} clearcoat={1}/></mesh>;return <Boundary fallback={fallback}><Suspense fallback={fallback}><Actor src={src} kind={kind}/></Suspense></Boundary>}

function AssetWorld({kind}:{kind:Kind}){const color=kind==="inverfact"?"#ffb21a":kind==="nomadhive"?"#28e879":kind==="anma"?"#ff8514":kind==="aost"?"#a997ff":"#fff";return <><ambientLight intensity={.18}/><directionalLight position={[3,4,6]} intensity={2}/><pointLight position={[-2,2,3]} intensity={5} color={color}/><Sparkles count={kind==="nomadhive"?850:650} scale={[12,9,12]} size={1.1} speed={.25} color={color}/>{kind!=="origin"&&kind!=="aost"&&kind!=="convergence"&&<Float speed={1.1} rotationIntensity={.12} floatIntensity={.18}><AssetActor kind={kind}/></Float>}</>}

function VideoLayer({kind}:{kind:Kind}){const ref=useRef<HTMLVideoElement>(null);const src=VIDEO_SLOTS[kind];const[failed,setFailed]=useState(false);useEffect(()=>{setFailed(false);const v=ref.current;if(!v)return;v.muted=true;v.playsInline=true;const play=()=>v.play().catch(()=>{});v.addEventListener("canplay",play,{once:true});return()=>v.removeEventListener("canplay",play)},[src]);if(failed)return null;return <video ref={ref} key={src} autoPlay muted loop playsInline preload="metadata" src={src} onError={()=>setFailed(true)} aria-hidden="true" style={{position:"fixed",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.1,mixBlendMode:"screen",pointerEvents:"none",zIndex:1,filter:"saturate(.8) contrast(1.06)",willChange:"opacity"}}/>}

function Overlay({progress}:{progress:number}){const index=Math.min(7,Math.floor(progress*7));const kind=KINDS[index];const[reduced,setReduced]=useState(false);useEffect(()=>{const m=matchMedia("(prefers-reduced-motion: reduce)");const sync=()=>setReduced(m.matches);sync();m.addEventListener?.("change",sync);return()=>m.removeEventListener?.("change",sync)},[]);return <>{!reduced&&<VideoLayer kind={kind}/>}<Canvas dpr={[1,1.35]} camera={{position:[0,0,8],fov:40}} gl={{alpha:true,antialias:true,powerPreference:"high-performance"}} style={{position:"fixed",inset:0,zIndex:2,pointerEvents:"none"}}><AssetWorld kind={kind}/></Canvas></>}

export default function HistoryExperienceLayer(){const progress=useSceneProgress();return <div className="history-experience-layer"><HistoryImmersiveV8/><Overlay progress={progress}/><style>{`.history-experience-layer{position:relative;min-height:800vh;background:#020202}.history-experience-layer>canvas{pointer-events:none!important}@media(prefers-reduced-motion:reduce){.history-experience-layer>video{display:none}}`}</style></div>}

useGLTF.preload("/models/3D/Meshy_AI_Nomad_Hive_0903011338_texture.glb");
