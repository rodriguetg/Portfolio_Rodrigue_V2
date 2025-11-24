import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const Hero: React.FC = () => {
  const scrollTo = useCallback((selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-primary-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary-300/20 dark:bg-primary-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Badge animé */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-primary-200 dark:border-primary-800 shadow-lg">
              <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Disponible pour de nouvelles opportunités
              </span>
            </div>
          </motion.div>

          {/* Nom avec effet gradient */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-primary-700 to-blue-900 dark:from-white dark:via-primary-300 dark:to-blue-300"
          >
            {personalInfo.name.split(' ')[0]}
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400">
              {personalInfo.name.split(' ')[1]}
            </span>
          </motion.h1>

          {/* Titre avec bordure décorative */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 blur-lg opacity-30"></div>
              <h2 className="relative text-2xl md:text-4xl font-bold text-center px-8 py-3 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-primary-200 dark:border-primary-800 shadow-xl">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400">
                  {personalInfo.title}
                </span>
              </h2>
            </div>
          </motion.div>

          {/* Bio avec style élégant */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed text-center font-light"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Boutons avec effet moderne */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <button
              onClick={() => scrollTo('#contact')}
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Mail size={20} />
              Me contacter
              <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
            <a
              href="https://drive.google.com/file/d/1ncPKkAulYE3ZntrBvEF3MnZeaXPj2ms5/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold border-2 border-gray-300 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:scale-105 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 flex items-center gap-2"
            >
              <Download size={20} />
              Télécharger CV
            </a>
          </motion.div>

          {/* Scroll indicator amélioré */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex justify-center"
          >
            <button
              onClick={() => scrollTo('#about')}
              aria-label="Faire défiler vers la section À propos"
              className="group flex flex-col items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
            >
              <span className="text-sm font-medium">Découvrir</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown size={32} className="drop-shadow-lg" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
