
import React, { useState, useEffect } from 'react';
import { ApiConfig, Language } from '../types';
import { UI_TEXT, SETTINGS_TEXT } from '../constants';
import { X, Save, Settings as SettingsIcon, AlertTriangle } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  config: ApiConfig;
  onSave: (config: ApiConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, lang, config, onSave }) => {
  const [localConfig, setLocalConfig] = useState<ApiConfig>(config);
  const t = SETTINGS_TEXT[lang];

  useEffect(() => {
    if (isOpen) {
        setLocalConfig(config);
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-slate-800">
             <SettingsIcon size={20} className="text-indigo-600" />
             <h2 className="font-bold">{t.title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
             <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
           
           <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.provider}</label>
              <div className="grid grid-cols-1 gap-2">
                 <button
                    onClick={() => setLocalConfig(prev => ({ ...prev, provider: 'gemini' }))}
                    className={`px-4 py-3 rounded-lg border text-left text-sm font-medium transition-all ${
                        localConfig.provider === 'gemini' 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 ring-1 ring-indigo-500' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                 >
                    {t.gemini}
                 </button>
                 <button
                    onClick={() => setLocalConfig(prev => ({ ...prev, provider: 'custom' }))}
                    className={`px-4 py-3 rounded-lg border text-left text-sm font-medium transition-all ${
                        localConfig.provider === 'custom' 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 ring-1 ring-indigo-500' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                 >
                    <div className="flex flex-col">
                       <span>{t.custom}</span>
                       <span className="text-[10px] text-slate-400 mt-0.5 font-normal">{t.customDesc}</span>
                    </div>
                 </button>
              </div>
           </div>

           {localConfig.provider === 'custom' && (
             <div className="space-y-4 pt-2 border-t border-slate-100 animate-fade-in-up">
                <div className="bg-amber-50 text-amber-800 p-3 rounded-lg text-xs flex items-start gap-2">
                    <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                    <p>{t.warning}</p>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t.baseUrl}</label>
                    <input 
                      type="text" 
                      value={localConfig.baseUrl || ''}
                      onChange={(e) => setLocalConfig({...localConfig, baseUrl: e.target.value})}
                      placeholder="https://api.openai.com/v1"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t.apiKey}</label>
                    <input 
                      type="password" 
                      value={localConfig.apiKey || ''}
                      onChange={(e) => setLocalConfig({...localConfig, apiKey: e.target.value})}
                      placeholder="sk-..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t.model}</label>
                    <input 
                      type="text" 
                      value={localConfig.modelId || ''}
                      onChange={(e) => setLocalConfig({...localConfig, modelId: e.target.value})}
                      placeholder="gpt-3.5-turbo, deepseek-chat, qwen-max..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
             </div>
           )}

        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
            <button 
               onClick={onClose}
               className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 font-medium"
            >
               {t.cancel}
            </button>
            <button 
               onClick={() => { onSave(localConfig); onClose(); }}
               className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"
            >
               <Save size={16} />
               {t.save}
            </button>
        </div>
      </div>
    </div>
  );
};
