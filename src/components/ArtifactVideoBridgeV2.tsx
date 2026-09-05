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
 useEffect(()=>{const v=video.current;if(!v)return;const onMeta=()=>{setReady(true);const t=local*Math.max(0,v.duration-.05);v.currentTime=t};const onData=()=>setReady(true);const onErr=()=>setReady(false);v.preload="auto";v.muted=true;v.playsInline=true;v.load();v.addEventListener("loadedmetadata",onMeta);v.addEventListener("loadeddata",onData);v.addEventListener("error",onErr);return()=>{v.removeEventListener("loadedmetadata",onMeta);v.removeEventListener("loadeddata",onData);v.removeEventListener("error",onErr)}},[]);
 useEffect(()=>{const v=video.current;if(!v||!ready||!Number.isFinite(v.duration)||v.duration<=0)return;const target=local*Math.max(0,v.duration-.05);if(Math.abs(v.currentTime-target)>.08)v.currentTime=target;},[local,ready]);
 if(progress<start-.02||progress>end+.02)return null;
 const fadeIn=clamp((progress-(start-.03))/.12); const fadeOut=1-clamp((progress-(end-.82*(end-start)))/(.18*(end-start)));
 const opacity=fadeIn*fadeOut;
 return <div className="artifact-video-bridge-v2" style={{opacity}} aria-hidden="true"><video ref={video} muted playsInline preload="auto" src={VIDEO}/><div className="artifact-video-veil-v2"/></div>;
}
