const express = require('express');
const router = express.Router();

const detailBookController = require('../app/controllers/DetailBookController');

router.get('/create', detailBookController.create);
router.post('/store', detailBookController.store);
router.get('/:id/edit', detailBookController.edit);
router.put('/:id', detailBookController.update);
router.delete('/:id', detailBookController.delete);
router.get('/:slug', detailBookController.show);

module.exports = router;
