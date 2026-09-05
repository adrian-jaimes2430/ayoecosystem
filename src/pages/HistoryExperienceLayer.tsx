import React, { ReactNode, useEffect, useState } from "react";
import HistoryImmersiveV8 from "./HistoryImmersiveV8";

/** Master asset registry. Drive remains the source library; production assets are consumed from the repo/CDN. */
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

const CRITICAL_ASSETS = [
  { label: "ORIGIN CINEMA", url: "/videos/Digital_universe_birth_opening_v2.mp4", type: "video", weight: 42 },
  { label: "STORY AUDIO", url: "/audio/track%201%20A%26O%20story%20telling.mp3", type: "audio", weight: 28 },
  { label: "A&O IDENTITY", url: "/logo-ao-light.png", type: "image", weight: 30 },
] as const;

function preloadAsset(asset: (typeof CRITICAL_ASSETS)[number]): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    const timeout = window.setTimeout(finish, 6500);

    if (asset.type === "image") {
      const img = new Image();
      img.onload = () => { window.clearTimeout(timeout); finish(); };
      img.onerror = () => { window.clearTimeout(timeout); finish(); };
      img.src = asset.url;
      return;
    }

    const media = document.createElement(asset.type);
    media.preload = "auto";
    media.muted = true;
    media.onloadeddata = () => { window.clearTimeout(timeout); finish(); };
    media.oncanplaythrough = () => { window.clearTimeout(timeout); finish(); };
    media.onerror = () => { window.clearTimeout(timeout); finish(); };
    media.src = asset.url;
    media.load();
  });
}

