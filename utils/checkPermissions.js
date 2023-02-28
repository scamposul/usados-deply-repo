/**
 * Funcion que compara 2 Ids para comprobar que es el usuario activo quien esta accediendo a la ruta.
 * @param {Object} requestUser Contiene la informacion de usuario devuelta por el middleware de autenticacion 
 * @param {*} resourceUserId Id de usuario devuelto por la base de datos
 * @returns Si la condicion se cumple sale de la funcion y continua con la funcion original, sino devuelve un error
 */

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.id === resourceUserId) return;

  throw new Error("No esta autorizado para acceder a esta ruta");
};

module.exports = checkPermissions;
