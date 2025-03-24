export class SportNotAllowed {
  constructor() {
    this.message = "Deporte no permitido";
    this.code = 400;
  }
}

export class SportNotFound {
	constructor() {
		this.message = "Deporte no encontrado";
		this.code = 400;
	}
}

export class SportsNotFound {
	constructor() {
		this.message = "Deportes no encontrados",
		this.code = 404
	}
}
