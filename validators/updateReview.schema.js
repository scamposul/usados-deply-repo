const updateReviewSchema = {
    rating: {
      exists: { bail: true, errorMessage: "Debe ingresar una calificacion" },
      trim: true,
      isInt: {
        errorMessage: "La calificacion debe ser entre 1 y 5",
        options: { min: 1, max: 5 },
      },
    },
    title: {
      exists: { bail: true, errorMessage: "Debe ingresar un titulo" },
      trim: true,
      isLength: {
        errorMessage: "Titulo debe tener entre 2 y 30 caracteres",
        options: { min: 2, max: 30 },
      },
    },
    comment: {
      exists: { bail: true, errorMessage: "Debe ingresar un comentario" },
      trim: true,
      isLength: {
        errorMessage: "Comentario debe tener entre 2 y 100 caracteres",
        options: { min: 2, max: 100 },
      },
    },
  };
  
  module.exports = updateReviewSchema;
  