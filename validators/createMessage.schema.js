const createMessageSchema = {
  message: {
    exists: { bail: true, errorMessage: "Debe ingresar un mensaje" },
    trim: true,
    isLength: {
      errorMessage: "Mensaje debe tener entre 1 y 200 caracteres",
      options: { min: 1, max: 200 },
    },
  },
};

module.exports = createMessageSchema;
