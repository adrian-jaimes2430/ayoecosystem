import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { clamp01 } from "./phases";

/**
 * Camera as narrator: far in the void, dives toward the singularity, rides the
 * explosion, settles on the formed mark, then opens the frame for chapter 02.
 * Keyframes are progress-driven, with damped mouse parallax on top.
 */

interface Keyframe {
  p: number;
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
}

const KEYS: Keyframe[] = [
  { p: 0.0, pos: [0, 1.2, 20], look: [0, 0, 0], fov: 38 },
  { p: 0.28, pos: [0.6, 0.4, 6.2], look: [0, 0, 0], fov: 46 },
  { p: 0.42, pos: [-0.8, -0.3, 3.4], look: [0, 0, 0], fov: 62 },
  { p: 0.62, pos: [0.4, 0.2, 8.4], look: [0, 0, 0], fov: 44 },
  { p: 0.8, pos: [0, 0, 6.4], look: [0, 0, 0], fov: 38 },
  { p: 1.0, pos: [0, 0.5, 9.2], look: [0, 0, 0], fov: 42 },
];

const CinematicCamera = ({
  progress,
  parallax = true,
}: {
  progress: React.MutableRefObject<number>;
  parallax?: boolean;
}) => {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef(new THREE.Vector3());
  const pos = useRef(new THREE.Vector3(0, 1.2, 20));

  useEffect(() => {
    if (!parallax) return;
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [parallax]);

  useFrame((_, delta) => {
    const p = clamp01(progress.current);
    let a = KEYS[0];
    let b = KEYS[KEYS.length - 1];
    for (let i = 0; i < KEYS.length - 1; i++) {
      if (p >= KEYS[i].p && p <= KEYS[i + 1].p) {
        a = KEYS[i];
        b = KEYS[i + 1];
        break;
      }
    }
    const span = Math.max(b.p - a.p, 1e-4);
    const t = clamp01((p - a.p) / span);
    const e = t * t * (3 - 2 * t);

    pos.current.set(
      THREE.MathUtils.lerp(a.pos[0], b.pos[0], e),
      THREE.MathUtils.lerp(a.pos[1], b.pos[1], e),
      THREE.MathUtils.lerp(a.pos[2], b.pos[2], e),
    );
    if (parallax) {
      pos.current.x += mouse.current.x * 0.55;
      pos.current.y += -mouse.current.y * 0.35;
    }

    const k = 1 - Math.exp(-6 * Math.min(delta, 0.05));
    camera.position.lerp(pos.current, k);

    target.current.set(
      THREE.MathUtils.lerp(a.look[0], b.look[0], e),
      THREE.MathUtils.lerp(a.look[1], b.look[1], e),
      THREE.MathUtils.lerp(a.look[2], b.look[2], e),
    );
    camera.lookAt(target.current);

    const fov = THREE.MathUtils.lerp(a.fov, b.fov, e);
    if (Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, k);
      camera.updateProjectionMatrix();
    }
  });

  return null;
};

export default CinematicCamera;
