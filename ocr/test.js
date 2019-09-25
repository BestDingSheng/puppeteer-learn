/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 20:21:55
 * @LastEditTime: 2019-09-18 23:11:59
 * @LastEditors: Please set LastEditors
 */
const {imgAI} = require('./index');
const path = require('path');

const imgPath = path.resolve(__dirname,'./testImg.png');

async function run () {
   let result = await imgAI(imgPath);
   console.log(result);
}

run()