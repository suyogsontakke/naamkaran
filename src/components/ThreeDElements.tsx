import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Component for subtle floating dust/embers
const AmbientParticles = () => {
    const [particles, setParticles] = useState<{id: number; x: number; y: number; size: number; duration: number; delay: number}[]>([]);

    useEffect(() => {
        const count = 40; // Number of particles
        const generated = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1, // 1px to 4px
            duration: Math.random() * 15 + 10, // Slow, varying movement (10-25s)
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
                        boxShadow: `0 0 ${p.size * 2}px rgba(251, 191, 36, 0.4)` // Subtle gold glow
                    }}
                    animate={{
                        y: [0, -120], // Drift Upwards
                        x: [0, Math.sin(p.id) * 25], // Gentle Sine Wave Sway
                        opacity: [0, 0.2, 0.6, 0.2, 0], // Twinkle/Fade lifecycle
                        scale: [0.8, 1.2, 0.8] // Pulse size
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                        times: [0, 0.2, 0.5, 0.8, 1] // Keyframe timing for opacity
                    }}
                />
            ))}
        </div>
    );
};

// SVG for Floating Lotus with breathing animation
const FloatingLotus = ({ color, delay, x, y, scale = 1 }: { color: string, delay: number, x: string, y: string, scale?: number }) => (
    <motion.div
        className="absolute z-0 pointer-events-none"
        style={{ left: x, top: y, width: 100 * scale, height: 100 * scale }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
            opacity: 1, 
            y: [-10, 10, -10], 
            rotate: [-5, 5, -5],
            scale: [1, 1.1, 1] 
        }}
        transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay 
        }}
    >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg" style={{ overflow: 'visible' }}>
             <defs>
                <filter id={`glow-${delay}`}>
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <g transform="translate(50,60)">
                {/* Back Petals */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <motion.path
                        key={`back-${i}`}
                        d="M0,0 Q15,-30 0,-50 Q-15,-30 0,0"
                        fill={color}
                        fillOpacity="0.5"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1"
                        transform={`rotate(${angle + 22.5}) scale(0.9)`}
                    />
                ))}
                {/* Front Petals with independent breathing */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <motion.path
                        key={`front-${i}`}
                        d="M0,0 Q15,-30 0,-50 Q-15,-30 0,0"
                        fill={color}
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth="1"
                        transform={`rotate(${angle})`}
                        animate={{ scale: [0.9, 1.05, 0.9] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.1, repeatType: "mirror" }}
                    />
                ))}
                {/* Center */}
                <circle cx="0" cy="-10" r="8" fill="#FFD700" filter={`url(#glow-${delay})`} />
            </g>
        </svg>
    </motion.div>
);

