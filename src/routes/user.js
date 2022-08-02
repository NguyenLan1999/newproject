const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');
const users = require('../app/models/users');

router.post('/logout', usersController.logout);
router.get('/logout', usersController.logout);
router.get('/edit', usersController.edit);
router.put('/edit', usersController.postEdit);
router.get('/view', usersController.view);
router.get('/register', usersController.getRegister);
router.post('/signup', usersController.postRegister);
router.get('/login', usersController.getLogin);
router.post('/signin', usersController.postLogin);


module.exports = router;
