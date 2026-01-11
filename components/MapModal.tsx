import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, ExternalLink } from 'lucide-react';

interface MapModalProps {
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ onClose }) => {
  // Address: SukhSundar Bhavan, Plot No. 7, Vrundavan Colony, Near Sai Baba School, Nagpur
  // Encoded for query
  const mapQuery = "SukhSundar+Bhavan%2C+Plot+No.+7%2C+Vrundavan+Colony%2C+Near+Sai+Baba+School%2C+Nagpur";
  
  const mapUrl = `https://www.google.com/maps/embed?pb=!4v1767704479687!6m8!1m7!1sYi88wReziET-p1PYus5SdQ!2m2!1d21.17914357623798!2d79.04086315320664!3f105.96189514895592!4f5.923585273033112!5f0.4000000000000002`;
  const externalMapUrl = `https://www.google.com/maps/embed?pb=!4v1767704479687!6m8!1m7!1sYi88wReziET-p1PYus5SdQ!2m2!1d21.17914357623798!2d79.04086315320664!3f105.96189514895592!4f5.923585273033112!5f0.4000000000000002`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50, rotateX: -10 }}
        animate={{ scale: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="bg-[#fffcf5] rounded-3xl w-full max-w-2xl h-[80vh] overflow-hidden relative shadow-2xl flex flex-col border border-amber-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-4 flex justify-between items-center border-b border-amber-300">
            <div className="flex items-center gap-2 text-amber-900">
                <div className="p-2 bg-amber-50 rounded-full border border-amber-200 shadow-sm">
                    <MapPin size={18} className="fill-amber-600 text-amber-800" />
                </div>
                <div>
                    <h3 className="font-['Cinzel'] font-bold text-lg leading-none">Event Location</h3>
                    <p className="text-[10px] text-amber-800/60 uppercase tracking-wider">Navigate to the Venue</p>
                </div>
            </div>
            <button 
                onClick={onClose}
                className="p-2 bg-white/50 rounded-full hover:bg-white transition-colors text-amber-900 shadow-sm"
            >
                <X size={20} />
            </button>
        </div>

        {/* Map Frame */}
        <div className="flex-1 bg-gray-100 relative">
             <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src={mapUrl}
                title="Venue Map"
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-amber-100 flex flex-col sm:flex-row justify-between items-center gap-4">
             <div className="text-xs text-gray-500 hidden sm:block">
                <p className="font-bold text-gray-700">SukhSundar Bhavan</p>
                <p>Plot No. 7, Vrundavan Colony, Nagpur</p>
             </div>
             <a 
                href={externalMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:from-amber-500 hover:to-amber-600 transition-all flex items-center justify-center gap-2 active:scale-95"
             >
                <ExternalLink size={16} />
                Open in Google Maps App
             </a>
        </div>
      </motion.div>
    </motion.div>
  );
};