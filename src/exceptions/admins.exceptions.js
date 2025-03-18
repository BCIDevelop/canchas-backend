export class AdminNotFound {
  constructor() {
    this.message = 'Administrador no encontrado';
    this.code = 404;
  }
}

export class AdminInactive {
  constructor() {
    this.message = 'Administrador inactivo';
    this.code = 400;
  }
}

export class AdminActive {
  constructor() {
    this.message = 'Administrador activo';
    this.code = 400;
  }
}

export class AdminBadToken {
  constructor() {
    this.message = 'Token no válido';
    this.code = 400;
  }
}

export class AdminIncorretPassword {
  constructor() {
    this.message = 'Clave incorrecta';
    this.code = 400;
  }
}

export class AdminPasswordIncorrectSchema {
  constructor(message = 'Clave incorrecta') {
    this.message = message;
    this.code = 400;
  }
}

export class AdminPassworsDontMatch {
  constructor(message = 'Clave no coinciden') {
    this.message = message;
    this.code = 400;
  }
}