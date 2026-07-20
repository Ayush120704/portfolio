"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import ParticleField from "./ParticleField";
import FloatingGeometry from "./FloatingGeometry";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#6c63ff" />
      <pointLight
        position={[-10, -5, 5]}
        intensity={0.4}
        color="#00d4aa"
      />
      <ParticleField />
      <FloatingGeometry />
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.2}
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
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
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
