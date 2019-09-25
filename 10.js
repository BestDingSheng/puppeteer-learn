/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-15 22:28:55
 * @LastEditTime: 2019-09-24 19:07:02
 * @LastEditors: Please set LastEditors
 */
const puppeteer = require('puppeteer');
const {
	username,
	password
} = require('./config')

async function run() {
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: {
			width: 1380,
			height: 800
		},
		ignoreDefaultArgs: ['--enable-automation'],
		args: ['--start-fullscreen'],
		slowMo: 200,
	})
	const page = await browser.newPage();

	await page.goto('http://wufazhuce.com/', {
		waitUntil: 'networkidle2',
		timeout:0,
	});
	const OneText = await page.$eval('div.fp-one-cita > a', ele => ele.innerText);
	console.log('OneText:', OneText);


	await page.goto('https://weibo.com/', {
		waitUntil: 'networkidle2'
	});
	await page.waitFor(10 * 1000);
	// await page.reload();

	const loginUserInput = await page.waitForSelector('input#loginname');
	await loginUserInput.click();
	await loginUserInput.type(username);

	const loginUserPasswdInput = await page.waitForSelector('input[type="password"]');
	await loginUserPasswdInput.click();
	await loginUserPasswdInput.type(password);
	
	const loginBtn = await page.waitForSelector('a[action-type="btn_submit"]')
	await loginBtn.click();

	await page.waitFor(3 * 1000);
	const errorSelector = await page.$('.layer_mini_info');
	console.log(errorSelector)
	if (errorSelector){
	const loginUserInput = await page.waitForSelector('input#loginname');
	await loginUserInput.click();
	await page.$eval('input#loginname',ele=> ele.value='');
	await loginUserInput.type(username);

	const loginUserPasswdInput = await page.waitForSelector('input[type="password"]');
	await loginUserPasswdInput.click();
	await page.$eval('input[type="password"]',ele=> ele.value='');
	await loginUserPasswdInput.type(password);
	const loginBtn = await page.waitForSelector('a[action-type="btn_submit"]')
	await loginBtn.click();
	}

	// layer_mini_info 错误提示
	
	const textarea = await page.waitForSelector('textarea[class="W_input"]')
	await textarea.click();
	await textarea.type(OneText);

	const sendBtn = await page.waitForSelector('a[node-type="submit"]');
	await sendBtn.click();
}

run();