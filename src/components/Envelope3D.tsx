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
    const openTimer = setTimeout(() => setIsOpen(true), 1000);
    const contentTimer = setTimeout(() => {
      setShowContent(true);
      if (onOpenComplete) onOpenComplete();
    }, 2500);
    return () => { clearTimeout(openTimer); clearTimeout(contentTimer); };
  }, [onOpenComplete]);

  // DARK AESTHETIC ROLLER (Silver & Midnight Blue)
  const ScrollRoller = ({ position }: { position: 'top' | 'bottom' }) => (
    <div 
      className={`absolute left-1/2 -translate-x-1/2 w-[105%] max-w-[380px] h-12 md:h-16 z-50 rounded-full shadow-2xl flex items-center justify-center
        ${position === 'top' ? '-top-6 md:-top-8' : '-bottom-6 md:-bottom-8'}
      `}
      style={{
        background: 'linear-gradient(90deg, #0f172a 0%, #334155 20%, #94a3b8 50%, #334155 80%, #0f172a 100%)', // Dark Silver
        boxShadow: '0px 10px 30px rgba(0,0,0,0.8), inset 0px 1px 4px rgba(255,255,255,0.3)'
      }}
    >
      {/* Decorative knobs - Very Dark Navy */}
      <div className="absolute left-1 top-1/2 -translate-y-1/2 w-3 h-8 md:h-12 bg-[#020617] rounded-sm shadow-inner border-r border-slate-700"></div>
      <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-8 md:h-12 bg-[#020617] rounded-sm shadow-inner border-l border-slate-700"></div>
      
      {/* Shine Line */}
      <div className="w-full h-[1px] bg-white/20 blur-[1px]"></div>
    </div>
  );

  return (
    <div className="relative w-[90vw] max-w-[340px] md:w-[420px] h-auto flex flex-col items-center justify-center perspective-[1000px]">
      
      {/* TOP ROLLER */}
      <motion.div className="relative z-50 w-full" initial={{ y: 0 }} animate={{ y: 0 }}>
        <ScrollRoller position="top" />
      </motion.div>

      {/* THE SCROLL PAPER - Soft Moonlight Cream (Readable but Aesthetic) */}
      <motion.div
        className="relative w-full bg-[#fcfcfc] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] origin-top"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? '550px' : 0, opacity: 1 }} 
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <div className="w-full h-full overflow-hidden">
            <InvitationCard guestName={guestName} onOpenGallery={onOpenGallery} onOpenMap={onOpenMap} showDetails={showContent} onBlessing={onBlessing} />
        </div>
      </motion.div>

      {/* BOTTOM ROLLER */}
      <motion.div className="relative z-50 w-full" initial={{ y: -5 }} animate={{ y: 0 }}>
        <ScrollRoller position="bottom" />
      </motion.div>

      {/* CLOSED STATE - DARK BLUE SEAL */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            className="absolute z-[60] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none"
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative shadow-2xl"
                  style={{ background: 'radial-gradient(circle at 35% 35%, #1e40af, #1e3a8a, #0f172a)', boxShadow: '0 4px 25px rgba(0,0,0,0.8)' }}>
                <div className="absolute inset-0 rounded-full border-[2px] border-white/10 opacity-60"></div>
                <div className="w-12 h-12 rounded-full border border-blue-500/20 flex items-center justify-center">
                    <span className="font-bold text-3xl md:text-4xl text-blue-200/80 drop-shadow-md">☸️</span>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
