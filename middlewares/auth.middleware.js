const createHttpError = require("http-errors");
const { catchAsync } = require("../helpers/catchAsync");
const { isTokenValid } = require("../helpers/createJwt");

const authenticateUser = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createHttpError(401, "No hay un token presente"));
   
  }

  const token = authHeader.split(" ")[1];
  try {
    const payloadDecoded = isTokenValid(token);
    req.user = { ...payloadDecoded };
    next();
  } catch (error) {
    next(createHttpError(401, "El token no es valido"));
  }
});


module.exports = {authenticateUser}