const KoaRouter = require('koa-router')
const router = new KoaRouter()
const uEmail = require('../../utils/email')
const numRandom = require('number-random')
const MailCode = require('../../db/mail-code')
    // email code
router.get('/email/code', async ctx => {
        // ctx.body = 'login api'
        // 取得email
        //koa 获得参数的方式注意一下
        const email = ctx.query.email;
        const code = numRandom(100000, 999999)
        if (email) {
            uEmail.send(email, code)
            ctx.body = '已发送'
                // 存储数据
            const doc = new MailCode({
                code,
                mail: email
            });
            doc.save().then(res => {
                console.log('保存验证码成功！');
            })

        } else {
            ctx.body = "email 不存在"
        }

    })
    //login
router.get('/login', async ctx => {
        ctx.body = 'login api'
    })
    //register
router.get('/register', async ctx => {
    await ctx.render('register', {
        name: 'Ejs'
    })
})
router.post('/register', async ctx => {
    // ctx.body = 'register api'
    ctx.body = ctx.request.body;
})
router.get('/logout', async ctx => {
    ctx.body = 'logout！'
})
module.exports = router