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
            text: `您的邮箱验证码是： ${code}`,
            html: `<b>您的邮箱验证码是：${code}</b>`
        })
    }
}