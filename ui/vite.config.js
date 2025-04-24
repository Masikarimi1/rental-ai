// /gebral-Estate/ui/vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    define: {
      'process.env': env
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@context': path.resolve(__dirname, './src/context'),
        '@config': path.resolve(__dirname, './src/config'),
      },
    },
    server: {
      host: env.VITE_HOST || 'localhost',
      port: parseInt(env.VITE_PORT) || 5173,
      proxy: {
        '/query': {
          target: env.VITE_API_CHAT_URL || 'http://localhost:8000',
          changeOrigin: true,
        },
        '/results': {
          target: env.VITE_API_INSIGHTS_URL || 'http://localhost:8080',
          changeOrigin: true,
        }
      },
    },
    preview: {
      host: env.VITE_HOST || 'localhost',
      port: parseInt(env.VITE_PORT) || 5173,
      allowedHosts: env.VITE_ALLOWED_HOSTS?.split(',') || [],
    }
  };
});
