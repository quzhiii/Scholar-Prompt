import React, { useEffect, useState } from 'react';
import { HistoryItem, Language } from '../types';
import { getHistory } from '../services/storageService';
import { UI_TEXT } from '../constants';
import ReactMarkdown from 'react-markdown';
import { Clock, ArrowLeft, Copy, Check } from 'lucide-react';

interface HistoryProps {
  lang: Language;
  onBack: () => void;
  onRestore?: (item: HistoryItem) => void;
}

export const History: React.FC<HistoryProps> = ({ lang, onBack, onRestore }) => {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setItems(getHistory());
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-slate-800">{UI_TEXT[lang].historyTitle}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <Clock size={48} className="mb-4 opacity-20" />
            <p>{UI_TEXT[lang].historyEmpty}</p>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
                <div 
                  className="p-4 cursor-pointer hover:bg-slate-50 flex justify-between items-center"
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-indigo-700 text-sm">{item.templateTitle}</span>
                    <span className="text-xs text-slate-400">{new Date(item.timestamp).toLocaleString()}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${expandedId === item.id ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                    {expandedId === item.id ? 'Close' : 'View'}
                  </span>
                </div>

                {expandedId === item.id && (
                  <div className="border-t border-slate-100 p-4 space-y-4 bg-slate-50/30">
                    <div className="space-y-2">
                       <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold uppercase text-slate-500">Prompt</h4>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleCopy(item.generatedPrompt, item.id + 'prompt'); }}
                            className="text-xs flex items-center gap-1 text-slate-500 hover:text-indigo-600"
                          >
                             {copiedId === item.id + 'prompt' ? <Check size={12}/> : <Copy size={12} />}
                             {copiedId === item.id + 'prompt' ? UI_TEXT[lang].copied : UI_TEXT[lang].copy}
                          </button>
                       </div>
                       <div className="bg-slate-900 text-slate-300 p-3 rounded-lg text-xs font-mono whitespace-pre-wrap overflow-x-auto">
                         {item.generatedPrompt}
                       </div>
                    </div>

                    {item.aiResponse && (
                      <div className="space-y-2">
                         <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold uppercase text-slate-500">AI Response</h4>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleCopy(item.aiResponse!, item.id + 'res'); }}
                              className="text-xs flex items-center gap-1 text-slate-500 hover:text-indigo-600"
                            >
                               {copiedId === item.id + 'res' ? <Check size={12}/> : <Copy size={12} />}
                               {copiedId === item.id + 'res' ? UI_TEXT[lang].copied : UI_TEXT[lang].copy}
                            </button>
                         </div>
                        <div className="prose prose-sm prose-slate max-w-none bg-white p-3 rounded-lg border border-slate-200">
                          <ReactMarkdown>{item.aiResponse}</ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
