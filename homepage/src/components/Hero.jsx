import { useRef, useMemo, useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

// IMPORTANT: If you are using @react-three/drei for the Sphere, 
// make sure it's installed and imported like this:
// import { Sphere } from '@react-three/drei';

const HeroCanvas = lazy(() => import('./HeroCanvas'));

// This was the "stray" code causing the error. 
// It is now wrapped in a proper component function.
function SceneElements() {
  const ringRef = useRef();

  return (
    <group>
      {/* Orbit ring 1 */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.018, 16, 100]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbit ring 2 */}
      <mesh rotation={[-Math.PI / 6, Math.PI / 3, 0]}>
        <torusGeometry args={[2.6, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={1.5}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh> 
        <sphereGeometry args={[1.52, 32, 32]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Point lights */}
      <pointLight position={[0, 0, 0]} color="#7c3aed" intensity={5} decay={2} />
      <pointLight position={[2, 2, 2]} color="#00f0ff" intensity={2} decay={2} />
    </group>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '70px',
      }}
    >
      {/* Grid background */}
      <div
        className="grid-bg"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      {/* Ambient gradient blobs */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[85vh]">
        {/* Left: Text Content */}
        <div className="flex flex-col items-start text-left w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7c3aed]/15 border border-[#7c3aed]/40 text-[#c4b5fd] text-[0.82rem] font-medium tracking-wide mb-6"
          >
            <Sparkles size={14} />
            VIT Bhopal's Premier AI & Data Club
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-['Space_Grotesk'] text-[clamp(2.8rem,5vw,4.5rem)] font-bold leading-[1.1] mb-6"
          >
            <span className="gradient-text">Unlock the</span>
            <br />
            <span className="text-white">Power of</span>
            <br />
            <span className="gradient-text-cyan">Data & AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-[1.1rem] text-white/60 mb-8 max-w-[480px] leading-[1.7]"
          >
            <span className="text-[#00f0ff] font-semibold">Stats-O-Locked</span> — Where Intelligence Meets Innovation.
            A community of builders, researchers & data enthusiasts shaping tomorrow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-row gap-4 flex-wrap"
          >
            <motion.a
              href="../contact.html"
              className="btn-neon btn-neon-primary no-underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Join Us <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="../events.html"
              className="btn-neon btn-neon-secondary no-underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Projects
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-row gap-10 mt-12 w-full"
          >
            {[
              { label: 'Members', value: '200+' },
              { label: 'Projects', value: '30+' },
              { label: 'Workshops', value: '25+' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-start text-left">
                <div className="font-['Space_Grotesk'] text-[1.6rem] font-bold text-[#00f0ff]">
                  {s.value}
                </div>
                <div className="text-xs text-white/30 uppercase tracking-[1.5px] mt-1 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Canvas */}
        <div className="flex justify-center items-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="relative flex justify-center items-center aspect-square w-full max-w-[400px] lg:max-w-[550px] rounded-full overflow-hidden border border-[#00f0ff]/10 shadow-[0_0_50px_rgba(0,240,255,0.05)]"
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, rgba(0,240,255,0.1) 40%, transparent 70%)',
            }} />
            
            <Suspense fallback={
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)' }} />
            }>
              <HeroCanvas />
            </Suspense>

            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 bg-transparent py-3 z-20 flex overflow-hidden">
              <motion.div
                animate={{ x: ['100%', '-100%'] }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                className="whitespace-nowrap text-white font-bold tracking-[0.2em] font-['Space_Grotesk'] text-xl uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
              >
                STATS-O-LOCKED &bull; STATS-O-LOCKED &bull; STATS-O-LOCKED
              </motion.div>
            </div>
            
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(255,255,255,0.35)',
          fontSize: '0.75rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          zIndex: 1,
        }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(0,240,255,0.6), transparent)',
          }}
        />
      </motion.div>
    </section>
  );
}
