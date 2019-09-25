/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-22 22:03:19
 * @LastEditTime: 2019-09-24 18:58:24
 * @LastEditors: Please set LastEditors
 */

const URL = 'http://es6.ruanyifeng.com';
const puppeteer = require('puppeteer');
const process = require('child_process');
const fs = require('fs');

process.exec('rm -rf es6-pdf',function (error, stdout, stderr) {
    console.log(error);
  if (error) {
    console.error(`执行的错误: ${error}`);
    return;
  } else {
    fs.mkdirSync('es6-pdf');
  }
});

(async () => {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto(URL);
  await page.waitFor(5000); // 等待五秒，确保页面加载完毕
  // 获取左侧导航的所有链接地址及名字
  let aTags = await page.evaluate(() => {
    let eleArr = [...document.querySelectorAll('#sidebar ol li a')];
    return eleArr.map((a) =>{
        return {
          href: a.href.trim(),
          name: a.text
        }
    });
  });

   // 先将本页保存成pdf，并关闭本页
  console.log('正在保存：0.' + aTags[0].name);
  await page.pdf({path: `./es6-pdf/0.${aTags[0].name}.pdf`});

  // 遍历节点数组，逐个打开并保存 (此处不再打印第一页)
  for (let i = 1, len = aTags.length; i < len; i++) {
    let a = aTags[i];
    console.log('正在保存：' + i + '.' + a.name);
    page = await browser.newPage();
    await page.goto(a.href);
    await page.waitFor(5000);
    await page.pdf({path: `./es6-pdf/${i + '.' + a.name}.pdf`});
  }
  browser.close();
})();
