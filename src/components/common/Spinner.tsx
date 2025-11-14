import React from 'react';
import { motion } from 'framer-motion';

const Spinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full"
    />
  </div>
);

export default Spinner;
