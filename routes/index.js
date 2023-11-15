const express = require('express');
const router = express.Router();

const { mainController, upload } = require('../controller/mainController')
const {validacionesInicioSesion, resultadoInicioSesion } = require('../middlewares/loginValidator')
const { authRedirectSession, authSession } = require('../middlewares/authSession')

router.get('/', mainController.index)

router.get('/book-create', authSession, mainController.formCreate)
router.post('/book-create', authSession, upload.single('archivo'), mainController.bookPush)

router.get('/book-edit/:id', authSession, mainController.formEdit)
router.post('/book-edit/:id', authSession, upload.single('archivo'), mainController.bookEdit)
router.delete('/book-edit/:id', authSession, mainController.bookDelete)

router.get('/login', authRedirectSession, mainController.formLogin)
router.post('/login', authRedirectSession, validacionesInicioSesion, resultadoInicioSesion, mainController.login);


router.get('/book-detail/:id', mainController.bookDetail)

router.get('/resultado', mainController.search)


module.exports = router;
