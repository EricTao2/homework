import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './__uitests__',
  timeout: 30000,
  use: {
    headless: true,
    baseURL: 'https://365.kdocs.cn/zhangjufang/dev/search/',
    viewport: {width: 2560, height: 1600},
    actionTimeout: 0,
    trace: 'on',
    launchOptions: {
      headless: false,
      proxy: {
        server: '127.0.0.1:8899'
      }
    }
  },
  workers: 1, // 设置单线程工作模式
  reporter: [['html', {outputFolder: 'test-results/html-report'}]]
  //   retries: 2, // 测试失败后的重试次数
});
