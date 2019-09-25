/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-24 17:16:33
 * @LastEditTime: 2019-09-24 17:16:33
 * @LastEditors: your name
 */
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();