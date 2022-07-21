const express = require('express');
const router = express.Router();
const multer  = require('multer')
const path = require('path')

router.use(express.static('src/public'));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, ('./src/public/img'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
    
  })
  
 const upload = multer({ storage: storage })

const detailBookController = require('../app/controllers/DetailBookController');


router.get('/create', detailBookController.create);
router.post('/store', upload.single('img'), detailBookController.store);
router.get('/:id/edit', detailBookController.edit);
router.put('/:id', upload.single('img'), detailBookController.update);
router.delete('/:id', detailBookController.delete);
router.get('/:slug', detailBookController.show);

module.exports = router;

