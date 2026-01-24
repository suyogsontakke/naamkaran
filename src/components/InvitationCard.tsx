import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Calendar, Clock, MapPin, Image as ImageIcon, ExternalLink, Download, Loader2, ChevronsDown, CalendarPlus, Flower2, Globe } from 'lucide-react';

interface InvitationCardProps {
  guestName: string;
  onOpenGallery: () => void;
  onOpenMap?: () => void;
  showDetails?: boolean;
  onBlessing?: () => void; 
}

const DhammaChakraIcon = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10 mx-auto text-indigo-900 fill-current drop-shadow-sm mb-2 opacity-80">
    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
    <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
    {[...Array(8)].map((_, i) => (
      <line key={i} x1="50" y1="50" x2={50 + 45 * Math.cos((i * 45) * (Math.PI / 180))} y2={50 + 45 * Math.sin((i * 45) * (Math.PI / 180))} stroke="currentColor" strokeWidth="2" />
    ))}
  </svg>
);

const PanchsheelToran = () => {
  const colors = ['#0033A0', '#FFD700', '#DC2626', '#E5E7EB', '#EA580C']; 
  return (
    <div className="absolute top-0 left-0 w-full flex justify-center -mt-2 z-0 overflow-hidden opacity-80 pointer-events-none">
       <div className="absolute top-0 w-full h-[1px] bg-slate-900/10"></div>
       <div className="flex gap-2">
         {[...Array(15)].map((_, i) => (
           <div key={i} className="w-6 h-8 md:w-8 md:h-10 rounded-b-full shadow-sm" style={{ backgroundColor: colors[i % 5] }}></div>
         ))}
       </div>
    </div>
  );
};

export const InvitationCard: React.FC<InvitationCardProps> = ({ guestName, onOpenGallery, onOpenMap, showDetails = true, onBlessing }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMarathi, setIsMarathi] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const t = {
    greeting: isMarathi ? "नमो बुद्धाय" : "Namo Buddhay",
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
    const location = encodeURIComponent("SukhSundar Bhavan, Nagpur");
    const startDate = "20260215T070000Z"; 
    const endDate = "20260215T100000Z"; 
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&location=${location}&dates=${startDate}/${endDate}`;
  };

  const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.1 } } };
  const fadeVariants: Variants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

  return (
    // Updated Background to clean soft white for contrast with dark outside
    <div className="w-full h-full bg-[#fcfcfc] text-slate-800 overflow-y-auto custom-scrollbar relative flex flex-col font-['Cormorant_Garamond']">
        
        <div className="relative flex-grow flex flex-col w-full max-w-[90%] mx-auto pb-8 pt-16">
            <PanchsheelToran />

            {/* Language Toggle - Minimalist */}
            <div className="w-full flex justify-end mb-2 px-1 relative z-50">
                <button 
                    onClick={() => setIsMarathi(!isMarathi)}
                    className="flex items-center gap-2 bg-transparent text-slate-500 hover:text-indigo-900 border border-slate-200 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest transition-all hover:border-indigo-900 font-sans"
                >
                    <Globe size={10} /> 
                    <span>{isMarathi ? "EN" : "मराठी"}</span>
                </button>
            </div>

            <motion.div className="space-y-1 text-center" initial="hidden" animate={showDetails ? "visible" : "hidden"}>
                <motion.div variants={fadeVariants} className="flex flex-col items-center mb-4">
                    <DhammaChakraIcon />
                    <span className="text-indigo-950 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">{t.greeting}</span>
                </motion.div>

                {/* Aesthetic Serif Fonts */}
                <motion.h3 variants={fadeVariants} className="text-slate-600 tracking-[0.2em] uppercase text-xs md:text-sm font-semibold">
                    {t.host}
                </motion.h3>
                
                <motion.div 
                    variants={fadeVariants} 
                    className="relative py-2 z-20"
                >
                    <h2 className="text-4xl md:text-5xl font-['Pinyon_Script'] text-indigo-950 leading-none">
                        {guestName}
                    </h2>
                </motion.div>
                <motion.span variants={fadeVariants} className="text-sm italic text-slate-400 block">- with Family -</motion.span>
            </motion.div>

            <div className="py-6 flex flex-col items-center text-center">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: showDetails ? 1 : 0 }} transition={{ delay: 0.4 }}
                    className="text-slate-400 mb-2 uppercase tracking-[0.2em] text-[10px]">
                    {t.ceremony}
                </motion.p>
                
                {/* BABY BOY - Deep Indigo/Charcoal */}
                <motion.div 
                    className="relative py-2" 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: showDetails ? 1 : 0, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <h1 className={`font-['Cinzel'] font-bold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-900 to-slate-800 tracking-wide`}
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                        {t.babyTitle}
                    </h1>
                </motion.div>
                
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: showDetails ? 1 : 0 }} transition={{ delay: 1 }}
                    className="text-slate-400 mt-2 text-xs italic font-serif">
                    {t.parents}
                </motion.p>
            </div>

            {/* COUNTDOWN - Minimalist Outline Style */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: showDetails ? 1 : 0 }}
                transition={{ delay: 1.2 }}
                className="flex justify-center gap-4 mb-6"
            >
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="flex flex-col items-center">
                        <span className="text-2xl font-['Cinzel'] text-indigo-900">{value}</span>
                        <span className="text-[8px] uppercase tracking-widest text-slate-400">{unit}</span>
                    </div>
                ))}
            </motion.div>

            {/* DETAILS - Clean layout */}
            <motion.div className="border-t border-b border-slate-100 py-6 my-2 space-y-4"
                variants={containerVariants} initial="hidden" animate={showDetails ? "visible" : "hidden"}>
                
                <motion.div variants={fadeVariants} className="flex flex-col items-center gap-1">
                    <Calendar size={16} className="text-indigo-900 mb-1" />
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">{t.dateLabel}</p>
                    <p className="text-lg font-['Cinzel'] text-slate-800">{t.dateValue}</p>
                    <a href={addToCalendarUrl()} target="_blank" rel="noopener noreferrer" className="text-[9px] text-indigo-500 underline mt-1">Add to Calendar</a>
                </motion.div>

                <motion.div variants={fadeVariants} className="flex flex-col items-center gap-1">
                    <Clock size={16} className="text-indigo-900 mb-1" />
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">{t.timeLabel}</p>
                    <p className="text-lg font-['Cinzel'] text-slate-800">{t.timeValue}</p>
                </motion.div>
                
                <motion.div variants={fadeVariants} className="flex flex-col items-center gap-1 cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); if (onOpenMap) onOpenMap(); }}>
                    <MapPin size={16} className="text-indigo-900 mb-1" />
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">{t.venueLabel}</p>
                    <p className="text-base font-serif text-slate-700 w-3/4 mx-auto leading-relaxed">{t.venueValue}</p>
                    <span className="text-[9px] text-indigo-500 underline mt-1">{t.map}</span>
                </motion.div>
            </motion.div>

            {/* BUTTONS - Minimalist */}
            <motion.div className="mt-auto flex gap-3 justify-center pt-6"
                initial={{ opacity: 0 }} animate={{ opacity: showDetails ? 1 : 0 }} transition={{ delay: 2 }}>
                
                <button onClick={(e) => { e.stopPropagation(); onOpenGallery(); }}
                    className="flex-1 bg-slate-50 text-slate-700 border border-slate-200 px-4 py-3 text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors font-sans">
                    {t.photos}
                </button>

                <button onClick={() => setIsDownloading(true)} disabled={isDownloading}
                    className="flex-1 bg-indigo-950 text-white px-4 py-3 text-xs uppercase tracking-widest hover:bg-indigo-900 transition-colors font-sans">
                    {isDownloading ? "..." : t.download}
                </button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
                className="flex flex-col items-center justify-center text-slate-300 pb-2 mt-4 pointer-events-none">
                <ChevronsDown size={14} className="animate-bounce" />
            </motion.div>

        </div>
    </div>
  );
};
