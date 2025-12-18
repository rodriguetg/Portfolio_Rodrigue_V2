import React from 'react';
import { motion } from 'framer-motion';
import { aboutText, personalInfo, languages } from '../data/portfolioData';
import { MapPin, Mail, Phone, Languages } from 'lucide-react';
import type { Language } from '../types';

const InfoItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
    {icon}
    <span>{text}</span>
  </div>
);

const LanguageItem: React.FC<{ lang: Language }> = ({ lang }) => (
  <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
    <span className="font-medium">{lang.name}</span>
    <span className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{lang.level}</span>
  </div>
);

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container-custom relative z-10">
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
            <span className="px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 text-sm font-semibold backdrop-blur-sm">
              À propos de moi
            </span>
          </motion.div>
          <h2 className="section-title">
            Mon Histoire
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-blue-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Stratégie marketing digitale et création de contenu"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0 transition-all"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-card p-8 md:p-10 relative z-20">
              {aboutText.split('\n\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-lg text-slate-300 leading-relaxed tracking-wide mb-6 last:mb-0"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4 pt-4"
            >
              <div className="glass-card p-6 hover:bg-slate-800/80 group">
                <MapPin className="w-6 h-6 text-primary-400 mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-slate-200 mb-1">Localisation</p>
                <p className="text-slate-400">{personalInfo.location}</p>
              </div>

              <div className="glass-card p-6 hover:bg-slate-800/80 group">
                <Mail className="w-6 h-6 text-primary-400 mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-slate-200 mb-1">Email</p>
                <p className="text-slate-400 break-all">{personalInfo.email}</p>
              </div>

              <div className="glass-card p-6 hover:bg-slate-800/80 group sm:col-span-2">
                <Phone className="w-6 h-6 text-primary-400 mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-slate-200 mb-1">Téléphone</p>
                <p className="text-slate-400">{personalInfo.phone}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
