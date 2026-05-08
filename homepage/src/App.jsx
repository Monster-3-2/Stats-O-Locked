import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Team from './pages/Team';
import Research from './pages/Research';
import Contact from './pages/Contact';
import EventDetails from './pages/EventDetails';
import Leaderboard from './pages/Leaderboard';
import Footer from './components/Footer';
import { HashRouter, Routes, Route } from 'react-router-dom';
import CursorGlow from './components/CursorGlow';
import RobotAssistant from './components/RobotAssistant';

// Intro overlay text animation
const statuses = [
  'INITIALIZING SYSTEM...',
  'LOADING NEURAL NETWORKS...',
  'CALIBRATING DATA NODES...',
  'ESTABLISHING CONNECTION...',
  'SYSTEM READY.',
];

function IntroOverlay({ onDone }) {
  const [statusIdx, setStatusIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const total = 2400;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
    }, total / 50);

    const statusInterval = setInterval(() => {
      setStatusIdx((i) => Math.min(i + 1, statuses.length - 1));
    }, total / statuses.length);

    const timer = setTimeout(onDone, total + 600);
    return () => { clearInterval(interval); clearInterval(statusInterval); clearTimeout(timer); };
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#020b16',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
      }}
    >
      {/* Animated logo */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '4rem',
          fontWeight: 700,
          letterSpacing: '6px',
        }}
      >
        <span style={{
          background: 'linear-gradient(135deg, #fff, #00f0ff, #7c3aed)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          SOL
        </span>
        <span style={{ color: '#00f0ff' }}>.</span>
      </motion.div>

      {/* Loading bar */}
      <div style={{
        width: '260px',
        height: '2px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
        <motion.div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #7c3aed, #00f0ff)',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0,240,255,0.5)',
            transition: 'width 0.05s linear',
          }}
        />
      </div>

      {/* Status text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={statusIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.78rem',
            color: 'rgba(0,240,255,0.7)',
            letterSpacing: '3px',
            fontWeight: 500,
          }}
        >
          {statuses[statusIdx]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

export default function App() {
  // Show intro only once per browser session, never to PageSpeed bots
  const [introVisible, setIntroVisible] = useState(
    () => !sessionStorage.getItem('sol_intro_seen')
  );

  return (
    <div style={{ minHeight: '100vh', background: '#020b16' }}>
      {/* Animated cursor glow */}
      <CursorGlow />
      <RobotAssistant />

      {/* Intro overlay */}
      <AnimatePresence>
        {introVisible && (
          <IntroOverlay onDone={() => {
            sessionStorage.setItem('sol_intro_seen', '1');
            setIntroVisible(false);
          }} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {!introVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <HashRouter>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/research" element={<Research />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/event-details" element={<EventDetails />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                </Routes>
              </main>
              <Footer />
            </HashRouter>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
