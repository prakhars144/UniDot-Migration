import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const GEMINI_API_KEY = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

if (GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
}

export const sendMessageToGemini = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  if (!ai) {
    return "Error: API Key is missing. Please configure the environment variable.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // Construct prompt with context
    const systemInstruction = `You are an expert Game Engine Migration Assistant, specializing in moving from Unity 6 (C#) to Godot 4.5+ (GDScript).
    
    Your goal is to answer technical questions accurately.
    1. If the user asks for code, provide both the Unity equivalent (for context) and the correct GDScript solution.
    2. Highlight critical "gotchas" like Coordinate System differences (Unity: Left-handed Y-up, Godot: Right-handed Y-up, -Z forward).
    3. Be concise but thorough.
    4. Format code blocks with the language specified (csharp or gdscript).
    
    User Context: The user is looking at a cheat sheet and has a specific question not covered by the static list.`;

    const contents = [
      ...history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      })),
      { role: 'user', parts: [{ text: newMessage }] }
    ];

    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "No response generated.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `Error communicating with AI: ${error.message || 'Unknown error'}`;
  }
};