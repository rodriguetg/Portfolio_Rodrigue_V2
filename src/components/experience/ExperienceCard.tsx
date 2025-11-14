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
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-gray-800 z-10"></div>
      <div className={`ml-20 md:ml-0 w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-600 dark:text-primary-400">
              {getIcon(experience.type)}
            </div>
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900 px-3 py-1 rounded-full">
              {getTypeLabel(experience.type)}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{experience.title}</h3>
          <h4 className="text-lg text-primary-600 dark:text-primary-400 mb-2">{experience.company}</h4>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
            <Calendar size={16} />
            <span className="text-sm">{experience.period}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{experience.description}</p>
          <div className="space-y-2">
            <h5 className="font-semibold text-gray-900 dark:text-white">Réalisations :</h5>
            <ul className="space-y-1">
              {experience.achievements.map((achievement, i) => (
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
  );
};

export default React.memo(ExperienceCard);
