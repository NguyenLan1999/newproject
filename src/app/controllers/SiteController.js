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

    search(req, res, next) {
       
       

        Book.find({ 'name': {'$regex': req.query.q.toLowerCase(),$options:'i'}})
            .then((books) => {
                res.render('search', { books: mutipleMongooseToObject(books)});
            })
            .catch(next);

        
       

    }

}


module.exports = new SiteController();
