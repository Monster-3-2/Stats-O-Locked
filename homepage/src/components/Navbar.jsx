import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Team', href: '/team' },
  { label: 'Research', href: '/research' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        padding: '0 40px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled
          ? 'rgba(2, 11, 22, 0.9)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(0, 240, 255, 0.1)'
          : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex items-center justify-between relative">
        {/* Left Group */}
        <div className="flex-shrink-0">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.7rem',
                fontWeight: 700,
                letterSpacing: '2px',
                color: '#fff',
              }}
            >
              SOL<span style={{ color: '#00f0ff' }}>.</span>
            </motion.div>
          </Link>
        </div>

        {/* Center Group */}
        <div className="hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2 items-center">
          {navLinks.map((link) => (
            <motion.div
              key={link.label}
              whileHover={{ y: -1 }}
              style={{ transition: 'all 0.3s' }}
            >
              <Link
                to={link.href}
                style={{
                  color: '#e0e6ed',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right Group */}
        <div className="flex items-center gap-6 flex-shrink-0">
          {/* Desktop Contact Button */}
          <div className="hidden md:block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/contact"
                className="btn-neon btn-neon-primary"
                style={{ padding: '8px 22px', fontSize: '0.85rem', textDecoration: 'none' }}
              >
                Contact
              </Link>
            </motion.div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            style={{
              background: 'none',
              border: 'none',
              color: '#00f0ff',
              cursor: 'pointer',
              display: 'flex',
            }}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '70px',
              left: 0,
              width: '100%',
              background: 'rgba(2, 11, 22, 0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(0, 240, 255, 0.1)',
              padding: '20px 40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {[...navLinks, { label: 'Contact', href: '/contact' }].map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  textDecoration: 'none',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.nav>
  );
}
