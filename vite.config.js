import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ],

  build: {
    minify: 'esbuild',
    lib: {
      entry: './src/main.js',
      name: 'by-mazzeo-ads-latest',
      // the proper extensions will be added
      fileName: 'by-mazzeo-ads-latest-v4'
    }
  },
  define: {
    'process.env': process.env
  }
})
