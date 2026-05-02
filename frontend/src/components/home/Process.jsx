import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Upload, Film, Brain, BarChart2, CheckCircle2 } from 'lucide-react';

/* ─────────────────────────────────────────
   DATA — mirrors the flowchart (no extension)
───────────────────────────────────────── */
const steps = [
  {
    id: 'input',
    phase: 'INPUT',
    icon: Upload,
    title: 'User Uploads File',
    desc: 'Drop an image or video into the web app dashboard.',
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.35)',
    accent: '#818cf8',
  },
  {
    id: 'backend',
    phase: 'BACKEND PROCESSING',
    icon: Film,
    title: 'System Extracts Frames',
    desc: 'Frames are extracted at 1 frame/sec ensuring efficient, consistent processing.',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.35)',
    accent: '#a78bfa',
  },
  {
    id: 'inference',
    phase: 'INFERENCE',
    icon: Brain,
    title: 'AI Scans Each Frame',
    desc: 'Our neural model inspects every frame for deepfake signatures and GAN artifacts.',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.35)',
    accent: '#f472b6',
  },
  {
    id: 'result',
    phase: 'RESULT',
    icon: BarChart2,
    title: 'Average Fake Probability',
    desc: 'System returns a clear confidence score — e.g., 90% Real — with a heatmap report.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.35)',
    accent: '#34d399',
    highlight: true,
  },
  {
    id: 'done',
    phase: 'COMPLETE',
    icon: CheckCircle2,
    title: 'Process Complete',
    desc: 'Download your full forensic report or integrate results via the REST API.',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.35)',
    accent: '#7dd3fc',
  },
];

/* ── Animated connector arrow between steps ── */
const Connector = ({ color, delay }) => (
  <div className="flex flex-col items-center" style={{ height: 56 }}>
    {/* Track */}
    <div className="relative flex flex-col items-center w-px flex-1">
      <motion.div
        className="w-px h-full"
        style={{ background: `linear-gradient(180deg, ${color}80, ${color}20)` }}
        initial={{ scaleY: 0, originY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
      />
      {/* Travelling dot */}
      <motion.div
        className="absolute top-0 w-2 h-2 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        initial={{ y: 0, opacity: 0 }}
        whileInView={{ y: [0, 44, 44], opacity: [0, 1, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: delay + 0.3, ease: 'easeInOut' }}
      />
    </div>
    {/* Arrowhead */}
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay + 0.4, duration: 0.3 }}
      style={{
        width: 0, height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: `7px solid ${color}`,
        marginTop: -1,
      }}
    />
  </div>
);

/* ── Individual step card ── */
const StepCard = ({ step, index }) => {
  const { icon: Icon, phase, title, desc, color, glow, accent, highlight } = step;

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      className="relative rounded-2xl p-6 overflow-hidden group cursor-default"
      style={{
        background: highlight
          ? `linear-gradient(135deg, ${color}18, ${color}08)`
          : 'rgba(255,255,255,0.03)',
        border: `1px solid ${highlight ? color + '40' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: highlight ? `0 0 40px ${color}15` : 'none',
        maxWidth: 480,
        width: '100%',
      }}
    >
      {/* Corner glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 20% 20%, ${glow}, transparent 60%)` }}
      />

      {/* Phase label */}
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
        style={{
          background: `${color}15`,
          border: `1px solid ${color}30`,
          color: accent,
          fontFamily: "'Syne', sans-serif",
        }}
      >
        {/* Blinking dot for highlight card */}
        {highlight && (
          <motion.span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: accent }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}
        {phase}
      </div>

      <div className="flex items-start gap-4 relative z-10">
        {/* Icon box */}
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
          whileHover={{ rotate: -6, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon size={22} style={{ color }} />
        </motion.div>

        <div>
          <h3
            className="text-white font-bold text-base mb-1"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {desc}
          </p>
        </div>
      </div>

      {/* Bottom shimmer on highlight */}
      {highlight && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

/* ── Main section ── */
export const ProcessSection = () => {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: '-80px' });

  return (
    <section
      className="relative w-full py-28 px-6 overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)' }}
      />

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.07), transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-400 mb-6"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
          >
            How It Works
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            From Upload to{' '}
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
              Verdict
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-slate-400 max-w-md mx-auto text-base"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Our pipeline processes your media in under 2 seconds — from raw file to forensic confidence score.
          </motion.p>
        </div>

        {/* Steps flow */}
        <div className="flex flex-col items-center">
          {steps.map((step, i) => (
            <React.Fragment key={step.id}>
              <StepCard step={step} index={i} />
              {i < steps.length - 1 && (
                <Connector color={steps[i + 1].color} delay={0.1 + i * 0.12} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #000000, transparent)' }}
      />
    </section>
  );
};

export default ProcessSection;