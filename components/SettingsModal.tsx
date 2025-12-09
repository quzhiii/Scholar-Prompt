
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
           
           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <p className="text-blue-900 font-semibold mb-2">
                {lang === 'cn' ? '🔑 配置您的 API Key' : '🔑 Configure Your API Key'}
              </p>
              <p className="text-blue-700 text-xs leading-relaxed">
                {lang === 'cn' 
                  ? 'ScholarPrompt 是完全免费的开源工具。您需要使用自己的 API Key 来调用 AI 服务。所有请求都在您的浏览器中完成，数据完全安全。'
                  : 'ScholarPrompt is a completely free open-source tool. You need to use your own API Key to call AI services. All requests are made from your browser, data is completely secure.'}
              </p>
           </div>

           <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                {lang === 'cn' ? 'API 服务提供商' : 'API Service Provider'}
              </label>
              
              {/* Gemini API Option */}
              <div className="mb-3 p-4 border-2 border-indigo-200 rounded-lg bg-indigo-50/50">
                 <div className="flex items-start gap-3">
                    <div className="flex-1">
                       <h3 className="font-bold text-indigo-900 mb-1">
                         Google Gemini {lang === 'cn' ? '(推荐)' : '(Recommended)'}
                       </h3>
                       <p className="text-xs text-indigo-700 mb-2">
                         {lang === 'cn' 
                           ? '✅ 支持 PDF 文件上传 | ✅ 免费额度充足 | ✅ 多模态支持'
                           : '✅ PDF Upload Support | ✅ Generous Free Tier | ✅ Multimodal'}
                       </p>
                       <a 
                         href="https://ai.google.dev/aistudio" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-xs text-indigo-600 hover:text-indigo-800 underline font-medium"
                       >
                         {lang === 'cn' ? '→ 免费获取 Gemini API Key' : '→ Get Free Gemini API Key'}
                       </a>
                    </div>
                 </div>
                 
                 <div className="mt-3 space-y-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Base URL</label>
                      <input 
                        type="text" 
                        value="https://generativelanguage.googleapis.com/v1beta"
                        disabled
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">API Key</label>
                      <input 
                        type="password" 
                        value={localConfig.baseUrl?.includes('generativelanguage') ? localConfig.apiKey || '' : ''}
                        onChange={(e) => setLocalConfig({
                          provider: 'custom',
                          baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
                          apiKey: e.target.value,
                          modelId: 'gemini-2.0-flash-exp'
                        })}
                        placeholder="AIza..."
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        {lang === 'cn' ? '模型' : 'Model'}
                      </label>
                      <input 
                        type="text" 
                        value={localConfig.baseUrl?.includes('generativelanguage') ? localConfig.modelId || 'gemini-2.0-flash-exp' : ''}
                        onChange={(e) => setLocalConfig({...localConfig, modelId: e.target.value})}
                        placeholder="gemini-2.0-flash-exp"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                 </div>
              </div>

              {/* Other Providers */}
              <details className="group">
                <summary className="cursor-pointer text-sm text-slate-600 hover:text-slate-800 font-medium py-2">
                  {lang === 'cn' ? '▶ 或使用其他 AI 服务商 (OpenAI 兼容接口)' : '▶ Or Use Other AI Providers (OpenAI Compatible)'}
                </summary>
                <div className="mt-3 p-4 border border-slate-200 rounded-lg space-y-3 bg-slate-50">
                  <div className="bg-amber-50 text-amber-800 p-3 rounded-lg text-xs flex items-start gap-2">
                      <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                      <p>
                        {lang === 'cn' 
                          ? '注意: OpenAI 兼容接口目前不支持 PDF 文件上传功能。如需上传文献，请使用 Gemini API。'
                          : 'Note: OpenAI-compatible APIs currently do not support PDF file upload. Use Gemini API for literature upload.'}
                      </p>
                  </div>
                  
                  <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Base URL</label>
                      <input 
                        type="text" 
                        value={!localConfig.baseUrl?.includes('generativelanguage') ? localConfig.baseUrl || '' : ''}
                        onChange={(e) => setLocalConfig({...localConfig, provider: 'custom', baseUrl: e.target.value})}
                        placeholder="https://api.deepseek.com/v1"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">
                        {lang === 'cn' ? '例如: DeepSeek, Qwen, Kimi, OpenAI' : 'e.g., DeepSeek, Qwen, Kimi, OpenAI'}
                      </p>
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">API Key</label>
                      <input 
                        type="password" 
                        value={!localConfig.baseUrl?.includes('generativelanguage') ? localConfig.apiKey || '' : ''}
                        onChange={(e) => setLocalConfig({...localConfig, apiKey: e.target.value})}
                        placeholder="sk-..."
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        {lang === 'cn' ? '模型名称' : 'Model Name'}
                      </label>
                      <input 
                        type="text" 
                        value={!localConfig.baseUrl?.includes('generativelanguage') ? localConfig.modelId || '' : ''}
                        onChange={(e) => setLocalConfig({...localConfig, modelId: e.target.value})}
                        placeholder="deepseek-chat, qwen-max, gpt-4..."
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring:indigo-500 outline-none"
                      />
                  </div>
                </div>
              </details>
           </div>

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
