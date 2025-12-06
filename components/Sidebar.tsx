
import React from 'react';
import { CATEGORIES, getIcon, UI_TEXT } from '../constants';
import { Language } from '../types';
import { History, GraduationCap, Settings } from 'lucide-react';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  lang: Language;
  setLang: (l: Language) => void;
  onViewHistory: () => void;
  onGoHome: () => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  selectedCategory, 
  onSelectCategory, 
  lang,
  setLang,
  onViewHistory,
  onGoHome,
  onOpenSettings
}) => {
  return (
    <aside className="w-full md:w-72 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col h-full shadow-2xl z-20">
      <div className="p-6 border-b border-slate-800">
        <button onClick={onGoHome} className="flex items-center gap-3 group">
          <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:bg-indigo-500 transition-colors">
            <GraduationCap size={24} />
          </div>
          <div className="text-left">
            <h1 className="text-lg font-bold text-white tracking-tight leading-tight group-hover:text-indigo-200 transition-colors">
              {UI_TEXT[lang].appTitle}
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">
              {UI_TEXT[lang].appDesc}
            </p>
          </div>
        </button>
      </div>

      {/* Language Toggle */}
      <div className="px-6 py-4 border-b border-slate-800">
         <div className="flex bg-slate-800 p-1 rounded-lg">
            <button 
              onClick={() => setLang('en')}
              className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${lang === 'en' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              English
            </button>
            <button 
              onClick={() => setLang('cn')}
              className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${lang === 'cn' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              中文
            </button>
         </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-3">
        {CATEGORIES.map((cat) => {
          const Icon = getIcon(cat.icon);
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-600/10 text-indigo-300 border border-indigo-500/30' 
                  : 'hover:bg-slate-800 hover:text-white text-slate-400 border border-transparent'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-indigo-400' : ''} />
              <div className="flex flex-col">
                 <span className="font-medium text-sm leading-none">{cat.name[lang]}</span>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-900/50">
        <button 
          onClick={onOpenSettings}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Settings size={16} />
          {UI_TEXT[lang].settings}
        </button>
        <button 
          onClick={onViewHistory}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <History size={16} />
          {UI_TEXT[lang].history}
        </button>
      </div>
    </aside>
  );
};
