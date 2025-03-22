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
