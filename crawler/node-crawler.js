/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 21:46:33
 * @LastEditTime: 2019-09-24 19:12:08
 * @LastEditors: Please set LastEditors
 */

 

var express = require('express');
var app = express();
var cheerio = require('cheerio');
const axios = require('axios');

app.get('/', function (req, res) {
  // axios.get('https://juejin.im/').then(resp => {
  //   const {
  //     status,
  //     data
  //   } = resp;
  //   if (status) {
  //     var $ = cheerio.load(data); //当前的$符相当于拿到了所有的body里面的选择器
  //     const selectorA = '#juejin > div.view-container > main > div > div > div.feed.welcome__feed > ul > li > div > div > a > div > div.info-box > div.info-row.title-row > a'
  //     var navText = $(selectorA).html(); //拿到导航栏的内容
  //     console.log(navText)
  //     res.send(navText || '没有获取到内容');
  //   }
  // })

  
  const params = {
    "operationName": "",
    "query": "",
    "variables": {
      "first": 20,
      "after": "",
      "order": "POPULAR"
    },
    "extensions": {
      "query": {
        "id": "21207e9ddb1de777adeaca7a2fb38030"
      }
    }
  }

  axios({
    method: 'post',
    url: 'https://web-api.juejin.im/query',
    data: params,
    headers: {
      'Content-Type': 'application/json',
      'X-Agent': 'Juejin/Web',
    }
  }).then(resp => {
    const { status, data } = resp;
    if (status) {
      const edges = data.data.articleFeed.items.edges;
      const resultData = edges.map(item => {
        const { node: { title,  originalUrl } } = item;
        return {
          title,
          href: originalUrl
        };
      });
      console.log(resultData);
       res.json({ data: resultData });
    };
  })

});
app.listen(3000);