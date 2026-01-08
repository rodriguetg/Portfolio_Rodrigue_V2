import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { projects as originalProjects } from '../data/portfolioData';
import { caseStudies } from '../data/caseStudies';
import { content } from '../data/content';
import { Github, Code, LayoutGrid } from 'lucide-react';
import ProjectCard from './projects/ProjectCard';
import type { Project } from '../types';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Convert Case Studies to Project format
  const caseStudyProjects: Project[] = caseStudies.map(study => ({
    id: study.id,
    title: study.title,
    description: study.excerpt, // Use excerpt for the card description
    image: study.image,
    technologies: study.technologies,
    category: 'Case Study',
    internalLink: `/case-studies/${study.id}`,
    highlight: 'Premium'
  }));

  // Merge datasets: Case Studies first, then other projects
  const allProjects = [...caseStudyProjects, ...originalProjects];

  const categories = useMemo(() => ['All', ...new Set(allProjects.map(project => project.category))], [allProjects]);

  const filteredProjects = useMemo(() =>
    selectedCategory === 'All'
      ? allProjects
      : allProjects.filter(project => project.category === selectedCategory),
    [selectedCategory, allProjects]
  );

  return (
    <section id="projects" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] opacity-20 pointer-events-none" />

      <div className="container-custom relative z-10">
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
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-primary-400"
          >
            <LayoutGrid size={16} />
            <span className="text-sm font-medium">Portfolio</span>
          </motion.div>

          <h2 className="section-title">
            Projets Réalisés
          </h2>

          <p className="section-subtitle">
            Une sélection de mes travaux récents, démontrant mon expertise en développement web et solutions logicielles.
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
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500'
                  }`}
              >
                {category}
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
          <a
            href="https://github.com/rodriguetg"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline group inline-flex"
          >
            <Github size={20} />
            <span>Voir plus sur GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
