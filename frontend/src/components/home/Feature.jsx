import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eye, Video, Lock, Cpu, Globe, BarChart2 } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'MTCNN face detection',
    description:
      'Multi-task Cascaded CNN detects the largest face in each frame, applies a 20px margin and crops to 224×224px. Falls back to full-frame resize if no face is found.',
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.25)',
  },
  {
    icon: Video,
    title: 'Per-frame video inference',
    description:
      'OpenCV extracts frames uniformly, skipping the first and last 10%. Each 224×224 crop runs a full EfficientNet-B0 forward pass independently.',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.25)',
  },
  {
    icon: Cpu,
    title: 'EfficientNet-B0 backbone',
    description:
      '5.3M parameter model with 7 MBConv blocks pretrained on ImageNet. Custom head: Dropout(0.3) → Linear(1280→1). Trained with BCEWithLogitsLoss and AdamW optimizer.',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.25)',
  },
  {
    icon: BarChart2,
    title: 'Sigmoid confidence scoring',
    description:
      'Raw logit converted via torch.sigmoid(). Threshold fixed at 0.5 — above is FAKE, below is REAL. Per-frame scores averaged for overall video verdict.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.25)',
  },
  {
    icon: Lock,
    title: 'Local inference only',
    description:
      'Model runs entirely on your machine via FastAPI. No image data is sent to any external server. Files processed in memory — never written to disk.',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.25)',
  },
  {
    icon: Globe,
    title: 'FastAPI REST endpoints',
    description:
      'POST /predict/image and POST /predict/video return JSON with overall_prediction, fake_confidence, real_confidence, frames_analyzed, frame_results and processing_time_ms.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.25)',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

const FeatureCard = ({ feature, index }) => {
  const { icon: Icon, title, description, color, glow } = feature
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="relative group rounded-2xl p-7 flex flex-col gap-4
                 overflow-hidden cursor-default"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100
                   transition-opacity duration-500 rounded-2xl -z-10"
        style={{ background: `radial-gradient(circle at 30% 30%, ${glow}, transparent 70%)` }}
      />

      <motion.div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
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
        <p className="text-slate-400 text-sm leading-relaxed"
           style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {description}
        </p>
      </div>

      <div
        className="absolute bottom-0 left-7 right-7 h-px opacity-0
                   group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  )
}

export const FeaturesSection = () => {
  const titleRef = useRef(null)
  const isInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section
      id="features"
      className="relative w-full py-28 px-6 overflow-hidden"
      style={{ background: '#000000' }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)' }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          width: 500, height: 500, top: '20%', left: '-10%',
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
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                       text-xs font-semibold uppercase tracking-widest
                       text-indigo-400 mb-6"
            style={{ background: 'rgba(99,102,241,0.1)',
                     border: '1px solid rgba(99,102,241,0.2)' }}
          >
            Model architecture
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            How the model works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto text-base"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            EfficientNet-B0 trained on 40,000 frames from Celeb-DF v2
            and FaceForensics++. Validation accuracy 98.98% · AUC-ROC 0.9992.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection;