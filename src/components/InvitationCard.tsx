import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Calendar, Clock, MapPin, Image as ImageIcon, ExternalLink, Download, Loader2, ChevronsDown, CalendarPlus, PartyPopper, Globe, Quote } from 'lucide-react';

interface InvitationCardProps {
  guestName: string;
  onOpenGallery: () => void;
  onOpenMap?: () => void;
  showDetails?: boolean;
  onBlessing?: () => void; 
}

const DhammaChakraIcon = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10 mx-auto text-blue-800 fill-current drop-shadow-sm mb-1">
    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" />
    <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
    {[...Array(8)].map((_, i) => (
      <line key={i} x1="50" y1="50" x2={50 + 45 * Math.cos((i * 45) * (Math.PI / 180))} y2={50 + 45 * Math.sin((i * 45) * (Math.PI / 180))} stroke="currentColor" strokeWidth="3" />
    ))}
    <circle cx="50" cy="50" r="4" fill="currentColor" />
  </svg>
);

const PanchsheelToran = () => {
  const colors = ['#0033A0', '#FFD700', '#DC2626', '#FFFFFF', '#EA580C']; 
  return (
    <div className="absolute top-0 left-0 w-full flex justify-center mt-4 z-0 overflow-hidden opacity-90 pointer-events-none">
       <div className="absolute top-0 w-full h-[3px] bg-amber-700"></div>
       <div className="flex gap-1">
         {[...Array(15)].map((_, i) => (
           <div key={i} className="w-6 h-8 md:w-8 md:h-10 rounded-b-lg shadow-md transform origin-top animate-pulse"
             style={{ backgroundColor: colors[i % 5], animationDuration: `${3 + Math.random()}s` }}></div>
         ))}
       </div>
    </div>
  );
};

const BUDDHA_QUOTES = [
    "Peace comes from within. Do not seek it without.",
    "Three things cannot be long hidden: the sun, the moon, and the truth.",
    "Health is the greatest gift, contentment the greatest wealth.",
    "No one saves us but ourselves. We ourselves must walk the path.",
    "Purity or impurity depends on oneself, no one can purify another."
];

export const InvitationCard: React.FC<InvitationCardProps> = ({ guestName, onOpenGallery, onOpenMap, showDetails = true, onBlessing }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMarathi, setIsMarathi] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasScrolled, setHasScrolled] = useState(false);
  const [quote, setQuote] = useState("");

  const t = {
    greeting: isMarathi ? "नमो बुद्धाय" : "Namo Buddhay",
    host: isMarathi ? "दाभाडे व शिंपी परिवार" : "The Dabhade & Shimpi Family",
    invites: isMarathi ? "आपणास सस्नेह निमंत्रित करीत आहेत" : "Cordially invites",
    ceremony: isMarathi ? "च्या नामकरण सोहळ्यासाठी" : "To the Naamkaran Ceremony of",
    babyTitle: isMarathi ? "चि. बाळाचे" : "Baby Boy",
    parents: isMarathi ? "(श्री. व सौ. दाभाडे यांचा सुपुत्र)" : "(Son of Mr. & Mrs. Dabhade)",
    dateLabel: isMarathi ? "दिनांक" : "Date",
    dateValue: isMarathi ? "रविवार, ०८ फेब्रुवारी २०२६" : "Sun, Feb 8th, 2026",
    timeLabel: isMarathi ? "वेळ" : "Time",
    timeValue: isMarathi ? "दुपारी १२:३० वाजता" : "12:30 PM Onwards",
    venueLabel: isMarathi ? "स्थळ" : "Venue",
    venueValue: isMarathi ? "सुखसुंदर भवन, प्लॉट नं. ७, वृंदावन कॉलनी, साई बाबा स्कूल जवळ, नागपूर" : "SukhSundar Bhavan, Plot No. 7, Vrundavan Colony, Near Sai Baba School, Nagpur",
    scroll: isMarathi ? "खाली पहा" : "Scroll Down",
    photos: isMarathi ? "फोटो" : "Photos",
    download: isMarathi ? "डाउनलोड" : "Download",
    map: isMarathi ? "नकाशा पहा" : "View Map",
    bless: isMarathi ? "शुभेच्छा वर्षाव" : "Shower Love",
    addCal: isMarathi ? "जतन करा" : "Add"
  };

  useEffect(() => {
    setQuote(BUDDHA_QUOTES[Math.floor(Math.random() * BUDDHA_QUOTES.length)]);

    const targetDate = new Date('2026-02-08T12:30:00').getTime();
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
    const location = encodeURIComponent("SukhSundar Bhavan, Nagpur");
    const startDate = "20260208T070000Z"; 
    const endDate = "20260208T100000Z"; 
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&location=${location}&dates=${startDate}/${endDate}`;
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 10) {
        setHasScrolled(true);
    } else {
        setHasScrolled(false);
    }
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

  return (
    <div 
        onScroll={handleScroll}
        className="w-full h-full bg-[#fffcf5] text-slate-800 overflow-y-auto custom-scrollbar relative flex flex-col border-[8px] border-double border-amber-200/50"
    >
        
        <div className="relative flex-grow flex flex-col w-full max-w-[90%] mx-auto pb-8 pt-20">

            <PanchsheelToran />

            {/* Language Toggle */}
            <div className="w-full flex justify-end mb-2 px-1 relative">
                <button 
                    onClick={() => setIsMarathi(!isMarathi)}
                    className="flex items-center gap-2 bg-white/80 backdrop-blur-sm text-blue-900 border border-amber-300 px-3 py-1.5 rounded-full text-[10px] font-bold shadow-md transition-all active:scale-95 hover:bg-amber-50"
                >
                    <Globe size={12} className="text-amber-600" /> 
                    <span className="tracking-wide">{isMarathi ? "Switch to English" : "मराठी मध्ये वाचा"}</span>
                </button>
            </div>

            <motion.div className="space-y-1 text-center" initial="hidden" animate={showDetails ? "visible" : "hidden"}>
                <motion.div variants={fadeVariants} className="flex flex-col items-center mb-2">
                    <DhammaChakraIcon />
                    <span className="text-blue-900 font-bold uppercase tracking-widest text-xs md:text-sm drop-shadow-sm">{t.greeting}</span>
                </motion.div>

                <motion.h3 variants={fadeVariants} className={`text-amber-700 tracking-[0.2em] uppercase font-bold ${isMarathi ? 'text-xs font-serif' : 'text-sm md:text-base'}`}>
                    {t.host}
                </motion.h3>
                <motion.div variants={fadeVariants} className="w-12 h-0.5 bg-blue-800 mx-auto opacity-50"></motion.div>
                <motion.p variants={fadeVariants} className={`italic text-slate-500 ${isMarathi ? 'text-xs font-serif' : 'text-xs md:text-sm'}`}>{t.invites}</motion.p>
                
                <motion.div 
                    variants={guestNameVariants} 
                    className="relative py-1 perspective-[500px] z-20 cursor-pointer"
                    whileHover={{ scale: 1.1, rotateX: 5, rotateY: 5 }}
                >
                    <h2 className="text-2xl md:text-3xl font-['Great_Vibes'] text-blue-800 leading-tight" style={{ textShadow: `0 1px 0 #fbbf24` }}>
                        {guestName}
                    </h2>
                </motion.div>
                <motion.span variants={fadeVariants} className="text-xs md:text-sm font-serif text-slate-500 block">- with Family -</motion.span>
            </motion.div>

            <div className="py-2 md:py-4 flex flex-col items-center text-center">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: showDetails ? 1 : 0 }} transition={{ delay: 0.4 }}
                    className={`text-slate-500 mb-2 uppercase tracking-widest ${isMarathi ? 'text-[10px] font-bold font-serif' : 'text-[10px] md:text-xs'}`}>
                    {t.ceremony}
                </motion.p>
                
                {/* BABY TITLE */}
                <motion.div 
                    className="relative perspective-[500px] py-1 cursor-pointer" 
                    variants={babyTitleVariants} 
                    initial="hidden" 
                    animate={showDetails ? "visible" : "hidden"}
                    whileHover={{ scale: 1.1, rotateX: 10, rotateY: -10 }}
                >
                    <h1 
                        className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800 tracking-wide 
                        ${isMarathi 
                            ? 'text-3xl md:text-5xl font-serif leading-relaxed py-2'
                            : "text-4xl md:text-6xl font-['Cinzel'] leading-none"
                        }`}
                        style={{ filter: 'drop-shadow(0 2px 0px rgba(251, 191, 36, 0.4))' }}>
                        {t.babyTitle}
                    </h1>
                </motion.div>
                
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: showDetails ? 1 : 0 }} transition={{ delay: 1 }}
                    className={`text-slate-400 mt-2 ${isMarathi ? 'text-[10px] font-serif' : 'text-[10px]'}`}>
                    {t.parents}
                </motion.p>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: showDetails ? 1 : 0, scale: showDetails ? 1 : 0.9 }}
                transition={{ delay: 1.5 }}
                className="flex justify-center gap-3 md:gap-4 mb-4"
            >
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="flex flex-col items-center">
                        <div className="bg-gradient-to-b from-amber-50 to-amber-100 text-blue-900 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-bold text-lg shadow-[0_3px_0_#d97706] border border-amber-200">
                            {value}
                        </div>
                        <span className="text-[9px] uppercase mt-2 text-slate-500 font-bold">{unit}</span>
                    </div>
                ))}
            </motion.div>

            <motion.div className="bg-white/90 p-3 md:p-4 rounded-xl border border-amber-200 shadow-md space-y-3 mb-2"
                variants={containerVariants} initial="hidden" animate={showDetails ? "visible" : "hidden"}>
                
                <motion.div variants={itemVariants} className="flex items-center gap-3 text-left border-b border-amber-100 pb-2 last:border-0 last:pb-0">
                    <div className="p-1.5 md:p-2 bg-blue-100 rounded-full text-blue-700 shrink-0"><Calendar size={14} /></div>
                    <div className="flex-1">
                        <p className={`text-[10px] text-slate-500 uppercase font-bold ${isMarathi ? 'font-serif' : ''}`}>{t.dateLabel}</p>
                        <div className="flex justify-between items-center">
                             <p className={`text-xs md:text-sm font-semibold text-slate-800 ${isMarathi ? 'font-serif' : ''}`}>{t.dateValue}</p>
                             <a href={addToCalendarUrl()} target="_blank" rel="noopener noreferrer" 
                                className="text-[9px] flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-900 px-2 py-1 rounded-md transition-colors shadow-sm"
                                title="Add to Google Calendar">
                                <CalendarPlus size={10} /> {t.addCal}
                             </a>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center gap-3 text-left border-b border-amber-100 pb-2 last:border-0 last:pb-0">
                    <div className="p-1.5 md:p-2 bg-blue-100 rounded-full text-blue-700 shrink-0"><Clock size={14} /></div>
                    <div>
                        <p className={`text-[10px] text-slate-500 uppercase font-bold ${isMarathi ? 'font-serif' : ''}`}>{t.timeLabel}</p>
                        <p className={`text-xs md:text-sm font-semibold text-slate-800 ${isMarathi ? 'font-serif' : ''}`}>{t.timeValue}</p>
                    </div>
                </motion.div>
                
                <motion.div 
                    variants={itemVariants} 
                    className="flex items-center justify-between cursor-pointer p-2 -mx-1.5 rounded-lg transition-colors bg-white border border-transparent hover:border-blue-200 hover:shadow-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenMap) onOpenMap();
                    }}
                >
                    <div className="flex items-center gap-3 flex-1">
                        <div className="p-1.5 md:p-2 bg-blue-100 rounded-full text-blue-700 shrink-0"><MapPin size={14} /></div>
                        <div className="flex-1">
                            <p className={`text-[10px] text-slate-500 uppercase font-bold ${isMarathi ? 'font-serif' : ''}`}>{t.venueLabel}</p>
                            <p className={`text-xs md:text-sm font-semibold text-slate-800 leading-tight ${isMarathi ? 'font-serif' : ''}`}>{t.venueValue}</p>
                        </div>
                    </div>
                    
                    <div className="ml-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1.5 rounded shadow-sm flex items-center gap-1 hover:bg-blue-700">
                        {t.map} <ExternalLink size={8} />
                    </div>
                </motion.div>
            </motion.div>

            {/* DAILY QUOTE */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: showDetails ? 1 : 0 }}
                transition={{ delay: 2.5 }}
                className="mt-4 mb-4 px-4 text-center"
            >
                <div className="flex justify-center mb-1 text-amber-300 opacity-60">
                    <Quote size={16} className="fill-current" />
                </div>
                <p className="text-[10px] md:text-xs text-slate-500 font-serif italic leading-relaxed">
                    "{quote}"
                </p>
                <div className="w-8 h-[1px] bg-amber-200 mx-auto mt-2"></div>
            </motion.div>

            <motion.div className="mt-auto flex gap-2 justify-center pb-2 relative z-50 items-center pt-2"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 10 }} transition={{ delay: 2.8 }}>
                
                <button onClick={(e) => { e.stopPropagation(); onOpenGallery(); }}
                    className="flex-1 bg-amber-50 text-amber-900 border border-amber-300 px-2 py-2 rounded-lg text-[10px] md:text-xs font-bold shadow-sm flex items-center justify-center gap-1 hover:bg-amber-100 active:translate-y-0.5">
                    <ImageIcon size={12} /> {t.photos}
                </button>

                <button onClick={handleBlessing}
                    className="w-10 h-10 flex items-center justify-center bg-amber-100 text-amber-600 border border-amber-300 rounded-full shadow-md hover:scale-110 active:scale-95 transition-transform"
                    title={t.bless}>
                    <PartyPopper size={18} />
                </button>

                <button onClick={handleDownload} disabled={isDownloading}
                    className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 text-amber-100 px-2 py-2 rounded-lg text-[10px] md:text-xs font-bold shadow-md flex items-center justify-center gap-1 hover:to-slate-800 active:translate-y-0.5">
                    {isDownloading ? <><Loader2 size={12} className="animate-spin" /> {isMarathi ? ".." : "..."}</> : <><Download size={12} /> {t.download}</>}
                </button>
            </motion.div>

        </div>

        <AnimatePresence>
            {!hasScrolled && showDetails && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    // FIXED: Changed bottom-12 to bottom-32 to clear the roller
                    className="fixed bottom-32 left-0 right-0 z-50 flex flex-col items-center justify-center pointer-events-none"
                >
                    <div className="bg-amber-900/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg border border-amber-500/30 flex flex-col items-center">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-amber-100 mb-0.5">{t.scroll}</span>
                        <ChevronsDown size={16} className="text-amber-200 animate-bounce" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

    </div>
  );
};
