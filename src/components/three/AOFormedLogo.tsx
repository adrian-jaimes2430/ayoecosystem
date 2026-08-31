import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { clamp01 } from "./phases";

/**
 * Materialization stage: the particle-formed mark becomes a physical object.
 * Built from the real logo alpha mask extruded across a few depth slices, so
 * it reads as a machined dark-metal plate with white highlights and a very
 * controlled A&O red rim — no neon, no gaming aesthetic.
 */

interface AOFormedLogoProps {
  progress: React.MutableRefObject<number>;
  logoSrc: string;
  size?: number;
  slices?: number;
  accent?: string;
}

const AOFormedLogo = ({
  progress,
  logoSrc,
  size = 4.4,
  slices = 7,
  accent = "#ff3b30",
}: AOFormedLogoProps) => {
  const texture = useLoader(THREE.TextureLoader, logoSrc);
  const group = useRef<THREE.Group>(null);
  const materials = useRef<THREE.Material[]>([]);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
  }, [texture]);

  const aspect = texture.image ? texture.image.width / texture.image.height : 1;
  const w = size;
  const h = size / (aspect || 1);

  const layers = useMemo(
    () =>
      Array.from({ length: slices }, (_, i) => {
        const t = slices === 1 ? 0 : i / (slices - 1);
        return { t, z: (t - 0.5) * 0.22 };
      }),
    [slices],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = progress.current;
    const appear = clamp01((p - 0.7) / 0.14);
    const fade = 1 - clamp01((p - 0.9) / 0.09);
    const o = appear * fade;

    const t = state.clock.getElapsedTime();
    g.visible = o > 0.002;
    g.scale.setScalar(0.86 + appear * 0.14);
    // subtle cinematic sway, never a spinning showroom turntable
    g.rotation.y = Math.sin(t * 0.35) * 0.16 + (1 - appear) * 0.5;
    g.rotation.x = Math.sin(t * 0.27) * 0.06;
    g.position.y = Math.sin(t * 0.5) * 0.04 + (1 - fade) * 0.6;

    for (const m of materials.current) {
      const mm = m as THREE.MeshPhysicalMaterial;
      mm.opacity = o * (mm.userData.baseOpacity ?? 1);
    }
    void delta;
  });

  useEffect(() => {
    const mats = materials.current;
    return () => {
      mats.forEach((m) => m.dispose());
    };
  }, []);

  const register = (m: THREE.Material | null, baseOpacity: number) => {
    if (!m) return;
    m.userData.baseOpacity = baseOpacity;
    if (!materials.current.includes(m)) materials.current.push(m);
  };

  return (
    <group ref={group}>
      {/* dark metal body */}
      {layers.map(({ t, z }, i) => (
        <mesh key={i} position={[0, 0, z]}>
          <planeGeometry args={[w, h]} />
          <meshPhysicalMaterial
            ref={(m) => register(m, 1)}
            map={i === slices - 1 ? texture : undefined}
            alphaMap={texture}
            transparent
            depthWrite={i === slices - 1}
            color={i === slices - 1 ? "#eaeaec" : new THREE.Color("#1b1b1e").lerp(new THREE.Color("#6f7075"), t * 0.5)}
            metalness={0.95}
            roughness={i === slices - 1 ? 0.18 : 0.38}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
            envMapIntensity={1.15}
          />
        </mesh>
      ))}

      {/* controlled A&O red energy behind the mark */}
      <mesh position={[0, 0, -0.34]} scale={1.035}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial
          ref={(m) => register(m, 0.5)}
          alphaMap={texture}
          color={accent}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default AOFormedLogo;
