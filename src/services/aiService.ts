// src/services/aiService.ts
export interface AiNameResult {
  name: string;
  meaning: string;
}

export const generateAiNames = async (theme: string): Promise<AiNameResult[]> => {
  // Simulating an AI response based on the selected theme
  const themes: Record<string, AiNameResult[]> = {
    Modern: [{ name: 'Vihaan', meaning: 'Dawn/Morning' }, { name: 'Advik', meaning: 'Unique' }],
    Sanskrit: [{ name: 'Bodhi', meaning: 'Enlightenment' }, { name: 'Aryan', meaning: 'Noble' }],
    Nature: [{ name: 'Rishi', meaning: 'Ray of Light' }, { name: 'Sagar', meaning: 'Ocean' }],
    Virtue: [{ name: 'Dharma', meaning: 'Righteous Path' }, { name: 'Vinay', meaning: 'Humble' }],
    Traditional: [{ name: 'Gautam', meaning: 'The Enlightened One' }, { name: 'Siddharth', meaning: 'One who has attained his goal' }]
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(themes[theme] || themes['Modern']);
    }, 1500);
  });
};