"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingGeometry() {
  const groupRef = useRef<THREE.Group>(null!);
  const torusRef = useRef<THREE.Mesh>(null!);
  const octahedronRef = useRef<THREE.Mesh>(null!);
  const icoRef = useRef<THREE.Mesh>(null!);
  const dodecaRef = useRef<THREE.Mesh>(null!);
  const cubeRef = useRef<THREE.Mesh>(null!);

  const torusMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#6c63ff",
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      }),
    []
  );

  const octaMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00d4aa",
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      }),
    []
  );

  const icoMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff6b9d",
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      }),
    []
  );

  const dodecaMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#6c63ff",
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      }),
    []
  );

  const cubeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00d4aa",
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.3;
      torusRef.current.rotation.z = t * 0.2;
      torusRef.current.position.y = Math.sin(t * 0.5) * 0.3;
    }
    if (octahedronRef.current) {
      octahedronRef.current.rotation.y = t * 0.4;
      octahedronRef.current.rotation.x = t * 0.2;
      octahedronRef.current.position.x = Math.sin(t * 0.3) * 0.5;
    }
    if (icoRef.current) {
      icoRef.current.rotation.z = t * 0.35;
      icoRef.current.rotation.y = t * 0.15;
      icoRef.current.position.z = Math.sin(t * 0.4) * 0.4;
    }
    if (dodecaRef.current) {
      dodecaRef.current.rotation.x = t * 0.25;
      dodecaRef.current.rotation.y = t * 0.3;
      dodecaRef.current.position.x = Math.cos(t * 0.2) * 0.6;
      dodecaRef.current.position.y = Math.sin(t * 0.3) * 0.4;
    }
    if (cubeRef.current) {
      cubeRef.current.rotation.z = t * 0.2;
      cubeRef.current.rotation.x = t * 0.15;
      cubeRef.current.position.y = Math.cos(t * 0.4) * 0.5;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={torusRef} material={torusMat} position={[3, 0.5, -3]}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
      </mesh>
      <mesh ref={octahedronRef} material={octaMat} position={[-3, 1, -2]}>
        <octahedronGeometry args={[0.8, 0]} />
      </mesh>
      <mesh ref={icoRef} material={icoMat} position={[0, -1.5, -4]}>
        <icosahedronGeometry args={[0.6, 0]} />
      </mesh>
      <mesh ref={dodecaRef} material={dodecaMat} position={[2, -2, -5]}>
        <dodecahedronGeometry args={[0.5, 0]} />
      </mesh>
      <mesh ref={cubeRef} material={cubeMat} position={[-2.5, -1.5, -3.5]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
      </mesh>
    </group>
  );
}
