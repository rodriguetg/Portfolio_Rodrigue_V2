import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import Spinner from '../components/common/Spinner';

const About = lazy(() => import('../components/About'));
const Experience = lazy(() => import('../components/Experience'));
const Projects = lazy(() => import('../components/Projects'));
const Skills = lazy(() => import('../components/Skills'));
const Certifications = lazy(() => import('../components/Certifications'));
const Contact = lazy(() => import('../components/Contact'));

function Home() {
  return (
    <>
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
    </>
  );
}

export default Home;
