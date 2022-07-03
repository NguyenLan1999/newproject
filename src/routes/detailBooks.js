const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: '../../public/imgs' })

const detailBookController = require('../app/controllers/DetailBookController');

router.get('/create', detailBookController.create);
router.post('/store', upload.single('img'), detailBookController.store);
router.get('/:id/edit', detailBookController.edit);
router.put('/:id', detailBookController.update);
router.delete('/:id', detailBookController.delete);
router.get('/:slug', detailBookController.show);

module.exports = router;
