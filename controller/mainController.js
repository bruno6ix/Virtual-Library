const db = require('../database/models')
const path = require('path')
const multer = require('multer');

const { Op } = require('sequelize');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/images/pdf')); 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, 'Z1-' + uniqueSuffix + path.extname(file.originalname));
    }
  });


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
    },




    formCreate: (req, res) => {
        res.render('bookFormCreate.ejs')
    },

    bookPush: async (req, res) => {
        try {
            const { nombre, descripcion, genero } = req.body;
            
            // Verifica si hay un archivo adjunto
            if (!req.file) {
                return res.status(400).json({ error: 'Debes adjuntar un archivo PDF' });
            }
    
            const archivoPath = `/images/pdf/${req.file.filename}`;
    
            await db.Book.create({
                title: nombre,
                description: descripcion,
                link: archivoPath,
                genre: genero,
                image: '/images/libro.jpg'
            });
    
            res.redirect('/');
        } catch (error) {
            console.error('Error al subir el libro:', error);
            res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
        }
    },
    

    formEdit: (req, res) => {
        res.render('bookFormEdit.ejs')
    },

    formLogin: (req, res) => {
        res.render('login.ejs')
    },

    login: (req, res) =>{
        res.redirect('/')
    },

    bookDetail: async (req, res) => {

        const { id } = req.params

        try {
            const libroDetalle = await db.Book.findByPk(id)

            res.render('bookDetail.ejs', {libroDetalle})
        } catch(err){
            console.log(err)
        }

    }
}

const upload = multer({ storage: storage });


module.exports = { mainController,
     upload };