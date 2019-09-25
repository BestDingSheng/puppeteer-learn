/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 17:08:28
 * @LastEditTime: 2019-09-18 23:01:00
 * @LastEditors: Please set LastEditors
 */
var AipOcrClient = require("baidu-aip-sdk").ocr;
// 设置APPID/AK/SK
var APP_ID = "17178293";
var API_KEY = "y6ePmHpqISlKfhEZxCGKctOp";
var SECRET_KEY = "UNlwvx28aBjRFEumcdrUt469fxQvfXjv";
// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

var fs = require('fs');

function imgAI(urlPath) {
    // const urlPath = path.resolve(__dirname, url);
    var image = fs.readFileSync(urlPath).toString("base64");
    // 如果有可选参数
    var options = {};
    options["language_type"] = "CHN_ENG";
    options["detect_direction"] = "true";
    options["detect_language"] = "true";
    options["probability"] = "true";
    options['detect_language'] = 'true';
    // 带参数调用通用文字识别, 图片参数为本地图片
    return new Promise((resolve, reject) => {
        client.generalBasic(image).then(function (result) {
            // console.log(JSON.stringify(result));
            resolve(result);
        }).catch(function (err) {
            // 如果发生网络错误
            reject(err)
            console.log(err);
        });;
    })
}


module.exports = {
    imgAI:imgAI,
}
