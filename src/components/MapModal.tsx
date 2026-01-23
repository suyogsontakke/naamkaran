import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, ExternalLink } from 'lucide-react';

interface MapModalProps {
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ onClose }) => {
  // Exact address for the map query
  const address = "SukhSundar Bhavan, Plot No. 7, Vrundavan Colony, Near Sai Baba School, Nagpur";
  
  // CORRECTED URLs:
  // 1. The Embed Source (for the Iframe inside the app)
  const mapSrc = `https://www.google.com/maps/embed?pb=!4v1769138732429!6m8!1m7!1sscbP-OEbbs_NkOlFPeZJsw!2m2!1d21.17920448906362!2d79.0408888480574!3f142.13213096517654!4f-10.202816796089408!5f0.4000000000000002`;
  
  // 2. The External Link (to open the Google Maps App)
  const googleMapsUrl = `https://maps.app.goo.gl/ZvrYzRP9M9BX6Yot5`;

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
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-amber-50">
          <h3 className="font-['Cinzel'] font-bold text-amber-900 flex items-center gap-2">
            <MapPin size={18} className="text-amber-600" /> Event Venue
          </h3>
          <button onClick={onClose} className="p-1.5 hover:bg-white rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* MAP IFRAME SECTION */}
          <div className="aspect-video w-full bg-gray-100 rounded-2xl mb-6 overflow-hidden border border-gray-200 relative shadow-inner">
            <iframe 
              title="SukhSundar Bhavan Map"
              width="100%" 
              height="100%" 
              src={mapSrc}
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
          </div>

          <div className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                <strong>Address:</strong> {address}
              </p>
              <p className="text-[10px] text-amber-600/70 mt-1 italic">
                *Located near Sai Baba School. Parking is available.
              </p>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-700 transition-all shadow-lg active:scale-95"
            >
              Open in Google Maps App <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
