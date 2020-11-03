const koa = require('koa') //这是一个node的框架
const app = new koa;
const conf = require('./config')
    //响应的信息
app.use(ctx => {
        ctx.body = 'hello my coding world'
    })
    //启动node index.js 的时候出现的代码
app.listen(conf.server.PORT, () => {
        console.log(`server running at http://localhost:${conf.server.PORT}`);
    })
    //但是每次修改 代码都需要使用node index.js 很麻烦，就安装nodemon 在json中配置只需要一次npm run serve 即可自动执行文件