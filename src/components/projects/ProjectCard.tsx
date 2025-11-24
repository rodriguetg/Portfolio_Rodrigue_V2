import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Youtube } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2">
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="flex items-center justify-between w-full">
              <span className="text-white font-semibold bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/30">
                {project.category}
              </span>
              {project.highlight && (
                <div className="flex items-center gap-2 text-yellow-300 bg-yellow-500/20 backdrop-blur-md px-3 py-2 rounded-xl border border-yellow-400/30">
                  <Sparkles size={16} />
                  <span className="font-semibold text-sm">{project.highlight}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed h-20 overflow-hidden">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs bg-gradient-to-r from-primary-100 to-blue-100 dark:from-primary-900/50 dark:to-blue-900/50 text-primary-700 dark:text-primary-300 px-3 py-1.5 rounded-full border border-primary-200 dark:border-primary-700 font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white px-5 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Github size={18} />
                Code
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-white px-5 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                  project.demoUrl.includes('youtube')
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                    : 'bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700'
                }`}
              >
                {project.demoUrl.includes('youtube') ? <Youtube size={18} /> : <ExternalLink size={18} />}
                Démo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProjectCard);
