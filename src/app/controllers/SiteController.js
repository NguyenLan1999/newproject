//const books = require('../models/books');
const Book = require('../models/books');

const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    home(req, res, next) {
        var email = req.signedCookies.email
        Book.find({})

            .then((books) => {
               
                res.render('home', {
                    books: mutipleMongooseToObject(books),
                    email: email
                });
            })
            .catch(next);

        //res.render('home')
    }

    search(req, res, next) {
       
        var email = req.signedCookies.email

        Book.find({ 'name': {'$regex': req.query.q.toLowerCase(),$options:'i'}})
            .then((books) => {
                res.render('search', { 
                    books: mutipleMongooseToObject(books),
                    email: email});
            })
            .catch(next);

        
       

    }
    getBookuser(req, res, next){
        const email = req.signedCookies.email
        if(email){
            Book.find({email: email})

            .then((books) => {
               
                res.render('userhome', {
                    books: mutipleMongooseToObject(books),
                    email: email
                });
            })
            .catch(next);
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


module.exports = new SiteController();
