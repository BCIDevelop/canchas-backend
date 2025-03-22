import { celebrator, Segments, Joi } from "celebrate";

class UserValidation {
  constructor() {
    this.celebrate = celebrator({ reqContext: true }, { convert: true });
  }

  updateProfile() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string(),
        last_name: Joi.string(),
        email: Joi.string(),
        celphone: Joi.string().length(9).pattern(/^\d+$/).messages({
          "string.length":
            "El número de celular debe tener exactamente 9 dígitos.",
          "string.pattern.base":
            "El número de celular solo puede contener dígitos.",
        }),
        dni: Joi.string().length(8).pattern(/^\d+$/),
        address: Joi.string(),
      }),
    });
  }
}

export default new UserValidation();
