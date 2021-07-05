// 静态资源服务器
const express = require('express');
const app = express();
// 调用app.use()  作用是当有请求进来的时候，先通过app.use去处理
// app.use(express.static('src'));
// express.static()作用是指定静态资源所在的文件夹

// 当我们访问html css js这些请求的时候，会自动到指定的文件夹中访问页面


// 静态资源托管的时候，还可以给app.use添加一个虚拟目录
// 静态资源托管可以托管多个静态资源目录，，多个静态资源托管按顺序执行，
app.use('/public', express.static('src'))
app.listen(3003);