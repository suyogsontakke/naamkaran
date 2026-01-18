import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Navigation, ExternalLink } from 'lucide-react';

interface MapModalProps {
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ onClose }) => {
  const address = "SukhSundar Bhavan, Plot No. 7, Vrundavan Colony, Near Sai Baba School, Nagpur";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-lg overflow-hidden relative shadow-2xl border border-amber-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-amber-50">
          <h3 className="font-['Cinzel'] font-bold text-amber-900 flex items-center gap-2">
            <MapPin size={18} className="text-amber-600" /> Event Venue
          </h3>
          <button onClick={onClose} className="p-1.5 hover:bg-white rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="aspect-video w-full bg-gray-100 rounded-2xl mb-6 overflow-hidden border border-gray-200 relative">
            {/* Simple Placeholder for Map - In a real app, use an Iframe or Google Maps API */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Navigation size={32} className="text-amber-600 animate-pulse" />
              </div>
              <p className="text-sm text-gray-600 font-medium">{address}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                SukhSundar Bhavan is located near Sai Baba School in Nagpur. Free parking is available at the venue.
              </p>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-700 transition-all shadow-lg active:scale-95"
            >
              Open in Google Maps <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
