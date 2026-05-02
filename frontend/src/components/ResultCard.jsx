import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, RefreshCw, ShieldAlert, ShieldCheck, TrendingUp, Eye } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* Animated radial confidence gauge */
const ConfidenceGauge = ({ percent, isFake }) => {
  const color = isFake ? '#ef4444' : '#10b981';
  const glow = isFake ? 'rgba(239,68,68,0.4)' : 'rgba(16,185,129,0.4)';
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const dash = (percent / 100) * circ;

  return (
    <div className="relative flex items-center justify-center w-36 h-36">
      {/* Track */}
      <svg className="absolute inset-0" width="144" height="144" viewBox="0 0 144 144">
        <circle cx="72" cy="72" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <motion.circle
          cx="72" cy="72" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          transform="rotate(-90 72 72)"
          style={{ filter: `drop-shadow(0 0 6px ${glow})` }}
        />
      </svg>
      {/* Center text */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-2xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
          {percent.toFixed(1)}%
        </span>
        <span className="text-xs text-slate-500 uppercase tracking-widest">confidence</span>
      </motion.div>
    </div>
  );
};

const StatBox = ({ label, value, icon: Icon, color, delay }) => (
  <motion.div
    variants={itemVariants}
    className="flex flex-col gap-2 p-5 rounded-2xl"
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    whileHover={{ scale: 1.03, borderColor: `${color}40` }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center"
      style={{ background: `${color}15`, border: `1px solid ${color}25` }}
    >
      <Icon size={16} style={{ color }} />
    </div>
    <p className="text-2xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{value}</p>
    <p className="text-slate-500 text-xs uppercase tracking-widest">{label}</p>
  </motion.div>
);

const ResultCard = ({ result, onReset }) => {
  const isFake = result.result === 'Fake';
  const confidencePercent = result.confidence * 100;

  const color = isFake ? '#ef4444' : '#10b981';
  const glow = isFake ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)';
  const ShieldIcon = isFake ? ShieldAlert : ShieldCheck;
  const StatusIcon = isFake ? AlertTriangle : CheckCircle2;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${color}30`,
        boxShadow: `0 0 60px ${glow}`,
      }}
    >
      {/* Top color bar */}
      <motion.div
        className="h-1 w-full"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: `linear-gradient(90deg, ${color}, ${color}60, transparent)` }}
      />

      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-48 pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${glow}, transparent 70%)`, filter: 'blur(20px)' }}
      />

      <div className="relative z-10 p-8">

        {/* ── Verdict header ── */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          {/* Shield icon */}
          <motion.div
            className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}15`, border: `1px solid ${color}30` }}
            animate={{ boxShadow: [`0 0 0px ${glow}`, `0 0 30px ${glow}`, `0 0 0px ${glow}`] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ShieldIcon size={38} style={{ color }} />
          </motion.div>

          <div className="text-center sm:text-left">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2"
              style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
            >
              <StatusIcon size={11} />
              {isFake ? 'Manipulation Detected' : 'No Manipulation Found'}
            </div>
            <h2
              className="text-3xl font-black text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {isFake ? 'DeepFake Detected' : 'Authentic Media'}
            </h2>
            <p className="text-slate-400 text-sm mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {isFake
                ? 'This media shows signs of synthetic manipulation.'
                : 'This media appears to be genuine and unaltered.'}
            </p>
          </div>
        </motion.div>

        {/* ── Gauge + stats ── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-6 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <ConfidenceGauge percent={confidencePercent} isFake={isFake} />
          <div className="flex-1 grid grid-cols-2 gap-3 w-full">
            <StatBox label="Faces Detected" value={result.details.faces_detected} icon={Eye} color="#6366f1" />
            <StatBox label="Artifacts Found" value={result.details.artifacts_found} icon={TrendingUp} color={color} />
          </div>
        </motion.div>

        {/* ── Reset button ── */}
        <motion.div variants={itemVariants}>
          <motion.button
            onClick={onReset}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-white font-semibold text-sm relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: '0 0 30px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {/* Shimmer */}
            <motion.span
              className="absolute inset-0"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}
            />
            <RefreshCw size={16} className="relative z-10" />
            <span className="relative z-10">Analyze Another File</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultCard;