import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';

interface EmailModalProps {
  onClose: () => void;
  onSend: (email: string) => Promise<void>;
  isSending: boolean;
}

export const EmailModal: React.FC<EmailModalProps> = ({ onClose, onSend, isSending }) => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      await onSend(email);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={isSending ? undefined : onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#fffcf5] rounded-2xl w-full max-w-sm overflow-hidden relative shadow-2xl border border-amber-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-4 flex justify-between items-center border-b border-amber-300">
           <h3 className="font-['Cinzel'] font-bold text-amber-900 flex items-center gap-2">
             <Mail size={18} /> Email Invitation
           </h3>
           {!isSuccess && !isSending && (
             <button 
               onClick={onClose}
               className="p-1.5 bg-white/50 rounded-full hover:bg-white transition-colors text-amber-900"
             >
               <X size={16} />
             </button>
           )}
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-4 text-center space-y-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <CheckCircle2 size={48} className="text-green-500" />
              </motion.div>
              <h4 className="text-lg font-bold text-gray-800">Sent Successfully!</h4>
              <p className="text-xs text-gray-500">Please check your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-gray-500 text-center mb-2">
                We will generate a digital copy of this card and send it to you.
              </p>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full p-3 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none text-sm transition-all"
                  required
                  disabled={isSending}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={isSending || !email}
                className="w-full bg-slate-800 text-amber-100 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Generating & Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Invitation
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
