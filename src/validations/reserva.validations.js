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
          .required()
          .messages({
            "array.base": "Debe ingresar un array de números.",
            "any.required": "Las canchas son obligatorias.",
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
