import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 hover:shadow-2xl hover:shadow-primary-900/10 transition-all duration-300 flex flex-col h-full">

        {/* Project Image Area */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors duration-300" />

          {/* Overlay Actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/60 backdrop-blur-sm">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white text-slate-900 hover:bg-primary-50 transition-colors transform hover:scale-110 duration-200"
                aria-label="Voir le projet"
              >
                <ArrowUpRight size={20} />
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors transform hover:scale-110 duration-200 border border-slate-700"
                aria-label="Voir le code"
              >
                <Github size={20} />
              </a>
            )}
          </div>

          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 text-slate-300 backdrop-blur-md border border-slate-800">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-300 font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-400 font-medium">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProjectCard);
