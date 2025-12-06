import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TechParticles = ({ count = 3000 }) => {
    const mesh = useRef<THREE.Points>(null!);

    // Generate random positions for particles
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const color = new THREE.Color();

        for (let i = 0; i < count; i++) {
            // Position
            positions[i * 3] = (Math.random() - 0.5) * 40; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40; // z

            // Color variation (Blue to Cyan to Purple)
            if (i % 3 === 0) color.set('#00f3ff'); // Neon Blue
            else if (i % 3 === 1) color.set('#0051ff'); // Deep Blue
            else color.set('#bc13fe'); // Neon Purple

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        return { positions, colors };
    }, [count]);

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.y += delta * 0.05;
            mesh.current.rotation.x += delta * 0.02;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.positions.length / 3}
                    array={particlesPosition.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particlesPosition.colors.length / 3}
                    array={particlesPosition.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                sizeAttenuation={true}
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

const BackgroundCanvas = () => {
    return (
        <div className="fixed inset-0 z-0 bg-[#050505] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
                <Suspense fallback={null}>
                    <TechParticles />
                    <fog attach="fog" args={['#050505', 10, 40]} />
                </Suspense>
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />

            {/* Grid Overlay for extra tech feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />
        </div>
    );
};

export default BackgroundCanvas;
