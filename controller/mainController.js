const db = require('../database/models')
const { Op } = require('sequelize');

<<<<<<< HEAD
=======
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public//pdf')); 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, 'Z1-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

>>>>>>> 165d33c5776f6cd1824400d0caa22cb3a4ecb035

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
<<<<<<< HEAD
=======
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
    
            const archivoPath = `/pdf/${req.file.filename}`;
    
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

    formEdit: async(req, res) => {

        const { id } = req.params;

        try {
            const result = await db.Book.findOne({ where:{id} })
            if(result){

            return res.render('bookFormEdit.ejs', {result})
            }else{
                  throw new Error("No se ha encontrado el registro")
            }
        } catch(err){
            console.log(err)
        }

    },

    bookEdit: async(req, res) => {
        const {id} = req.params

        const { nombre, descripcion, genero } = req.body;

        try {

            const pathMain = req.file
            
            const archivoPath = `/images/pdf/${pathMain.filename}`;

            await db.Book.update({

                title: nombre,
                description: descripcion,
                link: archivoPath,
                genre: genero,
                image: '/images/libro.jpg'

            },
            {
                where:{id}
               })

            return res.redirect('/')

    }catch(err){
        console.log(err)
    }
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

    },

    bookDelete: async (req, res) => {
        try{
            await db.Book.destroy(
                {where: {id: req.params.id}}
                )

            return res.redirect('/')
        } catch(err){
            console.log(err)
        }
>>>>>>> 165d33c5776f6cd1824400d0caa22cb3a4ecb035
    }
}

module.exports = mainController;