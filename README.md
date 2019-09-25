<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-15 19:38:50
 * @LastEditTime: 2019-09-25 10:23:23
 * @LastEditors: Please set LastEditors
 -->
# 30分钟快速入门puppeteer

## <a name="README">puppeteer 相关资料</a>

- [本项目代码托管地址](https://github.com/BestDingSheng/puppeteer-learn)
- [puppeteer github ](https://github.com/GoogleChrome/puppeteer)
- [puppeteer 中文文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#/)

## puppeteer 简介

Puppeteer 是 Chrome 开发团队在 2017 年发布的一个 Node.js 包, 用来模拟 Chrome 浏览器的运行。

>  Puppeteer 是一个 Node 库，它提供了一个高级 API 来通过 DevTools 协议控制 Chromium 或 Chrome。Puppeteer 默认以 headless 模式运行，但是可以通过修改配置文件运行“有头”模式。 <a href="#Chromium">Chromium 和 Chrome区别</a>

在学puppeteer之前我们先来了解下 headless chrome

## 什么是 Headless Chrome


- 在无界面的环境中运行 Chrome
- 通过命令行或者程序语言操作 Chrome
- 无需人的干预，运行更稳定
- 在启动 Chrome 时添加参数 --headless，便可以 headless 模式启动 Chrome

```bash
alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"  # Mac OS X 命令别名

chrome --headless --disable-gpu --dump-dom https://www.baidu.com               # 获取页面 DOM

chrome --headless --disable-gpu --screenshot https://www.baidu.com    # 截图

```

 查看更多chrome启动参数 [英文](https://peter.sh/experiments/chromium-command-line-switches/)
 [中文](https://blog.csdn.net/mimishy2000/article/details/88315347)




## puppeteer 能做什么

官方称：“Most things that you can do manually in the browser can be done using Puppeteer”，那么具体可以做些什么呢？

- 网页截图或者生成 PDF
- 爬取 SPA 或 SSR 网站
- UI 自动化测试，模拟表单提交，键盘输入，点击等行为
- 捕获网站的时间线，帮助诊断性能问题
- ......

## puppeteer 结构
![image](https://user-images.githubusercontent.com/746130/40333229-5df5480c-5d0c-11e8-83cb-c3e371de7374.png)

- Puppeteer 使用 DevTools 协议 与浏览器进行通信。
- Browser 实例可以拥有浏览器上下文。
- BrowserContext 实例定义了一个浏览会话并可拥有多个页面。
- Page 至少有一个框架：主框架。 可能还有其他框架由 iframe 或 框架标签 创建。
- frame 至少有一个执行上下文 - 默认的执行上下文 - 框架的 JavaScript 被执行。 一个框架可能有额外的与 扩展 关联的执行上下文。

## puppeteer 运行环境

查看 Puppeteer 的官方 API 你会发现满屏的 async, await 之类，这些都是 ES7 的规范，所以你需要： Nodejs 的版本不能低于 v7.6.0


```bash 
npm install puppeteer 

# or "yarn add puppeteer"

```

Note: 当你安装 Puppeteer 时，它会自动下载Chromium，由于Chromium比较大，经常会安装失败~ 可是使用以下解决方案

- 把npm源设置成国内的源 cnpm taobao 等
- 安装时添加--ignore-scripts命令跳过Chromium的下载  npm install puppeteer --ignore-scripts
- 安装 puppeteer-core 这个包不会去下载Chromium


## puppeteer 基本用法

先打开官方的入门demo

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
```

上面这段代码就实现了网页截图，先大概解读一下上面几行代码：

1. 先通过 puppeteer.launch() 创建一个浏览器实例 Browser 对象
1. 然后通过 Browser 对象创建页面 Page 对象
1. 然后 page.goto() 跳转到指定的页面
1. 调用 page.screenshot() 对页面进行截图
1. 关闭浏览器

是不是觉得好简单？

### puppeteer.launch(options)

options 参数详解


参数名称 |	参数类型 |	参数说明|
---|---| --- |
ignoreHTTPSErrors |	boolean |	在请求的过程中是否忽略 Https 报错信息，默认为 false|
headless  |	boolean |	是否以”无头”的模式运行 chrome, 也就是不显示 UI， 默认为 true|
executablePath |	string |	可执行文件的路劲，Puppeteer 默认是使用它自带的 chrome webdriver, 如果你想指定一个自己的 webdriver 路径，可以通过这个参数设置 |
slowMo |	number |	使 Puppeteer 操作减速，单位是毫秒。如果你想看看 Puppeteer 的整个工作过程，这个参数将非常有用。|
args |	Array(String) |	传递给 chrome 实例的其他参数，比如你可以使用”–ash-host-window-bounds=1024x768” 来设置浏览器窗口大小。 |
handleSIGINT |	boolean |	是否允许通过进程信号控制 chrome 进程，也就是说是否可以使用 CTRL+C 关闭并退出浏览器. |
timeout | number |	等待 Chrome 实例启动的最长时间。默认为30000（30秒）。如果传入 0 的话则不限制时间 |
dumpio |	boolean	| 是否将浏览器进程stdout和stderr导入到process.stdout和process.stderr中。默认为false。|
userDataDir |	string |	设置用户数据目录，默认linux 是在 ~/.config 目录，window 默认在 C:\Users{USER}\AppData\Local\Google\Chrome\User Data, 其中 {USER} 代表当前登录的用户名 |
env |	Object |	指定对Chromium可见的环境变量。默认为process.env。|
devtools |	boolean |	是否为每个选项卡自动打开DevTools面板， 这个选项只有当 headless 设置为 false 的时候有效 |



## 10个demo 告诉你puppeteer如何使用

下面介绍 10 个关于使用 Puppeteer 的用例，并在介绍用例的时候会穿插的讲解一些 API，告诉大家如何使用 Puppeteer：

### 01 获取元素及操作

如何获取元素？

- page.$('#uniqueId')：获取某个选择器对应的第一个元素
- page.$$('div')：获取某个选择器对应的所有元素
- page.$x('//img')：获取某个 xPath 对应的所有元素
- page.waitForXPath('//img')：等待某个 xPath 对应的元素出现
- page.waitForSelector('#uniqueId')：等待某个选择器对应的元素出现

 >Page.$(selector) 获取单个元素，底层是调用的是 document.querySelector() , 所以选择器的 selector 格式遵循 css 选择器规范
 
 >Page.$$(selector) 获取一组元素，底层调用的是 document.querySelectorAll(). 返回 Promise(Array(ElemetHandle)) 元素数组.





```js

const puppeteer = require('puppeteer');

async function run (){
    const browser = await puppeteer.launch({headless:false,defaultViewport:{width:1366,height:768}});
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com');
    const input_area = await page.$("#kw");
    await input_area.type("Hello Wrold");

    const search_btn = await page.$('#su');
    await search_btn.click();

}

run();
```

### 02 获取元素属性

Puppeteer 获取元素属性跟我们平时写前段的js的逻辑有点不一样，按照通常的逻辑，应该是现获取元素，然后在获取元素的属性。但是上面我们知道 获取元素的 API 最终返回的都是 ElemetHandle 对象，而你去查看 ElemetHandle 的 API 你会发现，它并没有获取元素属性的 API.

事实上 Puppeteer 专门提供了一套获取属性的 API， Page.$eval() 和 Page.$$eval()

Page.$$eval(selector, pageFunction[, …args]), 获取单个元素的属性，这里的选择器 selector 跟上面 Page.$(selector) 是一样的。

```js
const value = await page.$eval('input[name=search]', input => input.value);
const href = await page.$eval('#a", ele => ele.href);
const content = await page.$eval('.content', ele => ele.outerHTML);
```

```js
const puppeteer = require('puppeteer');

async function run (){
    const browser = await puppeteer.launch({headless:false,defaultViewport:{width:1366,height:768}});
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com');
    const input_area = await page.$("#kw");
    await input_area.type("Hello Wrold");

    const search_btn = await page.$('#su');
    await search_btn.click();

    await page.waitFor('div#content_left > div.result-op.c-container.xpath-log',{visible:true});

    let resultText = await page.$eval('div#content_left > div.result-op.c-container.xpath-log',ele=> ele.innerText)
    console.log("result Text= ",resultText);

    

}

run();
```

### 03 处理多个元素


```js


const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1280,
      height: 800,
		},
		slowMo: 200,
  });
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com');
  const input_area = await page.$('#kw');
  await input_area.type('Hello Wrold');
  await page.keyboard.press('Enter');
  const listSelector = 'div#content_left > div.result-op.c-container.xpath-log';
  // await page.waitForSelector(listSelector);
  await page.waitFor(3 * 1000);

  const list = await page.$$eval(listSelector, (eles) =>
    eles.map((ele) => ele.innerText)
  );
  console.log('List ==', list);
}

run();

```

### 04 切换frame

一个 Frame 包含了一个执行上下文（Execution Context），我们不能跨 Frame 执行函数，一个页面中可以有多个 Frame，主要是通过 iframe 标签嵌入的生成的。其中在页面上的大部分函数其实是 page.mainFrame().xx 的一个简写，Frame 是树状结构，我们可以通过page.frames()获取到页面所有的 Frame，如果想在其它 Frame 中执行函数必须获取到对应的 Frame 才能进行相应的处理

```js

const puppeteer = require('puppeteer')

async function anjuke(){
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('https://login.anjuke.com/login/form');

    // 切换iframe

    await page.frames().map(frame => {console.log(frame.url())})
    const targetFrameUrl = 'https://login.anjuke.com/login/iframeform'
    const frame =  await page.frames().find(frame => frame.url().includes(targetFrameUrl));
    
    const phone= await frame.waitForSelector('#phoneIpt')
    await phone.type("13122022388")
}

anjuke();
```

### 05 拖拽验证码操作


```js
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

    const div = await frame.waitForSelector('div#nc_1__scale_text > span.nc-lang-cnt');
    const divinfo = await div.boundingBox();

    console.log('divinfo',divinfo)
    for(var i=0;i<divinfo.width;i++){
        await page.mouse.move(spaninfo.x+i,spaninfo.y);
    }
    await page.mouse.up();
}

aliyun();

```

### 06 模拟不同设备


```js
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto('https://www.baidu.com');
  // 其他操作...
  await browser.close();
});
```

### 07 请求拦截

```js

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
	page.on('request', interceptedRequest => {
		const blockTypes = new Set(['image', 'media', 'font']);
		const type = interceptedRequest.resourceType();
		const shouldBlock = blockTypes.has(type);
		if (shouldBlock) {
			interceptedRequest.abort();
		} else {
			interceptedRequest.continue();
		}

	});
	await page.goto('https://t.zhongan.com/group');
}

