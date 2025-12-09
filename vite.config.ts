import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Use base path for GitHub Pages, but not for Vercel or local dev
    const base = process.env.VERCEL ? '/' : (mode === 'production' ? '/Scholar-Prompt/' : '/');
    
    return {
      base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Use VITE_ prefix for environment variables in production
        // On Vercel, set VITE_GEMINI_API_KEY in project settings
        'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(process.env.VITE_GEMINI_API_KEY || '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser'
      }
    };
});
