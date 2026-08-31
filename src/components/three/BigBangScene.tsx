import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import ParticleGenesis from "./ParticleGenesis";
import AOFormedLogo from "./AOFormedLogo";
import CinematicCamera from "./CinematicCamera";
import { clamp01, phaseAt, type PhaseName } from "./phases";

/**
 * CHAPTER 01 — "A&O BIG BANG / THE ECOSYSTEM IS BORN".
 *
 * A single progress value (0..1) drives the whole story:
 *   VOID -> SINGULARITY -> EXPLOSION -> REASSEMBLY -> MATERIALIZATION -> DISSOLVE
 * The intro timeline plays it once up to MATERIALIZATION; from there the hero's
 * scroll owns the tail so nothing ever restarts.
 *
 * Reusable engine: pass a different logo, accent and particle budget to build
 * the chapter for INVERFACT, NOMADHIVE, ANMA or CLUB MASTER MONEY.
 */

export interface BigBangSceneProps {
  /** 0..1 scroll progress of the host section. */
  scrollRef: React.MutableRefObject<number>;
  logoSrc?: string;
  accent?: string;
  /** Seconds the intro takes to reach the materialized mark. */
  introDuration?: number;
  onPhase?: (phase: PhaseName) => void;
}

const INTRO_CEILING = 0.82;

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
};

const Rig = ({
  scrollRef,
  logoSrc,
  accent,
  count,
  introDuration,
  reduced,
  onPhase,
}: {
  scrollRef: React.MutableRefObject<number>;
  logoSrc: string;
  accent: string;
  count: number;
  introDuration: number;
  reduced: boolean;
  onPhase?: (p: PhaseName) => void;
}) => {
  const progress = useRef(reduced ? INTRO_CEILING : 0);
  const started = useRef<number | null>(null);
  const lastPhase = useRef<PhaseName | null>(null);

  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      if (started.current === null) started.current = now;
      const elapsed = (now - started.current) / 1000;
      const intro = reduced
        ? INTRO_CEILING
        : clamp01(elapsed / introDuration) * INTRO_CEILING;
      const tail = clamp01(scrollRef.current) * (1 - INTRO_CEILING);
      progress.current =
        intro < INTRO_CEILING - 1e-3 ? intro : clamp01(INTRO_CEILING + tail);
      const phase = phaseAt(progress.current);
      if (phase !== lastPhase.current) {
        lastPhase.current = phase;
        onPhase?.(phase);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [introDuration, reduced, scrollRef, onPhase]);

  return (
    <>
      <CinematicCamera progress={progress} parallax={!reduced} />

      <ambientLight intensity={0.22} />
      <directionalLight position={[4, 6, 6]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-5, -2, 3]} intensity={2.4} color={accent} distance={16} />
      <pointLight position={[0, 0, 1.6]} intensity={1.1} color="#ffffff" distance={9} />

      <Environment resolution={128}>
        <Lightformer intensity={2.2} position={[0, 4, 3]} scale={[8, 8, 1]} color="#ffffff" />
        <Lightformer
          intensity={1.1}
          position={[-5, 0, 1]}
          rotation-y={Math.PI / 2}
          scale={[14, 2, 1]}
          color="#8a8a90"
        />
        <Lightformer
          intensity={0.9}
          position={[5, -1, 1]}
          rotation-y={-Math.PI / 2}
          scale={[14, 2, 1]}
          color={accent}
        />
      </Environment>

      <ParticleGenesis
        progress={progress}
        count={count}
        logoSrc={logoSrc}
        pointSize={reduced ? 2.2 : 2.7}
      />

      <Suspense fallback={null}>
        <AOFormedLogo progress={progress} logoSrc={logoSrc} accent={accent} />
      </Suspense>
    </>
  );
};

const BigBangScene = ({
  scrollRef,
  logoSrc = "/logo-ao-light.png",
  accent = "#ff3b30",
  introDuration = 9,
  onPhase,
}: BigBangSceneProps) => {
  const reduced = useReducedMotion();

  const count = useMemo(() => {
    if (typeof window === "undefined") return 24000;
    const w = window.innerWidth;
    const cores = navigator.hardwareConcurrency ?? 4;
    const weak = cores <= 4;
    if (w < 640) return weak ? 9000 : 14000;
    if (w < 1024) return weak ? 16000 : 24000;
    return weak ? 24000 : 42000;
  }, []);

  const dpr = useMemo<[number, number]>(
    () => (typeof window !== "undefined" && window.innerWidth < 640 ? [1, 1.5] : [1, 2]),
    [],
  );

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position: [0, 1.2, 20], fov: 38, near: 0.1, far: 120 }}
    >
      <Suspense fallback={null}>
        <Rig
          scrollRef={scrollRef}
          logoSrc={logoSrc}
          accent={accent}
          count={reduced ? Math.round(count * 0.35) : count}
          introDuration={introDuration}
          reduced={reduced}
          onPhase={onPhase}
        />
      </Suspense>
    </Canvas>
  );
};

export default BigBangScene;
