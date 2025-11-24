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

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<Spinner />}>
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
