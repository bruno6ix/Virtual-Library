const express = require('express');
const router = express.Router();

const { mainController, upload } = require('../controller/mainController')

router.get('/', mainController.index)
router.get('/book-create', mainController.formCreate)

router.post('/book-create', upload.single('archivo'), mainController.bookPush)

router.get('/book-edit', mainController.formEdit)

router.get('/login', mainController.user)

router.get('/book-detail/:id', mainController.bookDetail)

module.exports = router;
