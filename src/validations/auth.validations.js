import { celebrator, Segments, Joi } from "celebrate";

class AuthValidation {
  constructor() {
    this.celebrate = celebrator({ reqContext: true }, { convert: true });
  }

  // Validaciones del inicio de sesión del usuario :
  signIn() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required().messages({
          "string.empty": "El correo electrónico no puede estar vacío.",
          "string.email": "Debe ingresar un correo válido.",
          "any.required": "El correo electrónico es obligatorio.",
        }),

        password: Joi.string().required().messages({
          "string.empty": "La contraseña no puede estar vacía.",
          "any.required": "La contraseña es obligatoria.",
        }),
      }),
    });
  }

  // Validaciones del registro del usuario :
  signUp() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().messages({
          "string.empty": "El nombre no puede estar vacío.",
          "any.required": "El nombre es obligatorio.",
        }),

        last_name: Joi.string().required().messages({
          "string.empty": "El apellido no puede estar vacío.",
          "any.required": "El apellido es obligatorio.",
        }),

        email: Joi.string().email().required().messages({
          "string.empty": "El correo electrónico no puede estar vacío.",
          "string.email": "Debe ingresar un correo válido.",
          "any.required": "El correo electrónico es obligatorio.",
        }),

        password: Joi.string().required().messages({
          "string.empty": "La contraseña no puede estar vacía.",
          "any.required": "La contraseña es obligatoria.",
        }),

        celphone: Joi.string().length(9).pattern(/^\d+$/).required().messages({
          "string.empty": "El número de celular no puede estar vacío.",
          "string.length":
            "El número de celular debe tener exactamente 9 dígitos.",
          "string.pattern.base":
            "El número de celular solo debe contener números.",
          "any.required": "El número de celular es obligatorio.",
        }),

        dni: Joi.string().length(8).pattern(/^\d+$/).required().messages({
          "string.empty": "El DNI no puede estar vacío.",
          "string.length": "El DNI debe tener exactamente 8 dígitos.",
          "string.pattern.base": "El DNI solo debe contener números.",
          "any.required": "El DNI es obligatorio.",
        }),

        confirmPassword: Joi.string().required().messages({
          "string.empty": "Debe confirmar su contraseña.",
          "any.required": "La confirmación de la contraseña es obligatoria.",
        }),

        termsAccepted: Joi.boolean().required().messages({
          "any.required": "Debe aceptar los términos y condiciones.",
          "boolean.base":
            "El valor de términos y condiciones debe ser verdadero o falso.",
        }),
      }),
    });
  }

  // Validaciones de la recuperación de contraseña :
  resetPassword() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required().messages({
          "string.empty": "El correo electrónico no puede estar vacío.",
          "string.email": "Debe ingresar un correo válido.",
          "any.required": "El correo electrónico es obligatorio.",
        }),
      }),
    });
  }

  // Validaciones de la confirmación de la cuenta :
  confirmAccount() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        token: Joi.string().required().messages({
          "string.empty": "El token no puede estar vacío.",
          "any.required": "El tokem es obligatorio",
        }),
      }),
    });
  }

  loginGmailOAuth() {
    return this.celebrate({
      [Segments.BODY]: Joi.object().keys({
        token: Joi.string().required().messages({
          "string.empty": "El token no puede estar vacío.",
          "any.required": "El tokem es obligatorio",
        }),
      }),
    });
  }
}

export default new AuthValidation();
