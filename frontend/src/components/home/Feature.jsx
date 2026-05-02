import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Eye, Video, Lock, Cpu, Globe, BarChart2 } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Image Forensics',
    description:
      'Upload any photo and instantly verify its authenticity. We detect GAN-generated faces, subtle warping, and pixel-level inconsistencies invisible to the naked eye.',
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.25)',
  },
  {
    icon: Video,
    title: 'Frame-by-Frame Video',
    description:
      'Robust temporal analysis for videos. We track micro-expression discontinuities and boundary artifacts across every single frame with sub-millisecond precision.',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.25)',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description:
      'Your media is processed in isolated memory and never persisted. End-to-end encryption, SOC 2 Type II compliance, and zero-retention by design.',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.25)',
  },
  {
    icon: Cpu,
    title: 'Neural Architecture',
    description:
      'Powered by our proprietary multi-modal transformer trained on 200M+ real and synthetic samples across every major deepfake generation method.',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.25)',
  },
  {
    icon: Globe,
    title: 'Real-Time API',
    description:
      'Integrate detection into your own platform via REST or WebSocket. Sub-2-second response times at scale with 99.99% uptime SLA.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.25)',
  },
  {
    icon: BarChart2,
    title: 'Confidence Scoring',
    description:
      'Every result includes a granular manipulation probability map, region heatmap, and explainability report so you know exactly where and why.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.25)',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const FeatureCard = ({ feature, index }) => {
  const { icon: Icon, title, description, color, glow } = feature;
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="relative group rounded-2xl p-7 flex flex-col gap-4 overflow-hidden cursor-default"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Card hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10"
        style={{ background: `radial-gradient(circle at 30% 30%, ${glow}, transparent 70%)` }}
      />

      {/* Icon container */}
      <motion.div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Icon size={22} style={{ color }} />
      </motion.div>

      <div>
        <h3
          className="text-lg font-bold text-white mb-2"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-7 right-7 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  );
};

export const FeaturesSection = () => {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: '-80px' });

  return (
    <section
      id="features"
      className="relative w-full py-28 px-6 overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Section ambient */}
      <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)' }} 
        animate={{ opacity: [0.3, 1, 0.3], width: ['600px', '800px', '600px'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Glow orbs */}
      <motion.div
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          width: 500, height: 500,
          top: '20%', left: '-10%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.1), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          width: 400, height: 400, bottom: '10%', right: '-5%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-6"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
          >
            Platform Capabilities
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Why Choose Our Platform?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto text-base"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            We leverage advanced neural networks to surface artifacts invisible
            to the human eye — at a scale no human reviewer could match.
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;