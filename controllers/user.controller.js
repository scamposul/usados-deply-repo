const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const UserServices = require("../services/users.services");
const { request } = require("express");
const { createJwt } = require("../helpers");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const checkPermissions = require("../utils/checkPermissions");

module.exports = {
  register: catchAsync(async (req, res, next) => {
    const body = req.body;

    const [response, created] = await UserServices.registerUser(body);
    if (!created) {
      return next(
        createHttpError(400, "Este email o telefono ya esta registrado")
      );
    }

    // const origin = "http://localhost:5000";
    // await sendVerificationEmail({
    //   name: response.dataValues.firstName,
    //   email: response.dataValues.email,
    //   verificationToken: response.dataValues.verificationToken,
    //   origin,
    // });

    const { verificationToken, ...userInfo } = response.dataValues;

    const tokenUser = createJwt({ payload: userInfo });
    endpointResponse({
      res,
      code: 201,
      message: "Usuario creado con exito",
      body: {
        token: tokenUser,
      },
    });
  }),

  getAll: catchAsync(async (req, res, next) => {
    const result = await UserServices.findUsers();

    endpointResponse({
      res,
      message: "Find users successfully",
      body: result,
      code: 200,
    });
  }),

  getId: catchAsync(async (req = request, res, next) => {
    const { id } = req.params;
    const result = await UserServices.findUserById(id);

    checkPermissions(req.user, result.id);

    endpointResponse({
      res,
      message: "Find user by Id successfully",
      body: result,
      code: 200,
    });
  }),

  update: catchAsync(async (req = request, res, next) => {
    const { id } = req.params;
    const body = req.body;
    const result = await UserServices.updateUser(id, body, req.user);

    endpointResponse({
      res,
      message: "Update user successfully",
      body: result,
      code: 200,
    });
  }),

  deleteUser: catchAsync(async (req = request, res, next) => {
    const { id } = req.params;
    const result = await UserServices.deleteUser(id, req.user);
    endpointResponse({
      res,
      message: "Delete user successfully",
      body: result,
      code: 200,
    });
  }),

  verifyUser: catchAsync(async (req, res, next) => {
    const { token, email } = req.query;

    const user = await UserServices.findUserByEmail(email);

    if (user.verificationToken !== token) {
      return next(
        createHttpError(
          400,
          "El token no es correcto, no se pudo verificar el correo"
        )
      );
    }

    user.verified = true;

    await user.save();

    const { password: pass, verificationToken, ...userInfo } = user.dataValues;

    endpointResponse({
      res,
      message: "Usuario verificado con exito",
      body: userInfo,
      code: 200,
    });
  }),
};
