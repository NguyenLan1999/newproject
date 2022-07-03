const User = require('../models/users');
const Book = require('../models/books');
const { populate } = require('../models/users');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const middlewares = require('../../middlewares/session')


 
class UsersController {

    getLogin(req, res, next){
        res.render('user/login')
    }

    postLogin(req, res, next){    

        const username = req.body.username;
        const password = req.body.password;

        User.findOne({
            username: username,
            password: password
        })
        .then(user =>{
            if(user){
               res.cookie('email', user.email, {signed: true})
               res.redirect('/')
                //res.render('home', user)
                    //console.log(user)
                    
                // Book.find({ 'email': user.email})
                // .then(books=>{
                //     res.render('/', { books: mutipleMongooseToObject(books)});
                   
                //  })
            }else{
                res.render('user/login', {message: 'Tên đăng nhập hoặc mật khẩu không chính xác!' });
            }
        }) 
        .catch(next);
       
    }

    getRegister(req, res, next){
        res.render('user/register')
    }
    postRegister(req, res, next){
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;


        User.findOne({email: email})
        .then(user =>{
            if(user){
                res.render('user/register', {message: 'Email này đã được sử dụng!!!!'});
                
                //res.json("Email này đã được sử dụng");
            }else{
                
                return User.create({
                    username: username,
                    password: password,
                    email: email,
               })
                   
            }
        })
        .then(user => {
            res.cookie('email', user.email, {signed: true})
            console.log('Tạo tài khoản thành công')
            //res.render('userhome',user);
            res.redirect('/')
        })
        .catch(next)   
    }


 
}

module.exports = new UsersController();