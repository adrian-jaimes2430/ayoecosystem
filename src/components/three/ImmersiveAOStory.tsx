import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Sparkles, Text, ContactShadows } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const UNIT_COLORS = {
  ao: "#e22b2f",
  inverfact: "#d8b35a",
  nomadhive: "#60e0ff",
  anma: "#ff8a2a",
} as const;

type Unit = keyof typeof UNIT_COLORS;

function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, delta) => {
    const angle = progress * Math.PI * 1.7 + Math.sin(progress * Math.PI) * 0.2;
    const radius = 8.2 - progress * 1.25;
    target.set(
      Math.sin(angle) * radius,
      2.0 + Math.sin(progress * Math.PI * 2) * 0.55,
      Math.cos(angle) * radius,
    );
    camera.position.lerp(target, 1 - Math.pow(0.001, delta));
    camera.lookAt(0, 0.6, 0);
  });
  return null;
}

function Core() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.16;
    ref.current.rotation.x = Math.sin(t * 0.22) * 0.12;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.55}>
      <mesh ref={ref} position={[0, 0.55, 0]}>
        <icosahedronGeometry args={[1.28, 4]} />
        <meshPhysicalMaterial
          color="#1a1a1d"
          metalness={0.92}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.06}
          transmission={0.16}
          emissive="#250506"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh position={[0, 0.55, 0]} scale={1.5}>
        <torusGeometry args={[1.24, 0.018, 24, 240]} />
        <meshBasicMaterial color={UNIT_COLORS.ao} transparent opacity={0.75} />
      </mesh>
    </Float>
  );
}

function UnitNode({ unit, angle, radius, progress }: { unit: Unit; angle: number; radius: number; progress: number }) {
  const ref = useRef<THREE.Group>(null!);
  const color = UNIT_COLORS[unit];
  useFrame((_, delta) => {
    const spin = angle + progress * Math.PI * 1.6;
    const x = Math.cos(spin) * radius;
    const z = Math.sin(spin) * radius;
    const y = 0.55 + Math.sin(spin * 1.7 + progress * 5) * 0.36;
    ref.current.position.lerp(new THREE.Vector3(x, y, z), 1 - Math.pow(0.002, delta));
    ref.current.rotation.y += delta * 0.22;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.34, 48, 48]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} metalness={0.55} roughness={0.2} />
      </mesh>
      <mesh scale={1.8}>
        <torusGeometry args={[0.34, 0.012, 16, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function Connection({ unit, angle, radius, progress }: { unit: Unit; angle: number; radius: number; progress: number }) {
  const color = UNIT_COLORS[unit];
  const points = useMemo(() => new Float32Array(6), []);
  const line = useRef<THREE.Line>(null!);
  useFrame(() => {
    const spin = angle + progress * Math.PI * 1.6;
    const x = Math.cos(spin) * radius;
    const z = Math.sin(spin) * radius;
    const y = 0.55 + Math.sin(spin * 1.7 + progress * 5) * 0.36;
    points[0] = 0;
    points[1] = 0.55;
    points[2] = 0;
    points[3] = x;
    points[4] = y;
    points[5] = z;
    (line.current.geometry as THREE.BufferGeometry).setAttribute("position", new THREE.BufferAttribute(points, 3));
    (line.current.geometry as THREE.BufferGeometry).computeBoundingSphere();
  });
  return (
    <line ref={line}>
      <bufferGeometry />
      <lineBasicMaterial color={color} transparent opacity={0.25} />
    </line>
  );
}

function StoryWorld({ progress, chapter }: { progress: number; chapter: string }) {
  const units = useMemo<Unit[]>(() => ["inverfact", "nomadhive", "anma"], []);
  const stage = chapter === "prologue" || chapter === "search" ? 0 : chapter === "ecosystem" || chapter === "future" ? 1 : 0.65;
  const radius = 2.35 + stage * 1.15;
  return (
    <>
      <color attach="background" args={["#050507"]} />
      <fog attach="fog" args={["#050507", 8, 18]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 4, 4]} intensity={18} distance={12} color={UNIT_COLORS.ao} />
      <pointLight position={[-4, 2, 2]} intensity={7} distance={10} color="#ffffff" />
      <pointLight position={[0, -2, -4]} intensity={8} distance={9} color="#6f79ff" />
      <Environment preset="city" />
      <Core />
      {units.map((unit, index) => {
        const angle = (index / units.length) * Math.PI * 2;
        return (
          <group key={unit}>
            <UnitNode unit={unit} angle={angle} radius={radius} progress={progress} />
            <Connection unit={unit} angle={angle} radius={radius} progress={progress} />
          </group>
        );
      })}
      <Float speed={0.65} rotationIntensity={0.15} floatIntensity={0.35}>
        <Text
          position={[0, -1.25, 0]}
          fontSize={0.17}
          maxWidth={5.8}
          lineHeight={1.3}
          letterSpacing={0.08}
          textAlign="center"
          color="#f2f2f2"
        >
          EX STRUCTURA, PROSPERITAS
        </Text>
      </Float>
      <Sparkles count={220} scale={[10, 6, 10]} size={1.7} speed={0.22} opacity={0.5} color="#ffffff" />
      <ContactShadows position={[0, -0.95, 0]} opacity={0.45} scale={12} blur={2.5} far={5.5} />
      <CameraRig progress={progress} />
    </>
  );
}

export default function ImmersiveAOStory({ progress, chapter }: { progress: number; chapter: string }) {
  return (
    <Canvas
      dpr={[1, 1.7]}
      camera={{ position: [0, 2, 8], fov: 38 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      frameloop="always"
    >
      <StoryWorld progress={progress} chapter={chapter} />
    </Canvas>
  );
}
