const express = require('express');
const router = express.Router();
const multer = require('multer');
const bookController = require('../controller/bookController');
const { authSession } = require('../middlewares/authSession');

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const randomName = 'L1-' + Math.random().toString(36).substr(2, 9);
    const uniqueFileName = `${randomName}.${ext}`;
    cb(null, uniqueFileName);
  }
});

const upload = multer({ storage: storage });

router.get('/book-create', authSession, bookController.formCreate);

router.get('/book-download-pdf/:id', bookController.downloadPDF);

router.post('/book-create', authSession, upload.single('archivo'), bookController.bookPush);

router.get('/book-edit/:id', authSession, bookController.formEdit);
router.post('/book-edit/:id', authSession, upload.single('archivo'), bookController.bookEdit);
router.delete('/book-edit/:id', authSession, bookController.bookDelete);
router.get('/book-detail/:id', bookController.bookDetail);

module.exports = router;
