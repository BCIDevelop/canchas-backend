import models from "../models";
import { SportNotAllowed } from "../exceptions/deporte.exceptions";

class ReservaController {
  constructor() {
    this.model = models.reservas;
  }
  async getAvailableHours(req, res) {
    const { instalacion_id, fecha, deporte } = req.body;
    /* Validamos que sport este entre unos de los valores permitidos*/
    const allowedSports = ["Futbol", "Voley", "Basquet"];
    if (!allowedSports.includes(deporte)) {
      throw new SportNotAllowed();
    }
    try {
      const canchasInstalacion = await models.canchas.findAll({
        where: { id_instalacion: instalacion_id },
      });
    } catch (error) {}
  }
}
export default ReservaController;
