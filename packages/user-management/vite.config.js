import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const fileName = fileURLToPath(import.meta.url);

const dirName = path.dirname(fileName);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  preview: {
    port: 4000,
  },
  resolve: {
    alias: [
      {
        find: '@assets',
        replacement: path.join(dirName, '../ui/assets'),
      },
      {
        find: '@atoms',
        replacement: path.join(dirName, '../../packages/ui/atoms'),
      },
      {
        find: '@components',
        replacement: path.join(dirName, '../../packages/ui/components'),
      },
    ],
  },
  build: {
    minify: true,
    lib: {
      entry: 'src/index.tsx',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@mui/lab', '@mui/material', '@emotion/react', '@emotion/styled', 'notistack'],
    },
  },
});
