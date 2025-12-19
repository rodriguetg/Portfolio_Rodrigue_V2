import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../data/portfolioData';
import { Certification } from '../types';
import { ExternalLink, Award, Calendar } from 'lucide-react';
import Modal from './common/Modal';

const Certifications: React.FC = () => {
    const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
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
                        Validation continue de mes compétences à travers des formations reconnues.<br />
                        Ces certifications renforcent mon profil pour un poste en marketing digital et automatisation.
                    </p>
                </motion.div>

                {/* Featured Certification */}
                {certifications.filter(c => c.featured).map((cert) => (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <div className="glass-card p-8 border-primary-500/30 bg-gradient-to-br from-slate-900/90 to-primary-900/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-3 bg-primary-500 text-white text-xs font-bold rounded-bl-xl shadow-lg z-20">
                                FEATURED
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                                <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-2xl bg-white p-4 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300">
                                    {cert.image ? (
                                        <img src={cert.image} alt={cert.issuer} className="w-full h-full object-contain" />
                                    ) : (
                                        <Award className="w-16 h-16 text-primary-600" />
                                    )}
                                </div>

                                <div className="text-center md:text-left flex-1">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                        <span className="px-3 py-1 rounded-full bg-primary-500/20 border border-primary-500/30 text-xs font-medium text-primary-300">
                                            {cert.issuer}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-400">
                                            {cert.date}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200">
                                        {cert.title}
                                    </h3>

                                    {cert.description && (
                                        <p className="text-slate-300 mb-6 text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">
                                            {cert.description}
                                        </p>
                                    )}

                                    {cert.credentialUrl && (
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setSelectedCert(cert)}
                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-medium transition-all hover:shadow-lg hover:shadow-primary-600/20"
                                            >
                                                Voir les détails (Modal) <ExternalLink size={18} />
                                            </button>

                                            <a
                                                href={cert.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-all"
                                            >
                                                Lien direct <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Regular Certifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.filter(c => !c.featured).map((cert, index) => (
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
                                <button
                                    onClick={() => setSelectedCert(cert)}
                                    className="flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors w-full group/btn"
                                >
                                    Voir les détails <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Certification Details Modal */}
            <Modal
                isOpen={!!selectedCert}
                onClose={() => setSelectedCert(null)}
                title={selectedCert?.title || "Détails de la certification"}
            >
                {selectedCert && (
                    <div className="space-y-6">
                        <div className="flex justify-center bg-white/5 rounded-2xl p-8 mb-6">
                            <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-xl p-4 flex items-center justify-center shadow-2xl">
                                {selectedCert.image ? (
                                    <img src={selectedCert.image} alt={selectedCert.issuer} className="w-full h-full object-contain" />
                                ) : (
                                    <Award className="w-20 h-20 text-primary-600" />
                                )}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                                <p className="text-sm text-slate-400 mb-1">Délivré par</p>
                                <p className="font-semibold text-slate-200 flex items-center gap-2">
                                    <Award size={16} className="text-primary-400" />
                                    {selectedCert.issuer}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                                <p className="text-sm text-slate-400 mb-1">Date d'obtention</p>
                                <p className="font-semibold text-slate-200 flex items-center gap-2">
                                    <Calendar size={16} className="text-primary-400" />
                                    {selectedCert.date}
                                </p>
                            </div>
                        </div>

                        {selectedCert.description && (
                            <div className="prose prose-invert max-w-none">
                                <h4 className="text-lg font-semibold text-slate-200 mb-2">À propos</h4>
                                <p className="text-slate-400 leading-relaxed">
                                    {selectedCert.description}
                                </p>
                            </div>
                        )}

                        {selectedCert.credentialUrl && (
                            <div className="pt-6 border-t border-slate-800 flex justify-end">
                                <a
                                    href={selectedCert.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    Voir le document officiel <ExternalLink size={18} className="ml-2" />
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </section>
    );
};


export default Certifications;
