import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../data/portfolioData';
import type { ExperienceFilter } from '../types';
import ExperienceCard from './experience/ExperienceCard';

const Experience: React.FC = () => {
  const [filter, setFilter] = useState<ExperienceFilter>('all');

  const filteredExperiences = useMemo(() => {
    if (filter === 'all') return experiences;
    return experiences.filter(exp => exp.type === filter);
  }, [filter]);

  const filterOptions: { key: ExperienceFilter; label: string }[] = [
    { key: 'all', label: 'Tout' },
    { key: 'work', label: 'Expériences' },
    { key: 'education', label: 'Formation' },
    { key: 'certification', label: 'Certifications' }
  ];

  return (
    <section id="experience" className="relative py-32 bg-gradient-to-br from-white via-primary-50/20 to-blue-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-800/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl"></div>
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
              Parcours
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-primary-700 dark:from-white dark:to-primary-300 mb-8">
            Mon Parcours
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {filterOptions.map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === filterOption.key
                    ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute left-2 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-primary-600 to-blue-600 rounded-full shadow-lg"></div>
            {filteredExperiences.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
