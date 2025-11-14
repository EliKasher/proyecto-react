import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  build: {
    cssCodeSplit: false,
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: './index.html'
    }
  },
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
