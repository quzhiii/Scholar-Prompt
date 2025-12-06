
import React from 'react';
import { Language } from '../types';
import { UI_TEXT, LANDING_FEATURES, getIcon } from '../constants';
import { GraduationCap, ArrowRight, Zap } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
  lang: Language;
  setLang: (l: Language) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter, lang, setLang }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center text-white">
            <GraduationCap size={18} />
          </div>
          <span className="text-lg font-bold tracking-tight">ScholarPrompt</span>
        </div>
        <div className="flex gap-4 items-center">
            <div className="flex bg-slate-100 p-1 rounded-lg">
                <button onClick={() => setLang('en')} className={`px-3 py-1 text-xs font-semibold rounded-md ${lang === 'en' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}>EN</button>
                <button onClick={() => setLang('cn')} className={`px-3 py-1 text-xs font-semibold rounded-md ${lang === 'cn' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}>CN</button>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-12 md:py-0 gap-12">
         <div className="flex-1 max-w-xl space-y-6 animate-fade-in-up">
            <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-full border border-indigo-100">
              AI for Academia
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.15]">
               {UI_TEXT[lang].landingTitle}
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
               {UI_TEXT[lang].landingSubtitle}
            </p>
            
            <div className="pt-4">
              <button 
                onClick={onEnter}
                className="group bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                {UI_TEXT[lang].enterApp}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
         </div>

         {/* Hero Visual */}
         <div className="flex-1 w-full max-w-lg relative">
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-30 -translate-y-12 translate-x-12"></div>
             <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                 {/* Fake UI */}
                 <div className="space-y-4">
                    <div className="h-4 w-1/3 bg-indigo-100 rounded"></div>
                    <div className="space-y-2">
                        <div className="h-2 w-full bg-slate-200 rounded"></div>
                        <div className="h-2 w-5/6 bg-slate-200 rounded"></div>
                        <div className="h-2 w-4/6 bg-slate-200 rounded"></div>
                    </div>
                    <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm space-y-3">
                         <div className="flex items-center gap-2 text-indigo-600 font-mono text-xs">
                            <Zap size={14} /> {UI_TEXT[lang].fakeUiAnalysis}
                         </div>
                         <div className="h-20 bg-slate-50 rounded border border-dashed border-slate-200 flex items-center justify-center text-slate-300 text-xs">
                            {UI_TEXT[lang].fakeUiGenerating}
                         </div>
                    </div>
                 </div>
             </div>
         </div>
      </main>

      {/* Features Grid */}
      <section className="bg-slate-50 py-16 px-6 md:px-20 border-t border-slate-200">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {LANDING_FEATURES.map((feat) => {
                 const Icon = getIcon(feat.icon);
                 const colors: any = {
                    blue: 'bg-blue-50 text-blue-600',
                    purple: 'bg-purple-50 text-purple-600',
                    teal: 'bg-teal-50 text-teal-600'
                 };
                 return (
                    <div key={feat.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-colors">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${colors[feat.color]}`}>
                            <Icon size={20} />
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2">{feat.title[lang]}</h3>
                        <p className="text-sm text-slate-500">{feat.desc[lang]}</p>
                    </div>
                 );
              })}
          </div>
      </section>
    </div>
  );
};
