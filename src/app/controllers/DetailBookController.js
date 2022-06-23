//const books = require('../models/books');
const Book = require('../models/books');

const { mongooseToObject } = require('../../util/mongoose');

class DetailBookController {
    show(req, res, next) {
        Book.findOne({ slug: req.params.slug })
            .then((book) => {
                res.render('detailbook/show', { book: mongooseToObject(book) });
            })

            .catch(next);
    }

    //[GET] /detailbook/create
    create(req, res, next) {
       res.render('detailbook/create')
    }

     //[POST] /detailbook/store
    store(req, res, next) {
        const book = new Book(req.body);
        book.save()
            .then(() => res.redirect('/'))
            
            .catch(error=>{

            })
     }

     //[GET] /detailbook/:id/edit
    edit(req, res, next) {
        Book.findById(req.params.id)
        .then((book)=> {
            res.render('detailbook/edit', {book: mongooseToObject(book) })
        })
        .catch(next)
        
     }

     //[PUT] /detailbook/:id
    update(req, res, next) {
        Book.updateOne({ _id: req.params.id }, req.body)
            .then(()=> res.redirect('/'))
            .catch(next)
        
     }

      //[DELETE] /detailbook/:id
    delete(req, res, next) {
        Book.deleteOne({ _id: req.params.id })
            .then(()=> res.redirect('/'))
            .catch(next)
        
     }

}

module.exports = new DetailBookController();
