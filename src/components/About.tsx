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
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">À propos de moi</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
              alt="Stratégie marketing digitale et création de contenu"
              className="rounded-lg shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {aboutText.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <InfoItem icon={<MapPin size={20} className="text-primary-600" />} text={personalInfo.location} />
              <InfoItem icon={<Mail size={20} className="text-primary-600" />} text={personalInfo.email} />
              <InfoItem icon={<Phone size={20} className="text-primary-600" />} text={personalInfo.phone} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
