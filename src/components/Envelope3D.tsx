import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { InvitationCard } from './InvitationCard';

interface Envelope3DProps {
  guestName: string;
  onOpenGallery: () => void;
  onOpenMap?: () => void;
  onOpenComplete?: () => void;
}

export const Envelope3D: React.FC<Envelope3DProps> = ({ guestName, onOpenGallery, onOpenMap, onOpenComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowCard(true);
        if (onOpenComplete) {
            setTimeout(onOpenComplete, 300);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onOpenComplete]);

  const ShimmerEffect = () => (
    <motion.div
      className="absolute inset-0 z-[25] pointer-events-none mix-blend-overlay"
      style={{
        background: 'linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.4) 45%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.4) 55%, transparent 60%)',
        backgroundSize: '200% 100%',
      }}
      animate={{
        backgroundPosition: ['150% 0', '-150% 0']
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 4
      }}
    />
  );

  return (
    <div className="relative w-[90vw] max-w-[340px] md:w-[420px] aspect-[4/3] perspective-container mx-auto">
      <motion.div
        className="w-full h-full preserve-3d"
        animate={{
          y: [0, -10, 0],
          rotateZ: [-1, 1, -1],
          rotateX: [0, 2, 0]
        }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity
        }}
      >
        <motion.div 
          initial={{ rotateX: 10, rotateY: 0, scale: 0.9 }}
          animate={{ 
              rotateX: isOpen ? 5 : 10, 
              rotateY: 0, 
              scale: isOpen ? 1 : 0.95,
              y: isOpen ? 40 : 0
          }}
          transition={{ type: "spring", damping: 20 }}
          className="relative w-full h-full preserve-3d duration-500"
        >
          <div className="absolute inset-0 bg-[#c5a059] rounded-b-xl shadow-2xl transform translate-z-[-2px]"></div>

          <motion.div 
              className="absolute left-3 right-3 h-[92%] bg-white rounded-lg shadow-md overflow-hidden origin-bottom"
              initial={{ y: 10, zIndex: 5, z: 0 }}
              animate={{ 
                  y: showCard ? '-50%' : 10,
                  zIndex: showCard ? 50 : 5,
                  scale: showCard ? 1.05 : 1,
                  z: showCard ? 40 : 1 
              }}
              transition={{ delay: 0.5, duration: 1.2, type: "spring", bounce: 0.3 }}
              style={{ transformStyle: 'preserve-3d' }}
          >
              <InvitationCard 
                  guestName={guestName} 
                  onOpenGallery={onOpenGallery} 
                  onOpenMap={onOpenMap}
                  showDetails={showCard}
              />
          </motion.div>

          <div className="absolute inset-0 z-20 pointer-events-none preserve-3d">
              <div className="absolute top-0 left-0 w-full h-full bg-[#d4af37] clip-path-left z-20 overflow-hidden" 
                    style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }}>
                  <ShimmerEffect />
              </div>
              <div className="absolute top-0 right-0 w-full h-full bg-[#e6c256] clip-path-right z-20 overflow-hidden"
                    style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)' }}>
                  <ShimmerEffect />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-full bg-[#deb849] clip-path-bottom z-30 shadow-inner overflow-hidden"
                    style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}>
                  <ShimmerEffect />
              </div>
          </div>

          <motion.div
            className="absolute top-0 left-0 w-full h-full z-40 origin-top preserve-3d"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpen ? 180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
              <div className="absolute inset-0 bg-[#d4af37] backface-hidden overflow-hidden" style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0)' }}>
                  <ShimmerEffect />
                  <div className="absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center relative shadow-2xl transition-transform hover:scale-105"
                           style={{
                               background: 'radial-gradient(circle at 35% 35%, #ef4444, #b91c1c, #7f1d1d)',
                               boxShadow: `
                                   0 6px 12px rgba(0,0,0,0.5), 
                                   0 2px 4px rgba(0,0,0,0.3),
                                   inset 2px 2px 6px rgba(255,255,255,0.5), 
                                   inset -2px -2px 6px rgba(0,0,0,0.4)
                               `
                           }}
                      >
                          <div className="absolute inset-0 rounded-full border-[1px] border-white/20 opacity-60"></div>
                          
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center relative overflow-hidden"
                               style={{
                                   background: 'radial-gradient(circle at 70% 70%, #7f1d1d, #b91c1c)',
                                   boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(255,255,255,0.3)'
                               }}
                          >
                               <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-transparent via-transparent to-white/10 pointer-events-none"></div>

                              <span className="font-bold text-2xl md:text-3xl relative z-10"
                                    style={{ 
                                        color: '#450a0a',
                                        textShadow: '1px 1px 0px rgba(255,255,255,0.15), -1px -1px 2px rgba(0,0,0,0.6)'
                                    }}>
                                  ☸
                              </span>
                          </div>

                          <div className="absolute top-2 left-3 w-5 h-2.5 bg-gradient-to-br from-white/90 to-transparent rounded-[100%] blur-[1px] transform -rotate-25 pointer-events-none"></div>
                          <div className="absolute bottom-3 right-3 w-2 h-2 bg-white/40 rounded-full blur-[2px] pointer-events-none"></div>
                      </div>
                  </div>
              </div>
              
              <div className="absolute inset-0 bg-[#b89542] backface-hidden" style={{ transform: 'rotateX(180deg)', clipPath: 'polygon(0 0, 50% 50%, 100% 0)' }}></div>
          </motion.div>

          <div className="absolute -bottom-8 left-8 right-8 h-4 bg-black/40 blur-xl rounded-[100%]"></div>

        </motion.div>
      </motion.div>

    </div>
  );
};
