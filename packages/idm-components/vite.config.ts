import { resolve } from 'path';
import { defineConfig } from 'vite';
import CoreAlias from '@core/alias';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [...CoreAlias],
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'index.tsx'),
      name: '@crayond_dev/idm-components',
      // the proper extensions will be added
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom', 'zustand'],
    },
  },
});
