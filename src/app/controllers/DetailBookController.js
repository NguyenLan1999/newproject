
const Book = require('../models/books');

const { mongooseToObject } = require('../../util/mongoose');

class DetailBookController {
    show(req, res, next) {
        const email = req.signedCookies.email
        Book.findOne({ slug: req.params.slug })
            .then((book) => {
                res.render('detailbook/show', { 
                    book: mongooseToObject(book),
                    email: email });
            })

            .catch(next);
    }


   

    //[GET] /detailbook/create
    create(req, res, next) {
        const email = req.signedCookies.email
        if(email){
            res.render('detailbook/create', {
                email: email
            })
        }else{
            req.session.message ={
                type: 'danger',
                intro: 'Thông báo lỗi!',
                message: 'Bạn chưa đăng nhập vào hệ thống!!!!'
            }
            res.redirect('back')
        }
       
    }

     //[POST] /detailbook/store
    store(req, res, next) {
        const email = req.signedCookies.email;
          var img = req.file.path.split('\\').slice(2).join('/')
         // console.log(img)
        const book = new Book({
            name: req.body.name,
            author: req.body.author,
            description: req.body.description,
            introduce: req.body.introduce,
            img: img,
            email: email
        });
        book.save()
            .then(() => {
                req.session.message ={
                    type: 'success',
                    intro: 'Thông báo!',
                    message: 'Bài viết đã được thêm thành công!!!!'
                }
                res.redirect('/')})
            .catch(error=>{

            })
     }

     //[GET] /detailbook/:id/edit
    edit(req, res, next) {

        const email = req.signedCookies.email

        Book.findById(req.params.id)
        .then((book)=>{
            if(!email){
                req.session.message ={
                    type: 'danger',
                    intro: 'Thông báo lỗi!',
                    message: 'Bạn chưa đăng nhập vào hệ thống!!!!'
                }
                //res.render('detailbook/show', { book: mongooseToObject(book) })
                //console.log(email)
                res.redirect('back')
            }else{
               
                res.render('detailbook/edit', { book: mongooseToObject(book), email: email })
            }
        })
       
     }

     //[PUT] /detailbook/:id
    update(req, res, next) {
        const email = req.signedCookies.email;
        var img = req.file.path.split('\\').slice(2).join('/')

        Book.updateOne({ _id: req.params.id }, {
            name: req.body.name,
            author: req.body.author,
            description: req.body.description,
            introduce: req.body.introduce,
            img: img,
            email: email
        })
                .then(()=> {
                    req.session.message ={
                        type: 'success',
                        intro: 'Thông báo!',
                        message: 'Bài viết được cập nhật thành công!!!!'
                    }
                    res.redirect('/')})
                .catch(next)
        // Book.updateOne({ _id: req.params.id }, req.body, {img: img,
        //     email: email})
        //     .then(()=> res.redirect('/'))
        //     .catch(next)
        
     }

      //[DELETE] /detailbook/:id
    delete(req, res, next) {
        const email = req.signedCookies.email;
        // if(email){
        //     Book.deleteOne({ _id: req.params.id })
        //     .then(()=> res.redirect('/'))
        //     .catch(next)
        // }else{
        //     req.session.message ={
        //         type: 'warning',
        //         intro: 'Thông báo lỗi!',
        //         message: 'Bạn chưa đăng nhập vào hệ thống!!!!'
        //     }
        //     Book.findById(req.params.id)
        //     .then((book)=> {
        //         res.render('back', {book: mongooseToObject(book)})
        //     })
        // }

        if(email){
            Book.deleteOne({_id: req.params.id})
            .then(()=> {
                req.session.message ={
                    type: 'success',
                    intro: 'Thông báo!',
                    message: 'Bài viết đã được xóa thành công!!!!'
                }
                res.redirect('/')})
            .catch()
        }else{
            req.session.message ={
                type: 'danger',
                intro: 'Thông báo lỗi!',
                message: 'Bạn chưa đăng nhập vào hệ thống!!!!'
            }
            res.redirect('back')
        }
       
        
     }

}

module.exports = new DetailBookController();
