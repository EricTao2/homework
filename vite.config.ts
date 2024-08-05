/// <reference types="vitest" />
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  let configRes = {
    plugins: [react()],
    server: {
      host: true
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      include: ['__test__/**/*.test.{js,jsx,ts,tsx}'],
      coverage: {
        exclude: ['src/assets', 'src/main.tsx', 'src/vite-env.d.ts', 'src/types'],
        include: ['src/**/*.ts', 'src/**/*.tsx'] // 只包含 src 目录下的文件进行覆盖率计算
      }
    }
  };
  if (command === 'serve') {
    // 开发服务器配置
    configRes = {
      ...configRes,
      ...{
        base: '/zhangjufang/dev/search/'
      }
    };
  } else {
    configRes = {
      ...configRes,
      ...{
        base: '/zhangjufang/prod/search/'
      }
    };
  }
  return configRes;
});
