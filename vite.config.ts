/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ jsxImportSource: '@emotion/react' }), tsconfigPaths()],
  resolve: {
    alias: [{ find: './runtimeConfig', replacement: './runtimeConfig.browser' }],
  },
  server: {
    host: true,
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['/src/test/mocks'],
    deps: {
      fallbackCJS: true,
    },
  },
})
