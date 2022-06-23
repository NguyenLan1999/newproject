//const books = require('../models/books');
const Book = require('../models/books');

const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    home(req, res, next) {
        Book.find({})

            .then((books) => {
                res.render('home', {
                    books: mutipleMongooseToObject(books),
                });
            })
            .catch(next);
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
