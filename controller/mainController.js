const mainController = {

    index: (req, res) =>{
        res.render('index.ejs')
    },

    formCreate: (req, res) => {
        res.render('bookFormCreate.ejs')
    },

    formEdit: (req, res) => {
        res.render('bookFormEdit.ejs')
    },

    user: (req, res) => {
        res.render('login.ejs')
    },

    bookDetail: (req, res) => {
        res.render('bookDetail.ejs')
    }
}

module.exports = mainController;