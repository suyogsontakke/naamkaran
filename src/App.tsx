import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Envelope3D } from './components/Envelope3D';
import { MapModal } from './components/MapModal';
import { PhotoGallery } from './components/PhotoGallery'; // Import the Gallery
import { Volume2, VolumeX } from 'lucide-react';

// Landing Screen Component
const LandingScreen = ({ onEnter }: { onEnter: (name: string) => void }) => {
  const [name, setName] = useState('');
  return (
    <div className="flex flex-col items-center z-10 p-6 text-center space-y-6 max-w-md w-full">
        <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
            className="w-20 h-20 rounded-full border border-amber-300/30 flex items-center justify-center bg-indigo-950/40 backdrop-blur-sm shadow-[0_0_30px_rgba(251,191,36,0.2)]"
        >
            <span className="text-4xl">☸️</span>
        </motion.div>

        <motion.h1 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl font-['Cinzel'] text-amber-100 tracking-widest font-bold drop-shadow-lg"
        >
            NAMO BUDDHAY
        </motion.h1>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.8 }}
            className="w-full space-y-4"
        >
            <input 
                type="text" 
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-indigo-950/30 border border-amber-400/30 text-amber-100 placeholder:text-amber-400/50 px-6 py-4 rounded-full text-center text-xl focus:outline-none focus:border-amber-300 transition-all"
            />
            <button 
                onClick={() => name && onEnter(name)}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white border border-amber-400/50 px-8 py-3 rounded-full font-bold tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50"
                disabled={!name}
            >
                OPEN INVITATION
            </button>
        </motion.div>
    </div>
  );
};

function App() {
  const [step, setStep] = useState<'landing' | 'envelope'>('landing');
  const [guestName, setGuestName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false); // STATE FOR GALLERY
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#172554] flex flex-col items-center justify-center overflow-hidden relative">
      
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
          {[...Array(20)].map((_, i) => (
             <div 
                key={i} 
                className="absolute bg-amber-100 rounded-full animate-pulse"
                style={{
                    width: Math.random() * 3 + 'px',
                    height: Math.random() * 3 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    animationDuration: Math.random() * 3 + 2 + 's',
                    opacity: Math.random()
                }}
             ></div>
          ))}
      </div>

      <audio ref={audioRef} loop src="/bg-music.mp3" />

      <button 
        onClick={toggleMusic}
        className="absolute top-6 right-6 z-[100] text-amber-200/50 hover:text-amber-100 transition-colors"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* MODALS */}
      <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
      <PhotoGallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />

      <AnimatePresence mode="wait">
        {step === 'landing' ? (
          <motion.div key="landing" exit={{ opacity: 0, y: -20 }} className="w-full flex justify-center">
            <LandingScreen onEnter={handleNameSubmit} />
          </motion.div>
        ) : (
          <motion.div key="envelope" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex justify-center z-10">
            {/* Connected BOTH buttons now */}
            <Envelope3D 
              guestName={guestName} 
              onOpenGallery={() => setIsGalleryOpen(true)} 
              onOpenMap={() => setIsMapOpen(true)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
