var express = require('express')
var router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin


router.post('/', checkLogin, function (req, res, next) {
  res.send('用户主页')
})

module.exports = router