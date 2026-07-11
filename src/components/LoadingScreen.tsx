import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import defaultLogo from '../assets/images/refined_s_hexagon_logo_1783309336153.jpg';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500); // Wait for fade-out
          }, 400);
          return 100;
        }
        // Random incremental steps for authentic loading feel
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-gradient-to-tr from-[#0b1329] via-[#0f172a] to-[#1e1e38] text-white overflow-hidden animate-gradient-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Animated floating background elements */}
          <div className="absolute inset-0 opacity-25">
            <div className="absolute top-10 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-secondary/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] hexagon-pattern opacity-10"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
            {/* Hexagonal Logo Container with Soft Glow Effect */}
            <motion.div
              id="loader-logo"
              className="relative w-28 h-28 flex items-center justify-center mb-8"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 80,
                damping: 12,
                duration: 1
              }}
            >
              {/* Outer Glowing Rings */}
              <div className="absolute inset-0 bg-[#3fa9f5]/20 rounded-full blur-2xl animate-pulse"></div>
              
              {/* Clean Geometric Hexagon Logo */}
              <div className="w-24 h-24 bg-white hexagon-mask flex items-center justify-center shadow-lg shadow-blue-500/20 p-1">
                <div className="w-full h-full hexagon-mask bg-slate-50 flex items-center justify-center overflow-hidden">
                  <img 
                    className="w-full h-full object-cover animate-pulse"
                    src={defaultLogo}
                    alt="Loading Logo"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </motion.div>

            {/* Department Name */}
            <motion.h1
              id="loader-title"
              className="text-2xl md:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white via-blue-100 to-[#3fa9f5] bg-clip-text text-transparent font-sans"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              SISTEM INFORMASI
            </motion.h1>

            <motion.p
              id="loader-subtitle"
              className="text-xs md:text-sm font-mono tracking-[0.25em] text-[#94a3b8] mt-2 uppercase"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Academic Precision
            </motion.p>

            {/* Glowing progress slider bar & percentage */}
            <div className="w-64 mt-10">
              <div className="flex justify-between items-center mb-2 text-xs font-mono text-blue-300">
                <span>MEMUAT MODUL SISTEM...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-[5px] w-full bg-slate-800 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Micro details */}
            <motion.div
              className="text-[10px] font-mono text-slate-500 mt-6 tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              SI-SYSTEM V2.0.26 // ENGINES ARMED
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
