/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-15 22:07:32
 * @LastEditTime: 2019-09-24 18:37:14
 * @LastEditors: Please set LastEditors
 */
const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1280,
      height: 800,
    },
    // executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
		slowMo: 200,
  });
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com');
  const input_area = await page.$('#kw');
  await input_area.type('Hello Wrold');
  await page.keyboard.press('Enter');
  const listSelector = 'div#content_left > div.result-op.c-container.xpath-log';
  // await page.waitForSelector(listSelector);
  await page.waitFor(3 * 1000);

  const list = await page.$$eval(listSelector, (eles) =>
    eles.map((ele) => ele.innerText)
  );
  console.log('List ==', list);
}

run();
