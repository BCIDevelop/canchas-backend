import { celebrator, Segments, Joi } from "celebrate";

class InstalacionValidation {
  constructor() {
    this.celebrate = celebrator({ reqContext: true }, { convert: true });
  }

  // Validaciones para obtener una instalación por ID :
  getInstalacionById() {
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

  // Validaciones para obtener instalaciones con paginación :
  getInstalaciones() {
    return this.celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().integer().min(0).optional().messages({
          "number.base": "La página debe ser un número.",
          "number.integer": "La página debe ser un número entero.",
          "number.min": "La página no puede ser menor que 0.",
        }),

        limit: Joi.number().integer().positive().optional().messages({
          "number.base": "El límite debe ser un número.",
          "number.integer": "El límite debe ser un número entero.",
          "number.positive": "El límite debe ser un número positivo.",
        }),
        deporte: Joi.string().optional(),
        search: Joi.string().optional(),
      }),
    });
  }

  // Validaciones para crear una instalación :
  createInstalacion() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().trim().min(3).max(100).required().messages({
          "string.base": "El nombre debe ser un texto.",
          "string.empty": "El nombre no puede estar vacío.",
          "string.min": "El nombre debe tener al menos 3 caracteres.",
          "string.max": "El nombre no puede superar los 100 caracteres.",
          "any.required": "El nombre es obligatorio.",
        }),

        latitude: Joi.number().precision(6).required().messages({
          "number.base": "La latitud debe ser un número.",
          "number.precision": "La latitud debe tener hasta 6 decimales.",
          "any.required": "La latitud es obligatoria.",
        }),

        longitude: Joi.number().precision(6).required().messages({
          "number.base": "La longitud debe ser un número.",
          "number.precision": "La longitud debe tener hasta 6 decimales.",
          "any.required": "La longitud es obligatoria.",
        }),

        rating: Joi.number().min(0).max(5).precision(2).optional().messages({
          "number.base": "El rating debe ser un número.",
          "number.min": "El rating no puede ser menor que 0.",
          "number.max": "El rating no puede ser mayor que 5.",
          "number.precision": "El rating debe tener hasta 2 decimales.",
        }),

        description: Joi.string().trim().max(500).optional().messages({
          "string.base": "La descripción debe ser un texto.",
          "string.max": "La descripción no puede superar los 500 caracteres.",
        }),

        id_admin: Joi.number().integer().positive().required().messages({
          "number.base": "El ID del administrador debe ser un número.",
          "number.integer":
            "El ID del administrador debe ser un número entero.",
          "number.positive":
            "El ID del administrador debe ser un número positivo.",
          "any.required": "El ID del administrador es obligatorio.",
        }),
      }),
    });
  }

  // Validaciones para actualizar una instalación :
  updateInstalacion() {
    return this.celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().integer().positive().required().messages({
          "number.base": "El ID de la instalación debe ser un número.",
          "number.integer":
            "El ID de la instalación debe ser un número entero.",
          "number.positive":
            "El ID de la instalación debe ser un número positivo.",
          "any.required": "El ID de la instalación es obligatorio.",
        }),
      }),

      [Segments.BODY]: Joi.object()
        .keys({
          name: Joi.string().trim().min(3).max(100).optional().messages({
            "string.base": "El nombre debe ser un texto.",
            "string.empty": "El nombre no puede estar vacío.",
            "string.min": "El nombre debe tener al menos 3 caracteres.",
            "string.max": "El nombre no puede superar los 100 caracteres.",
          }),

          latitude: Joi.number().precision(6).optional().messages({
            "number.base": "La latitud debe ser un número.",
            "number.precision": "La latitud debe tener hasta 6 decimales.",
          }),

          longitude: Joi.number().precision(6).optional().messages({
            "number.base": "La longitud debe ser un número.",
            "number.precision": "La longitud debe tener hasta 6 decimales.",
          }),

          rating: Joi.number().min(0).max(5).precision(2).optional().messages({
            "number.base": "El rating debe ser un número.",
            "number.min": "El rating no puede ser menor que 0.",
            "number.max": "El rating no puede ser mayor que 5.",
            "number.precision": "El rating debe tener hasta 2 decimales.",
          }),

          images: Joi.array()
            .items(Joi.string())
            .min(1)
            .max(5)
            .optional()
            .messages({
              "array.base": "Las imágenes deben ser un arreglo de URLs.",
              "array.min": "Debes proporcionar al menos una imagen.",
              "array.max": "No puedes modificar más de 5 imágenes.",
            }),

          description: Joi.string().trim().max(500).optional().messages({
            "string.base": "La descripción debe ser un texto.",
            "string.max": "La descripción no puede superar los 500 caracteres.",
          }),

          id_admin: Joi.number().integer().positive().optional().messages({
            "number.base": "El ID del administrador debe ser un número.",
            "number.integer":
              "El ID del administrador debe ser un número entero.",
            "number.positive":
              "El ID del administrador debe ser un número positivo.",
          }),
        })
        .min(1)
        .messages({
          "object.min": "Debes proporcionar al menos un campo para actualizar.",
        }),
    });
  }

  // Validaciones para cambiar al administrador de una instalación :
  changeAdminInstalacion() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        id: Joi.number().integer().positive().required().messages({
          "number.base": "El ID debe ser un número.",
          "number.integer": "El ID debe ser un número entero.",
          "number.positive": "El ID debe ser un número positivo.",
          "any.required": "El ID es obligatorio.",
        }),

        id_admin: Joi.number().integer().positive().required().messages({
          "number.base": "El ID de administrador debe ser un número.",
          "number.integer": "El ID de administrador debe ser un número entero.",
          "number.positive":
            "El ID de administrador debe ser un número positivo.",
          "any.required": "El ID de administrador es obligatorio.",
        }),
      }),
    });
  }
}

export default new InstalacionValidation();
