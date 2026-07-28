import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home',     href: '/',         isRouter: true },
  { label: 'Features', href: '#features', isRouter: false },
  { label: 'Process',  href: '#process',  isRouter: false },
  { label: 'Contact',  href: '#cta',      isRouter: false },
];

const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(251, 250, 248, 0.95)' : 'rgba(251, 250, 248, 0.7)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled
          ? '1px solid rgba(99,102,241,0.15)'
          : '1px solid rgba(0, 0, 0,0.05)',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(139,92,246,0.6), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.08, rotate: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative p-2 rounded-xl"
            style={{
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.25)',
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: 'rgba(99,102,241,0.2)', filter: 'blur(6px)' }}
            />
            <Shield size={24} className="text-indigo-400 relative z-10" />
          </motion.div>

          <span
            className="text-xl font-black tracking-tight text-slate-900"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            DeepFake
            <span
              style={{
                background: 'linear-gradient(90deg, #818cf8, #c084fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {' '}Detector
            </span>
          </span>
        </Link>

        {/* ── Nav links ── */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ label, href, isRouter }) => {
            const isActive = isRouter && !isDashboard;
            const El = isRouter ? Link : 'a';
            const elProps = isRouter ? { to: href } : { href };

            return (
              <motion.div key={label} whileHover={{ y: -1 }} transition={{ type: 'spring', stiffness: 300 }}>
                <El
                  {...elProps}
                  className="relative px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 group"
                  style={{
                    color: isActive ? '#0f172a' : '#475569',
                    fontFamily: "'DM Sans', sans-serif",
                    textDecoration: 'none',
                  }}
                >
                  <span className="relative z-10">{label}</span>

                  {/* Hover background */}
                  <span
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: 'rgba(99,102,241,0.08)' }}
                  />

                  {/* Active underline */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0.5 left-3 right-3 h-px"
                      style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                    />
                  )}
                </El>
              </motion.div>
            );
          })}

          {/* Divider */}
          <div className="w-px h-5 mx-2 flex-shrink-0" style={{ background: 'rgba(0, 0, 0,0.1)' }} />

          {/* Launch App button */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/dashboard"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 0 20px rgba(99,102,241,0.35), inset 0 1px 0 rgba(0, 0, 0,0.15)',
              }}
            >
              <motion.span
                className="absolute inset-0"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0,0.12), transparent)' }}
              />
              <span className="relative z-10">Launch App</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;