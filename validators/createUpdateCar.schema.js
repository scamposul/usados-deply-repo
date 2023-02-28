const createUpdateCarSchema = {
  year: {
    exists: { bail: true, errorMessage: "Debe ingresar un año de fabricacion" },
    trim: true,
    isInt: {
      errorMessage: "El año debe ser superior a 1900",
      options: { gt: 1900 },
    },
  },
  brand: {
    exists: { bail: true, errorMessage: "Debe ingresar una marca de vehiculo" },
    trim: true,
    isLength: {
      errorMessage: "Marca debe tener entre 2 y 20 caracteres",
      options: { min: 2, max: 20 },
    },
  },
  model: {
    exists: { bail: true, errorMessage: "Debe ingresar un modelo" },
    trim: true,
    isLength: {
      errorMessage: "Modelo debe tener entre 2 y 20 caracteres",
      options: { min: 2, max: 20 },
    },
  },
  version: {
    exists: { bail: true, errorMessage: "Debe ingresar una version" },
    trim: true,
    isLength: {
      errorMessage: "Version debe tener entre 2 y 20 caracteres",
      options: { min: 2, max: 20 },
    },
  },
  color: {
    exists: { bail: true, errorMessage: "Debe ingresar un color" },
    trim: true,
    isLength: {
      errorMessage: "Color debe tener entre 2 y 20 caracteres",
      options: { min: 2, max: 20 },
    },
  },
  transmission: {
    exists: {
      bail: true,
      errorMessage: "Debe ingresar informacion sobre la transmision",
    },
    trim: true,
    isLength: {
      errorMessage: "Transmision debe tener entre 2 y 20 caracteres",
      options: { min: 2, max: 20 },
    },
  },
  doors: {
    exists: {
      bail: true,
      errorMessage: "Debe ingresar la cantidad de puertas",
    },
    trim: true,
    isLength: {
      errorMessage: "Cantidad de puertas debe tener entre 2 y 20 caracteres",
      options: { min: 1, max: 20 },
    },
  },
  engine_capacity: {
    exists: {
      bail: true,
      errorMessage: "Debe ingresar la capacidad del motor",
    },
    trim: true,
    isLength: {
      errorMessage: "Capacidad del motor debe tener entre 2 y 20 caracteres",
      options: { min: 2, max: 20 },
    },
  },
  km: {
    exists: { bail: true, errorMessage: "Debe ingresar los kms" },
    trim: true,
    isInt: {
      errorMessage: "Kms debe ser un numero",
    },
  },
  last_plate: {
    exists: { bail: true, errorMessage: "Debe ingresar la placa" },
    trim: true,
    isInt: {
      errorMessage: "Placa deber ser un numero",
    },
  },
  city: {
    exists: {
      bail: true,
      errorMessage: "Debe ingresar la ciudad donde se encuentra el vehiculo",
    },
    trim: true,
    isLength: {
      errorMessage: "Ciudad del vehiculo debe tener entre 2 y 20 caracteres",
      options: { min: 2, max: 20 },
    },
  },
  price: {
    exists: { bail: true, errorMessage: "Debe ingresar un precio de venta" },
    trim: true,
    isInt: {
      errorMessage: "Debe ingresar un precio valido",
    },
  },
  description: {
    exists: { bail: true, errorMessage: "Debe ingresar una descripcion" },
    trim: true,
  },
  type: {
    exists: { bail: true, errorMessage: "Debe ingresar un tipo de vehiculo" },
    trim: true,
    isIn: {
      options: [
        "sedan",
        "suv",
        "hatchback",
        "crossover",
        "coupe",
        "pick_up",
        "roadster",
        "minivan",
      ],
      errorMessage: "Debe seleccionar uno de los tipos predefinidos",
    },
  },
  fuel: {
    exists: {
      bail: true,
      errorMessage: "Debe ingresar un tipo de combustible",
    },
    trim: true,
    isIn: {
      options: [
        "petrol",
        "diesel",
        "gas",
        "micro_hybrid",
        "mild_hybrid",
        "hybrid_electric",
        "electric",
      ],
      errorMessage: "Debe seleccionar uno de los tipos predefinidos",
    },
  },
//   images: {
//     optional: {
//       nulleable: true,
//     },
//     isURL: {
//       errorMessage: "URL no valida",
//     },
//   },
};

module.exports = createUpdateCarSchema;
