import { Canvas } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial, Sphere, Icosahedron } from '@react-three/drei';
import { Suspense } from 'react';

const Hero3DElement = () => {
  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Icosahedron args={[1, 0]} position={[2, 0, 0]} scale={[1.8, 1.8, 1.8]}>
          <meshStandardMaterial color="#38bdf8" wireframe opacity={0.2} transparent />
        </Icosahedron>
        <Sphere args={[1, 32, 32]} position={[2, 0, 0]} scale={[1, 1, 1]}>
          <MeshDistortMaterial
            color="#0ea5e9"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#38bdf8" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#6366f1" />
    </group>
  );
};

const Hero3DScene = () => {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <Suspense fallback={null}>
        <Hero3DElement />
      </Suspense>
    </Canvas>
  );
};

export default Hero3DScene;
