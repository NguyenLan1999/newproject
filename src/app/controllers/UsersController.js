const User = require('../models/users');
const Book = require('../models/books');
const { populate } = require('../models/users');
const { mongooseToObject } = require('../../util/mongoose');
const middlewares = require('../../middlewares/session')


 
class UsersController {

    getLogin(req, res, next){
        res.render('user/login')
    }

    postLogin(req, res, next){  
        
        var sessionId = req.signedCookies.sessionId;
        const username = req.body.username;
        const password = req.body.password;

        if(!username && !password){
            //res.render('user/login', {message: 'Vui lòng nhập tên đăng nhập và mật khẩu!!!' });
            req.session.message ={
                type: 'danger',
                intro: 'Thông báo lỗi!',
                message: 'Vui lòng nhập tên đăng nhập !!!!'
            }
            res.redirect('back')
        }
        if(!username || !password){
            //res.render('user/login', {message: 'Tên đăng nhập và mật khẩu không được để trống!!!' });
            req.session.message ={
                type: 'danger',
                intro: 'Thông báo lỗi!',
                message: ' Tên đăng nhập và mật khẩu không được để trống!!!!'
            }
            res.redirect('back')
        }
        // if(!password){
        //     res.render('user/login', {message: 'Vui lòng nhập tên đăng nhập và mật khẩu!!!'})
        // }
        User.findOne({
            username: username,
            password: password
        })
        .then(user =>{
            if(user){
               res.cookie('email', user.email, {signed: true})
               //res.render({email: req.signedCookies.email})
               req.session.message ={
                type: 'success',
                intro: 'Thông báo!',
                message: 'Bạn đã đăng nhập thành công!!!!'
                }
               res.redirect('/')
            //    res.render('home', {
            //     email: req.signedCookies.email
            //    })

               
            }else{
               // res.render('user/login', {message: 'Tên đăng nhập hoặc mật khẩu không chính xác!!!' });
               req.session.message ={
                type: 'danger',
                intro: 'Thông báo lỗi!',
                message: 'Tên đăng nhập hoặc mật khẩu không chính xác !!!!'
                }
                res.redirect('back')
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
        if(!username && !password && !email){
            //res.render('user/register', {message: 'Vui lòng điền đầy đủ thông tin'})
            req.session.message ={
                type: 'danger',
                intro: 'Thông báo lỗi!',
                message: 'Vui lòng điền đầy đủ thông tin!!!!'
            }
            res.redirect('back')
        }
        if(!username || !password || !email ){
            //res.render('user/register', {message: 'Tên đăng nhâp, email không được để trống!!!'})
            req.session.message ={
                type: 'danger',
                intro: 'Thông báo lỗi!',
                message: 'Tên đăng nhâp, email không được để trống!!!!!!!'
            }
            res.redirect('back')
        }

        User.findOne({email: email})
        .then(user =>{
            if(user){
               // res.render('user/register', {message: 'Email này đã được sử dụng!!!!'});
               req.session.message ={
                type: 'danger',
                intro: 'Thông báo lỗi!',
                message: 'Email này đã được sử dụng!!!!!!!'
            }
            res.redirect('back')
                //res.json("Email này đã được sử dụng");
            }else{
                
                return User.create({
                    username: username,
                    password: password,
                    email: email,
               })
                .then(user => {
                res.cookie('email', user.email, {signed: true})
                req.session.message ={
                    type: 'success',
                    intro: 'Thông báo!',
                    message: 'Bạn đã đăng ký thành công!!!!'
                }
                   res.redirect('/')
        })
                   
            }
        })
        // .then(user => {
        //     res.cookie('email', user.email, {signed: true})
        //     console.log('Tạo tài khoản thành công')
        //     res.redirect('/')
        // })
        .catch(next)   
    }

    view(req, res, next){
        const email = req.signedCookies.email
        User.findOne({email: email})
        .then(user=>{
            res.render('user/view', {user : mongooseToObject(user), email: email})
        })
        .catch(next)
        
    }

    edit(req, res,next){
        const email = req.signedCookies.email
        User.findOne({email: email})
        .then(user=>{
            res.render('user/viewEdit', {
                user: mongooseToObject(user),
                email: email})

        })
        .catch(next)
    }

    postEdit(req, res, next){
        const email = req.signedCookies.email
        const username = req.body.username
        const phone = req.body.phone
        const address = req.body.address
        const history = req. body.history

        if(!username){
            req.session.message ={
                type: 'danger',
                intro: 'Thông báo lỗi!',
                message: 'Tên đăng nhập không được để trống!!!!'
            }
            res.redirect('back')
        }
        if(!(phone.length === 10)){
            req.session.message ={
                type: 'danger',
                intro: 'Thông báo lỗi!',
                message: 'Vui lòng nhập lại số điện thoại!!!!'
            }
            res.redirect('back')
        }

        User.updateOne({email: email}, {
            username: username,
            phone: phone,
            address: address,
            history: history,
        })
        .then(()=>{
            req.session.message ={
                type: 'success',
                intro: 'Thông báo!',
                message: 'Bài viết được cập nhật thành công!!!!'
            }
            res.redirect('/user/view')
        })
        .catch(next)
    }
 
}

module.exports = new UsersController();