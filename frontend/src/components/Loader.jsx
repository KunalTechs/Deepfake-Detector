import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const steps = [
  'Loading EfficientNet-B0 model...',
  'Detecting and cropping face regions...',
  'Running forward pass through 7 MBConv blocks...',
  'Computing sigmoid confidence score...',
];

const Loader = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center
                 py-14 px-8 rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(0, 0, 0,0.02)',
        border: '1px solid rgba(99,102,241,0.15)',
      }}
    >
      {/* Background pulse */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.1), transparent 70%)' }}
      />

      {/* Icon rings */}
      <div className="relative w-24 h-24 flex items-center justify-center mb-8">
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ border: '1px dashed rgba(99,102,241,0.4)' }}
        />
        <motion.div
          className="absolute inset-3 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{ border: '1px solid rgba(139,92,246,0.3)' }}
        />
        <motion.div
          className="absolute inset-6 rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'rgba(99,102,241,0.15)' }}
        />
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="relative z-10"
        >
          <Cpu size={28} className="text-indigo-400" />
        </motion.div>
        <motion.div
          className="absolute w-2.5 h-2.5 rounded-full"
          style={{
            background: '#818cf8',
            top: '50%', left: '50%',
            marginTop: -5, marginLeft: -5,
            transformOrigin: '5px 44px',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Title */}
      <motion.h3
        className="text-xl font-black text-slate-900 mb-1"
        style={{ fontFamily: "'Syne', sans-serif" }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Running inference
      </motion.h3>

      <p className="text-slate-500 text-sm mb-8 text-center"
         style={{ fontFamily: "'DM Sans', sans-serif" }}>
        EfficientNet-B0 · 5.3M parameters · MTCNN face detection
      </p>

      {/* Steps */}
      <div className="w-full max-w-xs space-y-2.5">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.6, duration: 0.5,
                          ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <motion.div
              className="w-4 h-4 rounded-full flex items-center
                         justify-center flex-shrink-0"
              initial={{ background: 'rgba(0, 0, 0,0.05)',
                         border: '1px solid rgba(0, 0, 0,0.1)' }}
              animate={{ background: 'rgba(99,102,241,0.3)',
                         border: '1px solid rgba(99,102,241,0.6)' }}
              transition={{ delay: i * 0.6 + 0.3, duration: 0.4 }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.6 + 0.5,
                              type: 'spring', stiffness: 300 }}
              />
            </motion.div>
            <motion.span
              className="text-xs"
              initial={{ color: 'rgba(100,116,139,0.5)' }}
              animate={{ color: 'rgba(148,163,184,1)' }}
              transition={{ delay: i * 0.6 + 0.3, duration: 0.4 }}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {step}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div
        className="mt-8 w-full max-w-xs h-1 rounded-full overflow-hidden"
        style={{ background: 'rgba(0, 0, 0,0.05)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #38bdf8)' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: steps.length * 0.6 + 0.5, ease: 'linear' }}
        />
      </div>

      {/* Model tag */}
      <p className="mt-6 text-xs text-slate-700"
         style={{ fontFamily: "'DM Sans', sans-serif" }}>
        model_v3.pt · trained on CelebDF v2 + FaceForensics++
      </p>
    </div>
  );
};

export default Loader;