// const koa = require('koa') //这是一个node的框架
// const app = new koa;
const app = require('./koa')
const conf = require('./config')
    // 引入数据库文件
const db = require('./db/index')
    // 处理post请求传入的参数，可以返回到前端页面
const bodyParse = require('koa-bodyparser')
app.use(bodyParse())
    //文件也要引入正确
const views = require('koa-views')
    //写路径要写对，否则找不到文件
    //配置使用html类型的文件
app.use(views('./views/', {
        map: {
            html: 'ejs'
        }
    }))
    //路由放 require('koa-views')后面，否则会报错
const router = require('./router')

//响应的信息
app.use(ctx => {
        ctx.body = 'hello my coding world'
    })
    //启动node index.js 的时候出现的代码
app.listen(conf.server.PORT, () => {
        console.log(`server running at http://localhost:${conf.server.PORT}`);
    })
    //但是每次修改 代码都需要使用node index.js 很麻烦，就安装nodemon 在json中配置只需要一次npm run serve 即可自动执行文件