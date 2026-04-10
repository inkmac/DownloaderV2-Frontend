import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from "vite-plugin-singlefile";
import copy from 'rollup-plugin-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteSingleFile(),
    copy({
      targets: [
        {
          src: 'dist/index.html',   // 前端单文件
          dest: '../downloader_backend/static' // 后端目录
        }
      ],
      hook: 'closeBundle', // 构建完成后执行
      verbose: true        // 显示复制成功日志
    })
  ],
  build: {
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,

    rollupOptions: {
      output: {
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
