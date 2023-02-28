const jwt = require("jsonwebtoken");

/**
 * Funcion que crea un token de usuario usando JWT 
 * @param {Object} payload Objeto con la informacion de usuario que se va agregar al token
 * @returns Token JWT con la informacion del usuario
 */
const createJwt = ({ payload }) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_DURATION,
  });

  return accessToken;
};

/**
 * Funcion que comprueba si el token de usuario es valido o no
 * @param {String} token Cadena que contiene el token de usuario JWT
 * @returns Boolean que confirma si el token es valido o no
 */
const isTokenValid = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { createJwt, isTokenValid };
