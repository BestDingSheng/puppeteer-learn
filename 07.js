/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-22 21:37:15
 * @LastEditTime: 2019-09-24 17:30:34
 * @LastEditors: Please set LastEditors
 */
const puppeteer = require('puppeteer');
async function run () {
	const browser = await puppeteer.launch({
		headless:false,
		defaultViewport:{
			width:1280,
			height:800
		}
	})
	const page = await browser.newPage();
	await page.setRequestInterception(true);
	page.on('request', request => {
		const blockTypes = new Set(['image', 'media', 'font']);
		const type = request.resourceType();
		const shouldBlock = blockTypes.has(type);
		if (shouldBlock) {
			request.abort();
		} else {
			request.continue();
		}

	});
	await page.goto('https://t.zhongan.com/group');
}

run();