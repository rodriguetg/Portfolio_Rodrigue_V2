import React from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../data/portfolioData';
import { ExternalLink, Award, Calendar } from 'lucide-react';

const Certifications: React.FC = () => {
    return (
        <section id="certifications" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-900/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-primary-400 text-sm font-medium mb-4 backdrop-blur-sm">
                        Reconnaissance Professionnelle
                    </span>
                    <h2 className="section-title">Mes Certifications</h2>
                    <p className="section-subtitle">
                        Validation continue de mes compétences à travers des formations reconnues.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-6 flex flex-col h-full group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                                    {cert.image ? (
                                        <img src={cert.image} alt={cert.issuer} className="w-full h-full object-contain" />
                                    ) : (
                                        <Award className="w-8 h-8 text-primary-600" />
                                    )}
                                </div>
                                <div className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-medium text-primary-400">
                                    {cert.date}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-primary-400 transition-colors">
                                {cert.title}
                            </h3>

                            <div className="flex items-center gap-2 text-slate-400 mb-6 text-sm">
                                <Award size={16} />
                                <span>{cert.issuer}</span>
                            </div>

                            <div className="mt-auto pt-4 border-t border-slate-800">
                                {cert.credentialUrl ? (
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
                                    >
                                        Voir le certificat <ExternalLink size={14} />
                                    </a>
                                ) : (
                                    <span className="text-sm text-slate-500 italic">ID de certification non public</span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
