import React, { Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Spinner from './components/common/Spinner';

const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));
const Testimonials = lazy(() => import('./components/Testimonials'));

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
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
          <Testimonials />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
