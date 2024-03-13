const db = require('../database/models');
const cloudinary = require('../cloudinary.js');

const bookController = {
  formCreate: (req, res) => {
    res.render('bookFormCreate.ejs');
  },

  bookPush: async (req, res) => {
    try {
      const { nombre, descripcion, genero } = req.body;
      
      if (!req.file) {
        return res.status(400).json({ error: 'Debes adjuntar un archivo PDF' });
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: req.file.filename.substring(0, req.file.filename.lastIndexOf('.'))
      });

      await db.Book.create({
        title: nombre,
        description: descripcion,
        link: result.secure_url,
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
      } else {
        throw new Error("No se ha encontrado el registro")
      }
    } catch(err) {
      console.log(err);
    }
  },

  bookEdit: async(req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, genero } = req.body;

    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Debes adjuntar un archivo PDF' });
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: req.file.filename.substring(0, req.file.filename.lastIndexOf('.'))
      });

      await db.Book.update({
        title: nombre,
        description: descripcion,
        link: result.secure_url,
        genre: genero,
        image: '/images/libro.jpg'
      },
      {
        where:{id}
      });

      return res.redirect('/');

    } catch(err) {
      console.log(err);
    }
  },

  bookDelete: async(req, res) => {
    try {
      await db.Book.destroy({ where: { id: req.params.id } });
      return res.redirect('/');
    } catch(err) {
      console.log(err);
    }
  },

  bookDetail: async (req, res) => {
    const { id } = req.params;

    try {
      const libroDetalle = await db.Book.findByPk(id);
      res.render('bookDetail.ejs', { libroDetalle });
    } catch(err) {
      console.log(err);
    }
  }
};

module.exports = bookController;
