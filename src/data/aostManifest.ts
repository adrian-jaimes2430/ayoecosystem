export const aostManifest = {
  status: "prepared-not-active",
  narrator: "Marel",
  route: "/aost",
  experience: "interactive-mini-game",
  chapters: [
    { id: "auren", name: "Auren.ai", state: "reserved" },
    { id: "habits", name: "Habits", state: "reserved" },
    { id: "da", name: "DA", state: "reserved" },
    { id: "fa", name: "FA", state: "reserved" },
    { id: "fd", name: "FD", state: "reserved" },
    { id: "master-money", name: "Club Master Money", state: "integrated-concept" },
    { id: "future", name: "Future systems", state: "extensible" },
  ],
  rules: [
    "Do not activate the /aost route from History until the dedicated Marel experience is ready.",
    "A&O ST is a system-tools universe, not a replacement brand for any single tool.",
    "New tools must enter through this manifest so the narrative remains extensible.",
  ],
} as const;
