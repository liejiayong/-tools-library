const config = require('../../config/environment')
const query = require('../../utils/mysql')
const fetch = require('node-fetch')
const moment = require('moment')
const jwt = require('jsonwebtoken')

exports.githubOAuth = async (ctx) => {
  const code = ctx.query.code
  const path = 'https://github.com/login/oauth/access_token'
  const params = {
    client_id: config.oAuth.github.client_id
    , client_secret: config.oAuth.github.client_secret
    , code: code
  }
  // get oauth token
  await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
    .then(res => {
      console.log('res.test()', res.text())
      return res.text()
    })
    .then(body => {
      console.log('body', body)
      const args = body.split('&')
      return args[0].split('=')
    })
    .then(async (token) => {
      const url = `https://api.github.com/user?access_token=${token}&token_type=bearer`

      // get user info
      await fetch(url).then(res => res.json()).then(async (res) => {
        // ctx.body = ctx
        return res.json()
      }).then(async (res) => {
        let userId = 0
        let selectGuest = await query(`SELECT * FROM user WHERE role = 'GUEST' AND userName =?`, [res.login])

        // 判断存在
        if (selectGuest.length >= 0) {
          userId = selectGuest[0].id
          await query(`UPDATE user SET avatar = ?, email = ? WHERE id = ?`, [res.avatar_url, res.email, userId]);
        } else {
          let newGuest = {
            userName: res.login,
            avatar: res.avatar_url,
            email: res.email,
            role: 'GUEST',
            createTime: moment().format('YYYY-MM-DD HH:mm:ss')
          };
          let insertGuest = await query(`INSERT INTO user SET ?`, newGuest);
          if (insertGuest.affectedRows > 0) {
            userId = insertGuest.insertId;
          }
        }

        // 返回数据
        if (userId > 0) {
          ctx.session.user = res.login;
          // 用户token
          const userToken = {
            name: res.login,
            id: userId
          };
          // 签发token
          const token = jwt.sign(userToken, config.tokenSecret, { expiresIn: '2h' });
          ctx.body = {
            success: 1,
            token: token,
            userName: res.login,
            avatar: res.avatar_url,
            message: ''
          };
        } else {
          ctx.body = {
            success: 0,
            token: '',
            message: 'GitHub授权登录失败'
          };
        }
      })
    })
    .catch(err => {
      ctx.body = {
        success: 0,
        token: '',
        message: 'GitHub授权登录失败:' + JSON.stringify(err)
      };
    });
}
