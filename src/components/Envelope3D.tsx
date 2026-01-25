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

  // RESTORED: ROYAL 3D ROLLER WITH KNOBS (Best Version)
  const ScrollRoller = ({ position }: { position: 'top' | 'bottom' }) => (
    <div 
      className={`absolute left-1/2 -translate-x-1/2 w-[105%] max-w-[400px] h-14 md:h-16 z-[100] flex items-center justify-center
        ${position === 'top' ? '-top-6 md:-top-8' : '-bottom-6 md:-bottom-8'}
      `}
    >
      {/* Main Roller Body */}
      <div className="w-full h-full rounded-full relative overflow-hidden shadow-xl"
           style={{
             background: 'linear-gradient(90deg, #8B4513 0%, #B8860B 15%, #FFD700 50%, #B8860B 85%, #8B4513 100%)', // Premium 3D Gold
             boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
           }}>
          {/* Metallic Shine */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-[2px] bg-white/50 blur-[2px]"></div>
          
          {/* Texture Lines */}
          <div className="absolute top-0 bottom-0 left-10 border-r border-[#8B4513]/20"></div>
          <div className="absolute top-0 bottom-0 right-10 border-l border-[#8B4513]/20"></div>
      </div>

      {/* Left Knob (The "Handle") */}
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-10 md:h-12 bg-[#5d3211] rounded-l-md shadow-inner border-r border-[#DAA520]"></div>
      
      {/* Right Knob (The "Handle") */}
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
            // FIXED SEAL POSITION (Pinned to top-0)
            className="absolute z-[200] top-0 left-1/2 flex flex-col items-center justify-center pointer-events-none"
            initial={{ x: "-50%", y: "-50%", opacity: 1 }}
            exit={{ x: "-50%", y: "-50%", opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
            {/* Wax Seal */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative shadow-2xl"
                  style={{ background: 'radial-gradient(circle at 35% 35%, #2563eb, #1e40af, #172554)', boxShadow: '0 4px 15px rgba(0,0,0,0.6)' }}>
                <div className="absolute inset-0 rounded-full border-[2px] border-white/20 opacity-60"></div>
                <div className="w-12 h-12 rounded-full border border-blue-200/30 flex items-center justify-center">
                    <span className="font-bold text-3xl md:text-4xl text-blue-100 drop-shadow-md">☸️</span>
                </div>
            </div>
            
            <p className="mt-4 text-amber-100 text-xs font-bold tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-500/30">
                OPENING...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
