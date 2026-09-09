import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

export type UnitShape = "icosahedron" | "torus" | "octahedron" | "box";

/**
 * A single interactive 3D object representing ONE business unit.
 * Lives inside that unit's own section so each brand is presented on its own.
 */
const Solid = ({
  shape,
  color,
  reduced,
}: {
  shape: UnitShape;
  color: string;
  reduced: boolean;
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    const dt = Math.min(delta, 0.05);
    const t = state.clock.getElapsedTime();
    const speed = reduced ? 0.1 : hovered ? 1.4 : 0.3;
    m.rotation.y += speed * dt;
    m.rotation.x += speed * 0.25 * dt;
    const ty = reduced ? 0 : Math.sin(t * 0.8) * 0.1;
    m.position.y += (ty - m.position.y) * (1 - Math.exp(-6 * dt));
    const s = hovered ? 1.14 : 1;
    m.scale.lerp(new THREE.Vector3(s, s, s), 1 - Math.exp(-8 * dt));
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case "torus":
        return <torusKnotGeometry args={[0.6, 0.2, 128, 24]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.95, 0]} />;
      case "box":
        return <boxGeometry args={[1.1, 1.1, 1.1]} />;
      default:
        return <icosahedronGeometry args={[0.95, 0]} />;
    }
  }, [shape]);

  return (
    <mesh
      ref={mesh}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
    >
      {geometry}
      <meshPhysicalMaterial
        color="#2b2b31"
        metalness={0.92}
        roughness={0.18}
        clearcoat={0.8}
        clearcoatRoughness={0.16}
        emissive={new THREE.Color(color)}
        emissiveIntensity={hovered ? 0.85 : 0.3}
        envMapIntensity={1.6}
      />
    </mesh>
  );
};

const UnitObject = ({
  shape,
  color,
  active = true,
  className,
}: {
  shape: UnitShape;
  color: string;
  /** When false the canvas stops rendering (off-screen power saving). */
  active?: boolean;
  className?: string;
}) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const dpr = useMemo<[number, number]>(
    () => (typeof window !== "undefined" && window.innerWidth < 640 ? [1, 1.5] : [1, 2]),
    [],
  );

  return (
    <div className={className}>
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 3.4], fov: 42 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[3, 5, 5]} intensity={1.3} />
          <Environment resolution={64}>
            <Lightformer intensity={2} position={[0, 4, 3]} scale={[8, 8, 1]} color="#ffffff" />
            <Lightformer
              intensity={1.1}
              position={[-4, 0, 2]}
              rotation-y={Math.PI / 2}
              scale={[10, 2, 1]}
              color={color}
            />
          </Environment>
          <Solid shape={shape} color={color} reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default UnitObject;
