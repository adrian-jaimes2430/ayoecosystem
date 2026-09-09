import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface GlbModelProps {
  url: string;
  /** Brand accent used for the rim glow. */
  accent?: string;
  /** World size of the longest axis. */
  size?: number;
  /** Idle auto-rotation speed (rad/s). */
  spin?: number;
  /** Pointer influence (0 disables). */
  pointerInfluence?: number;
  onClick?: () => void;
}

/**
 * Interactive 3D brand mark loaded from a GLB.
 * Normalized, re-materialized as dark metal with a brand-red rim, floating and
 * reacting to the pointer — the Active Theory style object treatment.
 */
const GlbModel = ({
  url,
  accent = "#ff3b30",
  size = 3.2,
  spin = 0.28,
  pointerInfluence = 0.45,
  onClick,
}: GlbModelProps) => {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  const drag = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!pointerInfluence) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerInfluence]);

  const object = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const dim = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(dim);
    box.getCenter(center);
    clone.position.sub(center);

    const wrapper = new THREE.Group();
    wrapper.add(clone);
    wrapper.scale.setScalar(size / (Math.max(dim.x, dim.y, dim.z) || 1));

    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const base = mesh.material as THREE.MeshStandardMaterial;
      mesh.material = new THREE.MeshPhysicalMaterial({
        map: base?.map ?? null,
        color: base?.map ? new THREE.Color("#ffffff") : new THREE.Color("#c8ccd3"),
        metalness: 0.85,
        roughness: 0.24,
        clearcoat: 0.7,
        clearcoatRoughness: 0.18,
        envMapIntensity: 1.4,
        emissive: new THREE.Color(accent),
        emissiveIntensity: 0.2,
        side: THREE.DoubleSide,
      });
    });

    return wrapper;
  }, [scene, size, accent]);

  useEffect(() => {
    return () => {
      object.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) (mesh.material as THREE.Material).dispose();
      });
    };
  }, [object]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    const t = state.clock.getElapsedTime();
    drag.current += dt * (hovered ? spin * 2.6 : spin);

    const ty = pointer.current.x * pointerInfluence + drag.current;
    const tx = -pointer.current.y * pointerInfluence * 0.6 + Math.sin(t * 0.4) * 0.06;
    g.rotation.y += (ty - g.rotation.y) * (1 - Math.exp(-4 * dt));
    g.rotation.x += (tx - g.rotation.x) * (1 - Math.exp(-4 * dt));
    g.position.y = Math.sin(t * 0.6) * 0.09;

    const s = hovered ? 1.08 : 1;
    g.scale.lerp(new THREE.Vector3(s, s, s), 1 - Math.exp(-8 * dt));

    object.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = (hovered ? 0.5 : 0.18) + Math.sin(t * 1.3) * 0.04;
    });
  });

  return (
    <group
      ref={group}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = onClick ? "pointer" : "grab";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
      onClick={onClick}
    >
      <primitive object={object} />
    </group>
  );
};

export default GlbModel;
