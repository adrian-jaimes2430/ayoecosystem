import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

/**
 * Aurora / orb scene used behind the hero.
 * Pure GPU, very light: 3 distorted spheres + sparkles + subtle gradient.
 * Apple-like calm motion, not a busy demo.
 */

function Orb({
  position,
  color,
  scale = 1,
  speed = 1,
  distort = 0.35,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  distort?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t * 0.15 * speed) * 0.4;
    ref.current.rotation.y = t * 0.08 * speed;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.6}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 96, 96]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={1.2}
          roughness={0.15}
          metalness={0.7}
          emissive={color}
          emissiveIntensity={0.35}
        />
      </mesh>
    </Float>
  );
}

const AuroraScene = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#ff3b3b" />
        <pointLight position={[-6, -3, 2]} intensity={0.8} color="#ffffff" />

        <Orb position={[-2.2, 0.4, 0]} color="#e8252b" scale={1.6} distort={0.4} />
        <Orb position={[2.4, -0.6, -1]} color="#1d1d1f" scale={1.9} speed={0.7} distort={0.55} />
        <Orb position={[0, 1.6, -2]} color="#f5f5f7" scale={0.9} speed={1.3} distort={0.3} />

        <Sparkles
          count={120}
          scale={[10, 6, 4]}
          size={2.5}
          speed={0.35}
          opacity={0.6}
          color="#ffffff"
        />
      </Suspense>
    </Canvas>
  );
};

export default AuroraScene;