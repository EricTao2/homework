import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  if (command === 'serve') {
    // 开发服务器配置
    return {
      plugins: [react()],
      base: '/zhangjufang/dev/search/',
      server: {
        host: true
      }
    };
  } else {
    // 正式构建配置
    return {
      plugins: [react()],
      base: '/zhangjufang/prod/search/',
      server: {
        host: true
      }
    };
  }
});
