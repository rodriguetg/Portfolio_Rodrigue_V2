import React from 'react';
import { motion } from 'framer-motion';
import { aboutText, personalInfo, languages } from '../data/portfolioData';
import { MapPin, Mail, Phone, Languages } from 'lucide-react';

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            À propos de moi
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop"
              alt="Workspace"
              className="rounded-lg shadow-lg"
            />

            <div className="pt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Mes valeurs
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: "Excellence", desc: "Qualité dans chaque détail" },
                  { title: "Innovation", desc: "Toujours à la pointe" },
                  { title: "Collaboration", desc: "Réussir ensemble" }
                ].map((value, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{value.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert">
              {aboutText.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <MapPin size={20} className="text-primary-600" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Mail size={20} className="text-primary-600" />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Phone size={20} className="text-primary-600" />
                <span>{personalInfo.phone}</span>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Languages size={22} className="text-primary-600" />
                Langues
              </h3>
              <div className="space-y-2">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
