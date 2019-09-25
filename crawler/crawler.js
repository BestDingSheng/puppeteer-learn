/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 22:03:28
 * @LastEditTime: 2019-09-24 17:28:59
 * @LastEditors: Please set LastEditors
 */
const puppeteer = require('puppeteer');

async function run() {
	const browser = await puppeteer.launch({
		headless: false,
		timeout: 0,
	});
	const page = await browser.newPage();
	page.goto('https://juejin.im/', {
		timeout: 0
	});
	// await page.waitForNavigation()]
	const selectorA = '#juejin > div.view-container > main > div > div > div.feed.welcome__feed > ul > li > div > div > a > div > div.info-box > div.info-row.title-row > a';
	await page.waitForSelector(selectorA);
	const dataList = await page.$$eval(selectorA, eles => {
		return eles.map(ele => ({
			href: ele.href,
			title: ele.innerHTML
		}))
	});
	console.log(dataList);
}

run()