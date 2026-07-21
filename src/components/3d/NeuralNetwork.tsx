"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 60;
const CONNECTION_DISTANCE = 2.8;

export default function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors, linePositions, lineColors } = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const colors = new Float32Array(NODE_COUNT * 3);
    const linePositions = new Float32Array(NODE_COUNT * NODE_COUNT * 6);
    const lineColors = new Float32Array(NODE_COUNT * NODE_COUNT * 6);

    const nodePositions: [number, number, number][] = [];
    const nodeVelocities: [number, number, number][] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 6;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      nodePositions.push([x, y, z]);
      nodeVelocities.push([
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
      ]);

      const mix = Math.random();
      const c = new THREE.Color("#6c63ff").lerp(new THREE.Color("#00d4aa"), mix);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    // Pre-compute initial connections
    let lineIdx = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodePositions[i][0] - nodePositions[j][0];
        const dy = nodePositions[i][1] - nodePositions[j][1];
        const dz = nodePositions[i][2] - nodePositions[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECTION_DISTANCE) {
          linePositions[lineIdx] = nodePositions[i][0];
          linePositions[lineIdx + 1] = nodePositions[i][1];
          linePositions[lineIdx + 2] = nodePositions[i][2];
          linePositions[lineIdx + 3] = nodePositions[j][0];
          linePositions[lineIdx + 4] = nodePositions[j][1];
          linePositions[lineIdx + 5] = nodePositions[j][2];

          const alpha = 1 - dist / CONNECTION_DISTANCE;
          lineColors[lineIdx] = 0.424 * alpha;
          lineColors[lineIdx + 1] = 0.388 * alpha;
          lineColors[lineIdx + 2] = 1.0 * alpha;
          lineColors[lineIdx + 3] = 0.424 * alpha;
          lineColors[lineIdx + 4] = 0.388 * alpha;
          lineColors[lineIdx + 5] = 1.0 * alpha;
          lineIdx += 6;
        }
      }
    }

    return { positions, colors, linePositions, lineColors };
  }, []);

  const nodeVelocities = useMemo(() => {
    const velocities: [number, number, number][] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      velocities.push([
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004,
      ]);
    }
    return velocities;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
    }

    const posArr = pointsRef.current?.geometry.attributes.position
      .array as Float32Array;
    if (!posArr) return;

    const sin0 = Math.sin(t * 0.3);
    const cos0 = Math.cos(t * 0.2);
    const sin1 = Math.sin(t * 0.25);

    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      const vel = nodeVelocities[i];
      posArr[i3] += vel[0] + Math.sin(sin0 + i) * 0.001;
      posArr[i3 + 1] += vel[1] + Math.cos(cos0 + i * 0.5) * 0.001;
      posArr[i3 + 2] += vel[2] + Math.sin(sin1 + i * 0.7) * 0.001;

      for (let d = 0; d < 3; d++) {
        if (Math.abs(posArr[i3 + d]) > 4) {
          vel[d] *= -1;
        }
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    const linePosArr = linesRef.current?.geometry.attributes.position
      .array as Float32Array;
    const lineColArr = linesRef.current?.geometry.attributes.color
      .array as Float32Array;
    if (!linePosArr || !lineColArr) return;

    const distSqThreshold = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
    let lineIdx = 0;
    const sinT = Math.sin(t);

    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      const ix = posArr[i3], iy = posArr[i3 + 1], iz = posArr[i3 + 2];
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const j3 = j * 3;
        const dx = ix - posArr[j3];
        const dy = iy - posArr[j3 + 1];
        const dz = iz - posArr[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < distSqThreshold) {
          const dist = Math.sqrt(distSq);
          linePosArr[lineIdx] = ix;
          linePosArr[lineIdx + 1] = iy;
          linePosArr[lineIdx + 2] = iz;
          linePosArr[lineIdx + 3] = posArr[j3];
          linePosArr[lineIdx + 4] = posArr[j3 + 1];
          linePosArr[lineIdx + 5] = posArr[j3 + 2];

          const alpha = (1 - dist / CONNECTION_DISTANCE) * (0.3 + Math.sin(sinT + i) * 0.15);
          lineColArr[lineIdx] = 0.424 * alpha;
          lineColArr[lineIdx + 1] = 0.388 * alpha;
          lineColArr[lineIdx + 2] = alpha;
          lineColArr[lineIdx + 3] = 0.0;
          lineColArr[lineIdx + 4] = 0.831 * alpha;
          lineColArr[lineIdx + 5] = 0.667 * alpha;
          lineIdx += 6;
        }
      }
    }

    for (let k = lineIdx; k < linePosArr.length; k++) {
      linePosArr[k] = 0;
      lineColArr[k] = 0;
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
  });

  const nodeMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      <points ref={pointsRef} material={nodeMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
      </points>
      <lineSegments ref={linesRef} material={lineMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
      </lineSegments>
    </group>
  );
}
