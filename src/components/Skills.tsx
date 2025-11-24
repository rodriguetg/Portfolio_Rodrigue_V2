import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/portfolioData';
import { Code, Users } from 'lucide-react';

const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'technical' | 'soft'>('technical');

  const filteredSkills = skills.filter(skill => skill.category === activeTab);

  return (
    <section id="skills" className="relative py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-300/10 dark:bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-300/10 dark:bg-primary-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold">
              Expertise
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-primary-700 dark:from-white dark:to-primary-300 mb-8">
            Mes Compétences
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="inline-flex p-1.5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl">
              <button
                onClick={() => setActiveTab('technical')}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'technical'
                    ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <Code size={20} />
                Compétences Techniques
              </button>
              <button
                onClick={() => setActiveTab('soft')}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'soft'
                    ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <Users size={20} />
                Soft Skills
              </button>
            </div>
          </motion.div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-bold">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.2, delay: index * 0.05, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 via-primary-600 to-blue-600 rounded-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-pulse"></div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
