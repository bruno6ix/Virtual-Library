const bcrypt = require('bcryptjs');
const db = require('./database/models'); // Asegúrate de reemplazar 'tu-modulo-db' con la ruta correcta a tu módulo de base de datos

const createHashedUser = async () => {
  try {
    // Datos del usuario
    const user = {
      name: 'prueba',
      password: 'prueba',
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

// Llama a la función para crear el usuario con contraseña hasheada
createHashedUser();
