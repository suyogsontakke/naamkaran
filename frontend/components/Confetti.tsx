
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<{id: number, x: number, color: string, size: number, delay: number, rotation: number}[]>([]);

  useEffect(() => {
    const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#D97706'];
    const newPieces = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Start position %
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.2, // Burst feel
      rotation: Math.random() * 360
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-sm shadow-sm"
          style={{
            backgroundColor: piece.color,
            left: `${piece.x}%`,
            top: '-5vh',
            width: piece.size,
            height: piece.size * 1.5,
          }}
          initial={{ 
            rotate: piece.rotation 
          }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, (Math.random() - 0.5) * 200], // Random drift
            rotateX: [0, 360 * (Math.random() + 1)],
            rotateY: [0, 360 * (Math.random() + 1)],
          }}
          transition={{
            duration: Math.random() * 2 + 3, // 3-5 seconds fall
            ease: [0.25, 0.1, 0.25, 1], // Ease out cubic roughly
            delay: piece.delay,
            repeat: 0
          }}
        />
      ))}
    </div>
  );
};
