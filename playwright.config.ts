import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './__uitests__',
  timeout: 30000,
  use: {
    headless: false, // 保持 headless 为 false 以便调试
    baseURL: 'https://365.kdocs.cn/zhangjufang/dev/search/',
    viewport: {width: 2560, height: 1600},
    actionTimeout: 0,
    trace: 'on',
    launchOptions: {
      proxy: {
        server: '127.0.0.1:8899'
      }
    }
  },
  workers: 1, // 设置单线程工作模式
  reporter: [
    ['html', {outputFolder: 'test-results/html-report'}],
    ['list'] // 添加一个默认的报告类型
  ],
  outputDir: 'test-results/output', // 将测试结果的输出目录设置为不同的路径
  retries: 2 // 测试失败后的重试次数
});
