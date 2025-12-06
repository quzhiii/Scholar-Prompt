
import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { PromptBuilder } from './components/PromptBuilder';
import { OutputSection } from './components/OutputSection';
import { History } from './components/History';
import { LandingPage } from './components/LandingPage';
import { SettingsModal } from './components/SettingsModal';
import { CATEGORIES, PROMPT_TEMPLATES, UI_TEXT } from './constants';
import { PromptTemplate, Language, ApiConfig } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<'landing' | 'builder' | 'history'>('landing');
  
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(CATEGORIES[0].id);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Initialize API Config from localStorage if available
  const [apiConfig, setApiConfig] = useState<ApiConfig>(() => {
     const saved = localStorage.getItem('scholar_api_config');
     return saved ? JSON.parse(saved) : { provider: 'gemini' };
  });

  const handleSaveConfig = (config: ApiConfig) => {
    setApiConfig(config);
    localStorage.setItem('scholar_api_config', JSON.stringify(config));
  };

  // Filter templates based on category
  const categoryTemplates = useMemo(() => {
    return PROMPT_TEMPLATES.filter(t => t.category === selectedCategoryId);
  }, [selectedCategoryId]);

  // Select first template when category changes
  useMemo(() => {
    if (categoryTemplates.length > 0) {
      const currentInList = categoryTemplates.find(t => t.id === selectedTemplateId);
      if (!currentInList) {
        setSelectedTemplateId(categoryTemplates[0].id);
      }
    } else {
      setSelectedTemplateId(null);
    }
  }, [categoryTemplates, selectedTemplateId]);

  const activeTemplate: PromptTemplate | undefined = PROMPT_TEMPLATES.find(t => t.id === selectedTemplateId);

  if (view === 'landing') {
    return <LandingPage onEnter={() => setView('builder')} lang={lang} setLang={setLang} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      
      {/* Settings Modal */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)}
        lang={lang}
        config={apiConfig}
        onSave={handleSaveConfig}
      />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 md:relative md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar 
          selectedCategory={selectedCategoryId} 
          onSelectCategory={(id) => {
            setSelectedCategoryId(id);
            setView('builder'); // Switch back to builder when selecting cat
            setMobileMenuOpen(false);
          }}
          lang={lang}
          setLang={setLang}
          onViewHistory={() => {
            setView('history');
            setMobileMenuOpen(false);
          }}
          onGoHome={() => setView('landing')}
          onOpenSettings={() => {
            setShowSettings(true);
            setMobileMenuOpen(false);
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center p-4 bg-white border-b border-slate-200">
           <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2 text-slate-600">
             <Menu />
           </button>
           <span className="font-bold text-slate-800 ml-2">{UI_TEXT[lang].appTitle}</span>
        </div>

        {view === 'history' ? (
           <History lang={lang} onBack={() => setView('builder')} />
        ) : (
          <>
            {/* Template Selector Bar */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide shadow-sm z-10">
              <div className="flex gap-2">
                {categoryTemplates.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplateId(t.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedTemplateId === t.id
                        ? 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-500'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {t.title[lang]}
                  </button>
                ))}
              </div>
            </div>

            {/* Workspace Grid */}
            <main className="flex-1 p-4 md:p-6 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
                
                {/* Left: Input Form */}
                <div className="lg:col-span-5 h-full overflow-hidden">
                  {activeTemplate ? (
                    <PromptBuilder 
                      template={activeTemplate} 
                      formValues={formValues} 
                      setFormValues={setFormValues} 
                      lang={lang}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
                      {UI_TEXT[lang].noTemplate}
                    </div>
                  )}
                </div>

                {/* Right: Output & Preview */}
                <div className="lg:col-span-7 h-full overflow-hidden">
                  {activeTemplate ? (
                    <OutputSection 
                      template={activeTemplate} 
                      formValues={formValues} 
                      lang={lang}
                      apiConfig={apiConfig}
                    />
                  ) : (
                    <div className="hidden lg:flex h-full items-center justify-center text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
                      {UI_TEXT[lang].outputPlaceholder}
                    </div>
                  )}
                </div>
                
              </div>
            </main>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
