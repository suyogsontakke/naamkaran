import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputScreen } from './components/InputScreen';
import { Envelope3D } from './components/Envelope3D';
import { FloatingPetals } from './components/FloatingPetals';
import { ThreeDElements } from './components/ThreeDElements';
import { PhotoGallery } from './components/PhotoGallery';
import { NameSuggestionModal } from './components/NameSuggestionModal';
import { MapModal } from './components/MapModal';
import { Confetti } from './components/Confetti';
import { Volume2, VolumeX } from 'lucide-react';

const App: React.FC = () => {
  const [guestName, setGuestName] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    // NOTE: To use a local file:
    // 1. Place your 'chant.mp3' or 'music.mp3' in the public/root folder of your project.
    // 2. Change the URL below to: './your-audio-filename.mp3'
    const audioUrl = 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_18bf8f6b04.mp3?filename=indian-meditation-flute-18049.mp3';
    
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // Set initial volume (0.0 to 1.0)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Browsers require user interaction to play audio
        audioRef.current.play().catch(error => {
          console.log("Audio play failed (browser policy):", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNameSubmit = (name: string) => {
    setGuestName(name);
    // Optional: Auto-start music on name submit if acceptable by browser policy
    // toggleMusic(); 
  };

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    // Reset confetti after animation duration (approx 5s)
    const timer = setTimeout(() => {
        setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[100dvh] w-full bg-[#0f172a] relative overflow-hidden flex flex-col items-center justify-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-black z-0"></div>
      
      {/* 3D Floor Grid Effect */}
      <div className="absolute inset-0 opacity-20 z-0" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)', 
             backgroundSize: '40px 40px',
             transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)'
           }}>
      </div>

      <FloatingPetals />
      <ThreeDElements />
      
      {/* Confetti Overlay */}
      {showConfetti && <Confetti />}

      {/* Main Content Area */}
      {/* Updated to fully center content on all screens */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center min-h-[100dvh]">
        
        <AnimatePresence mode="wait">
          {!guestName ? (
            <InputScreen key="input" onComplete={handleNameSubmit} />
          ) : (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center w-full justify-center flex-1 py-4"
            >
              <div className="text-center mb-6 relative z-20">
                 <motion.h2 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-amber-100/80 font-['Cinzel'] tracking-widest text-xs md:text-sm bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm"
                 >
                    YOU ARE CORDIALLY INVITED
                 </motion.h2>
              </div>

              {/* Envelope Container: Centered vertically */}
              <div className="relative z-30">
                 <Envelope3D 
                    guestName={guestName} 
                    onOpenGallery={() => setIsGalleryOpen(true)}
                    onOpenSuggestions={() => setIsSuggestionOpen(true)}
                    onOpenMap={() => setIsMapOpen(true)}
                    onOpenComplete={triggerConfetti}
                 />
              </div>

              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 3, duration: 1 }}
                 className="fixed bottom-4 left-0 right-0 text-center px-6 pb-4 pointer-events-none"
              >
                  <div className="bg-[#0f172a]/80 backdrop-blur-sm p-4 rounded-2xl border border-white/5 inline-block max-w-lg">
                      <p className="text-amber-200/70 text-[10px] md:text-xs leading-relaxed font-light italic">
                          "Just as the soft rains fill the streams, pour into the rivers, and join together in the oceans, so may the power of every moment of your goodness flow forth to awaken and heal all beings."
                      </p>
                      <p className="text-amber-500 mt-2 text-[8px] md:text-[10px] uppercase tracking-widest font-bold">- Buddhist Blessing</p>
                  </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isGalleryOpen && (
            <PhotoGallery onClose={() => setIsGalleryOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSuggestionOpen && (
            <NameSuggestionModal 
                onClose={() => setIsSuggestionOpen(false)} 
                onSuccess={triggerConfetti}
            />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMapOpen && (
            <MapModal onClose={() => setIsMapOpen(false)} />
        )}
      </AnimatePresence>

      {/* Audio Control */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={toggleMusic}
          className={`flex items-center gap-2 text-[10px] md:text-xs border rounded-full px-3 py-1.5 uppercase tracking-wider backdrop-blur-sm transition-all shadow-lg ${
            isPlaying 
              ? 'text-amber-400 border-amber-400 bg-amber-900/30' 
              : 'text-amber-500/50 border-amber-500/30 bg-black/20 hover:text-amber-400 hover:border-amber-400'
          }`}
        >
            {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span className="hidden md:inline">{isPlaying ? 'Music On' : 'Music Off'}</span>
        </button>
      </div>
    </div>
  );
};

export default App;