module.exports = function (app) {
  // 主页
  app.get('/', function (req, res) {
    // res.render('index', { title: 'jy' })
    res.redirect('/posts')
  })

  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'));
  app.use('/comments', require('./comments'));
  app.use('/user', require('./user'));
  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
  // // 注册
  // app.get('/reg', function (req, res) {
  //   res.render('reg', { title: '注册' })
  // })
  // app.post('/reg', function (req, res) {
  // })
  // // 登录
  // app.get('/login', function (req, res) {
  //   res.render('reg', { title: '登录' })
  // })
  // app.post('/login', function (req, res) {
  // })
  // // 发布post
  // app.get('/post', function (req, res) {
  //   res.render('reg', { title: '发表' })
  // })
  // app.post('/post', function (req, res) {
  // })
  // // 登出
  // app.get('/logout', function (req, res) {

  // })
  // // 用户
  // app.get('/:user', function (req, res) {
  //   res.render('user', { name: req.params.user })
  // })
}
