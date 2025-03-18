import { celebrator, Segments, Joi } from "celebrate";

class GeneralValidation {
  constructor() {
    this.celebrate = celebrator({ reqContext: true }, { convert: true });
  }
  getById() {
    return this.celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
      }),
    });
  }
}

export default new GeneralValidation();
