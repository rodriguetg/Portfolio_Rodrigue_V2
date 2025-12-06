import React, { useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail, Terminal, Cpu } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial, Sphere, Icosahedron } from '@react-three/drei';
import { personalInfo } from '../data/portfolioData';
import { content } from '../data/content';

const Hero3DElement = () => {
  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Icosahedron args={[1, 0]} position={[2, 0, 0]} scale={[1.8, 1.8, 1.8]}>
          <meshStandardMaterial color="#00f3ff" wireframe opacity={0.3} transparent />
        </Icosahedron>
        <Sphere args={[1, 32, 32]} position={[2, 0, 0]} scale={[1, 1, 1]}>
          <MeshDistortMaterial
            color="#bc13fe"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={0.8}
          />
        </Sphere>
      </Float>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00f3ff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#bc13fe" />
    </group>
  );
};

const Hero: React.FC = () => {
  const scrollTo = useCallback((selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 3D Scene Layer for Hero Object */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none md:pointer-events-auto">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Suspense fallback={null}>
            <Hero3DElement />
          </Suspense>
        </Canvas>
      </div>

      <div className="container relative z-10 mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          {/* Tech Badge */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue mb-6 backdrop-blur-md"
          >
            <Terminal size={16} />
            <span className="text-sm font-mono tracking-wider">{content.hero.badge}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black font-tech leading-tight mb-4"
          >
            <span className="text-white block">{personalInfo.name.split(' ')[0]}</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple filter drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
              {personalInfo.name.split(' ')[1]}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-3 text-xl md:text-2xl text-gray-400 mb-8 font-light"
          >
            <Cpu className="text-neon-purple animate-pulse" />
            <span>{personalInfo.title}</span>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-400 max-w-lg mb-10 leading-relaxed border-l-2 border-neon-blue/30 pl-6"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Buttons */}
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
              <Mail size={20} className="group-hover:rotate-12 transition-transform" />
              <span>{content.hero.contactButton}</span>
            </button>
            <a
              href="https://drive.google.com/file/d/1ncPKkAulYE3ZntrBvEF3MnZeaXPj2ms5/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary group"
            >
              <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              <span>{content.hero.downloadCv}</span>
            </a>
          </motion.div>
        </div>

        {/* Right side empty for 3D element on desktop */}
        <div className="hidden md:block h-full min-h-[500px]"></div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollTo('#about')}
          className="flex flex-col items-center gap-2 text-neon-blue/50 hover:text-neon-blue transition-colors"
        >
          <span className="text-xs font-mono tracking-[0.2em]">INITIALIZE</span>
          <ChevronDown size={24} className="animate-bounce-slow" />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
