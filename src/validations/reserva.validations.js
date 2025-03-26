import { celebrator, Segments, Joi } from "celebrate";

class ReservaValidation {
  constructor() {
    this.celebrate = celebrator({ reqContext: true }, { convert: true });
  }

  getAvailableHours() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        date: Joi.date().required().messages({
          "date.base": "Debe ingresar una fecha válida.",
          "any.required": "La fecha es obligatoria.",
        }),
        instalacion_id: Joi.number().positive().required().messages({
          "number.base": "Debe ingresar un número válido.",
          "any.required": "El servicio es obligatorio.",
        }),
        deporte_id: Joi.number().positive().required().messages({
          "number.base": "Debe ingresar un número válido.",
          "any.required": "El deporte es obligatorio.",
        }),
        canchas: Joi.array()
          .items(Joi.number().positive())
          .max(5)
          .required()
          .messages({
            "array.base": "Debe ingresar un array de números.",
            "array.max": "No puede ingresar más de 5 canchas.",
            "any.required": "Las canchas son obligatorias.",
          }),
      }),
    });
  }

  getFacilityByHours() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        date: Joi.date().required().messages({
          "date.base": "Debe ingresar una fecha válida.",
          "any.required": "La fecha es obligatoria.",
        }),
        deporte: Joi.object({
          id: Joi.number().positive().required(),
          name: Joi.string().required(),
        }),
        hour: Joi.string().length(2).required().messages({
          "string.length": "La hora de tener un formato de 2 digitos.",
          "any.required": "La hora es obligatorio.",
        }),
      }),
    });
  }

  create() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        date: Joi.date().required().messages({
          "date.base": "Debe ingresar una fecha válida.",
          "any.required": "La fecha es obligatoria.",
        }),
        hours: Joi.array().items(Joi.number()).required().messages({
          "number.base": "Debe ser un numero",
          "any.required": "La hora es obligatoria.",
        }),
        id_instalacion: Joi.number().positive().required().messages({
          "number.base": "Debe ingresar un número válido.",
          "any.required": "El servicio es obligatorio.",
        }),
        id_cancha: Joi.array()
          .items(
            Joi.number().positive().required().messages({
              "number.base": "Cada ID de cancha debe ser un número válido.",
              "number.positive":
                "Cada ID de cancha debe ser un número positivo.",
              "any.required": "Cada cancha es obligatoria.",
            })
          )
          .min(1)
          .required()
          .messages({
            "array.base": "Las canchas deben ser un array de números.",
            "array.min": "Debe seleccionar al menos una cancha.",
            "any.required": "Las canchas son obligatorias.",
          }),
      }),
    });
  }

  getAllReservas() {
    return this.celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().min(0).optional().messages({
          "number.base": "La página debe ser un número.",
          "number.integer": "La página debe ser un número entero.",
          "number.min": "La página no puede ser menor que 0.",
        }),
        limit: Joi.number().positive().optional().messages({
          "number.base": "El límite debe ser un número.",
          "number.integer": "El límite debe ser un número entero.",
          "number.positive": "El límite debe ser un número positivo.",
        }),
      }),
    });
  }

  getReservaById() {
    return this.celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().min(1).optional().messages({
          "number.base": "El ID debe ser un número.",
          "number.integer": "El ID debe ser un número entero.",
          "number.min": "El ID no puede ser menor que 1.",
        }),
      }),
    });
  }
}

export default new ReservaValidation();
