export class UserNotFound {
  constructor() {
    this.message = "Usuario no encontrado";
    this.code = 404;
  }
}
export class UserInactive {
  constructor() {
    this.message = "Usuario inactivo";
    this.code = 400;
  }
}
export class UserActive {
  constructor() {
    this.message = "Usuario activo";
    this.code = 400;
  }
}
export class UserBadToken {
  constructor() {
    this.message = "Token no es valido";
    this.code = 400;
  }
}
export class UserIncorretPassword {
  constructor() {
    this.message = "Clave incorrecta";
    this.code = 400;
  }
}
export class UserPasswordIncorrectSchema {
  constructor(message = "Clave incorrecta") {
    this.message = message;
    this.code = 400;
  }
}

export class UserPassworsDontMatch {
  constructor(message = "Clave no coinciden") {
    this.message = message;
    this.code = 400;
  }
}
