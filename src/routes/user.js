const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');
const users = require('../app/models/users');


router.get('/register', usersController.getRegister);
router.post('/signup', usersController.postRegister);
router.get('/login', usersController.getLogin);
router.post('/signin', usersController.postLogin);


module.exports = router;
