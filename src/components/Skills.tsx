import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/portfolioData';
import { Code, Users } from 'lucide-react';

const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'technical' | 'soft'>('technical');

  const filteredSkills = skills.filter(skill => skill.category === activeTab);

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mes Compétences
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-900 p-1 rounded-lg shadow-lg">
              <button
                onClick={() => setActiveTab('technical')}
                className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'technical'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                <Code size={20} />
                Compétences Techniques
              </button>
              <button
                onClick={() => setActiveTab('soft')}
                className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'soft'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                <Users size={20} />
                Soft Skills
              </button>
            </div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                    {skill.level}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                  </motion.div>
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
