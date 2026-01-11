import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface AiNameResult {
  name: string;
  meaning: string;
}

export const generateAiNames = async (theme: string): Promise<AiNameResult[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest 10 unique Indian Buddhist baby boy names based on the theme: "${theme}".
      Ensure they are culturally accurate, have deep meanings, and sound modern yet traditional.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              meaning: { type: Type.STRING },
            },
            required: ["name", "meaning"],
          },
        },
      },
    });

    if (response.text) {
        return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("AI Generation Error:", error);
    return [];
  }
};