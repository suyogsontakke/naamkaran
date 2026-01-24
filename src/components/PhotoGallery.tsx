import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon } from 'lucide-react';

interface PhotoGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ isOpen, onClose }) => {
  // Placeholder images (You can replace these with real URLs later)
  const photos = [
    "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80", // Baby/Family 1
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80", // Family 2
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80", // Hands
    "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80"  // Celebration
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          
          {/* Dark Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-indigo-950/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[80vh] bg-[#fffcf5] rounded-xl shadow-2xl overflow-hidden border-[4px] border-amber-200 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 flex justify-between items-center border-b border-amber-300 shrink-0">
                <div className="flex items-center gap-2 text-amber-100">
                    <ImageIcon size={18} className="text-amber-300" />
                    <h3 className="font-['Cinzel'] font-bold tracking-wide">Family Gallery</h3>
                </div>
                <button 
                    onClick={onClose}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Scrollable Grid */}
            <div className="p-4 overflow-y-auto custom-scrollbar bg-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                {photos.map((src, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-lg overflow-hidden shadow-md border border-white hover:shadow-xl transition-shadow bg-white p-2"
                    >
                        <div className="aspect-[4/3] bg-slate-200 overflow-hidden rounded-md">
                            <img src={src} alt={`Gallery ${index}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                    </motion.div>
                ))}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
