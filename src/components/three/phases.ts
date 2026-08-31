/**
 * Narrative timeline of the A&O cinematic engine.
 * Phases are derived from a single 0..1 progress value so the story never
 * restarts: an intro timeline drives it on load, scroll drives the tail.
 */
export const PHASES = {
  VOID: [0.0, 0.14],
  SINGULARITY: [0.14, 0.33],
  EXPLOSION: [0.33, 0.5],
  REASSEMBLY: [0.5, 0.72],
  MATERIALIZATION: [0.72, 0.9],
  DISSOLVE: [0.9, 1.0],
} as const;

export type PhaseName = keyof typeof PHASES;

export const phaseAt = (p: number): PhaseName => {
  const names = Object.keys(PHASES) as PhaseName[];
  for (const name of names) {
    const [, end] = PHASES[name];
    if (p < end) return name;
  }
  return "DISSOLVE";
};

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Normalized 0..1 progress inside a given phase. */
export const localProgress = (p: number, phase: PhaseName) => {
  const [start, end] = PHASES[phase];
  return clamp01((p - start) / (end - start));
};
