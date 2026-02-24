import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/Galiliea-Houseboat',
  plugins: [
    react(),
    tailwindcss(),
  ],
});

