export class InstalacionNotFound {
  constructor() {
    this.message = 'Instalación no encontrada';
    this.code = 404;
    this.data = []
  }
}

export class InstalacionInactive {
  constructor() {
    this.message = 'Instalación inactiva';
    this.code = 400;
    this.data = []
  }
}

export class InstalacionesPageNotFound {
  constructor(currentPage, pageCount, totalCount, totalPages) {
    this.message = 'Página fuera de rango',
    this.code = 200
    this.data = {
      data: [],
      currentPage,
      pageCount,
      totalCount,
      totalPages
    }
  }
}