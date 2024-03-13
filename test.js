const bcrypt = require('bcryptjs');
const db = require('./database/models');

const createHashedUser = async () => {
  try {
    // Datos del usuario
    const user = {
      name: 'prueba1',
      password: 'prueba1',
    };

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Crea el usuario en la base de datos con la contraseña hasheada
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