import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Isolate Three.js ecosystem into a separate lazy-loaded chunk
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei', 'maath'],
          // Isolate Framer Motion
          'framer': ['framer-motion'],
        },
      },
    },
  },
});
