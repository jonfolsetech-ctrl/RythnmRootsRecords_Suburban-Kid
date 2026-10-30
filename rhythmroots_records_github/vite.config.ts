import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/RythnmRootsRecords_Suburban-Kid/',
  publicDir: 'assets',
  build: { outDir: 'dist', emptyOutDir: true },
});
