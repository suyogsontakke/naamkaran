import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose }) => {
  // Venue: SukhSundar Bhavan, Nagpur
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.296538779698!2d79.1176233!3d21.1405797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c753d069695d%3A0x629535080927940b!2sSukh%20Sunder%20Bhavan!5e0!3m2!1sen!2sin!4v1709664567890!5m2!1sen!2sin";

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
            className="absolute inset-0 bg-indigo-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#fffcf5] rounded-xl shadow-2xl overflow-hidden border-[4px] border-amber-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 flex justify-between items-center border-b border-amber-300">
                <div className="flex items-center gap-2 text-amber-100">
                    <MapPin size={18} className="text-amber-300" />
                    <h3 className="font-['Cinzel'] font-bold tracking-wide">Event Location</h3>
                </div>
                <button 
                    onClick={onClose}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Map Iframe */}
            <div className="w-full aspect-square md:aspect-video bg-slate-200 relative">
                <iframe 
                    src={mapUrl} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Venue Map"
                ></iframe>
            </div>

            {/* Footer / Address */}
            <div className="p-4 bg-white text-center">
                <p className="text-indigo-900 font-bold text-sm mb-1">SukhSundar Bhavan</p>
                <p className="text-xs text-slate-500">Plot No. 7, Vrundavan Colony, Near Sai Baba School, Nagpur</p>
                
                <button 
                    onClick={() => window.open("https://maps.app.goo.gl/YourActualGoogleMapsLinkHere", "_blank")}
                    className="mt-3 w-full bg-amber-100 text-amber-800 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-amber-200 transition-colors"
                >
                    Open in Google Maps App
                </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
