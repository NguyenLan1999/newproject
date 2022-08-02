
const Book = require('../models/books');
const Comment = require('../models/comments');
const { mongooseToObject } = require('../../util/mongoose');
const { Result } = require('express-validator');



class DetailBookController {
    show(req, res, next) {
        const email = req.signedCookies.email
        //const records = []
         var isTrue = true
         
            Book.findOne({ slug: req.params.slug })
            .populate({path: 'declaim'})
           
            
            .then((book) => {
                //console.log(records)
                //console.log(book.declaim)
                if(book.email === email){
                    
                    res.render('detailbook/show', { 
                                book: mongooseToObject(book),
                                email: email, 
                                isTrue: isTrue,
                            });
                           
                }
                else{
                    res.render('detailbook/show', {
                        book: mongooseToObject(book),
                        email: email,
                    })
                }
                
                
            })

            .catch(next)

           
    }


   

    //[GET] /detailbook/create
    create(req, res, next) {
        const email = req.signedCookies.email
        if(email){
            res.render('detailbook/create', {
                email: email
            })
        }
        
       
    }

     //[POST] /detailbook/store
    store(req, res, next) {
        const email = req.signedCookies.email;
        const name= req.body.name
        const author = req.body.author
        const introduce= req.body.introduce
        const description = req.body.description
        var img = req.file

        if(name){
            if(img){
                img = img.path.split('\\').slice(2).join('/')
                let book = new Book({
                    name: name,
                    author: author,
                    description: description,
                    introduce: introduce,
                    img: img,
                    email: email,
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
            }else{
                let book = new Book({
                    name: name,
                    author: author,
                    description: description,
                    introduce: introduce,
                    email: email,
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
            //var img = req.file.path.split('\\').slice(2).join('/')
          
         // console.log(img)
            
            }else{
                req.session.message ={
                    type: 'danger',
                    intro: 'Thông báo lỗi!',
                    message: 'Vui lòng trường tên sách không được để trống!!!!'
                }
                res.redirect('back')
            }
        
        
     }

     //[GET] /detailbook/:id/edit
    edit(req, res, next) {

        const email = req.signedCookies.email
        //const id= req.signedCookies._id
        Book.findById(req.query.id)
        .then((book)=>{
           
                res.render('detailbook/edit', { book: mongooseToObject(book),  email: email })
        })
       
     }

     //[PUT] /detailbook/:id
    update(req, res, next) {
        const email = req.signedCookies.email;
        //const id= req.signedCookies._id
        var img = req.body.img
        if(img){
            img = img.path.split('\\').slice(2).join('/')
            Book.updateOne({ _id: req.params.id }, {
                name: req.body.name,
                author: req.body.author,
                description: req.body.description,
                introduce: req.body.introduce,
                img: img,
                email: email,
            })
                    .then(()=> {
                        req.session.message ={
                            type: 'success',
                            intro: 'Thông báo!',
                            message: 'Bài viết được cập nhật thành công!!!!'
                        }
                        res.redirect('/')})
                    .catch(next)
        }else{
            
            Book.updateOne({ _id: req.params.id }, {
                name: req.body.name,
                author: req.body.author,
                description: req.body.description,
                introduce: req.body.introduce,
                
                email: email,
            })
                    .then(()=> {
                        req.session.message ={
                            type: 'success',
                            intro: 'Thông báo!',
                            message: 'Bài viết được cập nhật thành công!!!!'
                        }
                        res.redirect('/')})
                    .catch(next)
        }
        //var img = req.file.path.split('\\').slice(2).join('/')

        // Book.updateOne({ _id: req.params.id }, {
        //     name: req.body.name,
        //     author: req.body.author,
        //     description: req.body.description,
        //     introduce: req.body.introduce,
        //     img: img,
        //     email: email,
        // })
        //         .then(()=> {
        //             req.session.message ={
        //                 type: 'success',
        //                 intro: 'Thông báo!',
        //                 message: 'Bài viết được cập nhật thành công!!!!'
        //             }
        //             res.redirect('/')})
        //         .catch(next)
        
     }

      //[DELETE] /detailbook/:id
    delete(req, res, next) {
        const email = req.signedCookies.email;
        //const id= req.signedCookies._id

        if(email){
            Book.deleteOne({_id: req.params.id})
            .then(()=> {
                req.session.message ={
                    type: 'success',
                    intro: 'Thông báo!',
                    message: 'Bài viết đã được xóa thành công!!!!'
                }
                res.redirect('/')})
            .catch(next)
        
        }
       
        
     }

    commentPost(req, res, next){
        const email = req.signedCookies.email;
        const bookId = req.params.id;
        const content = req.body.content;
       
        if(email){
            if(content){
                const comment = new Comment({
                    email: email,
                    // bookId: bookId,
                    content: content
                });
                comment.save((err, result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        Book.findByIdAndUpdate(req.params.id,
                             { $push:{declaim: result}}).exec()
                        res.redirect('back')
                    }
                    
                })
            }else{
                req.session.message ={
                    type: 'danger',
                    intro: 'Thông báo lỗi!',
                    message: 'Vui lòng nhập lại bình luận!!!!'
                }
                res.redirect('back')
            }
            
        }
        else{
            req.session.message ={
                        type: 'danger',
                        intro: 'Thông báo lỗi!',
                        message: 'Bạn cần đăng nhập vào hệ thống để thực hiện chức năng!!!!'
                    }
                    res.redirect('back')
        }
        


       }
      

}

module.exports = new DetailBookController();
