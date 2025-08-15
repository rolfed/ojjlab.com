import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    open: true,
  },
  preview: {
    open: true,
  },
  plugins: [
    tailwindcss()
  ]
});
