import { celebrator, Segments, Joi } from "celebrate";

class SportValidation {
  constructor() {
    this.celebrate = celebrator({ reqContext: true }, { convert: true });
  }

  // Validaciones para obtener un deporte por ID :
  getSportById() {
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

  // Validaciones para obtener todos los deportes :
  getSports() {
    return this.celebrate({
      [Segments.QUERY]: Joi.object().keys({
        search: Joi.string().optional()
      }),
    });
  }

  // Validaciones para crear un deporte :
  createSport() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().trim().min(3).max(100).required().messages({
          "string.base": "El nombre debe ser un texto.",
          "string.empty": "El nombre no puede estar vacío.",
          "string.min": "El nombre debe tener al menos 3 caracteres.",
          "string.max": "El nombre no puede superar los 100 caracteres.",
          "any.required": "El nombre es obligatorio.",
        })
      }),
    });
  }
}

export default new SportValidation();
