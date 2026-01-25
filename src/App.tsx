import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Envelope3D } from './components/Envelope3D';
import { MapModal } from './components/MapModal';
import { PhotoGallery } from './components/PhotoGallery'; 
import { Volume2, VolumeX, Flower2 } from 'lucide-react';

// Landing Screen with BIGGER PHOTO (No Border)
const LandingScreen = ({ onEnter }: { onEnter: (name: string) => void }) => {
  const [name, setName] = useState('');
  
  // Make sure 'landing-photo.jpg' is in your public folder!
  const landingImage = "/gallery/buddha.jpg"; 

  return (
    <div className="flex flex-col items-center z-10 p-6 text-center space-y-6 max-w-md w-full">
        
        {/* BIG PHOTO - NO BORDER */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            // Changed w-32 -> w-56 (Bigger) and removed border/bg classes
            className="w-56 h-56 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden relative"
        >
            <img 
              src={landingImage} 
              alt="Welcome" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                // Fallback: If image fails, show Chakra
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.classList.add('bg-indigo-950/60', 'backdrop-blur-md', 'border-2', 'border-amber-400/50');
                (e.target as HTMLImageElement).parentElement!.querySelector('.fallback-text')?.classList.remove('hidden');
              }}
            />
            
            {/* Fallback Icon (Only shows if image is missing) */}
            <span className="hidden fallback-text text-6xl absolute inset-0 flex items-center justify-center text-amber-300">☸️</span>
        </motion.div>

        {/* NAMO BUDDHAY */}
        <motion.h1 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-['Cinzel'] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 tracking-widest font-bold drop-shadow-sm"
        >
            NAMO BUDDHAY
        </motion.h1>

        {/* MESSAGE */}
        <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.6 }}
            className="space-y-2"
        >
            <p className="text-amber-100/90 font-['Great_Vibes'] text-3xl tracking-wide">
                "A soul has arrived..."
            </p>
            <p className="text-indigo-200 font-['Cinzel'] text-xs tracking-[0.3em] uppercase opacity-80">
                A Journey Begins
            </p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.9 }}
            className="w-full space-y-4 pt-4"
        >
            <input 
                type="text" 
                placeholder="Enter Guest Name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-indigo-950/40 border border-amber-500/30 text-amber-50 placeholder:text-amber-200/30 px-6 py-4 rounded-full text-center text-xl font-serif focus:outline-none focus:border-amber-400 focus:bg-indigo-900/50 transition-all shadow-inner"
            />
            <button 
                onClick={() => name && onEnter(name)}
                className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white border-t border-amber-300/50 px-8 py-4 rounded-full font-['Cinzel'] font-bold tracking-[0.2em] transition-all shadow-[0_5px_15px_rgba(245,158,11,0.3)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!name}
            >
                OPEN INVITATION
            </button>
        </motion.div>
    </div>
  );
};

// Flower Animation
const PetalShower = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: -50, x: Math.random() * window.innerWidth, opacity: 1, rotate: 0 }}
                    animate={{ y: window.innerHeight + 100, rotate: 360 }}
                    transition={{ duration: 3 + Math.random() * 2, ease: "linear" }}
                    className="absolute text-rose-400/80"
                >
                    <Flower2 size={20 + Math.random() * 20} />
                </motion.div>
            ))}
        </div>
    );
};

function App() {
  const [step, setStep] = useState<'landing' | 'envelope'>('landing');
  const [guestName, setGuestName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false); 
  const [showPetals, setShowPetals] = useState(false);
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

  const handleBlessing = () => {
      setShowPetals(true);
      setTimeout(() => setShowPetals(false), 4000);
  };

  return (
    // Added 'pt-12' to create space at the top
    <div className="min-h-screen w-full bg-gradient-to-b from-[#020617] via-[#1e1b4b] to-[#172554] flex flex-col items-center justify-center overflow-hidden relative pt-12">
      
      {/* Dynamic Background */}
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

      {/* Sound Button Top Left */}
      <button 
        onClick={toggleMusic} 
        className="absolute top-4 left-4 z-[200] text-amber-200/50 hover:text-amber-100 transition-colors bg-black/20 p-2 rounded-full backdrop-blur-sm"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* MODALS */}
      <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
      <PhotoGallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
      
      {/* EFFECT */}
      <AnimatePresence>
        {showPetals && <PetalShower />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === 'landing' ? (
          <motion.div key="landing" exit={{ opacity: 0, y: -20 }} className="w-full flex justify-center">
            <LandingScreen onEnter={handleNameSubmit} />
          </motion.div>
        ) : (
          <motion.div key="envelope" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex justify-center z-10 pb-6">
            <Envelope3D 
              guestName={guestName} 
              onOpenGallery={() => setIsGalleryOpen(true)} 
              onOpenMap={() => setIsMapOpen(true)} 
              onBlessing={handleBlessing}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
