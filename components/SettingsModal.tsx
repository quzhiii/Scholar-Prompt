
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
  const [isGemini, setIsGemini] = useState<boolean>(
    config.baseUrl?.includes('generativelanguage') || false
  );
  const t = SETTINGS_TEXT[lang];

  useEffect(() => {
    if (isOpen) {
        setLocalConfig(config);
        setIsGemini(config.baseUrl?.includes('generativelanguage') || false);
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden animate-fade-in-up flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50 flex-shrink-0">
          <div className="flex items-center gap-2 text-slate-800">
             <SettingsIcon size={20} className="text-indigo-600" />
             <h2 className="font-bold">{t.title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
             <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto flex-1">
           
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
              <div className="mb-3 p-4 border-2 border-amber-200 rounded-lg bg-amber-50/50">
                 <div className="flex items-start gap-3">
                    <div className="flex-1">
                       <h3 className="font-bold text-amber-900 mb-1">
                         Google Gemini {lang === 'cn' ? '(需付费 - 原生PDF)' : '(Paid - Native PDF)'}
                       </h3>
                       <p className="text-xs text-amber-700 mb-2">
                         {lang === 'cn' 
                           ? '⚠️ 免费额度已取消 | ✅ 原生 PDF 支持 | ✅ 多模态能力最强'
                           : '⚠️ Free Tier Removed | ✅ Native PDF | ✅ Strongest Multimodal'}
                       </p>
                       <a 
                         href="https://ai.google.dev/aistudio" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-xs text-amber-600 hover:text-amber-800 underline font-medium"
                       >
                         {lang === 'cn' ? '→ 获取 Gemini API Key (需绑定付费)' : '→ Get Gemini API Key (Billing Required)'}
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
                        className="w-full px-3 py-2 bg-gray-100 border border-slate-200 rounded-lg text-xs text-slate-500 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">API Key</label>
                      <input 
                        type="password" 
                        value={isGemini ? localConfig.apiKey || '' : ''}
                        onChange={(e) => {
                          setIsGemini(true);
                          setLocalConfig({
                            provider: 'custom',
                            baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
                            apiKey: e.target.value,
                            modelId: localConfig.modelId || 'gemini-2.0-flash-exp'
                          });
                        }}
                        placeholder="AIza..."
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        {lang === 'cn' ? '模型' : 'Model'}
                      </label>
                      <select
                        value={isGemini ? (localConfig.modelId || 'gemini-2.0-flash-exp') : ''}
                        onChange={(e) => {
                          if (isGemini) {
                            setLocalConfig({...localConfig, modelId: e.target.value});
                          }
                        }}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      >
                        <optgroup label={lang === 'cn' ? '🌟 Gemini 3 系列（最新预览）' : '🌟 Gemini 3 Series (Latest Preview)'}>
                          <option value="gemini-3-pro-preview">Gemini 3 Pro Preview (最新！推理+多模态)</option>
                        </optgroup>
                        <optgroup label={lang === 'cn' ? '🔥 Gemini 2.0 系列' : '🔥 Gemini 2.0 Series'}>
                          <option value="gemini-2.0-flash-exp">Gemini 2.0 Flash Exp (快速推荐)</option>
                          <option value="gemini-2.0-flash-thinking-exp-1219">Gemini 2.0 Flash Thinking (深度思考)</option>
                          <option value="gemini-exp-1206">Gemini Exp 1206</option>
                          <option value="gemini-exp-1121">Gemini Exp 1121</option>
                        </optgroup>
                        <optgroup label={lang === 'cn' ? '⚡ Gemini 1.5 系列（稳定）' : '⚡ Gemini 1.5 Series (Stable)'}>
                          <option value="gemini-1.5-pro">Gemini 1.5 Pro (128K上下文)</option>
                          <option value="gemini-1.5-flash">Gemini 1.5 Flash (快速)</option>
                          <option value="gemini-1.5-flash-8b">Gemini 1.5 Flash-8B (轻量)</option>
                        </optgroup>
                      </select>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {lang === 'cn' 
                          ? '⭐ 最新：Gemini 3 Pro Preview 支持强大推理和多模态能力' 
                          : '⭐ Latest: Gemini 3 Pro Preview with powerful reasoning and multimodal'}
                      </p>
                    </div>
                 </div>
              </div>

              {/* Other Providers */}
              <details className="group" open>
                <summary className="cursor-pointer text-sm text-slate-600 hover:text-slate-800 font-medium py-2">
                  {lang === 'cn' ? '▼ 国内 AI 服务商 (🏆 推荐 - 性价比高)' : '▼ Domestic AI Providers (🏆 Recommended - Best Value)'}
                </summary>
                <div className="mt-3 p-4 border border-green-200 rounded-lg space-y-3 bg-green-50">
                  <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded-lg text-xs">
                      <p className="font-semibold mb-1">
                        {lang === 'cn' ? '🏆 推荐配置 (性价比最高):' : '🏆 Recommended (Best Value):'}
                      </p>
                      <ul className="space-y-0.5 ml-4">
                        <li>• <strong>DeepSeek v3</strong>: deepseek-chat (￥0.1/M tokens，送￥5)</li>
                        <li>• <strong>Kimi R2</strong>: moonshot-v1-auto (原生PDF / Native PDF)</li>
                        <li>• <strong>{lang === 'cn' ? '智谱' : 'GLM'}</strong>: glm-4v-plus (多模态 / Multimodal)</li>
                        <li>• <strong>{lang === 'cn' ? '通义千问' : 'Qwen'}</strong>: qwen-vl-max (速度快 / Fast)</li>
                      </ul>
                  </div>
                  
                  <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-xs flex items-start gap-2">
                      <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                      <p>
                        {lang === 'cn' 
                          ? '✨ 提示: 选择服务商后 Base URL 会自动填充，无需手动输入。只需粘贴 API Key 即可！'
                          : '✨ Tip: Base URL auto-fills when you select a provider. Just paste your API Key!'}
                      </p>
                  </div>
                  
                  <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        {lang === 'cn' ? '选择服务商 (自动填充 Base URL)' : 'Select Provider (Auto-fill Base URL)'}
                      </label>
                      <select
                        value=""
                        onChange={(e) => {
                          const selectedProvider = e.target.value;
                          if (selectedProvider) {
                            const providerUrls: Record<string, {url: string, model: string}> = {
                              'deepseek': {url: 'https://api.deepseek.com/v1', model: 'deepseek-chat'},
                              'kimi': {url: 'https://api.moonshot.cn/v1', model: 'moonshot-v1-auto'},
                              'glm': {url: 'https://open.bigmodel.cn/api/paas/v4', model: 'glm-4v-plus'},
                              'qwen': {url: 'https://dashscope.aliyuncs.com/compatible-mode/v1', model: 'qwen-vl-max'},
                              'openai': {url: 'https://api.openai.com/v1', model: 'gpt-4o'}
                            };
                            const provider = providerUrls[selectedProvider];
                            setIsGemini(false);
                            setLocalConfig({
                              ...localConfig,
                              provider: 'custom',
                              baseUrl: provider.url,
                              modelId: provider.model
                            });
                          }
                        }}
                        className="w-full px-3 py-2 bg-white border border-green-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none font-medium"
                      >
                        <option value="">{lang === 'cn' ? '👆 点击选择服务商...' : '👆 Click to select provider...'}</option>
                        <option value="deepseek">🏆 DeepSeek (￥0.1/M - {lang === 'cn' ? '推荐' : 'Recommended'})</option>
                        <option value="kimi">📄 Kimi ({lang === 'cn' ? '原生PDF' : 'Native PDF'})</option>
                        <option value="glm">🤖 {lang === 'cn' ? '智谱 GLM (多模态)' : 'GLM (Multimodal)'}</option>
                        <option value="qwen">⚡ {lang === 'cn' ? '通义千问 (阿里云)' : 'Qwen (Alibaba)'}</option>
                        <option value="openai">🌐 OpenAI (GPT-4)</option>
                      </select>
                  </div>
                  
                  <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Base URL</label>
                      <input 
                        type="text" 
                        value={!isGemini ? localConfig.baseUrl || '' : ''}
                        onChange={(e) => {
                          setIsGemini(false);
                          setLocalConfig({...localConfig, provider: 'custom', baseUrl: e.target.value});
                        }}
                        placeholder="https://api.deepseek.com/v1"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">
                        {lang === 'cn' 
                          ? '✅ 已自动填充 URL 和模型名称 (可手动修改)' 
                          : '✅ URL and model auto-filled (can edit manually)'}
                      </p>
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">API Key</label>
                      <input 
                        type="password" 
                        value={!isGemini ? localConfig.apiKey || '' : ''}
                        onChange={(e) => {
                          if (!isGemini) {
                            setLocalConfig({...localConfig, apiKey: e.target.value});
                          }
                        }}
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
                        value={!isGemini ? (localConfig.modelId || '') : ''}
                        onChange={(e) => {
                          if (!isGemini) {
                            setLocalConfig({...localConfig, modelId: e.target.value});
                          }
                        }}
                        placeholder="moonshot-v1-auto, deepseek-chat, glm-4v-plus, qwen-vl-max..."
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">
                        {lang === 'cn' 
                          ? '✅ 已根据服务商自动填充推荐模型' 
                          : '✅ Recommended model auto-filled'}
                      </p>
                  </div>
                </div>
              </details>
           </div>

        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 flex-shrink-0">
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
