import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RobotAssistant() {
  const dialogueMap = {
    home: "👋 Hey! I'm Statsy. Ready to unlock the power of Data & AI?",
    about: "🧠 Curious about SOL? We're a community of builders and innovators.",
    events: "📅 Don't miss out! Check out our upcoming workshops and hackathons.",
    team: "🤝 Meet the brilliant minds driving Stats-O-Locked forward.",
    research: "🔬 Diving deep into the future. Explore our latest AI research!",
    contact: "📬 Got questions or want to collaborate? Drop us a line!"
  };

  const [displayText, setdisplayText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [currentId, setCurrentId] = useState("home");

  // Typewriter effect on section change
  useEffect(() => {
    const text = dialogueMap[currentId] || dialogueMap.home;
    let i = 0;
    setdisplayText("");
    const interval = setInterval(() => {
      setdisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [currentId]);

  // Observer for scroll tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible intersecting entry (or just the first one)
        entries.forEach((entry) => {
          if (entry.isIntersecting && dialogueMap[entry.target.id] && entry.target.id !== currentId) {
            setCurrentId(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const observedElements = new Set();
    const updateObserver = () => {
      const elements = document.querySelectorAll('[id]');
      elements.forEach((el) => {
        if (dialogueMap[el.id] && !observedElements.has(el)) {
          observer.observe(el);
          observedElements.add(el);
        }
      });
    };

    updateObserver();

    // Re-check DOM for new elements (e.g., loaded by router)
    const mutationObserver = new MutationObserver(updateObserver);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [currentId]);

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-center cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="complementary"
      aria-label="Statsy the page assistant"
      aria-live="polite"
    >
      {/* Speech Bubble */}
      <div className="w-48 bg-[#0B132B] border border-[#00f0ff] rounded-2xl p-3 mb-6 relative shadow-[0_0_10px_#00f0ff] text-sm text-[#e0e7ff] font-sans leading-relaxed min-h-[70px]">
        {displayText}
        {/* Tail of the bubble */}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[12px] border-transparent border-t-[#00f0ff]">
          <div className="absolute -top-[13px] -left-[9px] w-0 h-0 border-l-[9px] border-r-[9px] border-t-[11px] border-transparent border-t-[#0B132B]"></div>
        </div>
      </div>

      {/* Robot Body Container */}
      <div className="relative flex flex-col items-center">
        {/* Antenna */}
        <div className="absolute -top-6 w-1 h-6 bg-[#3b82f6] shadow-[0_0_5px_#3b82f6] flex justify-center">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-3 h-3 bg-[#ff6b6b] rounded-full -mt-2 shadow-[0_0_8px_#ff6b6b]"
          />
        </div>

        {/* Head */}
        <div className="w-20 h-16 bg-cyan-900/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_0_10px_rgba(59,130,246,0.6)] group-hover:shadow-[0_0_20px_#00f0ff] transition-all duration-300 flex flex-col items-center justify-center relative z-10">
          {/* Eyes container */}
          <div className="flex gap-4 mb-2">
            <div className="w-4 h-4 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"></div>
            <div className="w-4 h-4 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"></div>
          </div>
          {/* Mouth (Loading bar style) */}
          <div className="w-8 h-1.5 bg-[#00f0ff] rounded-full shadow-[0_0_5px_#00f0ff] overflow-hidden">
              <motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-full bg-white opacity-80"
              />
          </div>
        </div>

        {/* Neck connector */}
        <div className="w-6 h-3 bg-[#3b82f6] shadow-[0_0_5px_#3b82f6] -mt-1 -mb-1 z-0"></div>

        {/* Torso */}
        <div className="w-28 h-36 bg-cyan-900/20 backdrop-blur-md rounded-[24px] border border-white/20 shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_25px_#00f0ff] transition-all duration-300 flex flex-col items-center pt-3 pb-2 z-10 relative">
          
          {/* Main Chest Screen */}
          <div className="w-20 h-[4.5rem] bg-[#0B132B] rounded-lg border border-[#1e3a8a] shadow-inner flex flex-col items-center py-1">
            {/* Animated Line Chart SVG */}
            <svg viewBox="0 0 60 25" className="w-[85%] h-8 overflow-visible mt-1">
              <motion.path
                d="M 0 20 Q 15 20, 20 15 T 40 10 T 60 5"
                fill="transparent"
                stroke="#00f0ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0 0 2px #00f0ff)' }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isHovered ? 1 : 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </svg>
            
            {/* Vertical Bar Charts */}
            <div className="flex gap-1.5 mt-auto mb-1 items-end h-4">
              <motion.div animate={{ height: [6, 12, 6] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-1.5 bg-[#00f0ff] shadow-[0_0_4px_#00f0ff] rounded-t-sm" />
              <motion.div animate={{ height: [12, 6, 12] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 bg-[#ffd700] shadow-[0_0_4px_#ffd700] rounded-t-sm" />
              <motion.div animate={{ height: [8, 14, 8] }} transition={{ duration: 1.3, repeat: Infinity }} className="w-1.5 bg-[#00f0ff] shadow-[0_0_4px_#00f0ff] rounded-t-sm" />
            </div>
          </div>

          {/* Lower Panel */}
          <div className="mt-auto w-[80%] flex flex-col gap-2">
            {/* Indicator lights */}
            <div className="flex justify-between px-1">
              <div className="flex gap-1.5">
                <div className="w-2 h-1 bg-[#ff6b6b] rounded-full shadow-[0_0_4px_#ff6b6b]"></div>
                <div className="w-2 h-1 bg-[#ffd700] rounded-full shadow-[0_0_4px_#ffd700]"></div>
              </div>
              <div className="w-2 h-1 bg-[#00f0ff] rounded-full shadow-[0_0_4px_#00f0ff]"></div>
            </div>
            
            {/* Digital Readout */}
            <div className="bg-[#0B132B] text-[#00f0ff] font-mono text-[8px] leading-tight px-1 py-0.5 rounded border border-[#1e3a8a] text-center shadow-[0_0_3px_#00f0ff_inset]">
              01001010
            </div>
          </div>

        </div>

        {/* Arms */}
        {/* Left Arm */}
        <div className="absolute top-8 -left-4 w-6 h-14 bg-cyan-900/20 backdrop-blur-md rounded-full border border-white/20 shadow-[0_0_10px_rgba(59,130,246,0.5)] -z-10 origin-top transform rotate-12 group-hover:rotate-45 transition-transform duration-300"></div>
        {/* Right Arm */}
        <div className="absolute top-8 -right-4 w-6 h-14 bg-cyan-900/20 backdrop-blur-md rounded-full border border-white/20 shadow-[0_0_10px_rgba(59,130,246,0.5)] -z-10 origin-top transform -rotate-12 group-hover:-rotate-45 transition-transform duration-300"></div>

        {/* Legs */}
        <div className="flex gap-4 -mt-2 -z-10">
          <div className="w-5 h-10 bg-cyan-900/20 backdrop-blur-md rounded-full border border-white/20 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          <div className="w-5 h-10 bg-cyan-900/20 backdrop-blur-md rounded-full border border-white/20 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
        </div>

      </div>
    </motion.div>
  );
}
