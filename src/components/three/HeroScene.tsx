import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import GlbModel from "./GlbModel";

const AO_MODEL = "/ao-logo-3d.glb";

/** Cosmic dust so the mark never floats in an empty void. */
const Dust = ({ count = 1400 }: { count?: number }) => {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 12;
      const a = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 10;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(a) * r * 0.6 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    const p = points.current;
    if (!p) return;
    p.rotation.y += Math.min(delta, 0.05) * 0.03;
    p.position.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.4;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#cfd3da"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const Rig = ({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) => {
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const p = scrollRef.current;
    const targetZ = 7.4 + p * 4.5;
    const targetY = 0.2 - p * 1.4;
    state.camera.position.z += (targetZ - state.camera.position.z) * (1 - Math.exp(-3 * dt));
    state.camera.position.y += (targetY - state.camera.position.y) * (1 - Math.exp(-3 * dt));
    state.camera.lookAt(0, 0.2, 0);
  });
  return null;
};

/**
 * CHAPTER 01 — the real A&O 3D mark as the protagonist of the hero:
 * cinematic lighting, cosmic dust, pointer-reactive rotation and a scroll dolly
 * that hands the stage over to chapter 02.
 */
const HeroScene = ({
  scrollRef,
  active = true,
}: {
  scrollRef: React.MutableRefObject<number>;
  active?: boolean;
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const offset = useMemo<[number, number, number]>(
    () => (isMobile ? [0, 0.9, 0] : [1.9, 0.55, 0]),
    [isMobile],
  );
  const size = isMobile ? 2.6 : 3.2;

  const dpr = useMemo<[number, number]>(
    () => (typeof window !== "undefined" && window.innerWidth < 640 ? [1, 1.5] : [1, 2]),
    [],
  );

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position: [0, 0.2, 7.4], fov: 40, near: 0.1, far: 80 }}
    >
      <Rig scrollRef={scrollRef} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 6]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-5, -1, 3]} intensity={5} color="#ff3b30" distance={20} />
      <pointLight position={[0, 2, 4]} intensity={2} color="#ffffff" distance={14} />

      <Environment resolution={128}>
        <Lightformer intensity={2.4} position={[0, 5, 4]} scale={[10, 10, 1]} color="#ffffff" />
        <Lightformer
          intensity={1.4}
          position={[-6, 0, 2]}
          rotation-y={Math.PI / 2}
          scale={[16, 3, 1]}
          color="#9aa0aa"
        />
        <Lightformer
          intensity={1.2}
          position={[6, -1, 2]}
          rotation-y={-Math.PI / 2}
          scale={[16, 3, 1]}
          color="#ff3b30"
        />
      </Environment>

      <Dust />

      <Suspense fallback={null}>
        {/* offset to the right on desktop so the headline keeps the stage */}
        <group position={offset}>
          <GlbModel url={AO_MODEL} size={size} accent="#ff3b30" />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
