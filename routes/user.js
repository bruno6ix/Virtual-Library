const express = require('express')
const router = express.Router();

const userController = require('../controller/userController')
const { authRedirectSession, authSession } = require('../middlewares/authSession')
const { validacionesInicioSesion, resultadoInicioSesion } = require('../middlewares/loginValidator')

router.get('/login', authRedirectSession, userController.formLogin)
router.post('/login', authRedirectSession, validacionesInicioSesion, resultadoInicioSesion, userController.login);
router.get('/logout', authSession, userController.logout);

module.exports = router;