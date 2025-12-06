
import { GoogleGenAI } from "@google/genai";
import { FileAttachment, ApiConfig } from "../types";

const defaultApiKey = process.env.API_KEY;

export const executeGeminiPrompt = async (
  promptText: string, 
  files: FileAttachment[],
  systemInstruction: string | undefined,
  config: ApiConfig | undefined = { provider: 'gemini' }
): Promise<string> => {
  
  // 1. Custom Provider Handling
  if (config?.provider === 'custom') {
    if (!config.apiKey || !config.baseUrl) {
       throw new Error("Missing API Key or Base URL for custom provider.");
    }
    
    // Construct messages for OpenAI compatible endpoint
    const messages = [
       ...(systemInstruction ? [{ role: "system", content: systemInstruction }] : []),
       { role: "user", content: promptText }
    ];

    // NOTE: For custom providers, we currently skip file attachments because support varies widely (PDF vs Image etc).
    // A production app would need complex logic to parse PDFs to text or check for vision capabilities.
    
    try {
      const response = await fetch(`${config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          model: config.modelId || 'gpt-3.5-turbo',
          messages: messages,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "No response.";
    } catch (e: any) {
      throw new Error(`Custom API Request Failed: ${e.message}`);
    }
  }

  // 2. Default Gemini Handling
  const apiKey = config?.apiKey || defaultApiKey;
  if (!apiKey) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is set.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const aiConfig: any = {};
    if (systemInstruction) {
      aiConfig.systemInstruction = systemInstruction;
    }

    // Construct the parts array
    const parts: any[] = [];
    
    // Add files first (context)
    if (files && files.length > 0) {
      files.forEach(file => {
        parts.push({
          inlineData: {
            mimeType: file.mimeType,
            data: file.data
          }
        });
      });
    }

    // Add text prompt
    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: config?.modelId || 'gemini-2.5-flash',
      contents: { parts },
      config: aiConfig
    });

    return response.text || "No response generated.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Transform specific error codes for better UI handling
    if (error.message?.includes('403') || error.status === 403 || error.message?.includes('Region not supported')) {
        throw new Error("REGION_ERROR");
    }

    throw error;
  }
};
