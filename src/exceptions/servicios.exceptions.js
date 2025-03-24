export class ServicioNotFound {
	constructor() {
		this.message = "Servicio no encontrado";
		this.code = 404;
	}
}

export class ServicioInactive {
	constructor() {
		this.message = "Servicio inactivo";
		this.code = 400;
	}
}

export class ServiciosNotFound {
	constructor() {
		this.message = "Servicios no encontrados",
		this.code = 404
	}
}
