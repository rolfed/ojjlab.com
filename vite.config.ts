import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/ojjlab.com/' : '/',
  server: {
    open: true,
  },
  preview: {
    open: true,
  },
  plugins: [tailwindcss()],
});
