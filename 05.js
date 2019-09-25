/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-15 22:15:09
 * @LastEditTime: 2019-09-24 17:10:39
 * @LastEditors: Please set LastEditors
 */
const puppeteer = require('puppeteer')

async function aliyun(){
    const browser = await puppeteer.launch({headless:false,ignoreDefaultArgs:['--enable-automation']});
    const page = await browser.newPage();
    await page.goto('https://account.aliyun.com/register/register.htm',{waitUntil:"networkidle2"});

    const frame = await page.frames().find(frame=>{
        console.log(frame.url())
        return frame.url().includes('https://passport.aliyun.com/member/reg/fast/fast_reg.htm')

    })

    const span = await frame.waitForSelector('#nc_1_n1z');
    const spaninfo = await span.boundingBox();
    console.log('spaninfo',spaninfo)
    
    await page.mouse.move(spaninfo.x,spaninfo.y);
    await page.mouse.down();

    const div = await frame.waitForSelector('div#nc_1__scale_text');
    const divinfo = await div.boundingBox();

    console.log('divinfo',divinfo)
     await page.mouse.move(610,spaninfo.y,{
         steps: 100
     });
    // for(var i=0;i<divinfo.width;i++){
    //     await page.mouse.move(spaninfo.x+i,spaninfo.y);
    // }
    await page.mouse.up();
}

aliyun();