import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Calendar, Clock, MapPin, Image as ImageIcon, ExternalLink, Download, Loader2, ChevronsDown, CalendarPlus, Flower2, Globe, Heart } from 'lucide-react';

interface InvitationCardProps {
  guestName: string;
  onOpenGallery: () => void;
  onOpenMap?: () => void;
  showDetails?: boolean;
  onBlessing?: () => void; 
}

// Custom Palna (Cradle) Icon Component
const PalnaIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 text-amber-500 fill-current drop-shadow-sm">
    <path d="M10,30 Q50,60 90,30" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M20,30 L20,70 Q50,90 80,70 L80,30" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M20,45 Q50,65 80,45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
    <circle cx="50" cy="55" r="5" fill="currentColor" />
  </svg>
);

interface FlyingHeart {
  id: number;
  x: number;
  color: string;
  scale: number;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ guestName, onOpenGallery, onOpenMap, showDetails = true, onBlessing }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMarathi, setIsMarathi] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hearts, setHearts] = useState<FlyingHeart[]>([]);

  // Translations
  const t = {
    host: isMarathi ? "दाभाडे व शिंपी परिवार" : "The Dabhade & Shimpi Family",
    invites: isMarathi ? "आपणास सस्नेह निमंत्रित करीत आहेत" : "Cordially invites",
    ceremony: isMarathi ? "च्या नामकरण सोहळ्यासाठी" : "To the Naamkaran Ceremony of",
    babyTitle: isMarathi ? "चि. बाळाचे" : "Baby Boy",
    parents: isMarathi ? "(श्री. व सौ. दाभाडे यांचा सुपुत्र)" : "(Son of Mr. & Mrs. Dabhade)",
    dateLabel: isMarathi ? "दिनांक" : "Date",
    dateValue: isMarathi ? "रविवार, १५ फेब्रुवारी २०२६" : "Sun, Feb 15th, 2026",
    timeLabel: isMarathi ? "वेळ" : "Time",
    timeValue: isMarathi ? "दुपारी १२:३० वाजता" : "12:30 PM Onwards",
    venueLabel: isMarathi ? "स्थळ" : "Venue",
    venueValue: isMarathi ? "सुखसुंदर भवन, प्लॉट नं. ७, वृंदावन कॉलनी, साई बाबा स्कूल जवळ, नागपूर" : "SukhSundar Bhavan, Plot No. 7, Vrundavan Colony, Near Sai Baba School, Nagpur",
    scroll: isMarathi ? "खाली पहा" : "Scroll Down",
    photos: isMarathi ? "फोटो" : "Photos",
    download: isMarathi ? "डाउनलोड" : "Download",
    map: isMarathi ? "नकाशा पहा" : "View Map",
    bless: isMarathi ? "आशीर्वाद" : "Bless",
    addCal: isMarathi ? "जतन करा" : "Add"
  };

  const wishes = [
    "Best wishes from the Patil Family! 🌸",
    "Blessings to the little prince! - Sharma Family ✨",
    "Lots of love to Baby Dabhade ❤️",
    "Congratulations to the proud parents! 🎉",
    "May God bless the little one with health and happiness 🙏",
    "Can't wait to see the baby! - Anjali & Rahul"
  ];

  useEffect(() => {
    const targetDate = new Date('2026-02-15T12:30:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) clearInterval(interval);
      else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addToCalendarUrl = () => {
    const title = encodeURIComponent("Naamkaran Ceremony - Baby Boy Dabhade");
    const details = encodeURIComponent("Cordially invited to the Naamkaran Ceremony of Baby Boy Dabhade.");
    const location = encodeURIComponent("SukhSundar Bhavan, Plot No. 7, Vrundavan Colony, Near Sai Baba School, Nagpur");
    const startDate = "20260215T070000Z"; 
    const endDate = "20260215T100000Z"; 
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startDate}/${endDate}`;
  };

  const containerVariants: Variants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2, delayChildren: 2.2 } } };
  const itemVariants: Variants = { hidden: { opacity: 0, y: 10, x: -5 }, visible: { opacity: 1, y: 0, x: 0, transition: { type: "spring", stiffness: 100, damping: 12 } } };
  const babyTitleVariants: Variants = { hidden: { scale: 0.8, rotateX: 40, opacity: 0, y: 20 }, visible: { scale: 1, rotateX: 0, opacity: 1, y: 0, transition: { delay: 0.5, duration: 1.0, type: "spring", bounce: 0.5 } } };
  const guestNameVariants: Variants = { hidden: { opacity: 0, scale: 0.6, filter: "blur(8px)" }, visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { delay: 1.6, duration: 0.8, type: "spring", stiffness: 100, damping: 10 } } };
  const fadeVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1, delay: 0.2 } } };

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

  const handleBlessing = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBlessing) onBlessing();
  };

  // HEART REACTION LOGIC
  const triggerHeart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newHeart: FlyingHeart = {
      id: Date.now(),
      x: Math.random() * 40 - 20, // Random X scatter
      color: ['#ef4444', '#ec4899', '#f43f5e', '#e11d48'][Math.floor(Math.random() * 4)], // Red/Pink variants
      scale: 0.8 + Math.random() * 0.5 // Random size
    };
    setHearts(prev => [...prev, newHeart]);
    
    // Auto remove heart after animation
    setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 2000);
  };

  return (
    <div className="w-full h-full bg-[#fffcf5] text-slate-800 overflow-y-auto custom-scrollbar relative flex flex-col">
        
        {/* INNER WRAPPER */}
        <div className="relative flex-grow flex flex-col w-full max-w-[90%] mx-auto pb-12 pt-16">

            {/* LANGUAGE BUTTON */}
            <div className="w-full flex justify-end mb-4 px-1 relative z-50">
                <button 
                    onClick={() => setIsMarathi(!isMarathi)}
                    className="flex items-center gap-2 bg-[#fffcf5] text-amber-900 border border-amber-900/10 px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm transition-all active:scale-95 hover:bg-amber-50"
                >
                    <Globe size={12} className="text-amber-700" /> 
                    <span className="tracking-wide">{isMarathi ? "Switch to English" : "मराठी मध्ये वाचा"}</span>
                </button>
            </div>

            {/* CONTENT */}
            <motion.div className="space-y-1 text-center" initial="hidden" animate={showDetails ? "visible" : "hidden"}>
                <motion.h3 variants={fadeVariants} className={`text-amber-600 tracking-[0.2em] uppercase font-bold ${isMarathi ? 'text-xs font-serif' : 'text-sm md:text-base'}`}>
                    {t.host}
                </motion.h3>
                <motion.div variants={fadeVariants} className="w-12 h-0.5 bg-amber-300 mx-auto"></motion.div>
                <motion.p variants={fadeVariants} className={`italic text-gray-500 ${isMarathi ? 'text-xs font-serif' : 'text-xs md:text-sm'}`}>{t.invites}</motion.p>
                
                <motion.div 
                    variants={guestNameVariants} 
                    className="relative py-1 perspective-[500px] z-20 cursor-pointer"
                    whileHover={{ scale: 1.1, rotateX: 5, rotateY: 5 }}
                >
                    <h2 className="text-2xl md:text-3xl font-['Great_Vibes'] text-amber-600 leading-tight" style={{ textShadow: `0 1px 0 #d97706, 0 2px 0 #b45309` }}>
                        {guestName}
                    </h2>
                </motion.div>
                <motion.span variants={fadeVariants} className="text-xs md:text-sm font-serif text-gray-500 block">- with Family -</motion.span>
            </motion.div>

            <div className="py-2 md:py-4 flex flex-col items-center text-center">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: showDetails ? 1 : 0 }} transition={{ delay: 0.4 }}
                    className={`text-gray-500 mb-2 uppercase tracking-widest ${isMarathi ? 'text-[10px] font-bold font-serif' : 'text-[10px] md:text-xs'}`}>
                    {t.ceremony}
                </motion.p>

                {/* Animated Palna Icon */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: showDetails ? 1 : 0, scale: showDetails ? 1 : 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <motion.div
                        animate={{ rotate: [-3, 3, -3] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    >
                        <PalnaIcon />
                    </motion.div>
                </motion.div>
                
                <motion.div 
                    className="relative perspective-[500px] py-1 cursor-pointer" 
                    variants={babyTitleVariants} 
                    initial="hidden" 
                    animate={showDetails ? "visible" : "hidden"}
                    whileHover={{ scale: 1.1, rotateX: 10, rotateY: -10 }}
                >
                    <h1 className={`font-black text-amber-500 leading-none tracking-wide ${isMarathi ? 'text-3xl md:text-5xl font-serif' : "text-4xl md:text-6xl font-['Cinzel']"}`}
                        style={{ textShadow: `0 1px 0 #b45309, 0 3px 5px rgba(0,0,0,0.2)`, WebkitTextStroke: '1px #b45309' }}>
                        {t.babyTitle}
                    </h1>
                </motion.div>
                
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: showDetails ? 1 : 0 }} transition={{ delay: 1 }}
                    className={`text-gray-400 mt-2 ${isMarathi ? 'text-[10px] font-serif' : 'text-[10px]'}`}>
                    {t.parents}
                </motion.p>
            </div>

            {/* COUNTDOWN */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: showDetails ? 1 : 0, scale: showDetails ? 1 : 0.9 }}
                transition={{ delay: 1.5 }}
                className="flex justify-center gap-3 md:gap-4 mb-4"
            >
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="flex flex-col items-center">
                        <div className="bg-amber-100 text-amber-700 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm border border-amber-200">
                            {value}
                        </div>
                        <span className="text-[9px] uppercase mt-1 text-amber-800/60 font-bold">{unit}</span>
                    </div>
                ))}
            </motion.div>

            {/* DETAILS CARD */}
            <motion.div className="bg-white/60 p-3 md:p-4 rounded-xl border border-amber-100 shadow-sm space-y-3 mb-2"
                variants={containerVariants} initial="hidden" animate={showDetails ? "visible" : "hidden"}>
                
                <motion.div variants={itemVariants} className="flex items-center gap-3 text-left border-b border-amber-100/50 pb-2 last:border-0 last:pb-0">
                    <div className="p-1.5 md:p-2 bg-amber-100 rounded-full text-amber-700 shrink-0"><Calendar size={14} /></div>
                    <div className="flex-1">
                        <p className={`text-[10px] text-gray-500 uppercase font-bold ${isMarathi ? 'font-serif' : ''}`}>{t.dateLabel}</p>
                        <div className="flex justify-between items-center">
                             <p className={`text-xs md:text-sm font-semibold text-slate-700 ${isMarathi ? 'font-serif' : ''}`}>{t.dateValue}</p>
                             <a href={addToCalendarUrl()} target="_blank" rel="noopener noreferrer" 
                                className="text-[9px] flex items-center gap-1 bg-amber-200/50 hover:bg-amber-200 text-amber-800 px-2 py-1 rounded-md transition-colors"
                                title="Add to Google Calendar">
                                <CalendarPlus size={10} /> {t.addCal}
                             </a>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center gap-3 text-left border-b border-amber-100/50 pb-2 last:border-0 last:pb-0">
                    <div className="p-1.5 md:p-2 bg-amber-100 rounded-full text-amber-700 shrink-0"><Clock size={14} /></div>
                    <div>
                        <p className={`text-[10px] text-gray-500 uppercase font-bold ${isMarathi ? 'font-serif' : ''}`}>{t.timeLabel}</p>
                        <p className={`text-xs md:text-sm font-semibold text-slate-700 ${isMarathi ? 'font-serif' : ''}`}>{t.timeValue}</p>
                    </div>
                </motion.div>
                
                <motion.div 
                    variants={itemVariants} 
                    className="flex items-center gap-3 text-left cursor-pointer hover:bg-amber-50 p-1 -mx-1 rounded-lg transition-colors group relative"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenMap) onOpenMap();
                    }}
                >
                    <div className="p-1.5 md:p-2 bg-amber-100 rounded-full text-amber-700 shrink-0"><MapPin size={14} /></div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <p className={`text-[10px] text-gray-500 uppercase font-bold group-hover:text-amber-700 ${isMarathi ? 'font-serif' : ''}`}>{t.venueLabel}</p>
                            <ExternalLink size={10} className="text-amber-400 opacity-0 group-hover:opacity-100" />
                        </div>
                        <p className={`text-xs md:text-sm font-semibold text-slate-700 leading-tight ${isMarathi ? 'font-serif' : ''}`}>{t.venueValue}</p>
                    </div>
                    <span className="absolute right-2 top-0 text-[9px] text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity font-bold bg-amber-100/80 px-1.5 py-0.5 rounded-full backdrop-blur-sm pointer-events-none transform -translate-y-1/2 shadow-sm">
                        {t.map}
                    </span>
                </motion.div>
            </motion.div>

            {/* BUTTONS */}
            <motion.div className="mt-auto flex gap-2 justify-center pb-2 relative z-50 items-center pt-4"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 10 }} transition={{ delay: 2.8 }}>
                
                <button onClick={(e) => { e.stopPropagation(); onOpenGallery(); }}
                    className="flex-1 bg-amber-100 text-amber-800 border border-amber-200 px-2 py-2 rounded-lg text-[10px] md:text-xs font-bold shadow-sm flex items-center justify-center gap-1 hover:bg-amber-200">
                    <ImageIcon size={12} /> {t.photos}
                </button>

                {/* ORIGINAL BLESSING BUTTON (Hidden/Replaced by Heart logic or keep both?) 
                    Keeping it as requested for "Shower Blessings" feature.
                */}
                <button onClick={handleBlessing}
                    className="w-9 h-9 flex items-center justify-center bg-rose-100 text-rose-600 border border-rose-200 rounded-full shadow-sm hover:scale-110 active:scale-95 transition-transform"
                    title="Shower Blessings">
                    <Flower2 size={16} />
                </button>

                <button onClick={handleDownload} disabled={isDownloading}
                    className="flex-1 bg-slate-800 text-amber-100 px-2 py-2 rounded-lg text-[10px] md:text-xs font-bold shadow-lg flex items-center justify-center gap-1 hover:bg-slate-700">
                    {isDownloading ? <><Loader2 size={12} className="animate-spin" /> {isMarathi ? ".." : "..."}</> : <><Download size={12} /> {t.download}</>}
                </button>
            </motion.div>

            {/* SCROLL INDICATOR */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 5, 0] }} transition={{ delay: 3, duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center justify-center text-amber-700/60 pb-2 z-0 pointer-events-none mt-2" data-hide-download>
                <span className="text-[9px] uppercase tracking-widest font-bold bg-amber-50/80 px-3 py-0.5 rounded-full backdrop-blur-[2px] shadow-sm mb-0.5">{t.scroll}</span>
                <ChevronsDown size={16} />
            </motion.div>

             {/* WISHES WALL (MARQUEE) */}
             <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: showDetails ? 1 : 0 }} 
                transition={{ delay: 3.5 }}
                className="mt-6 border-t border-amber-100 pt-2 relative overflow-hidden"
             >
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#fffcf5] to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#fffcf5] to-transparent z-10"></div>
                
                <div className="flex whitespace-nowrap overflow-hidden">
                    <motion.div 
                        className="flex gap-8 text-[10px] text-amber-700/70 italic font-serif"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    >
                        {[...wishes, ...wishes].map((wish, i) => (
                            <span key={i} className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-amber-300 rounded-full"></span>
                                {wish}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

        </div>

        {/* ---------------------------------------------------- */}
        {/* FLOATING HEART REACTION BUTTON & ANIMATION CONTAINER */}
        {/* ---------------------------------------------------- */}
        
        {/* The Button */}
        <div className="absolute bottom-20 right-4 z-[100]">
             <button 
                onClick={triggerHeart}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-90 transition-transform border-2 border-white"
             >
                <Heart size={20} fill="currentColor" />
             </button>
        </div>

        {/* The Hearts Container (Pointer events none so clicks pass through) */}
        <div className="absolute bottom-24 right-4 w-12 h-[300px] pointer-events-none z-[90] overflow-visible">
            <AnimatePresence>
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        initial={{ opacity: 1, y: 0, x: 0, scale: 0 }}
                        animate={{ 
                            opacity: 0, 
                            y: -250, 
                            x: heart.x, 
                            scale: heart.scale 
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-rose-500 drop-shadow-sm"
                        style={{ color: heart.color }}
                    >
                        <Heart fill="currentColor" size={24} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

    </div>
  );
};
