"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const Particles = ({ count = 100 }: { count?: number }) => {
  const mesh = useRef<THREE.Points | null>(null);

  // Particle positions are intentionally random and generated once per mount;
  // they are visual-only data with no bearing on render determinism.
  /* eslint-disable react-hooks/purity */
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, [count]);
  /* eslint-enable react-hooks/purity */

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#5eead4"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export default Particles;