
import { GoogleGenAI } from "@google/genai";
import { FileAttachment, ApiConfig } from "../types";

export const executeGeminiPrompt = async (
  promptText: string, 
  files: FileAttachment[],
  systemInstruction: string | undefined,
  config: ApiConfig | undefined
): Promise<string> => {
  
  // Check if API is configured
  if (!config || !config.apiKey || !config.baseUrl) {
    throw new Error("API_KEY_NOT_CONFIGURED");
  }

  // Determine if it's Gemini API or OpenAI-compatible API
  const isGeminiAPI = config.baseUrl.includes('generativelanguage.googleapis.com') || 
                      config.baseUrl.includes('ai.google.dev');

  if (isGeminiAPI) {
    // Gemini API Handling (supports file uploads)
    return await executeWithGemini(promptText, files, systemInstruction, config);
  } else {
    // OpenAI-compatible API Handling (no file support)
    return await executeWithOpenAICompatible(promptText, systemInstruction, config);
  }
};

// Gemini API implementation
const executeWithGemini = async (
  promptText: string,
  files: FileAttachment[],
  systemInstruction: string | undefined,
  config: ApiConfig
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: config.apiKey! });
  
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
      model: config.modelId || 'gemini-2.0-flash-exp',
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
    
    if (error.message?.includes('UNAUTHENTICATED') || error.message?.includes('API Key') || error.message?.includes('invalid') || error.status === 401) {
        throw new Error("INVALID_API_KEY");
    }

    throw error;
  }
};

// OpenAI-compatible API implementation
const executeWithOpenAICompatible = async (
  promptText: string,
  systemInstruction: string | undefined,
  config: ApiConfig
): Promise<string> => {
  // Construct messages for OpenAI compatible endpoint
  const messages = [
     ...(systemInstruction ? [{ role: "system", content: systemInstruction }] : []),
     { role: "user", content: promptText }
  ];

  // NOTE: File attachments are not supported in OpenAI-compatible mode
  // Users should use Gemini API if they need PDF upload functionality
  
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
    throw new Error(`API Request Failed: ${e.message}`);
  }
};

