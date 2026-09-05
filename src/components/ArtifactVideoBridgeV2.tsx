import { useEffect, useRef, useState } from "react";

const VIDEO="/videos/Ecosystem_artifact_forming_in_space%20v2.mp4";
const clamp=(v:number,a=0,b=1)=>Math.max(a,Math.min(b,v));

function useGlobalProgress(){
 const [p,setP]=useState(0);
 useEffect(()=>{let raf=0;const tick=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);setP(clamp(scrollY/max));raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf)},[]);
 return p;
}

export default function ArtifactVideoBridgeV2(){
 const video=useRef<HTMLVideoElement>(null); const progress=useGlobalProgress(); const [ready,setReady]=useState(false);
 const start=1/7,end=2/7; const local=clamp((progress-start)/(end-start));
 useEffect(()=>{const v=video.current;if(!v)return;const onMeta=()=>{setReady(true);v.currentTime=local*Math.max(0,v.duration-.05)};const onData=()=>setReady(true);const onErr=()=>setReady(false);v.preload="auto";v.muted=true;v.playsInline=true;v.load();v.addEventListener("loadedmetadata",onMeta);v.addEventListener("loadeddata",onData);v.addEventListener("error",onErr);return()=>{v.removeEventListener("loadedmetadata",onMeta);v.removeEventListener("loadeddata",onData);v.removeEventListener("error",onErr)}},[]);
 useEffect(()=>{const v=video.current;if(!v||!ready||!Number.isFinite(v.duration)||v.duration<=0)return;const target=local*Math.max(0,v.duration-.05);if(Math.abs(v.currentTime-target)>.08)v.currentTime=target;},[local,ready]);
 if(progress<start-.02||progress>end+.02)return null;
 const fadeIn=clamp((progress-(start-.03))/.12);
 const fadeOut=1-clamp((progress-(start+.82*(end-start)))/(.18*(end-start)));
 const opacity=fadeIn*fadeOut;
 return <div className="artifact-video-bridge-v2" style={{opacity}} aria-hidden="true"><video ref={video} muted playsInline preload="auto" src={VIDEO}/><div className="artifact-video-veil-v2"/><style>{`.artifact-video-bridge-v2{position:fixed;inset:0;z-index:1;pointer-events:none;overflow:hidden;background:#020204}.artifact-video-bridge-v2 video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}.artifact-video-veil-v2{position:absolute;inset:0;background:radial-gradient(circle at 50% 48%,transparent 20%,rgba(0,0,0,.08) 58%,rgba(0,0,0,.68) 100%),linear-gradient(180deg,rgba(0,0,0,.18),transparent 34%,rgba(0,0,0,.38));pointer-events:none}`}</style></div>;
}
