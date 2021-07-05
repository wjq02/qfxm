// 静态资源服务器代码整理
const fs = require('fs')
require('http').createServer((req, res) => {
    // if (req.url === '/favicon.ico') {
    //     let data = fs.readFileSync('./favicon.ico')
    //     res.end(data)
    // } else {
    // let data = fs.readFileSync('.' + req.url)
    // res.end(data)
    // }



    if (fs.existsSync('.' + req.url)) {
        let data = fs.readFileSync('.' + req.url)
        res.end(data)
    } else {
        // 文件不存在
        res.statusCode = 404
        res.statusMessage = 'file is not found'
        res.setHeader('content-type', 'text/html;charset=utf8')
        let html = `
        <h1>404页面</h1>
        <p>页面不存在</p>
      `
        res.end(html)
    }
}).listen(3000)