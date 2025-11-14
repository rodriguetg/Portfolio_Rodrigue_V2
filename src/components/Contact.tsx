import React, { useReducer } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import axios from 'axios';
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
  
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID"; // IMPORTANT: Replace with your form ID

  const onSubmit = async (data: FormData) => {
    dispatch({ type: 'SUBMIT' });
    try {
      await axios.post(FORMSPREE_ENDPOINT, data);
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
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Me Contacter</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-4"></div>
          <p className="section-subtitle">Intéressé par une collaboration ? N'hésitez pas à me contacter.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Informations</h3>
            <div className="space-y-6">
              {/* Info items */}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white pt-4">Réseaux Sociaux</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 hover:scale-110" title={social.label}>
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Form fields */}
              <button type="submit" disabled={submissionState !== 'idle'} className={`w-full font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg ${submissionState === 'success' ? 'bg-green-600 text-white' : ''} ${submissionState === 'error' ? 'bg-red-600 text-white' : ''} ${submissionState === 'idle' || submissionState === 'loading' ? 'bg-primary-600 hover:bg-primary-700 text-white' : ''} ${submissionState === 'loading' ? 'cursor-wait' : ''}`}>
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