run();
```

### 08 性能分析

```js

const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.tracing.start({path: 'trace.json'});
    await page.goto('https://t.zhongan.com/group');
    await page.tracing.stop();
    browser.close();
})();
```


### 09 生成pdf

```js

const URL = 'http://es6.ruanyifeng.com';
const puppeteer = require('puppeteer');
const fs = require('fs');

fs.mkdirSync('es6-pdf');

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
})

```


### 10 自动化发布微博 


```js
const puppeteer = require('puppeteer');
const {username,password} = require('./config')

async function run(){
    const browser = await puppeteer.launch({
        headless:false,
        defaultViewport:{width:1200,height:700}, 
        ignoreDefaultArgs:['--enable-automation'],
        slowMo:200,
        args:['--window-size=1200,700']})
    const page = await browser.newPage();

    await page.goto('http://wufazhuce.com/',{waitUntil:'networkidle2'});
    const OneText = await page.$eval('div.fp-one-cita > a',ele=>ele.innerText);
    console.log('OneText:',OneText);


    await page.goto('https://weibo.com/',{waitUntil:'networkidle2'});
    await page.waitFor(2*1000);
    await page.reload();

    const loginUserInput = await page.waitForSelector('input#loginname');
    await loginUserInput.click();
    await loginUserInput.type(username);

    const loginUserPasswdInput = await page.waitForSelector('input[type="password"]');
    await loginUserPasswdInput.click();
    await loginUserPasswdInput.type(password);

    const loginBtn = await page.waitForSelector('a[action-type="btn_submit"]')
    await loginBtn.click();

    const textarea = await page.waitForSelector('textarea[class="W_input"]')
    await textarea.click();
    await textarea.type(OneText);

    const sendBtn = await page.waitForSelector('a[node-type="submit"]');
    await sendBtn.click();
}

