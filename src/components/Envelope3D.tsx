import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InvitationCard } from './InvitationCard';

interface Envelope3DProps {
  guestName: string;
  onOpenGallery: () => void;
  onOpenMap?: () => void;
  onOpenComplete?: () => void;
  onBlessing?: () => void;
}

// 1. NEW COMPONENT: Premium Golden Rotating Chakra
const GoldenChakraSVG = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_8s_linear_infinite] drop-shadow-md">
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDB931" />
        <stop offset="30%" stopColor="#FFD700" />
        <stop offset="70%" stopColor="#B8860B" />
        <stop offset="100%" stopColor="#FDB931" />
      </linearGradient>
    </defs>
    
    {/* Outer Ring */}
    <circle cx="50" cy="50" r="45" fill="none" stroke="url(#goldGradient)" strokeWidth="4" />
    
    {/* Inner Ring */}
    <circle cx="50" cy="50" r="8" fill="none" stroke="url(#goldGradient)" strokeWidth="3" />
    
    {/* 24 Spokes (Ashoka Chakra Style) */}
    {[...Array(24)].map((_, i) => (
      <line 
        key={i} 
        x1="50" y1="50" 
        x2={50 + 45 * Math.cos((i * 15) * (Math.PI / 180))} 
        y2={50 + 45 * Math.sin((i * 15) * (Math.PI / 180))} 
        stroke="url(#goldGradient)" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    ))}
    
    {/* Center Dot */}
    <circle cx="50" cy="50" r="3" fill="url(#goldGradient)" />
  </svg>
);

export const Envelope3D: React.FC<Envelope3DProps> = ({ guestName, onOpenGallery, onOpenMap, onOpenComplete, onBlessing }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
      if (onOpenComplete) onOpenComplete();
    }, 2500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(contentTimer);
    };
  }, [onOpenComplete]);

  // ROYAL 3D ROLLER
  const ScrollRoller = ({ position }: { position: 'top' | 'bottom' }) => (
    <div 
      className={`absolute left-1/2 -translate-x-1/2 w-[105%] max-w-[400px] h-14 md:h-16 z-[100] flex items-center justify-center
        ${position === 'top' ? '-top-6 md:-top-8' : '-bottom-6 md:-bottom-8'}
      `}
    >
      <div className="w-full h-full rounded-full relative overflow-hidden shadow-xl"
           style={{
             background: 'linear-gradient(90deg, #8B4513 0%, #B8860B 15%, #FFD700 50%, #B8860B 85%, #8B4513 100%)',
             boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
           }}>
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-[2px] bg-white/50 blur-[2px]"></div>
          <div className="absolute top-0 bottom-0 left-10 border-r border-[#8B4513]/20"></div>
          <div className="absolute top-0 bottom-0 right-10 border-l border-[#8B4513]/20"></div>
      </div>

      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-10 md:h-12 bg-[#5d3211] rounded-l-md shadow-inner border-r border-[#DAA520]"></div>
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-10 md:h-12 bg-[#5d3211] rounded-r-md shadow-inner border-l border-[#DAA520]"></div>
    </div>
  );

  return (
    <div className="relative w-[90vw] max-w-[340px] md:w-[420px] h-auto flex flex-col items-center justify-center perspective-[1000px]">
      
      {/* TOP ROLLER */}
      <motion.div className="relative z-[100] w-full" initial={{ y: 0 }} animate={{ y: 0 }}>
        <ScrollRoller position="top" />
      </motion.div>

      {/* THE SCROLL PAPER */}
      <motion.div
        className="relative w-full bg-[#fffcf5] overflow-hidden shadow-2xl origin-top"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? '580px' : 0, opacity: 1 }} 
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none z-10" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}>
        </div>

        <div className="w-full h-full overflow-hidden">
            <InvitationCard guestName={guestName} onOpenGallery={onOpenGallery} onOpenMap={onOpenMap} showDetails={showContent} onBlessing={onBlessing} />
        </div>
      </motion.div>

      {/* BOTTOM ROLLER */}
      <motion.div className="relative z-[100] w-full" initial={{ y: -5 }} animate={{ y: 0 }}>
        <ScrollRoller position="bottom" />
      </motion.div>

      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            className="absolute z-[200] top-0 left-1/2 flex flex-col items-center justify-center pointer-events-none"
            initial={{ x: "-50%", y: "-50%", opacity: 1 }}
            exit={{ x: "-50%", y: "-50%", opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
            {/* 2. REPLACED EMOJI WITH GOLDEN CHAKRA */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center relative shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-4 border-[#DAA520]"
                  style={{ background: 'radial-gradient(circle at 30% 30%, #1e3a8a, #0f172a)' }}>
                
                {/* Inner Glow */}
                <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-sm"></div>

                {/* The Golden Rotating Chakra */}
                <div className="w-14 h-14 md:w-16 md:h-16">
                    <GoldenChakraSVG />
                </div>
            </div>
            
            <p className="mt-4 text-[#FFD700] text-[10px] font-serif font-bold tracking-[0.2em] bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-[#DAA520]/50 shadow-lg">
                OPENING...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
