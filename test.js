const bcrypt = require('bcryptjs');
const db = require('./database/models'); 

const createHashedUser = async () => {
  try {
    const user = {
      name: 'prueba',
      password: 'prueba',
    };

    const hashedPassword = await bcrypt.hash(user.password, 10);

    await db.User.create({
      name: user.name,
      password: hashedPassword,
    });

    console.log('Usuario creado con contraseña hasheada y almacenado en la base de datos.');
  } catch (error) {
    console.error('Error al crear y almacenar el usuario:', error);
  }
};

createHashedUser();