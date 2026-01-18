import { NameSuggestion } from '../types';

// Mock Data for Pre-selected names
const PRE_SELECTED_NAMES: NameSuggestion[] = [
  { id: 'pre-1', name: 'Advik', meaning: 'Unique', votes: 12, isPreSelected: true, timestamp: Date.now() },
  { id: 'pre-2', name: 'Reyansh', meaning: 'Ray of Light', votes: 15, isPreSelected: true, timestamp: Date.now() },
  { id: 'pre-3', name: 'Bodhi', meaning: 'Enlightenment', votes: 20, isPreSelected: true, timestamp: Date.now() },
  { id: 'pre-4', name: 'Aarav', meaning: 'Peaceful; Wisdom', votes: 8, isPreSelected: true, timestamp: Date.now() },
  { id: 'pre-5', name: 'Vivaan', meaning: 'Full of Life', votes: 10, isPreSelected: true, timestamp: Date.now() },
  { id: 'pre-6', name: 'Kiaan', meaning: 'Grace of God', votes: 6, isPreSelected: true, timestamp: Date.now() },
  { id: 'pre-7', name: 'Ishaan', meaning: 'The Sun', votes: 9, isPreSelected: true, timestamp: Date.now() },
  { id: 'pre-8', name: 'Dhruv', meaning: 'Pole Star', votes: 5, isPreSelected: true, timestamp: Date.now() },
  { id: 'pre-9', name: 'Kabir', meaning: 'The Great', votes: 7, isPreSelected: true, timestamp: Date.now() },
  { id: 'pre-10', name: 'Arjun', meaning: 'Bright; Shining', votes: 11, isPreSelected: true, timestamp: Date.now() },
];

const STORAGE_KEY = 'naamkaran_suggestions';

export const suggestionService = {
  getSuggestions: (): NameSuggestion[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Initialize with pre-selected if empty
        localStorage.setItem(STORAGE_KEY, JSON.stringify(PRE_SELECTED_NAMES));
        return PRE_SELECTED_NAMES;
      }
      return JSON.parse(stored);
    } catch (e) {
      return PRE_SELECTED_NAMES;
    }
  },

  addSuggestion: (name: string, meaning: string): NameSuggestion => {
    const suggestions = suggestionService.getSuggestions();
    const newSuggestion: NameSuggestion = {
      id: Date.now().toString(),
      name,
      meaning,
      votes: 1,
      timestamp: Date.now(),
    };
    
    const updated = [...suggestions, newSuggestion];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newSuggestion;
  },

  voteForName: (id: string): NameSuggestion[] => {
    const suggestions = suggestionService.getSuggestions();
    const updated = suggestions.map(s => 
      s.id === id ? { ...s, votes: s.votes + 1 } : s
    );
    // Sort by votes descending
    updated.sort((a, b) => b.votes - a.votes);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
};