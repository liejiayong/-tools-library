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
}
