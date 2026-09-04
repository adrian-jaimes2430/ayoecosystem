import React, { ReactNode } from "react";
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
  return <div className="history-experience-layer"><HistoryBoundary><HistoryImmersiveV8 /></HistoryBoundary><style>{`.history-experience-layer{position:relative;min-height:800vh;background:#020202;overflow-x:hidden}.history-experience-layer canvas{display:block}`}</style></div>;
}
