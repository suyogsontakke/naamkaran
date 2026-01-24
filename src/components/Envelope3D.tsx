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

  // Auto-open sequence
  useEffect(() => {
    // 1. Wait a moment, then open the scroll
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    // 2. Trigger "Show Content" (text animations inside) after scroll finishes unrolling
    const contentTimer = setTimeout(() => {
      setShowContent(true);
      if (onOpenComplete) onOpenComplete();
    }, 2500); // 1s wait + 1.5s animation

    return () => {
      clearTimeout(openTimer);
      clearTimeout(contentTimer);
    };
  }, [onOpenComplete]);

  // The Golden Roller Component
  const ScrollRoller = ({ position }: { position: 'top' | 'bottom' }) => (
    <div 
      className={`absolute left-1/2 -translate-x-1/2 w-[110%] h-12 md:h-16 z-50 rounded-full shadow-2xl flex items-center justify-center
        ${position === 'top' ? '-top-6 md:-top-8' : '-bottom-6 md:-bottom-8'}
      `}
      style={{
        background: 'linear-gradient(90deg, #8B4513 0%, #CD853F 10%, #FFD700 40%, #FDB931 50%, #FFD700 60%, #CD853F 90%, #8B4513 100%)',
        boxShadow: '0px 10px 20px rgba(0,0,0,0.4), inset 0px 2px 5px rgba(255,255,255,0.3)'
      }}
    >
      {/* Decorative knobs on ends */}
      <div className="absolute left-1 top-1/2 -translate-y-1/2 w-3 h-8 md:h-12 bg-amber-800 rounded-sm shadow-inner border-r border-amber-600"></div>
      <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-8 md:h-12 bg-amber-800 rounded-sm shadow-inner border-l border-amber-600"></div>
      
      {/* Shiny reflection line */}
      <div className="w-full h-[2px] bg-white/40 blur-[1px]"></div>
    </div>
  );

  return (
    <div className="relative w-[90vw] max-w-[340px] md:w-[420px] h-auto flex flex-col items-center justify-center perspective-[1000px]">
      
      {/* TOP ROLLER */}
      <motion.div 
        className="relative z-50 w-full"
        initial={{ y: 0 }}
        animate={{ y: isOpen ? 0 : 0 }} // Stays at top of container relative flow
      >
        <ScrollRoller position="top" />
      </motion.div>

      {/* THE SCROLL PAPER (Container for InvitationCard) */}
      <motion.div
        className="relative w-full bg-[#fffcf5] overflow-hidden shadow-2xl origin-top"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
            height: isOpen ? '550px' : 0, // Unrolls to this height
            opacity: 1 
        }} 
        transition={{ 
            duration: 2.5, // Slow, majestic unroll
            ease: "easeInOut" 
        }}
      >
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-10" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}>
        </div>

        {/* Content Inside */}
        <div className="w-full h-full overflow-hidden">
            <InvitationCard 
                guestName={guestName} 
                onOpenGallery={onOpenGallery} 
                onOpenMap={onOpenMap}
                showDetails={showContent}
                onBlessing={onBlessing}
            />
        </div>
      </motion.div>

      {/* BOTTOM ROLLER */}
      <motion.div 
        className="relative z-50 w-full"
        initial={{ y: -5 }} // Starts slightly tucked up
        animate={{ y: 0 }}
      >
        <ScrollRoller position="bottom" />
      </motion.div>


      {/* CLOSED STATE DECORATIONS (The Thread & Seal) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            className="absolute z-[60] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none"
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
            {/* The Red Thread (Mauli) */}
            <div className="w-[120%] h-4 bg-red-700 shadow-lg mb-[-10px] relative">
                 <div className="absolute inset-0 border-y border-red-900/50"></div>
                 <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.2)_5px,rgba(0,0,0,0.2)_10px)]"></div>
            </div>

            {/* The Wax Seal */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative shadow-2xl"
                  style={{ background: 'radial-gradient(circle at 35% 35%, #ef4444, #b91c1c, #7f1d1d)', boxShadow: '0 4px 15px rgba(0,0,0,0.6)' }}>
                <div className="absolute inset-0 rounded-full border-[2px] border-white/20 opacity-60"></div>
                <div className="w-12 h-12 rounded-full border border-red-900/30 flex items-center justify-center">
                    <span className="font-bold text-3xl md:text-4xl text-[#450a0a] drop-shadow-md">☸</span>
                </div>
            </div>
            
            <p className="mt-4 text-amber-200 text-xs font-bold tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                OPENING...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
