# 搭建一个博客（管理）系统

### 使用Vue、node、koa 、ejs、mongoose等技术实现博客系统的开发
1、每次修改代码都需要使用node index.js 很麻烦，就安装nodemon 在json中配置只需要一次npm run serve 即可自动执行文件
2、使用koa-router 和 require-directory 实现路由自动化。
3、koa2中使用ejs模板引擎，安装koa-views/ejs，注意路由放 require('koa-views')后面，否则会报错。
```js
//文件也要引入正确
const views = require('koa-views')
    //写路径要写对，否则找不到文件
    //配置使用html类型的文件
app.use(views('./views/', {
        map: {
            html: 'ejs'
        }
    }))
```html
register.html:
```
<body>
   hello <%= name %>
</body>
```

路由配置：
```js
//register
router.get('/register', async ctx => {
    await ctx.render('register', {
        name: 'Ejs'
    })
})
```
4、使用axios获取请求
注意get 和post的使用场景，要使用参数的时候使用params 传递

```js
   //注意get方法，传递参数的时候使用params
            axios.get('/email/code', {
                    params: {
                        email: em.value,
                    }

                })
```
发送邮件的方式————使用nodemailer插件，设置接收方和发送方

```js
const nodemailer = require('nodemailer')
    //创建一个发送人
    // const self = {uers:'1624704720@qq.com', pass:'BeConfidence4$s'}
const self = { user: 'youeryouxi@126.com', pass: 'XMCBRKROYADUTBKX' }

module.exports = {
    async send(address, code) {
        let transporter = nodemailer.createTransport({
            host: "smtp.126.com",
            port: 465,
            secure: true,
            auth: {
                user: self.user,
                pass: self.pass
            },
        });
        //接收方
        let info = await transporter.sendMail({
            from: '"Sera Ren" <youeryouxi@126.com> ',
            to: address || `1624704720@qq.com`,
            subject: "你的验证码是：" + code,
            text: `您的邮箱验证码是 + ${code}`,
            html: `<b>您的邮箱验证码是 + ${code}</b>`
        })
    }
}
```


5、实现发送随机验证码——安装number-random
实现六位数的随机数：numRandom(100000, 999999)

6、使用mongodb连接数据库
先安装mongoose插件，建立一个文件夹db，写入基本的数据库连接操作

```js
const mongoose = require('mongoose')
    //连接数据库的固定写法
const db = mongoose.connect('mongodb://localhost:27017/myblog', {
    NewUrlParser: true
})
db.then(res => {
    console.log('数据库连接成功');
})
```

根据不同的数据写不同的数据模型，建立不同的数据库;

```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// 定义数据模型
var EmailCodeSchema = new Schema({
    code: String,
    mail: String,
});
// 操作数据库,通过model实现DRUD                                      
module.exports = mongoose.model('mailcode', EmailCodeSchema)
```
```js
     // 存储数据
            const doc = new MailCode({
                code,
                mail: email
            });
            doc.save().then(res => {
                console.log('保存验证码成功！');
            })

```
在router文件中发起请求时操作数据时存储数据即可

