export class TokenNotObtained {
  constructor() {
    this.message = "Error al obtener el token";
    this.code = 500;
  }
}
export class PagosNotFound {
  constructor(message = "Pagos no encontrados") {
    this.message = message;
    this.code = 404;
  }
}
