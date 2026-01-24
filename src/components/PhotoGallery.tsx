import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon, ZoomIn } from 'lucide-react';

interface PhotoGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ isOpen, onClose }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // 6 Photos Grid
  const photos = [
    "/gallery/image 1.jpg", 
    "/gallery/image 2.jpg",
    "/gallery/image 3.jpg",
    "/gallery/image 4.jpg",
    "/gallery/image 5.jpg",
    "/gallery/image 7.jpg"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          
          {/* Backdrop (Closes Gallery) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-indigo-950/90 backdrop-blur-md"
          />

          {/* Main Gallery Modal */}
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

            {/* GRID: 2 Columns */}
            <div className="p-3 overflow-y-auto custom-scrollbar bg-slate-100">
                <div className="grid grid-cols-2 gap-2">
                    {photos.map((src, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setSelectedPhoto(src)}
                            className="aspect-square bg-white p-1 rounded-lg shadow-sm border border-slate-200 cursor-pointer relative group overflow-hidden"
                        >
                            <img 
                                src={src} 
                                alt={`Baby ${index}`} 
                                className="w-full h-full object-cover rounded-md group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Zoom Icon Overlay */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                                <ZoomIn className="text-white drop-shadow-md" size={24} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
          </motion.div>

          {/* FULL SCREEN LIGHTBOX (The "Big Photo" View) */}
          <AnimatePresence>
            {selectedPhoto && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <button 
                        className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-2 rounded-full"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <X size={24} />
                    </button>
                    
                    <motion.img 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        src={selectedPhoto} 
                        alt="Full Size View" 
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border-2 border-white/20"
                        onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing it
                    />
                </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </AnimatePresence>
  );
};
