const db = require('../database/models')
const path = require('path')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/images/pdf')); 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, 'Z1-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

const bookController = {
    formCreate: (req, res) => {
        res.render('bookFormCreate.ejs')
    },

    bookPush: async (req, res) => {
        try {
            const { nombre, descripcion, genero } = req.body;
            
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
            if (!req.file) {
                return res.status(400).json({ error: 'Debes adjuntar un archivo PDF' });
            }
    
            const archivoPath = `/images/pdf/${req.file.filename}`;

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

    bookDelete: async(req, res) => {

        try{
            await db.Book.destroy({where: {id: req.params.id}})

            return res.redirect('/')
        } catch(err){
            console.log(err)
        }
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

module.exports = { bookController, upload };