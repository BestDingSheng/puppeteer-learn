/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-15 22:24:00
 * @LastEditTime: 2019-09-24 17:29:44
 * @LastEditors: Please set LastEditors
 */
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

puppeteer.launch({headless: false}).then(async browser => {
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto('https://www.baidu.com');
  // 其他操作...
  await browser.close();
});