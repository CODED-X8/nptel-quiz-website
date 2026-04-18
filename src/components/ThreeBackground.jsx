import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function MovingShape({ theme }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  const wireColor = theme === 'light' ? '#4f46e5' : '#6366f1';
  const opacity = theme === 'light' ? 0.3 : 0.15;

  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <mesh ref={meshRef}>
        {/* Icosahedron provides a nice sci-fi/geometric feel */}
        <icosahedronGeometry args={[2.5, 0]} />
        <meshBasicMaterial color={wireColor} wireframe={true} transparent opacity={opacity} />
      </mesh>
    </Float>
  );
}

export function ThreeBackground({ theme }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* A simple ambient rotating wireframe shape */}
        <MovingShape theme={theme} />
      </Canvas>
    </div>
  );
}
