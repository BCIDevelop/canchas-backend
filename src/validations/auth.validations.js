import { celebrator, Segments, Joi } from "celebrate";

class AuthValidation {
  constructor() {
    this.celebrate = celebrator({ reqContext: true }, { convert: true });
  }
  signIn() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    });
  }
  signUp() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        celphone: Joi.string().length(9).pattern(/^\d+$/).required(),
        dni: Joi.string().length(8).pattern(/^\d+$/).required(),
        confirmPassword: Joi.string().required(),
        termsAccepted: Joi.boolean().required(),
      }),
    });
  }

  resetPassword() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required(),
      }),
    });
  }
  confirmAccount() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required(),
        token: Joi.string().required(),
      }),
    });
  }
}

export default new AuthValidation();
