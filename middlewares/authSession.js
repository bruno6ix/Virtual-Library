const db = require('../database/models');

// RETORNA AL HOME Y NO PERMITE INGRESAR AL FORM DE LOGIN Y REGISTER EN CASO DE ESTAR VERIFICADO

const authRedirectSession = (req, res, next) => {
    if (req.session && req.session.userId) { // requerimos si hay una sesion registrada
    
        return res.redirect('/'); // si la hay redirecciona para evitar que ingrese al login/register
    }
    next(); 
};

// VERIFICAMOS LA SESSION, EN CASO DE QUE NO ESTE LOGUEADO, REDIRECCIONA AL LOGIN

const authSession = (req, res, next) => {
    if (req.session && req.session.userId) { 
        return next();
    } else {
        return res.redirect('/');
    }
};

module.exports = {
    authRedirectSession,
    authSession,
};