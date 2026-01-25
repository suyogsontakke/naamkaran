import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Envelope3D } from './components/Envelope3D';
import { MapModal } from './components/MapModal';
import { PhotoGallery } from './components/PhotoGallery'; 
import { Volume2, VolumeX, PartyPopper } from 'lucide-react'; // Changed Flower2 to PartyPopper

const LandingScreen = ({ onEnter }: { onEnter: (name: string) => void }) => {
  const [name, setName] = useState('');
  const landingImage = "/gallery/buddha.jpg"; 

  return (
    <div className="h-full w-full flex flex-col items-center justify-evenly p-6 text-center perspective-[1000px]">
        
        {/* 3D PHOTO */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotateX: 20 }} 
            animate={{ 
                opacity: 1, scale: 1, rotateX: 0,
                y: [0, -10, 0] 
            }} 
            transition={{ duration: 0.8, y: { repeat: Infinity, duration: 4, ease: "easeInOut" }}}
            whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10, cursor: "pointer" }}
            className="relative z-20 flex items-center justify-center transform-style-3d shrink-0"
            style={{ height: '35vh', maxHeight: '320px', width: 'auto', aspectRatio: '1/1' }}
        >
            <img 
              src={landingImage} 
              alt="Welcome" 
              className="w-full h-full object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.classList.add('bg-indigo-950/60', 'backdrop-blur-md', 'rounded-full', 'border-2', 'border-amber-400/50', 'w-64', 'h-64');
                (e.target as HTMLImageElement).parentElement!.querySelector('.fallback-text')?.classList.remove('hidden');
              }}
            />
            <span className="hidden fallback-text text-7xl absolute inset-0 flex items-center justify-center text-amber-300">☸️</span>
        </motion.div>

        {/* TEXT SECTION */}
        <div className="space-y-1 shrink-0">
            <motion.h1 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-5xl font-['Cinzel'] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 tracking-widest font-bold drop-shadow-sm"
            >
                NAMO BUDDHAY
            </motion.h1>

            <motion.div
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.6 }}
            >
                <p className="text-amber-100/90 font-['Great_Vibes'] text-2xl md:text-3xl tracking-wide">
                    "A soul has arrived..."
                </p>
                <p className="text-indigo-200 font-['Cinzel'] text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-80 mt-1">
                    A Journey Begins
                </p>
            </motion.div>
        </div>

        {/* INPUT & BUTTON */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.9 }}
            className="w-full max-w-xs space-y-3 shrink-0"
        >
            <input 
                type="text" 
                placeholder="Enter Guest Name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-indigo-950/40 border border-amber-500/30 text-amber-50 placeholder:text-amber-200/30 px-6 py-3 rounded-full text-center text-lg font-serif focus:outline-none focus:border-amber-400 focus:bg-indigo-900/50 transition-all shadow-inner"
            />
            <button 
                onClick={() => name && onEnter(name)}
                className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white border-t border-amber-300/50 px-8 py-3 rounded-full font-['Cinzel'] font-bold tracking-[0.2em] transition-all shadow-[0_5px_15px_rgba(245,158,11,0.3)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!name}
            >
                OPEN INVITATION
            </button>
        </motion.div>
    </div>
  );
};

// NEW: Realistic Confetti Animation
const ConfettiShower = () => {
    const colors = ['#0033A0', '#FFD700', '#DC2626', '#FFFFFF', '#EA580C']; // Buddhist colors
    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {[...Array(50)].map((_, i) => {
                const size = Math.random() * 8 + 4;
                return (
                <motion.div
                    key={i}
                    initial={{ y: -50, x: Math.random() * window.innerWidth, opacity: 1, rotateX: 0, rotateY: 0 }}
                    animate={{ 
                        y: window.innerHeight + 100, 
                        rotateX: Math.random() * 360 * 4, // Multiple spins
                        rotateY: Math.random() * 360 * 4,
                        x: `+=${Math.random() * 200 - 100}` // Drift left/right
                    }}
                    transition={{ duration: 2.5 + Math.random() * 2, ease: "easeOut" }}
                    className="absolute rounded-sm shadow-sm"
                    style={{
                        backgroundColor: colors[i % colors.length],
                        width: size,
                        height: size * (Math.random() > 0.5 ? 1.5 : 0.6), // Rectangles and squares
                    }}
                />
            )})}
        </div>
    );
};

function App() {
  const [step, setStep] = useState<'landing' | 'envelope'>('landing');
  const [guestName, setGuestName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false); 
  const [showConfetti, setShowConfetti] = useState(false); // Renamed state
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleNameSubmit = (name: string) => {
    setGuestName(name);
    setStep('envelope');
    if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // Trigger Confetti
  const handleConfetti = () => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
  };

  return (
    <div className="h-[100dvh] w-full bg-gradient-to-b from-[#020617] via-[#1e1b4b] to-[#172554] flex flex-col items-center justify-center overflow-hidden relative">
      
      <div className="absolute inset-0 opacity-40 pointer-events-none">
          {[...Array(25)].map((_, i) => (
             <div key={i} className="absolute bg-amber-100 rounded-full animate-pulse shadow-[0_0_5px_white]"
                style={{
                    width: Math.random() * 2 + 'px',
                    height: Math.random() * 2 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    animationDuration: Math.random() * 3 + 2 + 's',
                    opacity: Math.random()
                }}
             ></div>
          ))}
      </div>

      <audio ref={audioRef} loop src="/bg-music.mp3" />

      <button onClick={toggleMusic} className="absolute top-4 left-4 z-[200] text-amber-200/50 hover:text-amber-100 transition-colors bg-black/20 p-2 rounded-full backdrop-blur-sm">
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
      <PhotoGallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
      
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && <ConfettiShower />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === 'landing' ? (
          <motion.div key="landing" exit={{ opacity: 0, y: -20 }} className="w-full h-full">
            <LandingScreen onEnter={handleNameSubmit} />
          </motion.div>
        ) : (
          <motion.div key="envelope" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex justify-center z-10">
            <Envelope3D 
              guestName={guestName} 
              onOpenGallery={() => setIsGalleryOpen(true)} 
              onOpenMap={() => setIsMapOpen(true)} 
              onBlessing={handleConfetti} // Connected to new handler
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
