import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(), mkcert()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
