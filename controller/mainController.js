const db = require('../database/models')
const { Op } = require('sequelize');


const mainController = {

    index: async (req, res) =>{
        try {
           const data = await db.Book.findAll()

           return res.render('index.ejs', {data})
        } catch(err){
            console.log(err)
        }
    },

    search: async (req, res) => {
        const searchTerm = req.query.Buscar;

        try {
            const results = await db.Book.findAll({
                where: {
                    [db.Sequelize.Op.or]: [
                        {
                            title: {
                                [db.Sequelize.Op.like]: `%${searchTerm}%`,
                            },
                        },
                        {
                            description: {
                                [db.Sequelize.Op.like]: `%${searchTerm}%`,
                            },
                        },
                    ],
                },
            });

            res.render('bookSearch.ejs', { results, term: searchTerm });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
        }
    }
}

module.exports = mainController;