run();
```


### 百度cor

- [文字识文档](https://cloud.baidu.com/doc/OCR/s/Ajwvxzibi)

### selenium-webdriver

https://www.npmjs.com/package/selenium-webdriver


### <a name="Chromium">Chromium和Chrome的区别</a>

![image](https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2234873454,3731634468&fm=173&app=25&f=JPEG?w=640&h=382&s=AD26D614423031884C8F18CB030030F8)

Chrome是谷歌的网络浏览器，是目前世界上使用率最高的浏览器，据美国网络通讯流量监测机构估计，截至2018年，Chrome在桌面端占据了66%的市场份额，而在移动端这个数字为50%。Chromium是谷歌主导的开源网络浏览器项目，国内外很多浏览器都是在它的开源代码基础上二次研发的，比较出名的有遨游、360、搜狗、QQ、UC，当然还有“红芯”。

Chromium和Chrome都是由Google研发的浏览器，那么他们两个之间究竟有什么区别或者说联系呢？

Chromium和Chrome的区别：

1、Chromium是谷歌的开源项目，开发者们可以共同去改进它，然后谷歌会收集改进后的Chromium并发布改进后安装包。Chrome不是开源项目，谷歌会把Chromium的东西更新到Chrome中。你也可以这么理解Chromium是体验版，Chrome是正式版；

2、Chromium不用安装，下载下来的是压缩包，解压后直接就可以使用。Chrome需要安装；

3、Chromium功能比Chrome多，因为新功能都是先在Chromium中使用，等完善后才添加到Chrome中。相对的Chrome就要比Chromium稳定很多不容易出错；

4、Chromium不开放自动更新功能，所以用户需手动下载更新，而Chrome则可自动连上Google的服务器更新，但新版的推出很慢。



### <a href="#README">回到顶部</a>

