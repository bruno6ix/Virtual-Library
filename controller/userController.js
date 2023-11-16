const userController = {
    formLogin: (req, res) => {
        res.render('login.ejs')
    },

    login: (req, res) =>{
        res.redirect('/')
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al cerrar la sesión:', err);
            }
            res.redirect('/');
        });
}
}

module.exports = userController;