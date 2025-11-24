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
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Mon Parcours</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {filterOptions.map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  filter === filterOption.key
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-600'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-2 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-600"></div>
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
