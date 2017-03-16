let router = require('koa-router')()
let api = require('../api/api.js')

router.get('/bookCategory', api.bookCategory)
      .get('/bookList/:id/:pn', api.bookList)
      .get('/movieList/:city', api.movieList)
      .get('/weixinList/:pno', api.weixinList)

module.exports = router
