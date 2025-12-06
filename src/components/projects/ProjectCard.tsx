import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Youtube } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const isYoutube = project.demoUrl?.includes('youtube');

  // 3D Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["-7deg", "7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["7deg", "-7deg"]);

  const glareOpacity = useTransform(mouseY, [-0.5, 0.5], [0, 0.4]);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full"
      >
        <div className="absolute inset-0 bg-neon-blue/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

        <div className="relative h-full bg-dark-surface/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-lg overflow-hidden transition-colors duration-500 group-hover:border-neon-blue/30 group-hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]">

          {/* Glare Effect */}
          <motion.div
            style={{
              opacity: glareOpacity,
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.3) 0%, transparent 80%)`,
              zIndex: 20
            }}
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
          />

          <div className="relative overflow-hidden h-56 transform-style-3d">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-all duration-500"></div>

            <div className="absolute top-4 right-4 flex gap-2 translate-z-20">
              <span className="text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 shadow-xl">
                {project.category}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 z-10 w-full pr-8 translate-z-20">
              {project.highlight && (
                <div className="flex items-center gap-2 text-neon-green mb-2">
                  <Sparkles size={14} />
                  <span className="font-mono text-xs tracking-wider uppercase">{project.highlight}</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 transform-style-3d">
            <h3 className="text-2xl font-bold font-tech text-white mb-3 group-hover:text-neon-blue transition-colors translate-z-10">
              {project.title}
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed h-20 overflow-hidden text-sm translate-z-10">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8 h-16 overflow-hidden translate-z-10">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] uppercase tracking-wider bg-white/5 text-gray-300 px-3 py-1 rounded border border-white/10 font-mono hover:bg-neon-blue/10 hover:border-neon-blue/30 hover:text-neon-blue transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3 mt-auto translate-z-20 relative z-30">
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white/20 hover:border-white/50 py-3 rounded-xl font-semibold transition-all duration-300 group/btn"
                >
                  <Github size={18} className="group-hover/btn:scale-110 transition-transform" />
                  Code
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2 text-black font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:shadow-[0_0_25px_rgba(0,243,255,0.5)] transition-all duration-300 transform hover:scale-[1.02] ${isYoutube
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white'
                    : 'bg-gradient-to-r from-neon-blue to-blue-500 hover:from-cyan-300 hover:to-blue-400'
                    }`}
                >
                  {isYoutube ? <Youtube size={18} /> : <ExternalLink size={18} />}
                  Live
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(ProjectCard);
