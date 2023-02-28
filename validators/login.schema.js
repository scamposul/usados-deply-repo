const loginSchema = {
  email: {
    exists: { bail: true, errorMessage: "Debe ingresar un email" },
    trim: true,
    isEmail: {
      errorMessage: "Debe ingresar un email valido",
    },
  },
  password: {
    exists: { bail: true, errorMessage: "Debe ingresar su password" },
    trim: true,
  },
};

module.exports = loginSchema;
