import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
  build: {
    lib: {
      entry: './src/main.js',
      name: 'by-mazzeo-ads',
      // the proper extensions will be added
      fileName: 'by-mazzeo-ads-latest'
    }
  },
  server: {
    port:3400
  }
})
