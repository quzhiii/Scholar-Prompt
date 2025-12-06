import React, { useState } from 'react';
import { User, Language } from '../types';
import { UI_TEXT } from '../constants';

interface LoginProps {
  onLogin: (user: User) => void;
  lang: Language;
}

export const Login: React.FC<LoginProps> = ({ onLogin, lang }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && email) {
      onLogin({
        username,
        email,
        avatar: `https://ui-avatars.com/api/?name=${username}&background=6366f1&color=fff`
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-slate-100">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            S
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{UI_TEXT[lang].appTitle}</h1>
          <p className="text-slate-500 mt-2">{UI_TEXT[lang].appDesc}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {lang === 'en' ? "Username" : "用户名"}
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder={lang === 'en' ? "Enter your name" : "请输入您的名字"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {lang === 'en' ? "Email Address" : "邮箱地址"}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="researcher@university.edu"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-6 shadow-sm"
          >
            {UI_TEXT[lang].login}
          </button>
        </form>
        
        <p className="text-xs text-center text-slate-400 mt-6">
          {lang === 'en' ? "No password required for demo mode." : "演示模式无需密码。"}
        </p>
      </div>
    </div>
  );
};