function CinematicLoader({ onEnter }: { onEnter: () => void }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const [phase, setPhase] = useState("CALIBRATING THE EXPERIENCE");

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      const results = await Promise.all(CRITICAL_ASSETS.map(async (asset, index) => {
        setPhase(asset.label);
        await preloadAsset(asset);
        if (mounted) {
          const base = CRITICAL_ASSETS.slice(0, index + 1).reduce((sum, item) => sum + item.weight, 0);
          setProgress(base);
        }
        return asset;
      }));
      void results;
      if (mounted) {
        setProgress(100);
        setPhase("EXPERIENCE READY");
        setReady(true);
      }
    };
    run();
    return () => { mounted = false; };
  }, []);

  const enter = () => {
    if (!ready) return;
    setEntered(true);
    window.setTimeout(onEnter, 720);
  };

  return (
    <div
      aria-hidden={entered}
      onPointerDown={enter}
      className={`history-loader ${entered ? "history-loader--exit" : ""}`}
    >
      <div className="history-loader__noise" />
      <div className="history-loader__orbit history-loader__orbit--a" />
      <div className="history-loader__orbit history-loader__orbit--b" />

      <div className="history-loader__top">
        <span>A&O ECOSYSTEM</span>
        <span>HISTORY / 01—08</span>
      </div>

      <div className="history-loader__center">
        <div className="history-loader__mark">A&O</div>
        <div className="history-loader__line" />
        <div className="history-loader__phase">{phase}</div>
        <div className="history-loader__progress">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <div className="history-loader__meta">
          <span>{String(Math.round(progress)).padStart(3, "0")}%</span>
          <span>{ready ? "READY TO ENTER" : "LOADING CORE ASSETS"}</span>
        </div>
        <button
          type="button"
          className={`history-loader__enter ${ready ? "history-loader__enter--ready" : ""}`}
          disabled={!ready}
          onPointerDown={(event) => {
            event.stopPropagation();
            enter();
          }}
        >
          {ready ? "ENTER EXPERIENCE" : "INITIALIZING"}
        </button>
      </div>

      <div className="history-loader__bottom">
        <span>WEBGL / REALTIME / CINEMATIC</span>
        <span>MOVE · SCROLL · EXPLORE</span>
      </div>

      <style>{`
        .history-loader{position:fixed;inset:0;z-index:9999;background:#020203;color:#f4f1ea;display:grid;place-items:center;overflow:hidden;cursor:pointer;opacity:1;visibility:visible;transition:opacity .72s cubic-bezier(.22,1,.36,1),visibility .72s}
        .history-loader--exit{opacity:0;visibility:hidden;pointer-events:none}
        .history-loader__noise{position:absolute;inset:-50%;opacity:.075;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.32'/%3E%3C/svg%3E");transform:rotate(7deg)}
        .history-loader__orbit{position:absolute;border:1px solid rgba(255,255,255,.12);border-radius:50%;pointer-events:none;transform:rotate(-18deg)}
        .history-loader__orbit--a{width:52vw;height:19vw;max-width:900px;top:36%;left:24%;box-shadow:0 0 80px rgba(255,50,40,.035);animation:historyOrbitA 14s linear infinite}
        .history-loader__orbit--b{width:34vw;height:12vw;max-width:620px;top:43%;left:33%;border-color:rgba(255,55,45,.14);animation:historyOrbitB 10s linear infinite reverse}
        .history-loader__top,.history-loader__bottom{position:absolute;left:28px;right:28px;display:flex;justify-content:space-between;font:500 9px/1.2 Inter,system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;opacity:.52}
        .history-loader__top{top:25px}.history-loader__bottom{bottom:25px}
        .history-loader__center{position:relative;width:min(460px,76vw);display:flex;flex-direction:column;align-items:center;text-align:center}
        .history-loader__mark{font:500 clamp(42px,7vw,76px)/1 Arial,sans-serif;letter-spacing:-.09em;text-indent:-.06em;margin-bottom:28px;text-shadow:0 0 45px rgba(255,255,255,.09)}
        .history-loader__line{width:1px;height:54px;background:linear-gradient(transparent,rgba(255,255,255,.7),transparent);margin-bottom:24px}
        .history-loader__phase{font:500 9px/1.4 Inter,system-ui,sans-serif;letter-spacing:.25em;text-transform:uppercase;min-height:13px;opacity:.72}
        .history-loader__progress{width:100%;height:1px;margin-top:17px;background:rgba(255,255,255,.12);overflow:hidden}
        .history-loader__progress span{display:block;width:100%;height:100%;transform-origin:left;background:#f4f1ea;transition:transform .6s cubic-bezier(.22,1,.36,1);box-shadow:0 0 14px rgba(255,255,255,.35)}
        .history-loader__meta{width:100%;display:flex;justify-content:space-between;margin-top:9px;font:500 8px/1.2 Inter,system-ui,sans-serif;letter-spacing:.16em;opacity:.45}
        .history-loader__enter{margin-top:34px;padding:0;border:0;background:none;color:rgba(255,255,255,.34);font:600 10px/1 Inter,system-ui,sans-serif;letter-spacing:.24em;cursor:default;transition:color .3s,letter-spacing .3s;text-transform:uppercase}
        .history-loader__enter--ready{color:#fff;cursor:pointer}.history-loader__enter--ready:hover{letter-spacing:.32em}
        @keyframes historyOrbitA{to{transform:rotate(342deg)}}@keyframes historyOrbitB{to{transform:rotate(-378deg)}}
        @media (max-width:700px){.history-loader__top,.history-loader__bottom{left:17px;right:17px;font-size:7px}.history-loader__top{top:18px}.history-loader__bottom{bottom:18px}.history-loader__orbit--a{width:110vw;height:38vw;left:-5%;top:43%}.history-loader__orbit--b{width:78vw;height:28vw;left:11%;top:48%}}
        @media (prefers-reduced-motion:reduce){.history-loader__orbit{animation:none}.history-loader{transition:none}}
      `}</style>
    </div>
  );
}

/** Keep the route mounted through a single renderer. This avoids duplicate Three.js canvases and GPU work. */
class HistoryBoundary extends React.Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: unknown) { console.warn("History experience boundary", error); }
  render() {
    if (this.state.failed) {
      return <main style={{ minHeight: "100vh", background: "#020202", color: "#fff", display: "grid", placeItems: "center", fontFamily: "Inter,system-ui,sans-serif" }}><div style={{ opacity: .65, letterSpacing: ".18em", fontSize: 11 }}>A&O ECOSYSTEM · HISTORY</div></main>;
    }
    return this.props.children;
  }
}

export default function HistoryExperienceLayer() {
  const [entered, setEntered] = useState(false);
  return (
    <div className="history-experience-layer">
      <HistoryBoundary><HistoryImmersiveV8 /></HistoryBoundary>
      {!entered && <CinematicLoader onEnter={() => setEntered(true)} />}
      <style>{`.history-experience-layer{position:relative;min-height:800vh;background:#020202;overflow-x:hidden}.history-experience-layer canvas{display:block}`}</style>
    </div>
  );
}