// SVG for Prayer Wheel with spinning effect
const PrayerWheel = ({ x, y, delay }: { x: string, y: string, delay: number }) => (
    <motion.div
        className="absolute z-0 pointer-events-none w-24 h-36 md:w-32 md:h-48"
        style={{ left: x, top: y }}
        initial={{ opacity: 0 }}
        animate={{ 
            opacity: 1, 
            y: [-10, 5, -10], 
            rotate: [-3, 3, -3] 
        }}
        transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay 
        }}
    >
        <svg viewBox="0 0 120 160" className="w-full h-full drop-shadow-2xl">
            <defs>
                <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#daa520" />
                    <stop offset="50%" stopColor="#ffd700" />
                    <stop offset="100%" stopColor="#daa520" />
                </linearGradient>
                <clipPath id="wheelClip">
                    <rect x="25" y="30" width="70" height="80" rx="5" />
                </clipPath>
            </defs>

            {/* Handle */}
            <rect x="55" y="110" width="10" height="50" rx="2" fill="#5D4037" />

            {/* Wheel Body */}
            <rect x="25" y="30" width="70" height="80" rx="5" fill="url(#gold)" stroke="#B8860B" strokeWidth="2" />
            
            {/* Horizontal Bands */}
            <rect x="25" y="45" width="70" height="6" fill="#800000" opacity="0.8" />
            <rect x="25" y="90" width="70" height="6" fill="#800000" opacity="0.8" />

            {/* Spinning Text/Pattern */}
            <g clipPath="url(#wheelClip)">
                 <motion.g
                    animate={{ x: [0, -180] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 >
                     <text x="10" y="80" fontSize="22" fill="#5c4033" fontWeight="bold" style={{fontFamily: 'serif'}}>नमो बुद्धाय</text>
                     <text x="190" y="80" fontSize="22" fill="#5c4033" fontWeight="bold" style={{fontFamily: 'serif'}}>नमो बुद्धाय</text>
                 </motion.g>
            </g>

            {/* Cap */}
            <path d="M60 10 L95 30 L25 30 Z" fill="#B8860B" />
            
            {/* Spinning Weight - Smoother animation */}
            <motion.g>
                <motion.line 
                    x1="95" y1="70" 
                    stroke="#333" 
                    strokeWidth="1.5" 
                    animate={{ 
                        x2: [110, 115, 110], 
                        y2: [80, 65, 80] 
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
                />
                <motion.circle 
                    r="6" fill="#333" 
                    animate={{ 
                        cx: [110, 115, 110],
                        cy: [80, 65, 80]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
                />
            </motion.g>
        </svg>
    </motion.div>
);

// Enhanced Dharma Wheel Component with Gold Gradient
const DharmaWheel = ({ size = 64, x, y, delay = 0 }: { size?: number, x: string, y: string, delay?: number }) => (
    <motion.div
        className="absolute z-0 pointer-events-none"
        style={{ left: x, top: y, width: size, height: size }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
            opacity: [0.8, 1, 0.8], // Brighter visibility
            y: [-15, 15, -15],      // Gentle bobbing
            rotate: 360,            // Continuous spin
        }}
        transition={{ 
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 25, repeat: Infinity, ease: "linear" }, // Slower, majestic spin
            delay
        }}
    >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl" style={{ overflow: 'visible' }}>
            <defs>
                <linearGradient id="wheel-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FEF3C7" /> {/* Light Gold */}
                    <stop offset="50%" stopColor="#D97706" /> {/* Dark Gold */}
                    <stop offset="100%" stopColor="#FEF3C7" />
                </linearGradient>
                <filter id="wheel-glow">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            
            <g filter="url(#wheel-glow)">
                {/* Outer Rim */}
                <circle cx="50" cy="50" r="44" stroke="url(#wheel-gold)" strokeWidth="3" fill="none" />
                <circle cx="50" cy="50" r="38" stroke="url(#wheel-gold)" strokeWidth="1" fill="none" opacity="0.5" />

                {/* Spokes (Eightfold Path) */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <g key={i} transform={`rotate(${angle} 50 50)`}>
                        <path d="M50 50 L50 10" stroke="url(#wheel-gold)" strokeWidth="2.5" strokeLinecap="round" />
                        {/* Detail on spoke */}
                        <circle cx="50" cy="10" r="2" fill="url(#wheel-gold)" />
                    </g>
                ))}

                {/* Hub */}
                <circle cx="50" cy="50" r="10" fill="url(#wheel-gold)" />
                <circle cx="50" cy="50" r="5" fill="#78350f" /> {/* Inner dark center */}

                {/* Cardinal Jewels */}
                <circle cx="50" cy="6" r="3" fill="#FFFBEB" />
                <circle cx="94" cy="50" r="3" fill="#FFFBEB" />
                <circle cx="50" cy="94" r="3" fill="#FFFBEB" />
                <circle cx="6" cy="50" r="3" fill="#FFFBEB" />
            </g>
        </svg>
    </motion.div>
);

// 3D Buddha Statue Component - Realistic Gold & Breathing
const BuddhaStatue = ({ x, y, scale = 1, delay = 0 }: { x: string, y: string, scale?: number, delay?: number }) => (
    <motion.div
        className="absolute z-0 pointer-events-none"
        style={{ left: x, top: y, width: 300 * scale, height: 350 * scale, transform: 'translateX(-50%)', x: '-50%' }}
        initial={{ opacity: 0, scale: scale * 0.9 }}
        animate={{
            opacity: 0.25, // Increased opacity for better visibility of the realistic effect
            y: [-10, 10, -10],
        }}
        transition={{
            opacity: { duration: 3 },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay },
        }}
    >
        <svg viewBox="0 0 300 350" className="w-full h-full drop-shadow-2xl overflow-visible">
            <defs>
                {/* Realistic Satin Gold Gradient */}
                <linearGradient id="gold-body" x1="20%" y1="0%" x2="80%" y2="100%">
                    <stop offset="0%" stopColor="#FFF9E5" /> {/* Highlight */}
                    <stop offset="30%" stopColor="#F4D086" /> {/* Light Gold */}
                    <stop offset="60%" stopColor="#D4AF37" /> {/* Metallic Gold */}
                    <stop offset="100%" stopColor="#8A6E28" /> {/* Shadow */}
                </linearGradient>
                
                {/* Specular Lighting for 3D realism */}
                <filter id="gold-relief" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
                    <feOffset dx="1" dy="2" result="offsetBlur"/>
                    <feSpecularLighting in="blur" surfaceScale="3" specularConstant="1" specularExponent="20" lightingColor="#FFFBEB" result="specOut">
                        <fePointLight x="-5000" y="-10000" z="20000"/>
                    </feSpecularLighting>
                    <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
                    <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint"/>
                    <feDropShadow dx="0" dy="5" stdDeviation="5" floodOpacity="0.3"/>
                </filter>

                {/* Enhanced Halo Glow Gradient */}
                <radialGradient id="halo-glow" cx="50%" cy="50%" r="50%">
                     <stop offset="20%" stopColor="#FFF7ED" stopOpacity="0.9" />
                     <stop offset="60%" stopColor="#FCD34D" stopOpacity="0.4" />
                     <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                </radialGradient>

                 <filter id="glow-blur">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>

            {/* Pulsing Aura - Synced with breathing (6s) */}
            <motion.circle
                cx="150" cy="110" r="90"
                fill="url(#halo-glow)"
                animate={{ 
                    scale: [1, 1.15, 1], 
                    opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                filter="url(#glow-blur)"
            />

            {/* Statue Group with Breathing Animation (6s) */}
            <motion.g
                animate={{ scale: [1, 1.025, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ originX: '150px', originY: '250px' }} 
                filter="url(#gold-relief)"
            >
                {/* Head */}
                <path d="M150,50 C130,50 120,70 120,90 C120,115 130,130 150,130 C170,130 180,115 180,90 C180,70 170,50 150,50 Z" fill="url(#gold-body)" />
                {/* Bun */}
                <circle cx="150" cy="45" r="12" fill="url(#gold-body)" />

                {/* Shoulders / Robes */}
                <path d="M120,130 Q90,140 70,180 L60,280 C60,280 150,290 240,280 L230,180 Q210,140 180,130 Z" fill="url(#gold-body)" />

                {/* Legs Crossed Base */}
                <path d="M40,280 Q20,310 80,330 L220,330 Q280,310 260,280 Z" fill="url(#gold-body)" />
                
                 {/* Hands (Dhyana Mudra) */}
                 <path 
                    d="M 125 240 Q 150 255 175 240" 
                    fill="none" 
                    stroke="#8A6E28" 
                    strokeWidth="1.5" 
                    strokeOpacity="0.6"
                    strokeLinecap="round"
                />
            </motion.g>
        </svg>
    </motion.div>
);


export const ThreeDElements: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* New Ambient Particle Effect */}
      <AmbientParticles />

      {/* Floating Spheres / Ambient Lights */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Main Buddha Statue Background - Centered */}
      <BuddhaStatue x="50%" y="15%" scale={1.5} delay={0.5} />

      {/* Dharma Wheels - Symbolizing the path */}
      <DharmaWheel x="5%" y="15%" delay={0} size={80} /> 
      <DharmaWheel x="90%" y="10%" delay={2} size={70} /> 

      {/* Buddhist Elements */}
      <FloatingLotus x="10%" y="70%" color="#fbcfe8" delay={0} scale={1.2} />
      <FloatingLotus x="80%" y="25%" color="#bae6fd" delay={1} scale={0.8} />
      <FloatingLotus x="15%" y="25%" color="#fde68a" delay={2} scale={0.6} />
      
      <PrayerWheel x="80%" y="55%" delay={0.5} />
      <PrayerWheel x="5%" y="40%" delay={1.5} />

    </div>
  );
};