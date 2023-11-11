const { body, validationResult } = require('express-validator');
const { compareSync } = require('bcryptjs');
const db = require('../database/models');

const validacionesInicioSesion = [
    body('userUsername')
        .notEmpty().withMessage('Debe ingresar un nombre de usuario'),
    body('userPassword')
        .notEmpty().withMessage('Debe ingresar una contraseña')
];

const resultadoInicioSesion = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('login', {
            errors: errors.mapped(),
            old: req.body
        });
    }

    const { userUsername, userPassword } = req.body;

    try {
        const user = await db.User.findOne({
            where: {
                name: userUsername
            }
        });

        if (!user || !compareSync(userPassword, user.password)) {
            return res.render('login', { error: 'Nombre de usuario o contraseña incorrecta' });
        }

        req.session.userId = user.id;
        req.user = user;
        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = {
    validacionesInicioSesion,
    resultadoInicioSesion
};
