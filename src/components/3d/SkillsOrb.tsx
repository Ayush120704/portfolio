"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

const SKILL_TECHS = [
  "PyTorch", "TensorFlow", "BERT", "ALBERT", "OpenCV", "DeepFace",
  "ChromaDB", "RAG", "Python", "React", "Next.js", "Node.js",
  "MongoDB", "FastAPI", "Django", "NumPy", "Pandas", "scikit-learn",
  "Java", "JavaScript", "TypeScript", "Docker", "Git", "Linux",
];

function SkillOrb({ tech, index, total }: { tech: string; index: number; total: number }) {
  const ref = useRef<THREE.Group>(null!);

  const phi = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  const radius = 3.2;

  const targetPos = useMemo(
    () =>
      new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      ),
    [theta, phi, radius]
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.copy(targetPos);
    ref.current.position.y += Math.sin(t * 0.5 + index) * 0.1;
    ref.current.lookAt(0, 0, 0);
  });

  return (
    <group ref={ref}>
      <Text
        fontSize={0.18}
        color="#6c63ff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
        outlineWidth={0.005}
        outlineColor="#00d4aa"
      >
        {tech}
      </Text>
    </group>
  );
}

export default function SkillsOrb() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={groupRef}>
      {SKILL_TECHS.map((tech, i) => (
        <SkillOrb
          key={tech}
          tech={tech}
          index={i}
          total={SKILL_TECHS.length}
        />
      ))}
    </group>
  );
}
