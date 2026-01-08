import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundCanvas from './components/common/BackgroundCanvas';

// Lazy load pages
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));

// Loading component
const Spinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const location = useLocation();

  return (
    <div className="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 relative selection:bg-primary-500/30 selection:text-primary-200">
      <Header />
      <BackgroundCanvas />
      <main>
        <AnimatePresence mode="wait">
          <Suspense fallback={<Spinner />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
