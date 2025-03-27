import { celebrator, Segments, Joi } from "celebrate";

class PagoValidation {
  constructor() {
    this.celebrate = celebrator({ reqContext: true }, { convert: true });
  }
  getSessionToken() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        id_reserva: Joi.number().integer().positive().required(),
      }),
    });
  }
}

export default new PagoValidation();
