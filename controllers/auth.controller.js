const createHttpError = require("http-errors");
const {
  catchAsync,
  comparePassword,
  createJwt,
  endpointResponse,
} = require("../helpers");
const AuthServices = require("../services/auth.services");

module.exports = {
  login: catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const userFound = await AuthServices.loginUser(email);
    if (!userFound) {
      return next(createHttpError(401, "No se encontro un usuario registrado con este email"));
    }

    const passwordMatch = await comparePassword(password, userFound.password);
    if (!passwordMatch) {
      return next(createHttpError(401, "Datos de acceso invalidos"));
    }

    const { password: pass, ...userInfo } = userFound.dataValues;
    const token = createJwt({ payload: userInfo });

    endpointResponse({
      res,
      message: "Login exitoso",
      body: { userInfo, token },
      code: 200,
    });
  }),
};
