import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview", // ⚠️ use stable model
});

export const generateAIContent = async (prompt) => {
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 1500,
      responseMimeType: "application/json", 
    },
  });

  // ✅ RETURN STRING ONLY
  return result.response.text();
};

export const generateTextAIContent = async (prompt) => {
  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1500,
      },
    });

    return result.response.text();
  } catch (error) {
    if (error?.message?.includes("429")) {
      throw new Error("RATE_LIMIT");
    }
    throw error;
  }
};

