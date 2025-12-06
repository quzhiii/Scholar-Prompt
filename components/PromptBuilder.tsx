import React, { useEffect, useRef } from 'react';
import { PromptTemplate, Language, FileAttachment } from '../types';
import { Upload, X, FileText } from 'lucide-react';
import { UI_TEXT } from '../constants';

interface PromptBuilderProps {
  template: PromptTemplate;
  formValues: Record<string, any>;
  setFormValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  lang: Language;
}

export const PromptBuilder: React.FC<PromptBuilderProps> = ({ template, formValues, setFormValues, lang }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset form when template changes
  useEffect(() => {
    const initialValues: Record<string, any> = {};
    template.fields.forEach(field => {
      // Preserve existing values if switching back and forth, otherwise default
      if (formValues[field.id] === undefined) {
        initialValues[field.id] = field.defaultValue || '';
        if (field.type === 'file') {
          initialValues[field.id] = [];
        }
      } else {
        initialValues[field.id] = formValues[field.id];
      }
    });
    setFormValues(initialValues);
  }, [template.id]); // Only reset if template ID changes

  const handleChange = (id: string, value: any) => {
    setFormValues(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldId: string, maxFiles: number = 20) => {
    if (e.target.files) {
      // Fix: Cast the result of Array.from to File[] to satisfy TypeScript strictness
      const filesArray: File[] = (Array.from(e.target.files) as unknown as File[]).slice(0, maxFiles);
      const attachments: FileAttachment[] = [];

      for (const file of filesArray) {
        if (file.size > 50 * 1024 * 1024) {
          alert(`File ${file.name} is too large (>50MB).`);
          continue;
        }

        const reader = new FileReader();
        await new Promise<void>((resolve) => {
          reader.onload = (ev) => {
             if (ev.target?.result) {
               const base64 = (ev.target.result as string).split(',')[1];
               attachments.push({
                 name: file.name,
                 mimeType: file.type,
                 data: base64
               });
             }
             resolve();
          };
          reader.readAsDataURL(file);
        });
      }
      
      const currentFiles = (formValues[fieldId] as FileAttachment[]) || [];
      // Combine new files with existing, respecting limit? Or replace? 
      // Let's simple add them for now, user can delete.
      handleChange(fieldId, [...currentFiles, ...attachments]);
    }
  };

  const removeFile = (fieldId: string, index: number) => {
    const currentFiles = (formValues[fieldId] as FileAttachment[]) || [];
    const newFiles = [...currentFiles];
    newFiles.splice(index, 1);
    handleChange(fieldId, newFiles);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full overflow-y-auto">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-800">{template.title[lang]}</h2>
        <p className="text-sm text-slate-500 mt-1">{template.description[lang]}</p>
      </div>

      <div className="space-y-6 pb-20">
        {template.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className="block text-sm font-semibold text-slate-700">
              {field.label[lang]}
            </label>
            
            {field.type === 'text' && (
              <input
                type="text"
                id={field.id}
                value={formValues[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={field.placeholder?.[lang]}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm placeholder:text-slate-400"
              />
            )}

            {field.type === 'textarea' && (
              <textarea
                id={field.id}
                rows={5}
                value={formValues[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={field.placeholder?.[lang]}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm resize-none placeholder:text-slate-400"
              />
            )}

            {field.type === 'select' && (
              <div className="relative">
                <select
                  id={field.id}
                  value={formValues[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled>{field.placeholder?.[lang]}</option>
                  {field.options?.map(opt => (
                    <option key={opt.value} value={opt.value}>
                       {opt.label[lang]}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            )}

            {field.type === 'file' && (
              <div className="space-y-3">
                 <div 
                   onClick={() => fileInputRef.current?.click()}
                   className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500 hover:bg-slate-50 transition-colors"
                 >
                    <Upload className="text-slate-400 mb-2" size={24} />
                    <p className="text-sm font-medium text-slate-700">{UI_TEXT[lang].uploadFiles}</p>
                    <p className="text-xs text-slate-400 mt-1">{field.placeholder?.[lang]}</p>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept={field.accept}
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileChange(e, field.id, field.maxFiles)}
                    />
                 </div>
                 
                 {/* File List */}
                 {formValues[field.id] && (formValues[field.id] as FileAttachment[]).length > 0 && (
                   <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-500 uppercase">{formValues[field.id].length} {UI_TEXT[lang].filesSelected}</p>
                      {((formValues[field.id] as FileAttachment[]).map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-indigo-50 border border-indigo-100 rounded-lg">
                           <div className="flex items-center gap-2 overflow-hidden">
                              <FileText size={16} className="text-indigo-600 flex-shrink-0" />
                              <span className="text-sm text-indigo-900 truncate">{file.name}</span>
                           </div>
                           <button 
                             onClick={() => removeFile(field.id, idx)}
                             className="text-slate-400 hover:text-red-500 p-1"
                           >
                             <X size={14} />
                           </button>
                        </div>
                      )))}
                   </div>
                 )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};