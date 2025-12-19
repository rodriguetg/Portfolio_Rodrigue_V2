import React, { useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail, ArrowRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial, Sphere, Icosahedron } from '@react-three/drei';
import { personalInfo } from '../data/portfolioData';
import { content } from '../data/content';

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

const Hero: React.FC = () => {
  const scrollTo = useCallback((selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-900 via-slate-950 to-slate-950 opacity-50" />

      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none md:pointer-events-auto">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Suspense fallback={null}>
            <Hero3DElement />
          </Suspense>
        </Canvas>
      </div>

      <div className="container-custom relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-primary-400 mb-6 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-sm font-medium tracking-wide">Ouvert à un CDI en Marketing Automation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold font-heading leading-tight mb-6 text-slate-100"
          >
            <span className="block text-slate-400 text-4xl md:text-5xl mb-2 font-normal">Bonjour, je suis</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-purple">
              {personalInfo.name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-3 text-xl md:text-2xl text-slate-400 mb-8 font-light"
          >
            <span>{personalInfo.title}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed"
          >
            {personalInfo.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollTo('#contact')}
              className="btn btn-primary group"
            >
              <span>Me contacter</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="https://drive.google.com/file/d/1ncPKkAulYE3ZntrBvEF3MnZeaXPj2ms5/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline group"
            >
              <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              <span>Télécharger CV</span>
            </a>
          </motion.div>
        </div>

        <div className="hidden md:block h-full min-h-[500px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollTo('#about')}
          className="flex flex-col items-center gap-2 text-slate-500 hover:text-primary-400 transition-colors"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Découvrir</span>
          <ChevronDown size={24} className="animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
