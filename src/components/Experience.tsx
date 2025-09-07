import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { experiences, Experience as ExperienceType } from '../data/portfolioData';
import { Briefcase, GraduationCap, Award, Calendar, ChevronRight } from 'lucide-react';

const Experience: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'work' | 'education' | 'certification'>('all');

  const filteredExperiences = experiences.filter(exp => 
    filter === 'all' || exp.type === filter
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'work': return <Briefcase size={20} />;
      case 'education': return <GraduationCap size={20} />;
      case 'certification': return <Award size={20} />;
      default: return <Briefcase size={20} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'work': return 'Expérience';
      case 'education': return 'Formation';
      case 'certification': return 'Certification';
      default: return 'Expérience';
    }
  };

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mon Parcours
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { key: 'all', label: 'Tout' },
              { key: 'work', label: 'Expériences' },
              { key: 'education', label: 'Formation' },
              { key: 'certification', label: 'Certifications' }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
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
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-600"></div>

            {filteredExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-gray-800 z-10"></div>

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 w-full md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-600 dark:text-primary-400">
                        {getIcon(exp.type)}
                      </div>
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900 px-3 py-1 rounded-full">
                        {getTypeLabel(exp.type)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {exp.title}
                    </h3>
                    <h4 className="text-lg text-primary-600 dark:text-primary-400 mb-2">
                      {exp.company}
                    </h4>
                    
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
                      <Calendar size={16} />
                      <span className="text-sm">{exp.period}</span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {exp.description}
                    </p>

                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">Réalisations :</h5>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <ChevronRight size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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

export default Experience;
