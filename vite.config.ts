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
