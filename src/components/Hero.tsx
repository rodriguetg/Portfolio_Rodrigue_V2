import React, { useCallback, Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail, ArrowRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { content } from '../data/content';

// Lazy-load the entire 3D scene
const Hero3DScene = lazy(() => import('./hero/Hero3DScene'));

const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const scrollTo = useCallback((selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-900 via-slate-950 to-slate-950 opacity-50" />

      {/* 3D Scene Layer - lazy loaded, skipped on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-auto">
          <Suspense fallback={null}>
            <Hero3DScene />
          </Suspense>
        </div>
      )}

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

          {/* H1 renders immediately - no animation delay to avoid blocking LCP */}
          <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight mb-6 text-slate-100 animate-fade-in">
            <span className="block text-slate-400 text-4xl md:text-5xl mb-2 font-normal">Bonjour, je suis</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-purple">
              {personalInfo.name}
            </span>
          </h1>

          {/* Title renders immediately */}
          <div className="flex items-center gap-3 text-xl md:text-2xl text-slate-400 mb-8 font-light animate-fade-in">
            <span>{personalInfo.title}</span>
          </div>

          {/* LCP element - NO animation delay, renders immediately */}
          <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed animate-fade-in">
            {personalInfo.bio}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
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
