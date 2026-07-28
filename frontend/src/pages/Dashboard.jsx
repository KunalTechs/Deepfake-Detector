import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, FlaskConical, ShieldCheck } from 'lucide-react';
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
      background: 'rgba(0, 0, 0,0.03)',
      border: '1px solid rgba(0, 0, 0,0.07)',
    }}
  >
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: `${color}18`, border: `1px solid ${color}30` }}
    >
      <Icon size={15} style={{ color }} />
    </div>
    <div className="min-w-0">
      <p className="text-slate-900 text-sm font-bold leading-none mb-0.5"
         style={{ fontFamily: "'Syne', sans-serif" }}>
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
  const [error,  setError]  = useState(null);

  const handleFileUpload = async (file) => {
    setStatus('loading');
    setError(null);
    const res = await analyzeMedia(file);
    if (!res.success) {
      setError(res.error)
      setStatus('idle')
      return
    }
    setResult(res);
    setStatus('result');
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setStatus('idle');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col"
         style={{ background: 'transparent' }}>
      <GridBg />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
           style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.1), transparent 70%)',
                    filter: 'blur(40px)' }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07), transparent 70%)',
                    filter: 'blur(60px)' }} />

      <div className="relative z-10 max-w-5xl mx-auto w-full px-6 py-14 flex flex-col flex-grow">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          {/* Model badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                       text-xs font-semibold uppercase tracking-widest
                       text-indigo-400 mb-5"
            style={{ background: 'rgba(99,102,241,0.1)',
                     border: '1px solid rgba(99,102,241,0.25)' }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-indigo-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            EfficientNet-B0 · CelebDF + FF++
          </motion.div>

          <h1
            className="text-4xl md:text-5xl font-black text-slate-900 mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Deepfake{' '}
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
              Detector
            </motion.span>
          </h1>

          <p className="text-slate-600 text-base max-w-lg mx-auto"
             style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Powered by EfficientNet-B0 trained on 80,000 frames from
            Celeb-DF v2 and FaceForensics++. Upload an image or video
            to run inference.
          </p>
        </motion.div>

        {/* ── Model stat pills ── */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <StatPill icon={Brain}       value="EfficientNet-B0" label="Model architecture"  color="#6366f1" delay={0.2} />
          <StatPill icon={FlaskConical} value="80K frames"      label="Training dataset"    color="#8b5cf6" delay={0.3} />
          <StatPill icon={Cpu}         value="98.98%"           label="Validation accuracy" color="#38bdf8" delay={0.4} />
          <StatPill icon={ShieldCheck} value="0.9992"           label="AUC-ROC score"       color="#10b981" delay={0.5} />
        </div>

        {/* ── Error banner ── */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 px-4 py-3 rounded-xl text-sm text-center max-w-lg mx-auto w-full"
            style={{ background: 'rgba(239,68,68,0.1)',
                     border: '1px solid rgba(239,68,68,0.3)',
                     color: '#ef4444' }}
          >
            {error}
          </motion.div>
        )}

        {/* ── Main content ── */}
        <div className="flex-grow flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">

            {status === 'idle' && (
              <motion.div
                key="idle"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5
                                w-full max-w-3xl mx-auto">
                  <Upload type="image" onFileUpload={handleFileUpload} />
                  <Upload type="video" onFileUpload={handleFileUpload} />
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center text-slate-600 text-xs mt-6
                             flex items-center justify-center gap-1.5"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Cpu size={11} />
                  Inference runs locally on your machine — no data is uploaded to any server
                </motion.p>
              </motion.div>
            )}

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