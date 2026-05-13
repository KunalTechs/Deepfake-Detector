import React, { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, ArrowRight, ShieldCheck } from 'lucide-react';

const ScanLine = () => (
  <motion.div
    className="absolute left-0 w-full h-px pointer-events-none z-0"
    style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)' }}
    initial={{ top: '0%', opacity: 0.6 }}
    animate={{ top: '100%', opacity: 0 }}
    transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
  />
);

const Particle = ({ style }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      ...style,
      background: 'rgba(99,102,241,0.2)',
      filter: 'blur(2px)',
      willChange: 'transform',
    }}
    animate={{ y: [0, -28, 0], opacity: [0.3, 0.75, 0.3], scale: [1, 1.08, 1] }}
    transition={{
      duration: style.duration,
      delay: style.delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        style: {
          width: Math.random() * 60 + 8,
          height: Math.random() * 60 + 8,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          duration: Math.random() * 4 + 5,
          delay: -(Math.random() * 5),
        },
      })),
    []
  );

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <ScanLine />

      {/* Glow orb center */}
      <motion.div
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          width: 600,
          height: 600,
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)',
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Glow orb bottom right */}
      <motion.div
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          width: 280,
          height: 280,
          bottom: '5%',
          right: '5%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Glow orb top left */}
      <motion.div
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          width: 200,
          height: 200,
          top: '8%',
          left: '5%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.1), transparent 70%)',
          filter: 'blur(50px)',
          willChange: 'transform',
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <Particle key={p.id} style={p.style} />
      ))}

      {/* Main content */}
      <motion.div
        style={{ y, opacity, willChange: 'transform, opacity' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center max-w-5xl w-full"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-sm font-medium text-indigo-300"
          style={{
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.3)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          >
            <Cpu size={14} className="text-indigo-400" />
          </motion.div>
          <span>EfficientNet-B0 · Trained on 80K frames</span>
          <motion.span
            className="w-2 h-2 rounded-full bg-indigo-400 ml-1"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-white mb-6 leading-[0.95]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Detect Deepfakes
          <br />
          <motion.span
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{
              background: 'linear-gradient(90deg, #818cf8, #c084fc, #38bdf8, #818cf8)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            with EfficientNet
          </motion.span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          EfficientNet-B0 trained on 80,000 frames from Celeb-DF v2 and
          FaceForensics++. Upload an image or video — MTCNN detects the face,
          the model runs inference and returns a sigmoid confidence score.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Primary button */}
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/dashboard"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 0 30px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              <span className="relative z-10">Run Inference Now</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight size={18} />
              </motion.div>
              <motion.span
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{ background: 'linear-gradient(135deg, #818cf8, #a78bfa)' }}
              />
            </Link>
          </motion.div>

          {/* Secondary button */}
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-slate-300 font-medium text-base transition-colors duration-300 hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <ShieldCheck size={18} className="text-indigo-400" />
              <span>Model details</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {[
            { value: '98.98%', label: 'Validation accuracy' },
            { value: '0.9992', label: 'AUC-ROC score' },
            { value: '80K',    label: 'Training frames' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="text-3xl font-black text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {stat.value}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-widest">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-0"
        style={{ background: 'linear-gradient(to top, #000000, transparent)' }}
      />
    </section>
  );
};

export default HeroSection;