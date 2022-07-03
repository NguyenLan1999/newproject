
const Book = require('../models/books');

const { mongooseToObject } = require('../../util/mongoose');

class BooksController {
    index(req, res) {
        res.render('books');
    }

    
}

module.exports = new BooksController();
