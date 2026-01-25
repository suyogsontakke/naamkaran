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

  // SCROLL ROLLER
  const ScrollRoller = ({ position }: { position: 'top' | 'bottom' }) => (
    <div 
      className={`absolute left-1/2 -translate-x-1/2 w-[105%] max-w-[400px] h-14 md:h-16 z-[100] flex items-center justify-center
        ${position === 'top' ? '-top-7 md:-top-8' : '-bottom-7 md:-bottom-8'}
      `}
    >
      <div className="absolute left-0 h-full w-8 bg-[#4a3728] rounded-l-md border-r border-[#8B4513] shadow-inner z-10"></div>

      <div className="w-[95%] h-full relative"
           style={{
             background: 'linear-gradient(180deg, #DAA520 0%, #FFD700 20%, #FFF8DC 45%, #FFD700 55%, #B8860B 100%)',
             borderRadius: '4px',
             boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
           }}>
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-[2px] bg-white/50 blur-[1px]"></div>
      </div>

      <div className="absolute right-0 h-full w-8 bg-[#4a3728] rounded-r-md border-l border-[#8B4513] shadow-inner z-10"></div>
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
            // FIXED: Changed 'top-1/2' to 'top-0' to pin it to the scroll seam.
            // Added explicit x/y to initial and exit to lock position.
            className="absolute z-[200] top-0 left-1/2 flex flex-col items-center justify-center pointer-events-none"
            initial={{ x: "-50%", y: "-50%", opacity: 1 }}
            exit={{ x: "-50%", y: "-50%", opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
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
