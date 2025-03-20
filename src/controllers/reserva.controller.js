import models from "../models";
import { SportNotAllowed } from "../exceptions/deporte.exceptions";
import { ReservaOutOfDate } from "../exceptions/reservas.exceptions";

class ReservaController {
  constructor() {
    this.model = models.reservas;
    this.model_canchas = models.canchas;
  }
  async getAvailableHours(req, res) {
    const { instalacion_id, fecha, deporte } = req.body;
    /* Validamos que sport este entre unos de los valores permitidos*/
    const allowedSports = ["Futbol", "Voley", "Basquet"];
    if (!allowedSports.includes(deporte)) {
      throw new SportNotAllowed();
    }
    /* Validamos fecha */
    if (new Date(fecha) < new Date()) throw new ReservaOutOfDate();
    try {
      const canchasInstalacion = await this.model_canchas.findAll({
        where: { id_instalacion: instalacion_id },
      });
    } catch (error) {}
  }
}
export default ReservaController;
