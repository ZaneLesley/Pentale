import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    plugins: [react()],
    base: env.VITE_ROOT_URL || '/',
    build: {
      sourcemap: true,
    },
    server: {
      host: true,              // binds to 0.0.0.0 for Docker access
      port: 5173,
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 5173,
      }
    }
  })
}
