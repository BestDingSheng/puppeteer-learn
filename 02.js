/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-15 22:05:56
 * @LastEditTime: 2019-09-24 16:55:11
 * @LastEditors: Please set LastEditors
 */
const puppeteer = require('puppeteer');

async function run (){
    const browser = await puppeteer.launch({headless:false,defaultViewport:{width:1366,height:768}});
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com');
    const input_area = await page.$("#kw");
    await input_area.type("Hello Wrold");

    const search_btn = await page.$('#su');
    await search_btn.click();

    await page.waitForSelector('div#content_left > div.result-op.c-container.xpath-log');

    let resultText = await page.$eval('div#content_left > div.result-op.c-container.xpath-log',ele=> ele.innerText)
    console.log("result Text= ",resultText);
}

run();