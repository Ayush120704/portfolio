"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RING_COUNT = 5;
const POINTS_PER_RING = 120;

export default function MatrixRain() {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  const totalPoints = RING_COUNT * POINTS_PER_RING;

  const { positions, colors, offsets } = useMemo(() => {
    const positions = new Float32Array(totalPoints * 3);
    const colors = new Float32Array(totalPoints * 3);
    const offsets: number[] = [];

    for (let r = 0; r < RING_COUNT; r++) {
      const radius = 1.5 + r * 0.6;
      const yBase = (r - RING_COUNT / 2) * 0.8;

      for (let i = 0; i < POINTS_PER_RING; i++) {
        const idx = (r * POINTS_PER_RING + i) * 3;
        const angle = (i / POINTS_PER_RING) * Math.PI * 2;

        positions[idx] = Math.cos(angle) * radius;
        positions[idx + 1] = yBase;
        positions[idx + 2] = Math.sin(angle) * radius;

        // Binary/matrix style coloring
        const brightness = Math.random() > 0.3 ? 1 : 0.3;
        colors[idx] = 0.424 * brightness;
        colors[idx + 1] = 0.831 * brightness;
        colors[idx + 2] = 0.667 * brightness;

        offsets.push(Math.random() * Math.PI * 2);
      }
    }

    return { positions, colors, offsets };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const posArr = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    const colArr = pointsRef.current.geometry.attributes.color
      .array as Float32Array;

    const sinT2 = Math.sin(t * 2);
    const sinT10 = Math.sin(t * 10);

    for (let r = 0; r < RING_COUNT; r++) {
      const radius = 1.5 + r * 0.6;
      const speed = 0.3 + r * 0.1;
      const rotation = t * speed;
      const rOffset = r * POINTS_PER_RING;

      for (let i = 0; i < POINTS_PER_RING; i++) {
        const idx = (rOffset + i) * 3;
        const frac = i / POINTS_PER_RING;
        const angle = frac * Math.PI * 2 + rotation;
        const wobble = Math.sin(sinT2 + offsets[rOffset + i]) * 0.1;
        const rWobble = radius + wobble;

        posArr[idx] = Math.cos(angle) * rWobble;
        posArr[idx + 1] += 0.005;
        posArr[idx + 2] = Math.sin(angle) * rWobble;

        if (posArr[idx + 1] > 4) {
          posArr[idx + 1] = -4;
        }

        const flicker = Math.sin(sinT10 + i * 0.5) > 0.7 ? 1.5 : 1;
        colArr[idx] = 0.424 * flicker;
        colArr[idx + 1] = 0.831 * flicker;
        colArr[idx + 2] = 0.667 * flicker;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.03;
    }
  });

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.025,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    []
  );

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
      <points ref={pointsRef} material={material}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
      </points>
    </group>
  );
}
