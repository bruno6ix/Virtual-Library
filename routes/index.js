const express = require('express');
const router = express.Router();

const mainController = require('../controller/mainController')

router.get('/', mainController.index)
router.get('/book-create', mainController.formCreate)
router.get('/book-edit', mainController.formEdit)

router.get('/user', mainController.user)

router.get('/book-detail', mainController.bookDetail)

module.exports = router;
