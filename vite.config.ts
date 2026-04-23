import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  build: {
    // Target modern browsers — smaller output
    target: 'es2020',

    // Warn when a chunk exceeds 500KB
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        manualChunks: {
          // Three.js ecosystem — lazy-loaded, never in the initial bundle
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei', 'maath'],
          // Framer Motion — lazy-loaded
          'framer': ['framer-motion'],
          // React core — always needed, cache separately
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },

    // Enable minification (default) but be explicit
    minify: 'esbuild',

    // Generate source maps only in dev (omit in prod for smaller output)
    sourcemap: false,
  },
});
