
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ArrowRight } from 'lucide-react';

interface InputScreenProps {
  onComplete: (name: string) => void;
}

export const InputScreen: React.FC<InputScreenProps> = ({ onComplete }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().length > 0) {
      onComplete(inputValue);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 text-center"
      >
        <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="mb-6 flex justify-center"
        >
             {/* 3D-like Icon */}
             <div className="relative w-24 h-24 bg-gradient-to-br from-amber-200 to-amber-500 rounded-full flex items-center justify-center shadow-lg transform rotate-12 border-4 border-white/30">
                <span className="text-5xl text-white font-serif">☸</span>
             </div>
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-400 mb-2 font-['Cinzel']">
          Namo Buddhay
        </h1>
        <p className="text-blue-100 mb-8 font-light">
          We eagerly await to welcome you. <br/> Please enter your name to receive your invitation.
        </p>

        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-amber-200" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-12 py-4 bg-white/5 border border-amber-200/30 rounded-xl text-amber-50 placeholder-amber-200/50 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all text-lg"
            placeholder="Your Name (e.g. Rahul)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-white rounded-lg px-4 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>
        
        <p className="mt-4 text-xs text-amber-200/60 uppercase tracking-widest">
            A special invitation awaits
        </p>
      </motion.div>
    </div>
  );
};
