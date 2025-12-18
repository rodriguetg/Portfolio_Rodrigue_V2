import React, { Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Spinner from './components/common/Spinner';
import BackgroundCanvas from './components/common/BackgroundCanvas';

const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 transition-colors duration-300 relative selection:bg-primary-500/30 selection:text-primary-200">
      <BackgroundCanvas />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Suspense fallback={<Spinner />}>
            <About />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <Certifications />
          </Suspense>

          <Suspense fallback={<Spinner />}>
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
