export class ReservaOutOfDate {
  constructor() {
    this.message = "Reserva esta fuera de fecha";
    this.code = 400;
  }
}
export class ReservaTaken {
  constructor() {
    this.message = "Hora ya reservada o no disponible";
    this.code = 400;
  }
}

export class ScheduleOutOfRange {
  constructor() {
    this.message = "La fecha no esta disponible";
    this.code = 400;
  }
}

export class ReservaNotFound {
  constructor() {
    (this.message = "Reserva no encontrada"), (this.code = 404);
  }
}

export class ReservaPageNotFound {
  constructor(currentPage, pageCount, totalCount, totalPages) {
    (this.message = "Página fuera de rango"),
      (this.code = 200),
      (this.data = {
        data: [],
        currentPage,
        pageCount,
        totalCount,
        totalPages,
      });
  }
}
