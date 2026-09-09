import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { clamp01 } from "./phases";

const MODEL_URL = "/ao-logo-3d.glb";

/**
 * Real A&O 3D mark (GLB) as the hero protagonist — Active Theory style:
 * cinematic float, pointer-driven rotation, metallic finish with red rim.
 */
interface AOLogoModelProps {
  progress: React.MutableRefObject<number>;
  accent?: string;
  /** Story progress at which the object starts appearing. */
  appearAt?: number;
}

const AOLogoModel = ({ progress, accent = "#ff3b30", appearAt = 0.62 }: AOLogoModelProps) => {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<THREE.Group>(null);
  const drag = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const object = useMemo(() => {
    const clone = scene.clone(true);
    // Normalize: center the mark and fit it to a predictable world size.
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    clone.position.sub(center);
    const wrapper = new THREE.Group();
    wrapper.add(clone);
    wrapper.scale.setScalar(4.6 / maxAxis);

    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const base = mesh.material as THREE.MeshStandardMaterial;
      mesh.material = new THREE.MeshPhysicalMaterial({
        map: base?.map ?? null,
        color: base?.map ? new THREE.Color("#ffffff") : new THREE.Color("#c9ccd2"),
        metalness: 0.9,
        roughness: 0.22,
        clearcoat: 0.7,
        clearcoatRoughness: 0.18,
        envMapIntensity: 1.35,
        emissive: new THREE.Color(accent),
        emissiveIntensity: 0.18,
        transparent: true,
      });
      mesh.castShadow = false;
      mesh.receiveShadow = false;
    });

    return wrapper;
  }, [scene, accent]);

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
    const p = progress.current;
    const appear = clamp01((p - appearAt) / 0.16);
    const o = appear;

    g.visible = o > 0.004;
    if (!g.visible) return;

    const t = state.clock.getElapsedTime();
    drag.current += dt * 0.22;

    const targetY = pointer.current.x * 0.55 + drag.current + (1 - appear) * 0.8;
    const targetX = --pointer.current.y * 0.32 + Math.sin(t * 0.4) * 0.05;
    g.rotation.y += (targetY - g.rotation.y) * (1 - Math.exp(-4 * dt));
    g.rotation.x += (targetX - g.rotation.x) * (1 - Math.exp(-4 * dt));
    g.position.y = Math.sin(t * 0.55) * 0.12;
    g.scale.setScalar(0.82 + appear * 0.18);

    object.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      mat.opacity = o;
      mat.emissiveIntensity = 0.14 + Math.sin(t * 1.2) * 0.05;
    });
  });

  return (
    <group ref={group}>
      <primitive object={object} />
    </group>
  );
};

useGLTF.preload(MODEL_URL);

export default AOLogoModel;
