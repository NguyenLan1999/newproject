const express = require('express');
const router = express.Router();

const booksController = require('../app/controllers/BooksController');

router.get('/:slug', booksController.show);
router.get('/', booksController.index);

module.exports = router;
