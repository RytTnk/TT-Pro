import { GoogleGenAI } from "@google/genai";
import { RaceProfile } from "../types";

// Note: In a real app, strict error handling for missing keys is needed.
// Per instructions, we assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const getRaceStrategyAdvice = async (
  race: RaceProfile, 
  userFtp: number, 
  userWeight: number
): Promise<string> => {
  if (!apiKey) return "Error: API_KEY not found in environment.";

  const prompt = `
    Role: Professional Cycling Coach & Aerodynamics Engineer.
    Task: Create a race strategy and gear recommendation.
    
    Rider Profile:
    - FTP: ${userFtp} W
    - Weight: ${userWeight} kg
    
    Race Profile:
    - Name: ${race.name}
    - Type: ${race.type}
    - Distance: ${race.distanceKm} km
    - Elevation Gain: ${race.elevationGainM} m
    - Description: ${race.description}
    
    Output Format (Markdown):
    1. **Pacing Strategy**: Specific wattage targets for different sections.
    2. **Gear Recommendation**: Wheel depth, tire pressure, gearing choice (cassette/chainrings).
    3. **Nutrition**: Rough carb intake estimate.
    4. **Aero Focus**: Where to prioritize position vs. power.
    
    Keep it concise (under 300 words).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No advice generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate advice. Please check your connection or API key.";
  }
};

export const generateRaceSpecificWorkout = async (race: RaceProfile): Promise<string> => {
    if (!apiKey) return "Error: API_KEY not found in environment.";

    const prompt = `
      Create a specific cycling interval workout to prepare for: ${race.name} (${race.type}).
      
      Output structure:
      - **Workout Name**
      - **Total Duration**
      - **Warmup**
      - **Main Set** (Detailed intervals based on race demands)
      - **Cooldown**
      - **Why this works** (1 sentence)
    `;

    try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        return response.text || "No workout generated.";
      } catch (error) {
        console.error("Gemini API Error:", error);
        return "Failed to generate workout.";
      }
}
