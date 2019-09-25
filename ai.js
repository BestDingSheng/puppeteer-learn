/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-15 22:05:19
 * @LastEditTime: 2019-09-22 21:27:38
 * @LastEditors: Please set LastEditors
 */
const puppeteer = require('puppeteer');
const path = require('path');
const {imgAI} = require('./ocr/index')

async function run (){
    const browser = await puppeteer.launch({headless:false,defaultViewport:{width:1366,height:768}});
    const page = await browser.newPage();
    await page.goto('http://www.51ym.me/User/Login.aspx');
    await page.waitFor(2*1000);

    const captcha = await page.$("#CaptchaImg"); 

    captcha.screenshot({
        path:'screenshot.png'
    })

    const urlPath = path.resolve(__dirname, './screenshot.png');
    
    await page.waitFor(3*1000);

    try{
        const imgResult = await imgAI(urlPath)
        const {words_result=[]} = imgResult;
        const captchaTxt = words_result.length>0 ? words_result[0].words: '';
        console.log(captchaTxt);
        await page.evaluate((a)=>{
            alert(`当前验证码是----${a}`)
        },captchaTxt)
    }catch(e){
       await page.evaluate(()=>{
            alert('识别失败')
        })
    }
    
}

run();