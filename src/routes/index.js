const bookRouter = require('./books');
const detailbookRouter = require('./detailBooks');
const siteRouter = require('./site');
const userRouter = require('./user')


function route(app) {
    app.use('/user', userRouter)
    app.use('/books', bookRouter);
    app.use('/detailBook', detailbookRouter);
    app.use('/', siteRouter);
}

module.exports = route;
