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
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative group">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
          <div className="flex items-center justify-between w-full">
            <span className="text-white font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
              {project.category}
            </span>
            {project.highlight && (
              <div className="flex items-center gap-1 text-yellow-300 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                <Sparkles size={12} />
                <span>{project.highlight}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed h-20 overflow-hidden">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900 dark:to-blue-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full border border-primary-200 dark:border-primary-700 font-medium"
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
              className="flex items-center gap-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
            >
              <Github size={16} />
              Code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
                project.demoUrl.includes('youtube')
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-primary-600 hover:bg-primary-700'
              }`}
            >
              {project.demoUrl.includes('youtube') ? <Youtube size={16} /> : <ExternalLink size={16} />}
              Démo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProjectCard);
