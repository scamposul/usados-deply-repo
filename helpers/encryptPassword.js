const bcrypt = require("bcrypt");

/**
 * Funcion que encripta el password ingresado por el usuario
 * @param {String} password Password ingresado por el usuario
 * @returns Password encriptado
 */
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Funcion que compara el password ingresado por el usuario y el password almacenado en la base de datos
 * @param {String} password Password ingresado por el usuario (req.body.password)
 * @param {*} inputPassword Password obtenido de la informacion del usuario en la base de datos
 * @returns Boolean que confirma si los password coinciden  
 */
const comparePassword = async (password, inputPassword) => {
  return await bcrypt.compare(password, inputPassword);
};

module.exports = { encryptPassword, comparePassword };
