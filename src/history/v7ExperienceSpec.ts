export const historyV7 = {
  version: "7.0",
  principles: [
    "The page is the stage; scroll is camera; objects tell the story.",
    "A&O appears only when narratively necessary: birth, structure and final convergence.",
    "Each business unit owns a distinct visual universe and physical language.",
    "CTA elements are in-world portals, never rectangular UI buttons.",
    "Each chapter causes the next chapter: energy and particles transition between universes.",
    "Copy enters cinematically in synchronized blocks, never as static paragraphs.",
    "Audio is one continuous soundtrack with first-gesture unlock and persistent mute control.",
    "A&O System Tools is a future-ready chapter; Marel and the mini-game are intentionally reserved for a later build."
  ],
  sequence: [
    { id: "01", name: "ORIGEN", transition: "void -> singularity -> big bang -> particle memory" },
    { id: "02", name: "A&O", transition: "particles -> wireframe -> premium solid object" },
    { id: "03", name: "INVERFACT", transition: "A&O energy -> gold data nodes -> financial world" },
    { id: "04", name: "NOMADHIVE", transition: "gold nodes -> emerald nodes -> hex hive -> global network" },
    { id: "05", name: "ANMA", transition: "network nodes -> commerce grid -> product flow -> ANMA artifact" },
    { id: "06", name: "A&O SYSTEM TOOLS", transition: "commerce/data traces -> intelligent system -> tools constellation" },
    { id: "07", name: "CONVERGENCE", transition: "four brand energies -> central A&O field" },
    { id: "08", name: "A&O ECOSYSTEM", transition: "all accumulated particles -> A&O Ecosystem -> infinite expansion" }
  ],
  portals: {
    inverfact: { route: "/inverfact", label: "ENTRAR EN INVERFACT", color: "#ffb21a" },
    nomadhive: { route: "/nomadhive", label: "ENTRAR EN NOMADHIVE", color: "#28e879" },
    anma: { route: "/anma", label: "ENTRAR EN ANMA", color: "#ff8514" },
    aost: { route: "", label: "EXPLORAR A&O SYSTEM TOOLS", color: "#b8a6ff", future: true }
  },
  aostTools: ["Auren.ai", "Habits", "DA", "FA", "FD", "Club Master Money", "Future Systems"],
  audio: {
    source: "/audio/history-track-01.mp3",
    githubSourceName: "track 1 A&O story telling.mp3",
    start: "first_user_gesture_or_scroll",
    loop: true,
    defaultVolume: 0.42,
    singleTrack: true
  },
  futureMarel: {
    reservedChapter: "A&O SYSTEM TOOLS",
    host: "Marel",
    interaction: "mini-game / guided exploration",
    enabled: false
  }
} as const;
