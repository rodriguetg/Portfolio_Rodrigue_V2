import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, ChevronDown, CheckCircle2 } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';

const CaseStudyDetail = () => {
    const { id } = useParams<{ id: string }>();
    const study = caseStudies.find((s) => s.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!study) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Étude de Cas introuvable</h2>
                    <Link to="/case-studies" className="text-primary-400 hover:text-primary-300">
                        Retour aux Études de Cas
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            {/* HERO SECTION */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950" />
                </div>

                <div className="container-custom mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <Link
                            to="/case-studies"
                            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 mb-6 font-medium transition-colors"
                        >
                            <ArrowLeft size={16} /> Retour aux projets
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            {study.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-200 font-light mb-8 max-w-2xl mx-auto">
                            {study.subtitle}
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">
                            {study.technologies.map(tech => (
                                <span key={tech} className="px-4 py-1.5 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-full text-sm font-medium text-slate-300">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* STATS BANNER */}
            <section className="py-10 border-y border-slate-800 bg-slate-900/30 backdrop-blur-sm -mt-20 relative z-20 mx-4 md:mx-0 rounded-xl md:rounded-none">
                <div className="container-custom mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
                        {study.stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="pt-4 md:pt-0"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2 font-orbitron">{stat.value}</div>
                                <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container-custom mx-auto px-4 py-20 max-w-6xl relative z-30">

                {/* CONTEXT GRID (Challenge & Solution) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-slate-700 shadow-xl shadow-red-900/10 hover:border-red-500/30 transition-colors"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-red-400 flex items-center gap-2">
                            Le Défi
                        </h3>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            {study.challenge}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-slate-700 shadow-xl shadow-emerald-900/10 hover:border-emerald-500/30 transition-colors"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-emerald-400 flex items-center gap-2">
                            La Solution
                        </h3>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            {study.solution}
                        </p>
                    </motion.div>
                </div>

                {/* PROCESS TIMELINE */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold mb-12 text-center font-orbitron">Comment ça marche ?</h2>
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">

                        {study.process.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-800 group-hover:bg-primary-500 transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-lg" />

                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl hover:border-primary-500/50 shadow-lg transition-all group-hover:shadow-primary-900/20">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-primary-400 font-bold text-lg">0{step.step}</span>
                                        <h3 className="font-bold text-xl">{step.title}</h3>
                                    </div>
                                    <p className="text-slate-400">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* FAQ & CTA Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                    {/* FAQ */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-2xl font-bold mb-6 font-orbitron">Questions Fréquentes</h3>
                        {study.faq?.map((item, idx) => (
                            <div key={idx} className="bg-slate-900/30 border border-slate-800 rounded-lg overflow-hidden">
                                <details className="group">
                                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6">
                                        <span>{item.question}</span>
                                        <span className="transition group-open:rotate-180">
                                            <ChevronDown />
                                        </span>
                                    </summary>
                                    <div className="text-slate-400 px-6 pb-6 pt-0 leading-relaxed">
                                        {item.answer}
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>

                    {/* CTA CARD */}
                    <div className="lg:col-span-1 sticky top-24">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 p-8 rounded-2xl border border-slate-800 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary-500/5 group-hover:bg-primary-500/10 transition-colors" />

                            <h3 className="text-xl font-bold mb-6 text-white relative z-10">
                                Intéressé par ce workflow ?
                            </h3>

                            <ul className="space-y-4 mb-8 relative z-10 text-slate-300">
                                <li className="flex items-center gap-3 text-sm">
                                    <CheckCircle2 size={16} className="text-primary-500" />
                                    Installation plug & play
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <CheckCircle2 size={16} className="text-primary-500" />
                                    Documentation incluse
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <CheckCircle2 size={16} className="text-primary-500" />
                                    Support de mise en place
                                </li>
                            </ul>

                            {study.downloadUrl && (
                                <a
                                    href={study.downloadUrl}
                                    className="block w-full py-4 px-6 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-lg text-center transition-all transform hover:scale-[1.02] shadow-lg shadow-primary-500/25 relative z-10 flex items-center justify-center gap-2"
                                >
                                    <Download size={20} />
                                    Télécharger le blueprint
                                </a>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CaseStudyDetail;
