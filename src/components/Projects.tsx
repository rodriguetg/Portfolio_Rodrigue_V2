import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { Github } from 'lucide-react';
import ProjectCard from './projects/ProjectCard';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = useMemo(() => ['All', ...new Set(projects.map(project => project.category))], []);
  
  const filteredProjects = useMemo(() => 
    selectedCategory === 'All' 
      ? projects 
      : projects.filter(project => project.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Mes Projets</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="section-subtitle mb-8">
            Découvrez une sélection de mes projets récents, alliant innovation technologique et solutions créatives.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Curieux d'en voir plus ? Consultez tous mes projets sur GitHub !
          </p>
          <a
            href="https://github.com/rodriguetg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <Github size={20} />
            Voir tous mes projets
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
