import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Shield, ArrowRight, Star } from 'lucide-react';

const testimonials = [
  { name: 'Sarah K.', role: 'Digital Forensics Lead', text: 'This caught a deepfake our entire team missed. Extraordinary.' },
  { name: 'James R.', role: 'Head of Security, TechCorp', text: 'The API integration took 20 minutes. Accuracy is unreal.' },
  { name: 'Priya M.', role: 'Journalist, Reuters', text: 'Essential tool for verifying source media. Saved us twice.' },
];

export const CallToAction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
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

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(99,102,241,0.12) 0%, transparent 55%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.12) 0%, transparent 55%)',
        }}
      />

      {/* Top divider */}
      <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)' }} 
        animate={{ opacity: [0.3, 1, 0.3], width: ['400px', '600px', '400px'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Glow orbs */}
      <motion.div
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          width: 500, height: 500,
          top: '30%', left: '10%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Testimonials row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={13} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                "{t.text}"
              </p>
              <div>
                <p className="text-white text-sm font-semibold" style={{ fontFamily: "'Syne', sans-serif" }}>{t.name}</p>
                <p className="text-slate-500 text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl p-12 md:p-20 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          {/* Inner glow */}
          <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] blur-[80px] -z-10"
            style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.3), transparent 70%)' }} 
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div className="absolute bottom-0 right-0 w-60 h-60 blur-[80px] -z-10"
            style={{ background: 'rgba(139,92,246,0.2)' }} 
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* Decorative grid lines */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden -z-10 opacity-40"
            style={{
              backgroundImage: 'linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />

          {/* Shield icon with pulse */}
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="absolute w-24 h-24 rounded-full animate-ping opacity-20"
              style={{ background: 'rgba(99,102,241,0.5)', animationDuration: '3s' }} />
            <motion.div className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 40px rgba(99,102,241,0.5)' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Shield size={36} className="text-white" />
            </motion.div>
          </div>

          <h2
            className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Ready to uncover
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #a5b4fc, #e879f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              the truth?
            </span>
          </h2>

          <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Join thousands of journalists, security researchers, and enterprises who trust
            our platform to verify digital media authenticity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-bold text-base overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 0 40px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              <span className="relative z-10">Go to Dashboard</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #818cf8, #a78bfa)' }} />
            </Link>

            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-slate-300 font-medium text-base transition-all duration-200 hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              View Pricing
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-slate-500 text-xs uppercase tracking-wider">
            {['SOC 2 Certified', 'No Data Retained', 'GDPR Compliant', '99.99% Uptime'].map((b) => (
              <span key={b} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {b}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;