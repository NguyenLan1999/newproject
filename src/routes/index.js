const bookRouter = require('./books');
const detailbookRouter = require('./detailBooks');
const siteRouter = require('./site');

function route(app) {
    app.use('/books', bookRouter);
    app.use('/detailBook', detailbookRouter);
    app.use('/', siteRouter);
}

module.exports = route;
