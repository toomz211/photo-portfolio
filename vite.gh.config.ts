import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * GitHub Pages 专用构建配置：
 * - 不启用妙搭托管输出分层（miaodaOutputPlugin），产物为标准 dist（assets 与 public 同源平铺）
 * - base 指向仓库子路径 /photo-portfolio/，资源与路由均以该前缀归一
 */
const repoBase = '/photo-portfolio/';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: repoBase,
  define: {
    'import.meta.env.MIAODA_CLIENT_BASE_PATH': JSON.stringify(repoBase),
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist-gh',
  },
});
