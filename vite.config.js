import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('by-mazzeo-ads')
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    minify: 'esbuild',
    sourcemap: true,
    lib: {
      entry: './src/main.js',
      name: 'by-mazzeo-ads',
      // the proper extensions will be added
      fileName: 'by-mazzeo-ads-latest'
    }
  }
})
