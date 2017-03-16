const data = require('./data')

const bookCategory = async(ctx, next) => {
  let response = await data.fetchCatelogByType(data.API_TYPE.book.catalog)
  ctx.body = response
}

const bookList = async(ctx, next) => {
  let arr = ctx
    .url
    .split('/')
  let book = {
    catalogId: arr[arr.length - 2],
    pn: arr[arr.length - 1]
  }
  let response = await data.fetchBookList(data.API_TYPE.book.query, book.catalogId, book.pn)
  ctx.body = response
}

const movieList = async(ctx, next) => {
  let arr = ctx
    .url
    .split('/')
  ctx.body = await data.fetchMovieListByCity(data.API_TYPE.movie.pmovie, arr[arr.length - 1])
}

const weixinList = async(ctx, next) => {
  let arr = ctx
    .url
    .split('/')
  ctx.body = await data.fetchWeixinListByPage(data.API_TYPE.weixin.query, arr[arr.length - 1])
}
module.exports = {
  bookCategory,
  bookList,
  movieList,
  weixinList
}