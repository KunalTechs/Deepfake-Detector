import React from 'react';
import { HeroSection } from '../components/home/Hero';
import { FeaturesSection } from '../components/home/Feature';
import { CallToAction } from '../components/home/CTA';
import { ProcessSection } from '../components/home/Process';
 

/**
 * Home Page
 * Composes HeroSection → FeaturesSection → CallToAction → ProcessSection
 *
 * Dependencies (install if not present):
 *   npm install framer-motion
 *
 * Fonts (add to your index.html <head>):
 *   <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
 */

const Home = () => {
  return (
    <div
      className="w-full"
      style={{ background: '#0a0c1b', color: '#fff', minHeight: '100vh' }}
    >
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <CallToAction />
    </div>
  );
};

export default Home;