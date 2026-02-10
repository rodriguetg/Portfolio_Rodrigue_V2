import React, { useReducer } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface FormData {
  name: string;
  email: string;
  message: string;
}

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';
type Action = { type: 'SUBMIT' } | { type: 'SUCCESS' } | { type: 'ERROR' } | { type: 'RESET' };

const submissionReducer = (state: SubmissionState, action: Action): SubmissionState => {
  switch (action.type) {
    case 'SUBMIT': return 'loading';
    case 'SUCCESS': return 'success';
    case 'ERROR': return 'error';
    case 'RESET': return 'idle';
    default: return state;
  }
};

const Contact: React.FC = () => {
  const [submissionState, dispatch] = useReducer(submissionReducer, 'idle');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  // ⚠️ ACTION REQUIRED: Replace 'YOUR_FORM_ID' with your actual Formspree ID (e.g., 'xpznqrzb')
  const FORMSPREE_ID = "YOUR_FORM_ID";
  const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

  const onSubmit = async (data: FormData) => {
    // Basic validation check to prevent sending with default ID
    if (FORMSPREE_ID === "YOUR_FORM_ID") {
      alert("Erreur de configuration : L'ID du formulaire Formspree n'a pas été défini dans le code.");
      return;
    }

    dispatch({ type: 'SUBMIT' });
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      dispatch({ type: 'SUCCESS' });
      reset();
      setTimeout(() => dispatch({ type: 'RESET' }), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      dispatch({ type: 'ERROR' });
      setTimeout(() => dispatch({ type: 'RESET' }), 5000);
    }
  };

  const socialLinks = [
    { icon: Github, url: personalInfo.socialLinks.github, label: 'GitHub' },
    { icon: Linkedin, url: personalInfo.socialLinks.linkedin, label: 'LinkedIn' },
    { icon: Twitter, url: personalInfo.socialLinks.twitter, label: 'Twitter' },
  ];

  const getButtonContent = () => {
    switch (submissionState) {
      case 'loading':
        return <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> Envoi...</>;
      case 'success':
        return <><CheckCircle size={20} /> Envoyé !</>;
      case 'error':
        return <><AlertTriangle size={20} /> Erreur</>;
      default:
        return <><Send size={20} /> Envoyer</>;
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold">
              Contact
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-primary-700 dark:from-white dark:to-primary-300 mb-6">
            Me Contacter
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ouvert à un CDI en marketing digital / automatisation, ainsi qu'à des collaborations sur des projets d'automatisation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-primary-500 to-blue-600 rounded-full"></div>
                Informations
              </h3>
              <div className="space-y-4">
                <div className="group p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Email</p>
                      <p className="text-gray-900 dark:text-white font-medium">{personalInfo.email}</p>
                    </div>
                  </div>
                </div>

                <div className="group p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Téléphone</p>
                      <p className="text-gray-900 dark:text-white font-medium">{personalInfo.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="group p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Localisation</p>
                      <p className="text-gray-900 dark:text-white font-medium">{personalInfo.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Réseaux Sociaux</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-600 dark:text-gray-300 hover:border-primary-500 dark:hover:border-primary-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                    title={social.label}
                  >
                    <social.icon size={28} className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 rounded-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-2xl">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Nom</label>
                <input
                  type="text"
                  {...register('name', { required: 'Le nom est requis' })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Votre nom"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Email</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'L\'email est requis',
                    pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' }
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="votre@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Message</label>
                <textarea
                  {...register('message', { required: 'Le message est requis' })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  placeholder="Votre message..."
                />
                {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submissionState !== 'idle'}
                className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:scale-105 ${submissionState === 'success'
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                  : submissionState === 'error'
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                    : 'bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white'
                  } ${submissionState === 'loading' ? 'cursor-wait' : ''}`}
              >
                {getButtonContent()}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
