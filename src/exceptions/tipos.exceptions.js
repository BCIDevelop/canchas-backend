export class TipoNotFound {
	constructor() {
		this.message = "Tipo no encontrado";
		this.code = 404;
	}
}

export class TipoInactive {
	constructor() {
		this.message = "Tipo inactivo";
		this.code = 400;
	}
}

export class TiposNotFound {
	constructor() {
		this.message = "Tipos no encontrados",
		this.code = 404
	}
}
