
import React, { useRef, useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Image as ImageIcon, Lightbulb, ExternalLink, Download, Loader2, Mail } from 'lucide-react';
import html2canvas from 'html2canvas';
import { EmailModal } from './EmailModal';
import { emailService } from '../services/emailService';

interface InvitationCardProps {
  guestName: string;
  onOpenGallery: () => void;
  onOpenSuggestions: () => void;
  onOpenMap?: () => void;
  showDetails?: boolean;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ guestName, onOpenGallery, onOpenSuggestions, onOpenMap, showDetails = true }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

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

  const generateCardImage = async (): Promise<string | null> => {
    if (!cardRef.current) return null;
    
    // Brief delay to ensure UI stability
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
        const canvas = await html2canvas(cardRef.current, {
            scale: 3, // High resolution for professional print quality
            useCORS: true,
            backgroundColor: '#fffcf5', 
            logging: false,
            onclone: (clonedDoc) => {
                const clonedCard = clonedDoc.querySelector('[data-card-root]') as HTMLElement;
                if (clonedCard) {
                    // Force full height to capture scrolling content
                    clonedCard.style.height = 'auto';
                    clonedCard.style.overflow = 'visible';
                    clonedCard.style.maxHeight = 'none';
                    clonedCard.style.position = 'relative';
                    // Remove scroll classes
                    clonedCard.classList.remove('overflow-y-auto', 'custom-scrollbar');
                    
                    // Add padding at bottom to balance the removal of buttons
                    clonedCard.style.paddingBottom = '60px'; 
                    
                    // Ensure transform doesn't mess up capture
                    clonedCard.style.transform = 'none';
                }
                
                // Hide interactive elements (Buttons, Tooltips, Overlays)
                const elementsToHide = clonedDoc.querySelectorAll('[data-hide-download]');
                elementsToHide.forEach((el) => {
                    (el as HTMLElement).style.display = 'none';
                });

                // Fix text rendering: Remove gradients/transparency for solid capture
                // This ensures text is readable and not "washed out" or invisible
                const gradientTexts = clonedDoc.querySelectorAll('.text-transparent, .bg-clip-text');
                gradientTexts.forEach((el) => {
                     const htmlEl = el as HTMLElement;
                     htmlEl.classList.remove('text-transparent', 'bg-clip-text');
                     htmlEl.style.color = '#d97706'; // Solid Amber-600
                     htmlEl.style.webkitTextFillColor = '#d97706';
                     htmlEl.style.backgroundImage = 'none';
                });
            }
        });
        return canvas.toDataURL('image/png');
    } catch (error) {
        console.error("Image generation failed:", error);
        return null;
    }
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDownloading) return;

    setIsDownloading(true);
    try {
        const dataUrl = await generateCardImage();
        if (dataUrl) {
            const link = document.createElement('a');
            link.download = `Naamkaran-Invitation-${guestName.replace(/\s+/g, '-')}.png`;
            link.href = dataUrl;
            link.click();
        }
    } finally {
        setIsDownloading(false);
    }
  };

  const handleSendEmail = async (email: string) => {
    setIsSendingEmail(true);
    try {
        const dataUrl = await generateCardImage();
        if (dataUrl) {
            await emailService.sendInvitation(email, guestName, dataUrl);
        }
    } catch (error) {
        console.error("Email send failed", error);
    } finally {
        setIsSendingEmail(false);
    }
  };

  return (
    <>
        <div 
            ref={cardRef}
            data-card-root
            className="w-full h-full bg-[#fffcf5] text-slate-800 flex flex-col items-center text-center p-4 md:p-6 border-[8px] md:border-[12px] border-double border-amber-200 relative overflow-y-auto custom-scrollbar transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl origin-center"
        >
        {/* Decorative Corners */}
        <div className="absolute top-2 left-2 w-12 h-12 md:w-16 md:h-16 border-t-2 border-l-2 border-amber-400 rounded-tl-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute top-2 right-2 w-12 h-12 md:w-16 md:h-16 border-t-2 border-r-2 border-amber-400 rounded-tr-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-2 left-2 w-12 h-12 md:w-16 md:h-16 border-b-2 border-l-2 border-amber-400 rounded-bl-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-2 right-2 w-12 h-12 md:w-16 md:h-16 border-b-2 border-r-2 border-amber-400 rounded-br-3xl opacity-60 pointer-events-none"></div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-48 h-48 md:w-64 md:h-64">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="1" />
            </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full w-full max-w-[90%] mx-auto">
            
            <motion.div 
                className="space-y-1 mt-2"
                initial="hidden"
                animate={showDetails ? "visible" : "hidden"}
            >
                <motion.h3 variants={fadeVariants} className="text-amber-600 tracking-[0.2em] text-[10px] md:text-xs uppercase font-bold">The Dabhade Family</motion.h3>
                <motion.div variants={fadeVariants} className="w-12 h-0.5 bg-amber-300 mx-auto"></motion.div>
                <motion.p variants={fadeVariants} className="text-xs md:text-sm italic text-gray-500">Cordially invites</motion.p>
                
                {/* Animated Guest Name */}
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
                    {/* Gradient Overlay - Hidden in Download to avoid duplication/artifacts */}
                    <div 
                        data-hide-download
                        className="absolute inset-0 text-2xl md:text-3xl font-['Great_Vibes'] text-transparent bg-clip-text bg-gradient-to-t from-transparent via-white/40 to-white/60 leading-tight pointer-events-none py-1"
                        aria-hidden="true"
                    >
                        {guestName}
                    </div>
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
                
                {/* 3D Text Element */}
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
                    {/* Gradient Overlay - Hidden in Download */}
                    <div 
                        data-hide-download
                        className="absolute inset-0 text-4xl md:text-6xl font-['Cinzel'] font-black text-transparent bg-clip-text bg-gradient-to-t from-amber-600/20 to-white/50 leading-none tracking-wide pointer-events-none py-2"
                        aria-hidden="true"
                    >
                        Baby Boy
                    </div>
                </motion.div>
                
                {/* Suggestion Call to Action - HIDDEN IN DOWNLOAD */}
                <div className="my-3 relative z-50" data-hide-download>
                    <motion.button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenSuggestions();
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                            scale: showDetails ? [0, 1.1, 1] : 0,
                            opacity: showDetails ? 1 : 0,
                            boxShadow: [
                                "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                                "0 4px 6px -1px rgba(245, 158, 11, 0.3)",
                                "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                            ]
                        }}
                        transition={{
                            delay: 2.5, 
                            duration: 0.6,
                            boxShadow: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-white border border-amber-200 shadow-sm transition-all active:scale-95 cursor-pointer z-50 pointer-events-auto"
                        aria-label="Guess the baby's name"
                    >
                        <Lightbulb size={14} className="text-amber-500 group-hover:fill-amber-500 transition-all duration-500" />
                        <span className="text-xs font-bold text-amber-800">Guess the Name?</span>
                    </motion.button>
                </div>

                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showDetails ? 1 : 0 }}
                    transition={{ delay: 1 }}
                    className="text-[10px] text-gray-400"
                >
                    (Son of Mr. & Mrs. Dabhade)
                </motion.p>
            </div>

            {/* Animated Details Section */}
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
                        <p className="text-xs md:text-sm font-semibold text-slate-700">Sun, Feb 14th, 2026</p>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center gap-3 text-left">
                    <div className="p-1.5 md:p-2 bg-amber-100 rounded-full text-amber-700 shrink-0">
                        <Clock size={14} className="md:w-[18px] md:h-[18px]" />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Time</p>
                        <p className="text-xs md:text-sm font-semibold text-slate-700">5:30 PM Onwards</p>
                    </div>
                </motion.div>
                
                {/* Clickable Map Location */}
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
                    {/* Tooltip hint - Hidden via element hiding in clone, but adding attribute to be safe if parent isn't hidden */}
                    <span 
                        data-hide-download
                        className="absolute right-2 top-0 text-[9px] text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity font-bold bg-amber-100/80 px-1.5 py-0.5 rounded-full backdrop-blur-sm pointer-events-none transform -translate-y-1/2 shadow-sm"
                    >
                        View Map
                    </span>
                </motion.div>

            </motion.div>

            {/* Bottom Buttons - HIDDEN IN DOWNLOAD */}
            <motion.div 
                data-hide-download
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

                {/* Email Button */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowEmailModal(true);
                    }}
                    className="flex-1 bg-amber-500 text-white border border-amber-600 px-2 py-2 rounded-lg text-[10px] md:text-xs font-bold shadow-sm active:scale-95 transition-transform flex items-center justify-center gap-1 hover:bg-amber-600 cursor-pointer pointer-events-auto"
                    aria-label="Email Invitation"
                >
                    <Mail size={12} /> Email
                </button>
                
                {/* Download Button */}
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
        </div>
        </div>
        
        <AnimatePresence>
            {showEmailModal && (
                <EmailModal 
                    onClose={() => setShowEmailModal(false)}
                    onSend={handleSendEmail}
                    isSending={isSendingEmail}
                />
            )}
        </AnimatePresence>
    </>
  );
};
