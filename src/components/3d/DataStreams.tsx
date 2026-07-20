"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STREAM_COUNT = 300;
const STREAMS = 8;

export default function DataStreams() {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors, velocities } = useMemo(() => {
    const total = STREAM_COUNT * STREAMS;
    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);
    const velocities: number[] = [];

    const accentColor = new THREE.Color("#6c63ff");
    const altColor = new THREE.Color("#00d4aa");

    for (let s = 0; s < STREAMS; s++) {
      const angle = (s / STREAMS) * Math.PI * 2;
      const radius = 2.5 + Math.random() * 1.5;

      for (let i = 0; i < STREAM_COUNT; i++) {
        const idx = (s * STREAM_COUNT + i) * 3;
        const t = i / STREAM_COUNT;

        positions[idx] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.3;
        positions[idx + 1] = (t - 0.5) * 12;
        positions[idx + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.3;

        const mix = Math.random();
        const c = accentColor.clone().lerp(altColor, mix);
        colors[idx] = c.r;
        colors[idx + 1] = c.g;
        colors[idx + 2] = c.b;

        velocities.push(0.01 + Math.random() * 0.02);
      }
    }

    return { positions, colors, velocities };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const posArr = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < posArr.length / 3; i++) {
      const i3 = i * 3;
      posArr[i3 + 1] += velocities[i];

      // Reset to bottom when past top
      if (posArr[i3 + 1] > 6) {
        posArr[i3 + 1] = -6;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.02;
    }
  });

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    []
  );

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
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
