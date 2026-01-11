
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Particle } from '../types';

export const FloatingPetals: React.FC = () => {
  const [petals, setPetals] = useState<Particle[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 20 + 10,
      duration: Math.random() * 15 + 15, // Increased duration for slower, more graceful fall (15-30s)
      delay: Math.random() * 5,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute text-pink-200 opacity-40"
          style={{
            left: `${petal.x}%`,
            top: -60,
          }}
          animate={{
            y: ['-10vh', '110vh'],
            x: [0, Math.sin(petal.id) * 60, 0], // Gentle sway
            rotate: [0, 360],
            rotateX: [0, 180],
            rotateY: [0, 180],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "easeInOut", // Smoother easing for graceful descent
          }}
        >
          {/* Simple SVG Shape mimicking a lotus petal */}
          <svg width={petal.size} height={petal.size} viewBox="0 0 24 24" fill="currentColor">
             <path d="M12,2C12,2 4,8 4,14C4,19 12,22 12,22C12,22 20,19 20,14C20,8 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
