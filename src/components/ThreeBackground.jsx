import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function MovingShape() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <mesh ref={meshRef}>
        {/* Icosahedron provides a nice sci-fi/geometric feel */}
        <icosahedronGeometry args={[2.5, 0]} />
        <meshBasicMaterial color="#6366f1" wireframe={true} transparent opacity={0.15} />
      </mesh>
    </Float>
  );
}

export function ThreeBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* A simple ambient rotating wireframe shape */}
        <MovingShape />
      </Canvas>
    </div>
  );
}
