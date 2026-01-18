import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateWithOpenAI = async (prompt: string, model: string = 'gpt-3.5-turbo') => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: model,
  });
  return completion.choices[0].message.content;
};

export const generateWithGemini = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const improvePrompt = async (originalPrompt: string) => {
  // We can use a lightweight model or default to one
  const prompt = `Improve this prompt for an AI image/video generator to be more detailed and effective: "${originalPrompt}"`;
  return await generateWithOpenAI(prompt); // Defaulting to OpenAI for this utility
}

export const analyzePreferenceChange = async (userPrompt: string, currentPreferences: any) => {
  // this function asks AI if the userPrompt indicates a change in preferences
  const analysisPrompt = `
    User Prompt: "${userPrompt}"
    Current Preferences: ${JSON.stringify(currentPreferences)}
    
    Does the user prompt indicate a desire to change any preferences for video, image, or chat formats? 
    If yes, return the UPDATED JSON only for the specific affected area (video, image, or chat). 
    If no, return "NO_CHANGE".
    Format: JSON
    `;

  // Use a fast model for this check
  try {
    const result = await generateWithOpenAI(analysisPrompt, 'gpt-3.5-turbo');
    if (result && result.includes('NO_CHANGE')) return null;
    // Try to parse json
    const cleanJson = result?.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson || 'null');
  } catch (e) {
    console.error("Error analyzing preferences:", e);
    return null;
  }
}
