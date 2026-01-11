
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ThumbsUp, Send, Sparkles, Lightbulb, Bot, Wand2, Plus, Loader2 } from 'lucide-react';
import { NameSuggestion } from '../types';
import { suggestionService } from '../services/suggestionService';
import { generateAiNames, AiNameResult } from '../services/aiService';

interface NameSuggestionModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export const NameSuggestionModal: React.FC<NameSuggestionModalProps> = ({ onClose, onSuccess }) => {
  const [suggestions, setSuggestions] = useState<NameSuggestion[]>([]);
  const [newName, setNewName] = useState('');
  const [meaning, setMeaning] = useState('');
  const [activeTab, setActiveTab] = useState<'vote' | 'suggest' | 'ai'>('vote');
  const [isLoadingData, setIsLoadingData] = useState(true);

  // AI State
  const [aiTheme, setAiTheme] = useState('Modern');
  const [aiResults, setAiResults] = useState<AiNameResult[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Load data from Firebase on mount
  const loadSuggestions = async () => {
    setIsLoadingData(true);
    const data = await suggestionService.getSuggestions();
    
    // Automatic seeding logic: If database is empty, fill it with some starters
    if (data.length === 0 || (data.length > 0 && data[0].id.startsWith('pre-'))) {
        // Just show what we have, the user can add more
        setSuggestions(data);
    } else {
        setSuggestions(data);
    }
    setIsLoadingData(false);
  };

  useEffect(() => {
    loadSuggestions();
  }, []);

  const handleVote = async (id: string) => {
    // 1. Immediate UI update (Optimistic) makes it feel fast
    setSuggestions(prev => prev.map(s => 
        s.id === id ? { ...s, votes: s.votes + 1 } : s
    ).sort((a, b) => b.votes - a.votes));

    // 2. Update the real database in the background
    await suggestionService.voteForName(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addName(newName, meaning);
  };

  const addName = async (nameToAdd: string, meaningToAdd: string) => {
    if (nameToAdd.trim()) {
      setIsLoadingData(true); // Show loading while saving to DB
      await suggestionService.addSuggestion(nameToAdd, meaningToAdd);
      
      setNewName('');
      setMeaning('');
      setActiveTab('vote'); 
      
      // Refresh list from DB to see the new item
      await loadSuggestions();
      
      if (onSuccess) onSuccess();
    }
  };

  const handleAiGenerate = async () => {
    setIsAiLoading(true);
    setAiResults([]);
    const results = await generateAiNames(aiTheme);
    setAiResults(results);
    setIsAiLoading(false);
  };

  const preSelected = suggestions.filter(s => s.isPreSelected);
  const community = suggestions.filter(s => !s.isPreSelected);

  const themes = ['Modern', 'Traditional', 'Sanskrit', 'Nature', 'Virtue'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50, rotateX: -10 }}
        animate={{ scale: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="bg-[#fffcf5] rounded-3xl w-full max-w-md max-h-[85vh] overflow-hidden relative shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-6 pt-8 pb-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={100} />
            </div>
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/50 rounded-full hover:bg-white transition-colors z-10"
            >
                <X size={20} className="text-amber-800" />
            </button>
            <h2 className="text-2xl font-['Cinzel'] text-amber-800 font-bold flex items-center gap-2">
                <Lightbulb className="fill-amber-500 text-amber-600" />
                Guess the Name
            </h2>
            <p className="text-amber-700/70 text-sm mt-1">Help the Dabhade family choose!</p>
        </div>

        {/* Tabs */}
        <div className="flex p-2 gap-2 bg-amber-50 border-b border-amber-100 overflow-x-auto no-scrollbar">
            <button 
                onClick={() => setActiveTab('vote')}
                className={`flex-1 py-2 px-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'vote' ? 'bg-amber-200 text-amber-900 shadow-sm' : 'text-gray-500 hover:bg-amber-100'}`}
            >
                Vote
            </button>
            <button 
                onClick={() => setActiveTab('suggest')}
                className={`flex-1 py-2 px-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'suggest' ? 'bg-amber-200 text-amber-900 shadow-sm' : 'text-gray-500 hover:bg-amber-100'}`}
            >
                Suggest
            </button>
            <button 
                onClick={() => setActiveTab('ai')}
                className={`flex-1 py-2 px-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center justify-center gap-1 ${activeTab === 'ai' ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-900 shadow-sm border border-indigo-200' : 'text-gray-500 hover:bg-purple-50'}`}
            >
                <Wand2 size={14} className={activeTab === 'ai' ? 'text-indigo-600' : ''} />
                Ask AI
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-white">
            {isLoadingData ? (
                <div className="flex items-center justify-center h-40">
                    <Loader2 className="animate-spin text-amber-500" />
                </div>
            ) : (
            <AnimatePresence mode="wait">
                {activeTab === 'vote' && (
                    <motion.div 
                        key="vote"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        {/* Top Contenders Section */}
                        {preSelected.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Top Contenders</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {preSelected.map((item) => (
                                    <div key={item.id} className="bg-gradient-to-r from-amber-50 to-white border border-amber-100 p-3 rounded-xl flex items-center justify-between shadow-sm group hover:shadow-md transition-all">
                                        <div className="min-w-0">
                                            <h4 className="text-md font-bold text-slate-800 font-['Cinzel'] truncate">{item.name}</h4>
                                            <p className="text-[10px] text-amber-600 italic truncate">{item.meaning}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleVote(item.id)}
                                            className="group/btn flex flex-col items-center gap-1 bg-white border border-amber-100 px-2 py-1.5 rounded-lg hover:bg-amber-100 transition-colors active:scale-95 shrink-0"
                                        >
                                            <ThumbsUp size={14} className="text-amber-500 transition-transform duration-300 group-hover/btn:scale-125 group-hover/btn:rotate-12" />
                                            <span className="text-[10px] font-bold text-amber-900">{item.votes}</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        )}

                        {/* Community Guesses */}
                        {community.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 mt-2">Community Ideas</h3>
                                <div className="space-y-2">
                                    {community.map((item) => (
                                        <div key={item.id} className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center justify-between">
                                            <div>
                                                <h4 className="text-md font-semibold text-slate-700">{item.name}</h4>
                                                {item.meaning && <p className="text-[10px] text-slate-500">{item.meaning}</p>}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-slate-400">{item.votes} votes</span>
                                                <button 
                                                    onClick={() => handleVote(item.id)}
                                                    className="group/btn p-1.5 bg-white rounded-full shadow-sm text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                                                >
                                                    <ThumbsUp size={14} className="transition-transform duration-300 group-hover/btn:scale-125 group-hover/btn:-rotate-12" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                         {community.length === 0 && preSelected.length === 0 && (
                            <div className="text-center py-8 text-gray-400 text-sm italic">
                                No suggestions yet. Be the first to start the list!
                            </div>
                         )}
                    </motion.div>
                )}

                {activeTab === 'suggest' && (
                    <motion.div
                        key="suggest"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                         <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mb-4">
                                <p className="text-sm text-amber-800 text-center italic">
                                    "A name is the first gift we give to our children."
                                </p>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Baby Name Idea</label>
                                <input 
                                    type="text" 
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
                                    placeholder="e.g. Aarav"
                                    required
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Meaning (Optional)</label>
                                <input 
                                    type="text" 
                                    value={meaning}
                                    onChange={(e) => setMeaning(e.target.value)}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
                                    placeholder="e.g. Peaceful"
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-amber-500 to-amber-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
                            >
                                <Send size={18} />
                                Submit Suggestion
                            </button>
                         </form>
                    </motion.div>
                )}

                {activeTab === 'ai' && (
                     <motion.div
                        key="ai"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="space-y-4 h-full flex flex-col"
                    >
                        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                            <h3 className="text-indigo-900 font-bold flex items-center gap-2 mb-2">
                                <Bot size={18} />
                                Ask the Sages
                            </h3>
                            <p className="text-xs text-indigo-700/80 mb-4">
                                Select a theme and let our AI suggest beautiful Buddhist-inspired names.
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                                {themes.map(theme => (
                                    <button
                                        key={theme}
                                        onClick={() => setAiTheme(theme)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                                            aiTheme === theme 
                                            ? 'bg-indigo-600 text-white border-indigo-600' 
                                            : 'bg-white text-indigo-600 border-indigo-200 hover:border-indigo-400'
                                        }`}
                                    >
                                        {theme}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleAiGenerate}
                                disabled={isAiLoading}
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 rounded-lg shadow-md font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                            >
                                {isAiLoading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Consulting Ancient Texts...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={16} />
                                        Generate Names
                                    </>
                                )}
                            </button>
                        </div>

                        {/* AI Results */}
                        <div className="flex-1 overflow-y-auto space-y-2 min-h-[150px]">
                            {aiResults.length === 0 && !isAiLoading && (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center p-4">
                                    <Sparkles size={32} className="mb-2 opacity-30" />
                                    <p className="text-xs">Tap "Generate Names" to reveal suggestions</p>
                                </div>
                            )}
                            
                            {aiResults.map((result, idx) => (
                                <motion.div
                                    key={result.name + idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white border border-indigo-100 p-3 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-all"
                                >
                                    <div>
                                        <h4 className="text-md font-bold text-indigo-900">{result.name}</h4>
                                        <p className="text-xs text-gray-500">{result.meaning}</p>
                                    </div>
                                    <button
                                        onClick={() => addName(result.name, result.meaning)}
                                        className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 active:scale-95 transition-all"
                                        title="Add to Voting List"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            )}
        </div>
      </motion.div>
    </motion.div>
  );
};
