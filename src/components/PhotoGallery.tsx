import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon } from 'lucide-react';

interface PhotoGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ isOpen, onClose }) => {
  // 6 Placeholders for the "Square 6 boxes" look
  const photos = [
    "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1609252925148-b0f1b515e111?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=500&q=80"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-indigo-950/90 backdrop-blur-md"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#fffcf5] rounded-xl shadow-2xl overflow-hidden border-[2px] border-amber-200 flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-3 flex justify-between items-center border-b border-amber-300 shrink-0">
                <div className="flex items-center gap-2 text-amber-100">
                    <ImageIcon size={16} className="text-amber-300" />
                    <h3 className="font-['Cinzel'] font-bold text-sm tracking-wide">Baby's Gallery</h3>
                </div>
                <button onClick={onClose} className="p-1 bg-white/10 hover:bg-white/20 rounded-full text-white">
                    <X size={16} />
                </button>
            </div>

            {/* GRID: 2 Columns, Square Aspect Ratio */}
            <div className="p-3 overflow-y-auto custom-scrollbar bg-slate-100">
                <div className="grid grid-cols-2 gap-2">
                    {photos.map((src, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="aspect-square bg-white p-1 rounded-lg shadow-sm border border-slate-200"
                        >
                            <img 
                                src={src} 
                                alt={`Baby ${index}`} 
                                className="w-full h-full object-cover rounded-md"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
