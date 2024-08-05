import {test, expect} from '@playwright/test';

test('test', async ({page}) => {
  await page.goto('https://365.kdocs.cn/zhangjufang/dev/search/');
  await page.locator('html').click({
    button: 'right'
  });
  await page.goto('https://365.kdocs.cn/zhangjufang/dev/search/');
  await page.getByPlaceholder('通过文件名、正文、创建者搜索文档').click();
  await page.getByPlaceholder('通过文件名、正文、创建者搜索文档').fill('1');
  await page.getByText('正文').click();
  await page.getByText('文件名').click();
  await page.getByText('正文').click();
  await page.getByPlaceholder('1').click();
  await page.getByPlaceholder('1').fill('12');
});
