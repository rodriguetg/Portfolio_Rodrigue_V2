import React from 'react';

const Spinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default Spinner;
