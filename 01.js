/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-15 22:05:19
 * @LastEditTime: 2019-09-24 17:18:59
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
}

run();