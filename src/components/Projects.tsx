import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { content } from '../data/content';
import { Github, Code } from 'lucide-react';
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
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Tech Grid Background Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

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
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple"
          >
            <Code size={16} />
            <span className="text-sm font-mono tracking-wider">
              {content.projects.badge}
            </span>
          </motion.div>

          <h2 className="section-title">
            {content.projects.title}
          </h2>

          <p className="section-subtitle">
            {content.projects.subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-mono text-sm transition-all duration-300 relative overflow-hidden group ${selectedCategory === category
                  ? 'text-black bg-neon-blue shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                  : 'text-gray-400 border border-white/10 hover:border-neon-blue/50 hover:text-white bg-dark-surface/50'
                  }`}
              >
                <span className="relative z-10">{category}</span>
                {selectedCategory !== category && (
                  <span className="absolute inset-0 bg-neon-blue/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                )}
              </button>
            ))}
          </motion.div>
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
          className="text-center mt-20"
        >
          <p className="text-lg text-gray-400 mb-8 font-light">
            {content.projects.viewAllSub}
          </p>
          <a
            href="https://github.com/rodriguetg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={content.projects.aria.viewAll}
            className="btn btn-secondary group inline-flex"
          >
            <Github size={20} />
            {content.projects.viewAll}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-1"
            >
              →
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
