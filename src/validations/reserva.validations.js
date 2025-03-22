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
        hours: Joi.array().items(Joi.number().positive()).required().messages({
          "number.base": "Debe ingresar un número válido.",
          "any.required": "La hora es obligatoria.",
        }),
        id_instalacion: Joi.number().positive().required().messages({
          "number.base": "Debe ingresar un número válido.",
          "any.required": "El servicio es obligatorio.",
        }),
        id_cancha: Joi.number().positive().required().messages({
          "number.base": "Debe ingresar un número válido.",
          "any.required": "La cancha es obligatoria.",
        }),
        id_user: Joi.number().positive().required().messages({
          "number.base": "Debe ingresar un número válido.",
          "any.required": "El usuario es obligatorio.",
        }),
      }),
    });
  }
}

export default new ReservaValidation();
