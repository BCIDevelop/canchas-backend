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
        sport: Joi.string().required().messages({
          "string.base": "Debe ingresar un texto válido.",
          "any.required": "El deporte es obligatorio.",
        }),
      }),
    });
  }
}

export default new ReservaValidation();
