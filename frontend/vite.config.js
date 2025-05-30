import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

//https://vite.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    plugins: [react()],
    base: env.VITE_ROOT_URL || '/'
  })
}

