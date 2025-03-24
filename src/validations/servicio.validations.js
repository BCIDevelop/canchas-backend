import { celebrator, Segments, Joi } from "celebrate";

class ServicioValidation {
  constructor() {
    this.celebrate = celebrator({ reqContext: true }, { convert: true });
  }

  // Validaciones para obtener una servicio por ID :
  getServicioById() {
    return this.celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().integer().positive().required().messages({
          "number.base": "El ID debe ser un número.",
          "number.integer": "El ID debe ser un número entero.",
          "number.positive": "El ID debe ser un número positivo.",
          "any.required": "El ID es obligatorio.",
        }),
      }),
    });
  }
}

export default new ServicioValidation();
