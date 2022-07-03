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
        const email = req.signedCookies.email
        if(email){
            res.render('detailbook/create')
        }else{
            res.redirect('/')
        }
       
    }

     //[POST] /detailbook/store
    store(req, res, next) {
        const email = req.signedCookies.email;
        console.log(req.file.path.split('/'))
         //var img = req.file.path.split('/').slice(3).join('/')
         //console.log(img)
        // const book = new Book({
        //     name: req.body.name,
        //     author: req.body.author,
        //     description: req.body.description,
        //     introduce: req.body.introduce,
        //     img: img,
        //     email: email
        // });
        // book.save()
        //     .then(() => res.redirect('/'))
        //     .catch(error=>{

        //     })
     }

     //[GET] /detailbook/:id/edit
    edit(req, res, next) {

        const email = req.signedCookies.email
        if(email){
            Book.findById(req.params.id)
            .then((book)=> {
                res.render('detailbook/edit', {book: mongooseToObject(book) })
            })
            .catch(next)    
        }else{
            Book.findById(req.params.id)
            .then((book)=> {
                res.render('detailbook/show', {book: mongooseToObject(book)})
            })
            //res.render('detailbook/show', {book: mongooseToObject(book)}, {message: 'Bạn cần phải đăng nhập vào hệ thống!!!!!' })

        }
       
     }

     //[PUT] /detailbook/:id
    update(req, res, next) {
        
        Book.updateOne({ _id: req.params.id }, req.body)
            .then(()=> res.redirect('/'))
            .catch(next)
        
     }

      //[DELETE] /detailbook/:id
    delete(req, res, next) {
        const email = req.signedCookies.email;
        if(email){
            Book.deleteOne({ _id: req.params.id })
            .then(()=> res.redirect('/'))
            .catch(next)
        }else{
            Book.findById(req.params.id)
            .then((book)=> {
                res.render('detailbook/show', {book: mongooseToObject(book)})
            })
        }
       
        
     }

}

module.exports = new DetailBookController();
