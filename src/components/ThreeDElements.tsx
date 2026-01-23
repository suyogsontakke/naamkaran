import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Optimized: Reduced particle count from 40 -> 15
const AmbientParticles = () => {
    const [particles, setParticles] = useState<{id: number; x: number; y: number; size: number; duration: number; delay: number}[]>([]);

    useEffect(() => {
        const count = 15; // LOWERED FOR PERFORMANCE
        const generated = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 10
        }));
        setParticles(generated);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-amber-100/60 blur-[1px]"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -120],
                        opacity: [0, 0.4, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

// Optimized: Removed expensive Glow filters
const FloatingLotus = ({ color, delay, x, y, scale = 1 }: { color: string, delay: number, x: string, y: string, scale?: number }) => (
    <motion.div
        className="absolute z-0 pointer-events-none"
        style={{ left: x, top: y, width: 100 * scale, height: 100 * scale }}
        initial={{ opacity: 0 }}
        animate={{ 
            opacity: 0.8, 
            y: [-10, 10, -10], 
        }}
        transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay 
        }}
    >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" style={{ overflow: 'visible' }}>
            <g transform="translate(50,60)">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <motion.path
                        key={`petal-${i}`}
                        d="M0,0 Q15,-30 0,-50 Q-15,-30 0,0"
                        fill={color}
                        stroke="rgba(255,255,255,0.6)"
                        strokeWidth="1"
                        transform={`rotate(${angle})`}
                    />
                ))}
                <circle cx="0" cy="-10" r="8" fill="#FFD700" />
            </g>
        </svg>
    </motion.div>
);

const PrayerWheel = ({ x, y, delay }: { x: string, y: string, delay: number }) => (
    <motion.div
        className="absolute z-0 pointer-events-none w-24 h-36 md:w-32 md:h-48"
        style={{ left: x, top: y }}
        initial={{ opacity: 0 }}
        animate={{ 
            opacity: 1, 
            y: [-5, 5, -5], 
        }}
        transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay 
        }}
    >
        <svg viewBox="0 0 120 160" className="w-full h-full drop-shadow-lg">
            <rect x="55" y="110" width="10" height="50" rx="2" fill="#5D4037" />
            <rect x="25" y="30" width="70" height="80" rx="5" fill="#eab308" stroke="#B8860B" strokeWidth="2" />
            <rect x="25" y="45" width="70" height="6" fill="#800000" opacity="0.8" />
            <rect x="25" y="90" width="70" height="6" fill="#800000" opacity="0.8" />
            <path d="M60 10 L95 30 L25 30 Z" fill="#B8860B" />
        </svg>
    </motion.div>
);

const DharmaWheel = ({ size = 64, x, y, delay = 0 }: { size?: number, x: string, y: string, delay?: number }) => (
    <motion.div
        className="absolute z-0 pointer-events-none"
        style={{ left: x, top: y, width: size, height: size }}
        initial={{ opacity: 0 }}
        animate={{ 
            opacity: 0.6,
            rotate: 360,
        }}
        transition={{ 
            opacity: { duration: 2 },
            rotate: { duration: 30, repeat: Infinity, ease: "linear" }, // Slowed down spin
            delay
        }}
    >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            <circle cx="50" cy="50" r="44" stroke="#eab308" strokeWidth="3" fill="none" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <path key={i} d="M50 50 L50 10" stroke="#eab308" strokeWidth="2" transform={`rotate(${angle} 50 50)`} />
            ))}
            <circle cx="50" cy="50" r="8" fill="#eab308" />
        </svg>
    </motion.div>
);

// Optimized: Removed ALL complex SVG filters (Lighting, Blur, Specular)
// This is the main performance fix.
const BuddhaStatue = ({ x, y, scale = 1, delay = 0 }: { x: string, y: string, scale?: number, delay?: number }) => (
    <motion.div
        className="absolute z-0 pointer-events-none"
        style={{ left: x, top: y, width: 300 * scale, height: 350 * scale, transform: 'translateX(-50%)', x: '-50%' }}
        initial={{ opacity: 0 }}
        animate={{
            opacity: 0.15, 
            y: [-5, 5, -5],
        }}
        transition={{
            opacity: { duration: 2 },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay },
        }}
    >
        <svg viewBox="0 0 300 350" className="w-full h-full overflow-visible">
            <defs>
                 {/* Simple Gradient instead of heavy lighting calculation */}
                <linearGradient id="gold-body-simple" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FCD34D" /> 
                    <stop offset="100%" stopColor="#B45309" /> 
                </linearGradient>
            </defs>

            {/* Simple Halo */}
            <circle cx="150" cy="110" r="80" fill="#FEF3C7" opacity="0.3" />

            <g fill="url(#gold-body-simple)">
                {/* Head */}
                <path d="M150,50 C130,50 120,70 120,90 C120,115 130,130 150,130 C170,130 180,115 180,90 C180,70 170,50 150,50 Z" />
                <circle cx="150" cy="45" r="12" />
                {/* Body */}
                <path d="M120,130 Q90,140 70,180 L60,280 C60,280 150,290 240,280 L230,180 Q210,140 180,130 Z" />
                {/* Legs */}
                <path d="M40,280 Q20,310 80,330 L220,330 Q280,310 260,280 Z" />
            </g>
        </svg>
    </motion.div>
);

export const ThreeDElements: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <AmbientParticles />
      
      {/* Reduced Opacity Background Blobs - CSS only, no animation needed */}
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <BuddhaStatue x="50%" y="15%" scale={1.5} delay={0.5} />
      <DharmaWheel x="5%" y="15%" delay={0} size={80} /> 
      <DharmaWheel x="90%" y="10%" delay={2} size={70} /> 
      <FloatingLotus x="10%" y="70%" color="#fbcfe8" delay={0} scale={1.2} />
      <FloatingLotus x="80%" y="25%" color="#bae6fd" delay={1} scale={0.8} />
      <PrayerWheel x="80%" y="55%" delay={0.5} />
      <PrayerWheel x="5%" y="40%" delay={1.5} />
    </div>
  );
};
