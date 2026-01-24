import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Calendar, Clock, MapPin, Image as ImageIcon, ExternalLink, Download, Loader2, ChevronsDown } from 'lucide-react';

interface InvitationCardProps {
  guestName: string;
  onOpenGallery: () => void;
  onOpenMap?: () => void;
  showDetails?: boolean;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ guestName, onOpenGallery, onOpenMap, showDetails = true }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Variants definitions
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
        delayChildren: 2.2 
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10, x: -5 },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  const babyTitleVariants: Variants = {
    hidden: { scale: 0.8, rotateX: 40, opacity: 0, y: 20 },
    visible: { 
      scale: 1, 
      rotateX: 0, 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.5, 
        duration: 1.0, 
        type: "spring", 
        bounce: 0.5 
      }
    }
  };

  const guestNameVariants: Variants = {
    hidden: { opacity: 0, scale: 0.6, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: {
        delay: 1.6, 
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 0.2 } }
  };

  // Public Folder Download Logic
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDownloading(true);

    const imagePath = '/invite.png'; 

    const link = document.createElement('a');
    link.href = imagePath;
    link.download = `Naamkaran-Invitation-${guestName.replace(/\s+/g, '-')}.png`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <>
        <div 
            className="w-full h-full bg-[#fffcf5] text-slate-800 flex flex-col items-center text-center p-4 md:p-6 border-[8px] md:border-[12px] border-double border-amber-200 relative overflow-y-auto custom-scrollbar transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl origin-center"
        >
        {/* Corner Decorations */}
        <div className="absolute top-2 left-2 w-12 h-12 md:w-16 md:h-16 border-t-2 border-l-2 border-amber-400 rounded-tl-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute top-2 right-2 w-12 h-12 md:w-16 md:h-16 border-t-2 border-r-2 border-amber-400 rounded-tr-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-2 left-2 w-12 h-12 md:w-16 md:h-16 border-b-2 border-l-2 border-amber-400 rounded-bl-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-2 right-2 w-12 h-12 md:w-16 md:h-16 border-b-2 border-r-2 border-amber-400 rounded-br-3xl opacity-60 pointer-events-none"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-48 h-48 md:w-64 md:h-64">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="1" />
            </svg>
        </div>

        <div className="relative z-10 flex flex-col h-full w-full max-w-[90%] mx-auto">
            
            <motion.div 
                className="space-y-1 mt-2"
                initial="hidden"
                animate={showDetails ? "visible" : "hidden"}
            >
                {/* UPDATED: Increased text size from text-[10px] to text-sm */}
                <motion.h3 variants={fadeVariants} className="text-amber-600 tracking-[0.2em] text-sm md:text-base uppercase font-bold">
                    The Dabhade & Shimpi Family
                </motion.h3>
                
                <motion.div variants={fadeVariants} className="w-12 h-0.5 bg-amber-300 mx-auto"></motion.div>
                <motion.p variants={fadeVariants} className="text-xs md:text-sm italic text-gray-500">Cordially invites</motion.p>
                
                <motion.div 
                    variants={guestNameVariants}
                    className="relative py-1 perspective-[500px] z-20"
                >
                    <h2 
                        className="text-2xl md:text-3xl font-['Great_Vibes'] text-amber-600 leading-tight"
                        style={{
                            textShadow: `
                                0 1px 0 #d97706,
                                0 2px 0 #b45309,
                                0 3px 0 #92400e,
                                0 4px 0 #78350f,
                                0 5px 2px rgba(0,0,0,0.15),
                                0 0 5px rgba(0,0,0,0.05)
                            `
                        }}
                    >
                        {guestName}
                    </h2>
                </motion.div>
                
                <motion.span variants={fadeVariants} className="text-xs md:text-sm font-serif text-gray-500 block">- with Family -</motion.span>
            </motion.div>

            <div className="py-2 md:py-4 flex flex-col items-center">
                <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: showDetails ? 1 : 0 }} 
                    transition={{ delay: 0.4 }}
                    className="text-[10px] md:text-xs text-gray-500 mb-2 uppercase tracking-widest"
                >
                    To the Naamkaran Ceremony of
                </motion.p>
                
                <motion.div 
                    className="relative perspective-[500px] py-2"
                    variants={babyTitleVariants}
                    initial="hidden"
                    animate={showDetails ? "visible" : "hidden"}
                    whileHover={{ rotateX: 15, scale: 1.1, rotateY: 5 }}
                >
                    <h1 
                        className="text-4xl md:text-6xl font-['Cinzel'] font-black text-amber-500 leading-none tracking-wide"
                        style={{
                            textShadow: `
                                0 1px 0 #b45309,
                                0 2px 0 #92400e,
                                0 3px 0 #78350f,
                                0 4px 0 #78350f,
                                0 5px 0 #451a03,
                                0 6px 1px rgba(0,0,0,0.1),
                                0 0 5px rgba(0,0,0,0.1),
                                1px 3px rgba(0,0,0,0.3),
                                0 3px 5px rgba(0,0,0,0.2),
                                0 5px 10px rgba(0,0,0,0.25)
                            `,
                            WebkitTextStroke: '1px #b45309'
                        }}
                    >
                        Baby Boy
                    </h1>
                </motion.div>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showDetails ? 1 : 0 }}
                    transition={{ delay: 1 }}
                    className="text-[10px] text-gray-400 mt-2"
                >
                    (Son of Mr. & Mrs. Dabhade)
                </motion.p>
            </div>

            <motion.div 
                className="bg-amber-50/50 p-3 md:p-4 rounded-xl border border-amber-100 shadow-sm space-y-2 mb-2"
                variants={containerVariants}
                initial="hidden"
                animate={showDetails ? "visible" : "hidden"}
            >
                <motion.div variants={itemVariants} className="flex items-center gap-3 text-left">
                    <div className="p-1.5 md:p-2 bg-amber-100 rounded-full text-amber-700 shrink-0">
                        <Calendar size={14} className="md:w-[18px] md:h-[18px]" />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Date</p>
                        <p className="text-xs md:text-sm font-semibold text-slate-700">Sun, Feb 15th, 2026</p>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center gap-3 text-left">
                    <div className="p-1.5 md:p-2 bg-amber-100 rounded-full text-amber-700 shrink-0">
                        <Clock size={14} className="md:w-[18px] md:h-[18px]" />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Time</p>
                        <p className="text-xs md:text-sm font-semibold text-slate-700">12:30 PM Onwards</p>
                    </div>
                </motion.div>
                
                <motion.div 
                    variants={itemVariants} 
                    className="flex items-center gap-3 text-left cursor-pointer hover:bg-amber-100/50 p-1.5 -mx-1.5 rounded-lg transition-colors group relative"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenMap) onOpenMap();
                    }}
                    role="button"
                    aria-label="View Venue on Map"
                >
                    <div className="p-1.5 md:p-2 bg-amber-100 rounded-full text-amber-700 shrink-0 group-hover:bg-amber-200 transition-colors">
                        <MapPin size={14} className="md:w-[18px] md:h-[18px]" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <p className="text-[10px] text-gray-500 uppercase font-bold group-hover:text-amber-700 transition-colors">Venue</p>
                            <ExternalLink size={10} className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs md:text-sm font-semibold text-slate-700 leading-tight">SukhSundar Bhavan, Plot No. 7, Vrundavan Colony, Near Sai Baba School, Nagpur</p>
                    </div>
                    <span 
                        className="absolute right-2 top-0 text-[9px] text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity font-bold bg-amber-100/80 px-1.5 py-0.5 rounded-full backdrop-blur-sm pointer-events-none transform -translate-y-1/2 shadow-sm"
                    >
                        View Map
                    </span>
                </motion.div>
            </motion.div>

            <motion.div 
                className="mt-auto flex gap-2 justify-center pb-2 relative z-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 10 }}
                transition={{ delay: 2.8 }}
            >
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpenGallery();
                    }}
                    className="flex-1 bg-amber-100 text-amber-800 border border-amber-200 px-2 py-2 rounded-lg text-[10px] md:text-xs font-bold shadow-sm active:scale-95 transition-transform flex items-center justify-center gap-1 hover:bg-amber-200 cursor-pointer pointer-events-auto"
                    aria-label="View photo gallery"
                >
                    <ImageIcon size={12} /> Photos
                </button>

                <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex-1 bg-slate-800 text-amber-100 px-2 py-2 rounded-lg text-[10px] md:text-xs font-bold shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-1 hover:bg-slate-700 cursor-pointer pointer-events-auto disabled:opacity-70 disabled:cursor-wait"
                    aria-label="Download Invitation"
                >
                    {isDownloading ? (
                        <>
                            <Loader2 size={12} className="animate-spin text-amber-100" /> Saving
                        </>
                    ) : (
                        <>
                            <Download size={12} className="text-amber-100" /> Download
                        </>
                    )}
                </button>
            </motion.div>

            {/* Sticky Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1, y: [0, 5, 0] }}
                transition={{ delay: 3, duration: 1.5, repeat: Infinity }}
                className="sticky bottom-0 left-0 right-0 flex flex-col items-center justify-center text-amber-700/60 pb-1 z-0 pointer-events-none mt-4"
                data-hide-download 
            >
                <span className="text-[9px] uppercase tracking-widest font-bold bg-amber-50/80 px-3 py-0.5 rounded-full backdrop-blur-[2px] shadow-sm mb-0.5">Scroll Down</span>
                <ChevronsDown size={16} />
            </motion.div>

        </div>
        </div>
    </>
  );
};
