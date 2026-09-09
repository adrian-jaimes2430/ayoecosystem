import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment, Html, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/**
 * Interactive 3D objects — one per business unit.
 * Each object reacts to hover (lift, spin-up, emissive rim) and to click
 * (navigates to its unit). Rendered in a single canvas for performance:
 * capped DPR, no post-processing, low-poly geometry, star field as Points.
 */

export interface OrbUnit {
  id: string;
  label: string;
  color: string;
  href: string;
  shape: "icosahedron" | "torus" | "octahedron" | "box";
}

const Orb = ({
  unit,
  index,
  total,
  onSelect,
  reduced,
}: {
  unit: OrbUnit;
  index: number;
  total: number;
  onSelect: (u: OrbUnit) => void;
  reduced: boolean;
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const spread = 2.35;
  const x = (index - (total - 1) / 2) * spread;

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    const dt = Math.min(delta, 0.05);
    const t = state.clock.getElapsedTime();
    const speed = reduced ? 0.12 : hovered ? 1.5 : 0.35;
    m.rotation.y += speed * dt;
    m.rotation.z += speed * 0.35 * dt;
    const targetY = (reduced ? 0 : Math.sin(t * 0.7 + index) * 0.12) + (hovered ? 0.28 : 0);
    m.position.y += (targetY - m.position.y) * (1 - Math.exp(-8 * dt));
    const s = hovered ? 1.16 : 1;
    m.scale.lerp(new THREE.Vector3(s, s, s), 1 - Math.exp(-8 * dt));
  });

  const geometry = useMemo(() => {
    switch (unit.shape) {
      case "torus":
        return <torusKnotGeometry args={[0.62, 0.2, 96, 16]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.92, 0]} />;
      case "box":
        return <boxGeometry args={[1.15, 1.15, 1.15]} />;
      default:
        return <icosahedronGeometry args={[0.95, 0]} />;
    }
  }, [unit.shape]);

  const enter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };
  const leave = () => {
    setHovered(false);
    document.body.style.cursor = "";
  };

  return (
    <group position={[x, 0, 0]}>
      <mesh
        ref={mesh}
        castShadow
        onPointerOver={enter}
        onPointerOut={leave}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(unit);
        }}
      >
        {geometry}
        <meshPhysicalMaterial
          color="#2b2b31"
          metalness={0.9}
          roughness={0.2}
          clearcoat={0.7}
          clearcoatRoughness={0.18}
          emissive={new THREE.Color(unit.color)}
          emissiveIntensity={hovered ? 0.7 : 0.28}
          envMapIntensity={1.5}
        />
      </mesh>

      <Html center position={[0, -1.5, 0]} distanceFactor={7} zIndexRange={[10, 0]}>
        <button
          onClick={() => onSelect(unit)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={leave}
          className="whitespace-nowrap rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.25em] transition-all duration-300"
          style={{
            borderColor: `${unit.color}66`,
            color: unit.color,
            background: hovered ? `${unit.color}22` : "transparent",
          }}
        >
          {unit.label}
        </button>
      </Html>
    </group>
  );
};

const Stars = ({ reduced }: { reduced: boolean }) => {
  const points = useRef<THREE.Points>(null);
  const count = reduced ? 500 : 1400;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 34;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = -6 - Math.random() * 20;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (points.current && !reduced) points.current.rotation.z += 0.01 * Math.min(delta, 0.05);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#ffffff" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
};

const EcosystemOrbs = ({
  units,
  onSelect,
  active = true,
}: {
  units: OrbUnit[];
  onSelect: (u: OrbUnit) => void;
  /** When false the canvas stops rendering (off-screen power saving). */
  active?: boolean;
}) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const dpr = useMemo<[number, number]>(
    () => (typeof window !== "undefined" && window.innerWidth < 640 ? [1, 1.5] : [1, 2]),
    [],
  );

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 8.2], fov: 40 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 6]} intensity={1.4} />
        <Environment resolution={64}>
          <Lightformer intensity={2} position={[0, 4, 3]} scale={[8, 8, 1]} color="#ffffff" />
          <Lightformer
            intensity={1}
            position={[-5, 0, 2]}
            rotation-y={Math.PI / 2}
            scale={[12, 2, 1]}
            color="#8a8a90"
          />
        </Environment>
        <Stars reduced={reduced} />
        {units.map((u, i) => (
          <Orb
            key={u.id}
            unit={u}
            index={i}
            total={units.length}
            onSelect={onSelect}
            reduced={reduced}
          />
        ))}
      </Suspense>
    </Canvas>
  );
};

export default EcosystemOrbs;
