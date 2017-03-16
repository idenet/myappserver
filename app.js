const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const cors = require('kcors');

const api = require('./routes/api'); //api

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(cors());

// logger
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


router.use('/api', api.routes()) //api接口路由

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx) {
    console.log(err)
    logger.error('server error', err, ctx);
    ctx.body = '服务器开小差了，请稍后再试！'
});


module.exports = app;
