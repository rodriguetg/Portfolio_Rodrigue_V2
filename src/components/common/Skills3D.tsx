import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, TrackballControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
    'AirOps', 'Python', 'AI/ML',
    'Automation', 'n8n', 'Zapier', 'API',
    'Git', 'Vite', 'Firebase'
];

function Word({ children, ...props }: { children: string;[key: string]: any }) {
    const color = new THREE.Color();
    const fontProps = { fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false };
    const ref = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    const over = (e: any) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'none';
    };

    const out = () => {
        setHovered(false);
    };

    useEffect(() => {
        if (hovered) document.body.style.cursor = 'pointer';
        return () => { document.body.style.cursor = 'auto'; }
    }, [hovered]);

    useFrame(({ camera }) => {
        if (ref.current) {
            ref.current.quaternion.copy(camera.quaternion);
            (ref.current.material as THREE.MeshBasicMaterial).color.lerp(color.set(hovered ? '#6366f1' : '#cbd5e1'), 0.1);
        }
    });

    return (
        <Text
            ref={ref}
            onPointerOver={over}
            onPointerOut={out}
            {...props}
            {...fontProps}
            children={children}
        />
    );
}

function Cloud({ count = 4, radius = 20 }) {
    const words = useMemo(() => {
        const temp: any[] = [];
        const spherical = new THREE.Spherical();
        const phiSpan = Math.PI / (count + 1);
        const thetaSpan = (Math.PI * 2) / count;

        for (let i = 1; i < count + 1; i++)
            for (let j = 0; j < count; j++)
                temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), skills[(i * j) % skills.length]]);
        return temp;
    }, [count, radius]);

    return words.map(([pos, word], index) => <Word key={index} position={pos} children={word} />);
}

const Skills3D: React.FC = () => {
    return (
        <div className="w-full h-[600px] cursor-none relative z-10 transition-opacity duration-500">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
                <fog attach="fog" args={['#050505', 0, 80]} />
                <Float floatIntensity={2} rotationIntensity={2}>
                    <Cloud count={5} radius={22} />
                </Float>
                <TrackballControls noZoom />
            </Canvas>
        </div>
    );
};

export default Skills3D;
