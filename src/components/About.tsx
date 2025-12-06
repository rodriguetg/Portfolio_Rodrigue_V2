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
    <section id="about" className="relative py-32 bg-gradient-to-br from-white via-blue-50/30 to-primary-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
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
              À propos de moi
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-primary-700 dark:from-white dark:to-primary-300 mb-4">
            Mon Histoire
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-blue-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Stratégie marketing digitale et création de contenu"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 p-6 md:p-10 rounded-2xl shadow-2xl relative z-20">
              {aboutText.split('\n\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-base md:text-lg text-gray-900 dark:text-gray-100 leading-relaxed font-normal tracking-wide"
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
              className="space-y-4 pt-8"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="group relative overflow-hidden p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-3" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Localisation</p>
                  <p className="text-gray-600 dark:text-gray-300">{personalInfo.location}</p>
                </div>

                <div className="group relative overflow-hidden p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-3" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Email</p>
                  <p className="text-gray-600 dark:text-gray-300 break-all">{personalInfo.email}</p>
                </div>

                <div className="group relative overflow-hidden p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 sm:col-span-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-3" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Téléphone</p>
                  <p className="text-gray-600 dark:text-gray-300">{personalInfo.phone}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
