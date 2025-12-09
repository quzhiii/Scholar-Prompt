
export type Language = 'en' | 'cn';

export interface SelectOption {
  value: string;
  label: { en: string; cn: string };
}

export interface PromptField {
  id: string;
  label: { en: string; cn: string };
  placeholder?: { en: string; cn: string }; // Optional for file type
  type: 'text' | 'textarea' | 'select' | 'file';
  options?: SelectOption[]; // For select type
  accept?: string; // For file type (e.g., .pdf)
  maxFiles?: number; // For file type
  defaultValue?: string;
}

export interface PromptTemplate {
  id: string;
  category: string;
  title: { en: string; cn: string };
  description: { en: string; cn: string };
  fields: PromptField[];
  // Generator now receives an extra argument for file metadata if needed, 
  // but mostly constructs the text part.
  templateGenerator: (values: Record<string, any>, lang: Language) => string;
  systemInstruction: { en: string; cn: string };
}

export interface Category {
  id: string;
  name: { en: string; cn: string };
  icon: string;
  description: { en: string; cn: string };
}

export interface User {
  username: string;
  email: string;
  avatar?: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  templateId: string;
  templateTitle: string;
  formValues: Record<string, any>;
  generatedPrompt: string;
  aiResponse: string | null;
}

export interface FileAttachment {
  name: string;
  mimeType: string;
  data: string; // Base64 string
}

export interface ApiConfig {
  provider: 'custom';
  baseUrl?: string;
  apiKey?: string;
  modelId?: string;
}

// Extend Window interface for AI Studio integration
declare global {
  interface Window {
    aistudio?: {
      openSelectKey: () => Promise<void>;
    };
  }
}
