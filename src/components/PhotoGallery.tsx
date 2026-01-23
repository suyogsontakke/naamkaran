import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface PhotoGalleryProps {
  onClose: () => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  // State for gallery images. 
  // TODO: Replace these URLs with your actual image paths.
  const [photos, setPhotos] = useState<string[]>([
    '../photos/image 1.jpg', // Baby feet
    '../photos/image 2.jpg', // Baby smile
    '../photos/image 3.jpg', // Cute baby
    '../photos/image 4.jpg',
    '../photos/image 5.jpg',
    '../photos/image 7.jpg'
  ]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % photos.length));
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + photos.length) % photos.length));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <AnimatePresence mode="wait">
        {selectedIndex === null ? (
           <motion.div
             key="grid"
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 0.9, opacity: 0 }}
             className="bg-[#fffcf5] rounded-3xl p-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto relative shadow-2xl custom-scrollbar"
             onClick={(e) => e.stopPropagation()}
           >
             <div className="flex justify-between items-start mb-4">
                 <div className="flex-1"></div> {/* Spacer */}
                 <div className="flex-1 text-center">
                    <h2 className="text-2xl font-['Cinzel'] text-amber-700 mb-1">Baby's Gallery</h2>
                    <p className="text-amber-600/60 text-xs italic">Memories & Moments</p>
                 </div>
                 <div className="flex-1 flex justify-end gap-2">
                     <button 
                         onClick={onClose}
                         className="p-2 bg-amber-100 rounded-full hover:bg-amber-200 transition-colors"
                     >
                         <X size={20} className="text-amber-800" />
                     </button>
                 </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {photos.map((src, index) => (
                     <motion.div 
                         key={`${src}-${index}`}
                         layoutId={`photo-container-${index}`}
                         className="aspect-square bg-amber-50 rounded-xl overflow-hidden relative group cursor-pointer border border-amber-100 shadow-sm"
                         onClick={() => setSelectedIndex(index)}
                         whileHover={{ scale: 1.02 }}
                         whileTap={{ scale: 0.98 }}
                     >
                         <div className="absolute inset-0 flex items-center justify-center text-amber-200">
                             <span className="text-4xl">👶</span>
                         </div>
                         <motion.img 
                             layoutId={`photo-img-${index}`}
                             src={src}
                             alt={`Baby Photo ${index + 1}`} 
                             className="w-full h-full object-cover relative z-10"
                         />
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 z-20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                             <ZoomIn className="text-white drop-shadow-md" />
                         </div>
                     </motion.div>
                 ))}
             </div>
             
             <p className="text-center text-amber-800/40 text-sm mt-8 font-serif italic">
                 "A bundle of joy, a gift from above."
             </p>
           </motion.div>
        ) : (
           <motion.div
              key="carousel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] flex items-center justify-center w-full h-full"
              onClick={() => setSelectedIndex(null)}
           >
              {/* Controls Overlay */}
              <div className="absolute inset-0 z-50 pointer-events-none">
                  {/* Close */}
                  <button 
                      onClick={() => setSelectedIndex(null)}
                      className="absolute top-4 right-4 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors pointer-events-auto backdrop-blur-md"
                  >
                      <X size={24} />
                  </button>
                  
                  {/* Arrows */}
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <button 
                        onClick={handlePrev}
                        className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors pointer-events-auto backdrop-blur-md"
                    >
                        <ChevronLeft size={32} />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                     <button 
                        onClick={handleNext}
                        className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors pointer-events-auto backdrop-blur-md"
                    >
                        <ChevronRight size={32} />
                    </button>
                  </div>

                  {/* Indicators */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 pointer-events-auto overflow-x-auto px-4 no-scrollbar">
                      {photos.map((_, idx) => (
                          <button
                              key={idx}
                              onClick={(e) => { e.stopPropagation(); setSelectedIndex(idx); }}
                              className={`w-2 h-2 rounded-full transition-all shadow-sm shrink-0 ${idx === selectedIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'}`}
                          />
                      ))}
                  </div>
              </div>

              {/* Main Image Container */}
              <div className="w-full h-full flex items-center justify-center p-4 md:p-12 relative z-40">
                  <motion.div 
                      layoutId={`photo-container-${selectedIndex}`}
                      className="relative rounded-lg overflow-hidden shadow-2xl bg-black max-w-full max-h-[85vh] flex items-center justify-center"
                      onClick={(e) => e.stopPropagation()}
                  >
                       <motion.img 
                           layoutId={`photo-img-${selectedIndex}`}
                           src={photos[selectedIndex]} 
                           alt={`Baby Photo ${selectedIndex + 1}`} 
                           className="max-w-full max-h-[85vh] object-contain"
                       />
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.2 }}
                         className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white text-center"
                       >
                          <p className="text-xl font-['Cinzel'] text-amber-100">Baby Dabhade</p>
                          <p className="text-xs text-gray-300 uppercase tracking-widest mt-1">Photo Collection {selectedIndex + 1}</p>
                       </motion.div>
                  </motion.div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
