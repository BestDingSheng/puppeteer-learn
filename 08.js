/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-22 21:51:14
 * @LastEditTime: 2019-09-22 21:52:52
 * @LastEditors: Please set LastEditors
 */
const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.tracing.start({path: 'trace.json'});
    await page.goto('https://t.zhongan.com/group');
    await page.tracing.stop();
    browser.close();
})();