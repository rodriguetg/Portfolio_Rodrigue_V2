import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TechParticles = ({ count = 800 }) => {
    const mesh = useRef<THREE.Points>(null!);
    const frameSkip = useRef(0);

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const color = new THREE.Color();

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

            if (i % 3 === 0) color.set('#00f3ff');
            else if (i % 3 === 1) color.set('#0051ff');
            else color.set('#bc13fe');

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        return { positions, colors };
    }, [count]);

    // Update every other frame to reduce CPU usage
    useFrame((_, delta) => {
        frameSkip.current++;
        if (frameSkip.current % 2 !== 0) return;

        if (mesh.current) {
            mesh.current.rotation.y += delta * 0.05;

            const positions = mesh.current.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < count; i++) {
                positions[i * 3 + 1] -= delta * 2;
                if (positions[i * 3 + 1] < -20) {
                    positions[i * 3 + 1] = 20;
                }
            }
            mesh.current.geometry.attributes.position.needsUpdate = true;
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

const CSSBackground = () => (
    <div className="fixed inset-0 z-0 bg-[#050505] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />
    </div>
);

const BackgroundCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 768px)');
        setIsMobile(mql.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    if (isMobile) {
        return <CSSBackground />;
    }

    return (
        <div className="fixed inset-0 z-0 bg-[#050505] pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 20], fov: 60 }}
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
            >
                <Suspense fallback={null}>
                    <TechParticles count={800} />
                    <fog attach="fog" args={['#050505', 10, 40]} />
                </Suspense>
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />
        </div>
    );
};

export default BackgroundCanvas;
