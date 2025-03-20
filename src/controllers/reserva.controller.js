import models from "../models";
import { SportNotAllowed } from "../exceptions/deporte.exceptions";
import { ReservaOutOfDate } from "../exceptions/reservas.exceptions";
import { Op } from "sequelize";
import { CanchaDeporteNotFound } from "../exceptions/canchas.exceptions";
import fs from "fs";

class ReservaController {
  constructor() {
    this.model = models.reservas;
    this.model_canchas = models.canchas;
    this.model_cancha_deporte = models.cancha_deporte;
    if (!ReservaController.horariosData) {
      const rawData = fs.readFileSync("horarios.json", "utf-8");
      ReservaController.horariosData = JSON.parse(rawData);
    }
  }
  async getAvailableHours(req, res) {
    const { instalacion_id, fecha, deporte_id, canchas } = req.body;

    try {
      /* Validamos fecha */
      const fechaReserva = new Date(fecha);
      fechaReserva.setHours(0, 0, 0, 0);
      const fechaActual = new Date();
      fechaActual.setHours(0, 0, 0, 0);
      if (fechaReserva < fechaActual) throw new ReservaOutOfDate();
      const orConditions = canchas.map((cancha_id) => ({
        [Op.and]: [{ id_deporte: deporte_id }, { id_cancha: cancha_id }],
      }));
      const records = await this.model_cancha_deporte.findAll({
        where: {
          [Op.or]: orConditions,
        },
      });
      if (records.length === 0) throw new CanchaDeporteNotFound();
      /* Por cada cancha para ese deporte verificamos la tabla registro */
      const canchasPermitidas = records.map((record) => record.id_cancha);
      const conditions = canchasPermitidas.map((cancha_id) => ({
        fecha: fechaReserva,
        id_cancha: cancha_id,
        id_instalacion: instalacion_id,
      }));
      const reservasRecords = await this.model.findAll({
        where: {
          [Op.or]: conditions,
        },
      });
      /* Definimos las horas Disponibles  */
      const horasDisponibles = [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ];
      /* Para cada cancha crearemos un array de disponibilidad para luego hacer un reduce y ver si la horas estan dispibles */
      const formattedDate = `${String(fechaReserva.getUTCDate()).padStart(2, "0")}-${String(fechaReserva.getUTCMonth() + 1).padStart(2, "0")}-${fechaReserva.getUTCFullYear()}`;
      const combinedHours = canchasPermitidas.map((cancha_id) => {
        const hours = Object.fromEntries(
          Array.from({ length: 24 }, (_, i) => [
            i.toString().padStart(2, "0"),
            ReservaController.horariosData[cancha_id][formattedDate][
              i.toString().padStart(2, "0")
            ],
          ])
        );
        return {
          [cancha_id]: hours,
        };
      });
      /* Finalmente eliminamos las horas reservadas para cada cancha */
      reservasRecords.forEach((reserva) => {
        const cancha_id = reserva.id_cancha;
        const hours = reserva.hours;
        const canchaIndex = combinedHours.findIndex(
          (cancha) => cancha[cancha_id]
        );
        hours.forEach((hour) => {
          combinedHours[canchaIndex][cancha_id][hour] = false;
        });
      });

      /* Juntamos las horas de las canchas para ver la disponibilidad del deporte para esa instalacion */
      const hourCanchas = {
        "00": null,
        "01": null,
        "02": null,
        "03": null,
        "04": null,
        "05": null,
        "06": null,
        "07": null,
        "08": null,
        "09": null,
        10: null,
        11: null,
        12: null,
        13: null,
        14: null,
        15: null,
        16: null,
        17: null,
        18: null,
        19: null,
        20: null,
        21: null,
        22: null,
        23: null,
      };
      const reducedHours = combinedHours.reduce(
        (acc, curr) => {
          const key = Object.keys(curr)[0];
          horasDisponibles.forEach((hora) => {
            if (curr[key][hora]) {
              hourCanchas[hora] = key;
              acc[hora] = true;
            }
          });
          return acc;
        },
        Object.fromEntries(horasDisponibles.map((hora) => [hora, false])) // Asegurar que todas las claves sean strings
      );
      /* Enviamos solo las horas que estan disponibles para ese deporte */
      const availabeHoursResult = Object.entries(reducedHours).flatMap(
        ([hour, available]) =>
          available ? { hour, id_cancha: hourCanchas[hour] } : []
      );
      return res.status(200).json(availabeHoursResult);
    } catch (error) {
      return res.status(error?.code || 500).json({ message: error.message });
    }
  }
  async makeReservation(req, res) {
    const { fecha, id_user, id_cancha, id_instalacion, hours } = req.body;
    return res.status(200).json({ message: "Reserva creada" });
  }
}
export default ReservaController;
