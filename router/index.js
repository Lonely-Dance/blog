//这个文件是用来自动读取路由文件的，自动识别routes中的路由规则，实现路由自动化
const user = require('./routes/user')
const readDir = require('require-directory')
const Router = require('koa-router');
const app = require('../koa')
const visitor = (obj) => {
    //待优化
    if (obj instanceof Router) {
        app.use(obj.routes())
            // }else{
            //     for(let key in obj){

        //     }
        // }
        console.log(obj);
    }
}
readDir(module, './routes/', { visit: visitor })