import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Envelope3D } from './components/Envelope3D';
import { Volume2, VolumeX } from 'lucide-react';

// Simple Landing Screen Component inside App for simplicity
const LandingScreen = ({ onEnter }: { onEnter: (name: string) => void }) => {
  const [name, setName] = useState('');
  return (
    <div className="flex flex-col items-center z-10 p-6 text-center space-y-6 max-w-md w-full">
        {/* Aesthetic Logo/Icon */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
            className="w-20 h-20 rounded-full border border-blue-300/30 flex items-center justify-center bg-blue-950/40 backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        >
            <span className="text-4xl">☸️</span>
        </motion.div>

        <motion.h1 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl font-['Cinzel'] text-blue-100 tracking-widest font-bold drop-shadow-lg"
        >
            NAMO BUDDHAY
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            className="text-blue-200/80 font-['Cormorant_Garamond'] text-lg md:text-xl italic"
        >
            "A soul has arrived, a journey begins."
        </motion.p>

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
                className="w-full bg-blue-950/30 border border-blue-400/30 text-blue-100 placeholder:text-blue-400/50 px-6 py-4 rounded-full text-center font-['Cormorant_Garamond'] text-xl focus:outline-none focus:border-blue-300 transition-all"
            />
            <button 
                onClick={() => name && onEnter(name)}
                className="w-full bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-blue-100 border border-blue-700/50 px-8 py-3 rounded-full font-['Cinzel'] font-bold tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleNameSubmit = (name: string) => {
    setGuestName(name);
    setStep('envelope');
    // Try to play music
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
    // DARK AESTHETIC BACKGROUND (Deep Indigo/Slate)
    <div className="min-h-screen w-full bg-[#0a0f1c] flex flex-col items-center justify-center overflow-hidden relative">
      
      {/* Subtle Gradient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Floating Particles (Stars) */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
          {[...Array(20)].map((_, i) => (
             <div 
                key={i} 
                className="absolute bg-white rounded-full animate-pulse"
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

      {/* Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="absolute top-6 right-6 z-[100] text-blue-200/50 hover:text-blue-100 transition-colors"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      <AnimatePresence mode="wait">
        {step === 'landing' ? (
          <motion.div key="landing" exit={{ opacity: 0, y: -20 }} className="w-full flex justify-center">
            <LandingScreen onEnter={handleNameSubmit} />
          </motion.div>
        ) : (
          <motion.div key="envelope" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex justify-center z-10">
            <Envelope3D 
              guestName={guestName} 
              onOpenGallery={() => {}} 
              onOpenMap={() => window.open("https://maps.google.com", "_blank")} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
