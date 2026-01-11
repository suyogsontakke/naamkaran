
import { db } from '../firebaseConfig';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  increment,
  query,
  orderBy
} from 'firebase/firestore';
import { NameSuggestion } from '../types';

const COLLECTION_NAME = 'suggestions';

// Fallback data in case database is empty or connection fails
const PRE_SELECTED_NAMES: NameSuggestion[] = [
  { id: 'pre-1', name: 'Advik', meaning: 'Unique', votes: 12, isPreSelected: true, timestamp: Date.now() },
  { id: 'pre-2', name: 'Reyansh', meaning: 'Ray of Light', votes: 15, isPreSelected: true, timestamp: Date.now() },
  { id: 'pre-3', name: 'Bodhi', meaning: 'Enlightenment', votes: 20, isPreSelected: true, timestamp: Date.now() },
];

export const suggestionService = {
  // Fetch all suggestions from Firestore Database
  getSuggestions: async (): Promise<NameSuggestion[]> => {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('votes', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const suggestions: NameSuggestion[] = [];
      querySnapshot.forEach((doc) => {
        suggestions.push({ id: doc.id, ...doc.data() } as NameSuggestion);
      });
      
      return suggestions.length > 0 ? suggestions : PRE_SELECTED_NAMES;
    } catch (e) {
      console.warn("Could not fetch from Firebase (Check if API keys are set in firebaseConfig.ts). Using offline data.", e);
      return PRE_SELECTED_NAMES;
    }
  },

  // Add a new suggestion to the Database
  addSuggestion: async (name: string, meaning: string): Promise<NameSuggestion | null> => {
    try {
      const newSuggestion = {
        name,
        meaning,
        votes: 1,
        timestamp: Date.now(),
        isPreSelected: false
      };
      
      const docRef = await addDoc(collection(db, COLLECTION_NAME), newSuggestion);
      
      return {
        id: docRef.id,
        ...newSuggestion
      };
    } catch (e) {
      console.error("Error adding suggestion: ", e);
      return null;
    }
  },

  // Update vote count in the Database
  voteForName: async (id: string): Promise<void> => {
    try {
      // Check if it's a pre-selected dummy item (IDs starting with 'pre-')
      // We cannot update dummy items in the real database
      if (id.startsWith('pre-')) return;

      const suggestionRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(suggestionRef, {
        votes: increment(1)
      });
    } catch (e) {
      console.error("Error voting: ", e);
    }
  },
  
  // Helper to seed data if you want to initialize the DB
  seedInitialData: async (initialData: NameSuggestion[]) => {
      try {
        const existing = await suggestionService.getSuggestions();
        // Only seed if we are looking at the default fallback data
        if (existing === PRE_SELECTED_NAMES) {
            initialData.forEach(async (item) => {
                const { id, ...data } = item; 
                await addDoc(collection(db, COLLECTION_NAME), data);
            });
        }
      } catch (e) {
          console.error("Seeding failed", e);
      }
  }
};
