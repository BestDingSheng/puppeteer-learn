/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-22 12:27:49
 * @LastEditTime: 2019-09-24 18:40:23
 * @LastEditors: Please set LastEditors
 */
const {Builder, By, Key, until} = require('selenium-webdriver');
 
(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  // let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://www.baidu.com');
    const searchInput = await driver.findElement(By.id('kw'))
    await searchInput.sendKeys('hello world', Key.RETURN);
    await driver.wait(until.elementLocated(By.css('#content_left > div')), 10000);
    const listItem =  await driver.findElements(By.css('#content_left > div'))
    listItem.forEach(async (item)=>{
        try{
            const itemTxt = await item.getText()
            console.log(itemTxt)
        }catch(e){
            console.log(e)
        }
    })
  } finally {
    // await driver.quit();
  }
})();