const express = require('express');
const router = express.Router();
const multer = require('multer');
const bookController = require('../controller/bookController');
const { authSession } = require('../middlewares/authSession');
const cloudinary = require('../cloudinary');

const storage = multer.diskStorage({
  filename: async function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const randomName = 'L1-' + Math.random().toString(36).substr(2, 9);
    const uniqueFileName = `${randomName}.${ext}`;

    try {
      // Verificar si ya existe un archivo con el mismo nombre en Cloudinary
      const existingFile = await cloudinary.search
        .expression(`filename:${uniqueFileName}`)
        .execute();
      
      // Si existe, eliminarlo antes de subir el nuevo archivo
      if (existingFile.total_count > 0) {
        await cloudinary.uploader.destroy(existingFile.resources[0].public_id);
      }
    } catch (error) {
      console.error("Error while checking existing files in Cloudinary:", error);
    }

    cb(null, uniqueFileName);
  }
});

const upload = multer({ storage: storage });

router.get('/book-create', authSession, bookController.formCreate);

router.post('/book-create', authSession, upload.single('archivo'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
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
