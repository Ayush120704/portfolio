"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import ParticleField from "./ParticleField";
import FloatingGeometry from "./FloatingGeometry";
import NeuralNetwork from "./NeuralNetwork";
import DataStreams from "./DataStreams";
import BrainMesh from "./BrainMesh";
import MatrixRain from "./MatrixRain";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

function ScrollRotation({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null!);
  const targetRotY = useRef(0);
  const currentRotY = useRef(0);
  const targetRotX = useRef(0);
  const currentRotX = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      targetRotY.current = scrollPercent * Math.PI * 4;
      targetRotX.current = Math.sin(scrollPercent * Math.PI * 2) * 0.3;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    currentRotY.current += (targetRotY.current - currentRotY.current) * 0.05;
    currentRotX.current += (targetRotX.current - currentRotX.current) * 0.05;
    groupRef.current.rotation.y = currentRotY.current;
    groupRef.current.rotation.x = currentRotX.current;
  });

  return <group ref={groupRef}>{children}</group>;
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#6c63ff" />
      <pointLight position={[-10, -5, 5]} intensity={0.3} color="#00d4aa" />
      <pointLight position={[0, -8, 3]} intensity={0.2} color="#ff6b9d" />
      <ScrollRotation>
        <ParticleField />
        <FloatingGeometry />
        <NeuralNetwork />
        <DataStreams />
        <BrainMesh />
        <MatrixRain />
      </ScrollRotation>
      <EffectComposer>
        <Bloom
          intensity={0.6}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0005, 0.0005)}
        />
        <Vignette offset={0.3} darkness={0.7} />
      </EffectComposer>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
