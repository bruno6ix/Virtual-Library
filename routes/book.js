const express = require('express');
const router = express.Router();

const { bookController, upload }= require('../controller/bookController')
const { authSession } = require('../middlewares/authSession')

router.get('/book-create', authSession, bookController.formCreate)
router.post('/book-create', authSession, upload.single('archivo'), bookController.bookPush)

router.get('/book-edit/:id', authSession, bookController.formEdit)
router.post('/book-edit/:id', authSession, upload.single('archivo'), bookController.bookEdit)
router.delete('/book-edit/:id', authSession, bookController.bookDelete)

router.get('/book-detail/:id', bookController.bookDetail)

module.exports = router;