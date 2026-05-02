import React from 'react';
import { Shield, Globe, Mail, GitBranch, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const FooterLink = ({ href, to, children }) => {
  const El = to ? Link : 'a';
  return (
    <motion.li whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
      <El
        href={href}
        to={to}
        className="text-slate-500 hover:text-slate-200 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
      >
        <motion.span
          className="w-0 h-px bg-indigo-400 group-hover:w-3 transition-all duration-200"
          style={{ display: 'inline-block' }}
        />
        {children}
      </El>
    </motion.li>
  );
};

const SocialBtn = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    aria-label={label}
    whileHover={{ y: -3, scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors"
    style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
    }}
  >
    <Icon size={17} />
  </motion.a>
);

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <footer
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)' }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-32 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.07), transparent 70%)', filter: 'blur(20px)' }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8"
      >
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <motion.div
                whileHover={{ rotate: -6, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="p-2 rounded-xl"
                style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
              >
                <Shield size={22} className="text-indigo-400" />
              </motion.div>
              <span
                className="text-lg font-black tracking-tight text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                DeepFake{' '}
                <span style={{ background: 'linear-gradient(90deg,#818cf8,#c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Detector
                </span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              State-of-the-art AI to detect synthetic media, face swaps, and GAN artifacts in seconds.
              Trusted by security teams worldwide.
            </p>
            <div className="flex gap-3 mt-6">
              <SocialBtn href="#" icon={GitBranch} label="GitHub" />
              <SocialBtn href="#" icon={MessageCircle} label="Twitter" />
              <SocialBtn href="#" icon={Mail} label="Email" />
              <SocialBtn href="#" icon={Globe} label="Website" />
            </div>
          </motion.div>

          {/* Links col 1 */}
          <motion.div variants={itemVariants}>
            <p
              className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-5"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Product
            </p>
            <ul className="space-y-3">
              <FooterLink to="/dashboard">Dashboard</FooterLink>
              <FooterLink href="#">API Docs</FooterLink>
              <FooterLink href="#">Pricing</FooterLink>
              <FooterLink href="#">Changelog</FooterLink>
            </ul>
          </motion.div>

          {/* Links col 2 */}
          <motion.div variants={itemVariants}>
            <p
              className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-5"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Company
            </p>
            <ul className="space-y-3">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="h-px mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }}
        />

        {/* Bottom row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} DeepFake Detector. All rights reserved.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4">
            {['SOC 2', 'GDPR', 'Zero Retention'].map((badge) => (
              <motion.span
                key={badge}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 px-3 py-1 rounded-full"
                style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" style={{ boxShadow: '0 0 6px #10b981' }} />
                {badge}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;