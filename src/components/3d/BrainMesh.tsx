"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createBrainVertices(): Float32Array {
  const vertices: number[] = [];
  const layers = 12;
  const pointsPerLayer = 20;

  for (let l = 0; l < layers; l++) {
    const t = l / (layers - 1);
    const y = (t - 0.5) * 2.5;
    const radiusScale = Math.sin(t * Math.PI) * 0.8 + 0.2;
    const baseRadius = 1.2 * radiusScale;

    // Two hemispheres
    for (let h = 0; h < 2; h++) {
      const xOff = h === 0 ? -0.15 : 0.15;
      for (let p = 0; p < pointsPerLayer; p++) {
        const angle = (p / pointsPerLayer) * Math.PI * 2;
        const wobble = Math.sin(angle * 3 + l * 0.5) * 0.15;
        const r = baseRadius + wobble;
        vertices.push(
          Math.cos(angle) * r + xOff,
          y + Math.sin(angle * 2) * 0.1,
          Math.sin(angle) * r * 0.7
        );
      }
    }
  }

  // Internal connection lines (simplified representation)
  for (let i = 0; i < 40; i++) {
    const fromIdx = Math.floor(Math.random() * (vertices.length / 3)) * 3;
    const toIdx = Math.floor(Math.random() * (vertices.length / 3)) * 3;
    vertices.push(
      vertices[fromIdx],
      vertices[fromIdx + 1],
      vertices[fromIdx + 2]
    );
    vertices.push(
      vertices[toIdx],
      vertices[toIdx + 1],
      vertices[toIdx + 2]
    );
  }

  return new Float32Array(vertices);
}

export default function BrainMesh() {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  const brainVertices = useMemo(() => createBrainVertices(), []);

  const vertexCount = useMemo(
    () => Math.floor(brainVertices.length / 3),
    [brainVertices]
  );

  const colors = useMemo(() => {
    const colors = new Float32Array(vertexCount * 3);
    const c1 = new THREE.Color("#6c63ff");
    const c2 = new THREE.Color("#00d4aa");
    const c3 = new THREE.Color("#ff6b9d");

    for (let i = 0; i < vertexCount; i++) {
      const mix = Math.random();
      let c: THREE.Color;
      if (mix < 0.5) {
        c = c1.clone().lerp(c2, mix * 2);
      } else {
        c = c2.clone().lerp(c3, (mix - 0.5) * 2);
      }
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return colors;
  }, [vertexCount]);

  const lineCount = vertexCount - Math.floor(vertexCount * 0.98);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.15;
    }

    // Pulse the colors
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.5 + Math.sin(t * 2) * 0.15;
    }
  });

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    []
  );

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#6c63ff",
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      <points ref={pointsRef} material={material}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[brainVertices, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
      </points>
      <lineSegments material={lineMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[brainVertices, 3]}
          />
        </bufferGeometry>
      </lineSegments>
    </group>
  );
}
