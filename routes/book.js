const express = require('express');
const router = express.Router();
const multer = require('multer');
const { bookController } = require('../controller/bookController');
const { authSession } = require('../middlewares/authSession');
const cloudinary = require('../cloudinary');

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/book-create', authSession, bookController.formCreate);

router.post('/book-create', authSession, upload.single('archivo'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No subiste ningun archivo.' });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    req.cloudinaryResult = result;

    next();
  } catch (error) {
    next(error);
  }
}, bookController.bookPush);

router.get('/book-edit/:id', authSession, bookController.formEdit);
router.post('/book-edit/:id', authSession, upload.single('archivo'), bookController.bookEdit);
router.delete('/book-edit/:id', authSession, bookController.bookDelete);
router.get('/book-detail/:id', bookController.bookDetail);

module.exports = router;
