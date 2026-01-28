import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: '/fleet/',
    plugins: [react()],
    server: {
      proxy: {
        '/api/ezrentout': {
          target: `https://${env.VITE_EZRENTOUT_SUBDOMAIN}.ezrentout.com`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/ezrentout/, ''),
          secure: false,
        },
        '/api/auth': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})
