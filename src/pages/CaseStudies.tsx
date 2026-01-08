import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';

const CaseStudies = () => {
    return (
        <div className="pt-24 pb-20 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400 mb-6 font-orbitron">
                        Études de Cas
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Plongez dans mes workflows automatisés, le développement de bots et l'intégration de systèmes complexes.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={study.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-primary-500/50 transition-colors"
                        >
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={study.image}
                                    alt={study.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                            </div>

                            <div className="p-8 relative z-10 -mt-20">
                                <div className="flex gap-2 mb-4 flex-wrap">
                                    {study.technologies.slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 text-xs font-medium bg-primary-500/10 text-primary-300 rounded-full border border-primary-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-400 transition-colors">
                                    {study.title}
                                </h3>
                                <p className="text-slate-400 mb-6 limit-lines-2">
                                    {study.excerpt}
                                </p>

                                <Link
                                    to={`/case-studies/${study.id}`}
                                    className="inline-flex items-center gap-2 text-primary-400 font-semibold hover:text-primary-300 transition-colors"
                                >
                                    Voir l'étude de cas <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CaseStudies;
