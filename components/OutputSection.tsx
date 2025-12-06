
import React, { useState } from 'react';
import { PromptTemplate, Language, FileAttachment, ApiConfig } from '../types';
import { Copy, Check, Play, Loader2, AlertCircle, FileText } from 'lucide-react';
import { executeGeminiPrompt } from '../services/geminiService';
import { saveHistoryItem } from '../services/storageService';
import { UI_TEXT } from '../constants';
import ReactMarkdown from 'react-markdown';

interface OutputSectionProps {
  template: PromptTemplate;
  formValues: Record<string, any>;
  lang: Language;
  apiConfig: ApiConfig;
}

export const OutputSection: React.FC<OutputSectionProps> = ({ template, formValues, lang, apiConfig }) => {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Generate Prompt using the Oxford Standard Generator
  const finalPrompt = template.templateGenerator(formValues, lang);

  // Extract files from formValues if any field is type 'file'
  const attachedFiles: FileAttachment[] = React.useMemo(() => {
    let files: FileAttachment[] = [];
    template.fields.forEach(field => {
      if (field.type === 'file' && formValues[field.id]) {
        files = [...files, ...(formValues[field.id] as FileAttachment[])];
      }
    });
    return files;
  }, [formValues, template]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setError(null);
    setAiResponse(null);
    try {
      const response = await executeGeminiPrompt(
        finalPrompt, 
        attachedFiles, 
        template.systemInstruction[lang],
        apiConfig
      );
      setAiResponse(response);
      
      // Sanitized history values: strip base64 data to prevent localStorage quota exceeded errors
      // Deep clone first
      const historyValues = JSON.parse(JSON.stringify(formValues));
      
      // Iterate keys to find file arrays and strip data
      Object.keys(historyValues).forEach(key => {
         const val = historyValues[key];
         if (Array.isArray(val)) {
             historyValues[key] = val.map((item: any) => {
                 // Check if it looks like a file attachment with data
                 if (item && typeof item === 'object' && 'data' in item && 'mimeType' in item) {
                     return { 
                         name: item.name, 
                         mimeType: item.mimeType, 
                         data: '' // Remove base64 data
                     };
                 }
                 return item;
             });
         }
      });

      // Save to history
      saveHistoryItem({
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        templateId: template.id,
        templateTitle: template.title[lang],
        formValues: historyValues,
        generatedPrompt: finalPrompt,
        aiResponse: response
      });

    } catch (err: any) {
      console.error(err);
      if (err.message === "REGION_ERROR") {
          setError(UI_TEXT[lang].errorRegion);
      } else if (err.message?.includes('Rpc failed') || err.message?.includes('xhr error') || err.message?.includes('fetch failed')) {
          setError(UI_TEXT[lang].errorNetwork);
      } else if (err.message?.includes('API Key') && apiConfig.provider === 'gemini') {
          // Only prompt for Gemini key via window.aistudio if using default provider
          try {
             await window.aistudio.openSelectKey();
             setError(UI_TEXT[lang].selectKey); 
          } catch (e) {
             setError("API Key selection failed.");
          }
      } else {
         setError(err.message || "Failed to execute prompt.");
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Generated Prompt Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden max-h-[50%]">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Generated Prompt</span>
            {attachedFiles.length > 0 && (
              <span className="flex items-center gap-1 text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                <FileText size={10} /> {attachedFiles.length} files attached
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleCopy(finalPrompt)}
              className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-indigo-600 transition-colors px-2 py-1 rounded hover:bg-slate-100"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              {copied ? UI_TEXT[lang].copied : UI_TEXT[lang].copy}
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`flex items-center gap-1 text-xs font-medium text-white px-3 py-1 rounded transition-colors shadow-sm ${
                isRunning ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
              {isRunning ? UI_TEXT[lang].running : UI_TEXT[lang].run}
            </button>
          </div>
        </div>
        <div className="p-4 overflow-y-auto bg-[#1e293b] text-slate-100 font-mono text-xs md:text-sm whitespace-pre-wrap leading-relaxed shadow-inner">
          {finalPrompt}
        </div>
      </div>

      {/* AI Output Card */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden min-h-0">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
             AI Output 
             {apiConfig.provider === 'custom' && <span className="ml-2 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200">Custom API</span>}
          </span>
          {aiResponse && (
             <button
             onClick={() => {
                if (aiResponse) {
                  navigator.clipboard.writeText(aiResponse);
                }
             }}
             className="text-xs text-slate-500 hover:text-indigo-600 font-medium"
           >
             {UI_TEXT[lang].copy}
           </button>
          )}
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto relative scroll-smooth">
          {isRunning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-10 backdrop-blur-[1px]">
              <Loader2 size={32} className="text-indigo-600 animate-spin mb-3" />
              <p className="text-sm text-slate-600 font-medium animate-pulse">{UI_TEXT[lang].running}</p>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
              <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Error</p>
                <p className="text-sm opacity-90">{error}</p>
              </div>
            </div>
          )}

          {!aiResponse && !isRunning && !error && (
            <div className="h-full flex flex-col items-center justify-center text-slate-300">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                 <Play size={24} className="text-slate-300 ml-1" />
              </div>
              <p className="text-sm">{UI_TEXT[lang].outputPlaceholder}</p>
            </div>
          )}

          {aiResponse && (
            <div className="prose prose-sm prose-slate max-w-none">
              <ReactMarkdown>{aiResponse}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
