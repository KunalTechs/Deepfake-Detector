import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Activity, Lock } from 'lucide-react';
import Upload from '../components/Upload';
import Loader from '../components/Loader';
import ResultCard from '../components/ResultCard';
import { analyzeMedia } from '../services/api';

const GridBg = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage:
        'linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)',
      backgroundSize: '60px 60px',
    }}
  />
);

const StatPill = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-center gap-3 px-4 py-3 rounded-2xl flex-1"
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
    }}
  >
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: `${color}18`, border: `1px solid ${color}30` }}
    >
      <Icon size={15} style={{ color }} />
    </div>
    <div className="min-w-0">
      <p className="text-white text-sm font-bold leading-none mb-0.5" style={{ fontFamily: "'Syne', sans-serif" }}>
        {value}
      </p>
      <p className="text-slate-500 text-xs truncate">{label}</p>
    </div>
  </motion.div>
);

const pageVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
};

const Dashboard = () => {
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);

  const handleFileUpload = async (file) => {
    setStatus('loading');
    try {
      const res = await analyzeMedia(file);
      setResult(res);
      setStatus('result');
    } catch (error) {
      console.error('Analysis failed', error);
      setStatus('idle');
    }
  };

  const handleReset = () => {
    setResult(null);
    setStatus('idle');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col" style={{ background: '#000000' }}>
      <GridBg />

      {/* Ambient glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.1), transparent 70%)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07), transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full px-6 py-14 flex flex-col flex-grow">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-5"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)' }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-indigo-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            AI-Powered Analysis
          </motion.div>

          <h1
            className="text-4xl md:text-5xl font-black text-white mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Detection{' '}
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
              Dashboard
            </motion.span>
          </h1>

          <p className="text-slate-400 text-base max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Upload an image or video to instantly scan for deepfake signatures and synthetic manipulation.
          </p>
        </motion.div>

        {/* ── Stat pills ── */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <StatPill icon={Shield}   value="99.4%"  label="Detection Accuracy"    color="#6366f1" delay={0.2} />
          <StatPill icon={Zap}      value="<2s"    label="Avg. Analysis Time"    color="#8b5cf6" delay={0.3} />
          <StatPill icon={Activity} value="50M+"   label="Media Scanned"         color="#38bdf8" delay={0.4} />
          <StatPill icon={Lock}     value="E2E"    label="Encrypted & Private"   color="#10b981" delay={0.5} />
        </div>

        {/* ── Main content area ── */}
        <div className="flex-grow flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">

            {/* IDLE — upload cards */}
            {status === 'idle' && (
              <motion.div
                key="idle"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl mx-auto">
                  <Upload type="image" onFileUpload={handleFileUpload} />
                  <Upload type="video" onFileUpload={handleFileUpload} />
                </div>

                {/* Trust note */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center text-slate-600 text-xs mt-6 flex items-center justify-center gap-1.5"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Lock size={11} />
                  Files are processed in isolated memory and never stored
                </motion.p>
              </motion.div>
            )}

            {/* LOADING */}
            {status === 'loading' && (
              <motion.div
                key="loading"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-lg mx-auto"
              >
                <Loader />
              </motion.div>
            )}

            {/* RESULT */}
            {status === 'result' && result && (
              <motion.div
                key="result"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-xl mx-auto"
              >
                <ResultCard result={result} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;