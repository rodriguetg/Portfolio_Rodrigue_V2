import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Calendar, ChevronRight } from 'lucide-react';
import type { Experience } from '../../types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

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

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.4, delay: index * 0.05 + 0.2, type: "spring" }}
        viewport={{ once: true }}
        className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 z-10"
      >
        <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
      </motion.div>
      <div className={`ml-10 md:ml-0 w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900/50 dark:to-blue-900/50 rounded-xl text-primary-600 dark:text-primary-400 shadow-md">
                {getIcon(experience.type)}
              </div>
              <span className="text-sm font-semibold text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/30 px-4 py-1.5 rounded-full border border-primary-200 dark:border-primary-800">
                {getTypeLabel(experience.type)}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{experience.title}</h3>
            <h4 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400 mb-3">{experience.company}</h4>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <Calendar size={18} className="text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium">{experience.period}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{experience.description}</p>
            <div className="space-y-3">
              <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-primary-500 to-blue-600 rounded-full"></div>
                Réalisations
              </h5>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                    <ChevronRight size={18} className="text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ExperienceCard);
