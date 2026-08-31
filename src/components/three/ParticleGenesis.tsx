import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sampleLogo } from "./logoSampler";

/**
 * Particle engine driving VOID -> SINGULARITY -> EXPLOSION -> REASSEMBLY ->
 * MATERIALIZATION -> DISSOLVE. All state transitions happen on the GPU from a
 * single uProgress uniform, so it is frame-rate independent and reusable:
 * swap `logoSrc`, `colorA`/`colorB` and the same motor serves any brand.
 */

const vertex = /* glsl */ `
  attribute vec3 aCloud;
  attribute vec3 aTarget;
  attribute vec3 aDir;
  attribute float aSeed;
  attribute float aAccent;

  uniform float uProgress;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;

  varying float vAlpha;
  varying float vAccent;
  varying float vEnergy;

  float ease(float t) { return t * t * (3.0 - 2.0 * t); }

  void main() {
    float p = uProgress;
    float t = uTime;

    // --- VOID: slow drifting cosmic dust
    vec3 drift = vec3(
      sin(t * 0.12 + aSeed * 6.283) * 0.28,
      cos(t * 0.09 + aSeed * 4.71) * 0.24,
      sin(t * 0.07 + aSeed * 2.1) * 0.2
    );
    vec3 pos = aCloud + drift;

    // --- SINGULARITY: pulled toward the center, orbiting faster as it tightens
    float sing = ease(smoothstep(0.10, 0.33, p));
    float radius = mix(1.0, 0.055, sing);
    float spin = sing * (2.6 + aSeed * 2.0) + t * (0.25 + sing * 2.2);
    float cs = cos(spin), sn = sin(spin);
    vec3 swirl = vec3(pos.x * cs - pos.z * sn, pos.y, pos.x * sn + pos.z * cs);
    pos = mix(pos, swirl * radius, sing);

    // --- EXPLOSION: violent outward burst with turbulence
    float boom = ease(smoothstep(0.33, 0.52, p));
    float shock = sin(boom * 3.14159);
    vec3 burst = aDir * (0.4 + aSeed * 9.0) * boom;
    burst += vec3(
      sin(aSeed * 31.0 + t * 0.6),
      cos(aSeed * 17.0 + t * 0.5),
      sin(aSeed * 11.0 + t * 0.4)
    ) * shock * 1.1;
    pos += burst;

    // --- REASSEMBLY: particles find the real A&O silhouette
    float form = ease(smoothstep(0.5, 0.74, p));
    vec3 approach = aTarget + vec3(
      sin(t * 0.7 + aSeed * 9.0),
      cos(t * 0.6 + aSeed * 7.0),
      sin(t * 0.5 + aSeed * 5.0)
    ) * (1.0 - form) * 0.55;
    pos = mix(pos, approach, form);

    // --- MATERIALIZATION: micro breathing over the formed mark
    float mat = smoothstep(0.72, 0.9, p);
    pos += normalize(aTarget + vec3(0.001)) * sin(t * 1.4 + aSeed * 6.283) * 0.03 * mat;

    // --- DISSOLVE: gentle lift and scatter, handing over to chapter 02
    float diss = ease(smoothstep(0.9, 1.0, p));
    pos += vec3(aDir.x * 1.6, abs(aDir.y) * 2.4 + 0.6, aDir.z * 1.6) * diss;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float energy = sing * 0.6 + shock * 0.9 + mat * 0.5;
    vEnergy = energy;
    vAccent = aAccent;

    float appear = smoothstep(0.0, 0.08, p) * 0.55 + 0.45;
    float visible = mix(0.34, 1.0, form) * appear;
    visible *= 1.0 - diss * 0.92;
    visible *= 1.0 - mat * 0.35;          // fade behind the solid object
    vAlpha = visible;

    float size = uSize * (0.55 + aSeed * 0.85) * (1.0 + energy * 0.7);
    gl_PointSize = size * uPixelRatio * (300.0 / max(-mv.z, 0.6));
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform vec3 uColor;
  uniform vec3 uAccent;
  varying float vAlpha;
  varying float vAccent;
  varying float vEnergy;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    // soft radial falloff + tight core = glow without a bloom pass
    float core = smoothstep(0.5, 0.0, d);
    float halo = pow(core, 3.0);
    vec3 col = mix(uColor, uAccent, vAccent);
    col += vec3(0.35, 0.12, 0.1) * vEnergy * vAccent;
    gl_FragColor = vec4(col, (halo * 0.85 + core * 0.25) * vAlpha);
    if (gl_FragColor.a < 0.01) discard;
  }
`;

interface ParticleGenesisProps {
  progress: React.MutableRefObject<number>;
  count: number;
  logoSrc: string;
  logoSize?: number;
  color?: string;
  accent?: string;
  pointSize?: number;
}

const ParticleGenesis = ({
  progress,
  count,
  logoSrc,
  logoSize = 4.4,
  color = "#f5f5f7",
  accent = "#ff3b30",
  pointSize = 2.6,
}: ParticleGenesisProps) => {
  const [target, setTarget] = useState<Float32Array | null>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => {
    let alive = true;
    sampleLogo(logoSrc, { count, size: logoSize })
      .then((s) => {
        if (alive) setTarget(s.positions);
      })
      .catch(() => {
        if (alive) setTarget(new Float32Array(count * 3));
      });
    return () => {
      alive = false;
    };
  }, [logoSrc, count, logoSize]);

  const attrs = useMemo(() => {
    const cloud = new Float32Array(count * 3);
    const dir = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const acc = new Float32Array(count);
    const v = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      // wide cosmic dust shell
      const r = 6 + Math.pow(Math.random(), 0.6) * 12;
      v.setFromSphericalCoords(
        r,
        Math.acos(2 * Math.random() - 1),
        Math.random() * Math.PI * 2,
      );
      cloud.set([v.x, v.y * 0.7, v.z], i * 3);

      v.set(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
      ).normalize();
      dir.set([v.x, v.y, v.z], i * 3);

      seed[i] = Math.random();
      acc[i] = Math.random() < 0.09 ? 1 : 0; // a few A&O red points
    }
    return { cloud, dir, seed, acc };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: pointSize },
      uPixelRatio: { value: Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1) },
      uColor: { value: new THREE.Color(color) },
      uAccent: { value: new THREE.Color(accent) },
    }),
    [color, accent, pointSize],
  );

  useFrame((state, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value += Math.min(delta, 0.05);
    m.uniforms.uProgress.value = progress.current;
  });

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(attrs.cloud.slice(), 3));
    g.setAttribute("aCloud", new THREE.BufferAttribute(attrs.cloud, 3));
    g.setAttribute("aDir", new THREE.BufferAttribute(attrs.dir, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(attrs.seed, 1));
    g.setAttribute("aAccent", new THREE.BufferAttribute(attrs.acc, 1));
    g.setAttribute(
      "aTarget",
      new THREE.BufferAttribute(target ?? new Float32Array(count * 3), 3),
    );
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 40);
    return g;
  }, [attrs, target, count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <points frustumCulled={false}>
      <primitive object={geometry} attach="geometry" />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleGenesis;
