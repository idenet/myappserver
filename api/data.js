const axios = require('axios')
const KEY = require('./key')

const HOST_MOVIE = 'http://op.juhe.cn/' // 电影
const HOST_WEIXIN = 'http://v.juhe.cn/' // 微信
const HOST_BOOK = 'http://apis.juhe.cn/' // 图书

const API_TYPE = {
  book: {
    catalog: 'catalog',
    query: 'query'
  },
  movie: {
    pmovie: 'pmovie',
    video: 'video'
  },
  weixin: {
    query: 'query'
  }
}

/**
 * 获取数据
 *
 * @export
 * @param {any} url
 * @returns
 */
function fetch(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        resolve(response.data)
      })
  })
}
// 没有作用？ export function fetchItemByType(type) {   return fetch(`${type}`) }
// book api
function fetchCatelogByType(type, dtype = 'json', key = KEY.BOOK_KEY) {
  return fetch(`http://apis.juhe.cn/goodbook/${type}?dtype=${dtype}&key=${key}`)
}

function fetchBookList(type, id, pn = 0, rn = 10, dtype = 'json', key = KEY.BOOK_KEY) {
  return fetch(`http://apis.juhe.cn/goodbook/${type}?catalog_id=${id}&pn=${pn}&rn=${rn}&dtype=${dtype}&key=${key}`)
}

// movie api
function fetchMovieListByCity(type, dtype = 'json', city = '宁波', key = KEY.MOVIE_KEY) {
  let url = encodeURI(`http://op.juhe.cn/onebox/movie/${type}?dtype=${dtype}&city=${city}&key=${key}`)
  return fetch(url)
}
// weixin api
function fetchWeixinListByPage(type, pno = 1, ps = 10, dtype = 'json', key = KEY.WEIXIN_KEY) {
  return fetch(`http://v.juhe.cn/weixin/${type}?pno=${pno}&ps=${ps}&dtype=${dtype}&key=${key}`)
}

module.exports = {
  fetchCatelogByType,
  fetchBookList,
  fetchMovieListByCity,
  fetchWeixinListByPage,
  API_TYPE
}
