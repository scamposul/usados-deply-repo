const verifyEmailSchema = {
    token: {
      exists: { bail: true, errorMessage: "No hay un token de validacion presente" },
      trim: true,
    },
    email: {
      exists: { bail: true, errorMessage: "No hay un email de validacion presente" },
      trim: true,
      isEmail: {
        errorMessage: "El email debe ser valido",
      },
    },
  };
  
  module.exports = verifyEmailSchema;