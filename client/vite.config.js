import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        customer: path.resolve(__dirname, './customer.html'),
        admin: path.resolve(__dirname, './index.html'),
      },
    },
  },
  optimizeDeps: {
    include: ['@tiptap/react', '@tiptap/starter-kit'],
    force: true
  },
  server: {
    historyApiFallback: true,
  },


})

