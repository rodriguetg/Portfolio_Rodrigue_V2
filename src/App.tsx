import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy load heavy 3D background and pages
const BackgroundCanvas = lazy(() => import('./components/common/BackgroundCanvas'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));

// Loading component
const Spinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  // Defer 3D canvas loading until after page is interactive
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const id = requestIdleCallback(() => setShow3D(true), { timeout: 3000 });
    return () => cancelIdleCallback(id);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 relative selection:bg-primary-500/30 selection:text-primary-200">
      <Header />
      {show3D && (
        <Suspense fallback={null}>
          <BackgroundCanvas />
        </Suspense>
      )}
      {/* Static fallback background while 3D loads */}
      {!show3D && (
        <div className="fixed inset-0 z-0 bg-[#050505] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />
        </div>
      )}
      <main>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
