// 创建静态服务器
// 1.导入模块
const http = require("http")
const fs = require('fs')
    // 2.创建服务器
const server = http.createServer((req, res) => {

    // 找到每次请求的区别   请求路径  req.url
    console.log(req.url);
    // 根据不同的请求路径，读取不同的文件，相应到客户端
    // 过滤掉网站图标请求
    if (req.url === '/favicon.ico') {
        res.end()
    } else {
        // 对每个请求路径做判断
        // if (req.url === '/src/index.html') {
        //     // 读取对应的文件
        //     let html = fs.readFileSync('./src/index.html')
        //         // 为了让数据更好的显示  设置响应头  文件类型
        //     res.setHeader('content-text', "text/html")
        //         // 相应读取的buffer
        //     res.end(html)
        // }
        // 刚开始响应html的时候，浏览器会一直没有停止，因为html中使用link、script、img标签,这些标签会自动发出请求，这些请求也需要处理，否则html页面就不完整
        // else if (req.url === '/node_modules/jquery/dist/jquery.min.js') {
        //     let css = fs.readFileSync('./node_modules/jquery/dist/jquery.min.js')
        //     res.end(css)
        // } else if (req.url === '/node_modules/bootstrap/dist/css/bootstrap.css') {
        //     let css = fs.readFileSync('./node_modules/bootstrap/dist/css/bootstrap.css')
        //     res.end(css)
        // } else if (req.url === '/src/images/002-web.jpg') {
        //     let jpg = fs.readFileSync('./src/images/002-web.jpg')
        //     res.end(jpg)
        // }


        //包含node_modules请求路径的请求，读取路径比请求路径多
        // 一次性将带有node_modules请求路径处理
        // else if (req.url.includes('/node_modules')) {
        //     let data = fs.readFileSync('.' + req.url)
        //     res.end(data)
        // } else if (req.url.includes('/images')) {
        //     let data = fs.readFileSync('.' + req.url)
        //     res.setHeader('content-type', "image/jpeg")
        //     res.end(data)
        // } else if (req.url.includes('/js')) {
        //     let data = fs.readFileSync('.' + req.url)
        //     res.setHeader('content-type', "application/javescript")
        //     res.end(data)
        // } else if (req.url.includes('/css')) {
        //     let data = fs.readFileSync('.' + req.url)
        //     res.setHeader('content-type', "text/css")
        //     res.end(data)
        // }


        let data = fs.readFileSync('.' + req.url)
        res.end(data)

    }
    // end方法可以接受的参数：字符串/buffer
    // res.end("111")
})

//3.监听端口
server.listen(3000)