import models from "../models";

import {
  ReservaOutOfDate,
  ReservaTaken,
} from "../exceptions/reservas.exceptions";
import { Op } from "sequelize";
import { CanchaDeporteNotFound } from "../exceptions/canchas.exceptions";
import { tranformDateUTCTarget } from "../helpers/formatDate";
import fs from "fs";

class ReservaController {
  constructor() {
    this.model = models.reservas;
    this.model_canchas = models.canchas;
    this.model_cancha_deporte = models.cancha_deporte;
    this.model_instalaciones = models.instalaciones;
    this.model_reservas = models.reservas;
    this.utcOffset = -5;
    this.horasDisponibles = [
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
    this.today = new Date(
      new Date().getTime() + this.utcOffset * 60 * 60 * 1000
    );
    if (!ReservaController.horariosData) {
      const rawData = fs.readFileSync("horarios.json", "utf-8");
      ReservaController.horariosData = JSON.parse(rawData);
    }
  }
  /* Endpoint para testear */
  async getInstalacionesByHour(req, res) {
    try {
      const { date: fecha, deporte, hour } = req.body;
      const fechaReserva = new Date(fecha);
      fechaReserva.setUTCHours(0, 0, 0, 0);
      console.log(fechaReserva);
      const fechaActual = this.today;
      fechaActual.setUTCHours(0, 0, 0, 0);

      if (fechaReserva < fechaActual) throw new ReservaOutOfDate();
      const formattedDate = `${String(fechaReserva.getUTCFullYear()).padStart(2, "0")}-${String(fechaReserva.getUTCMonth() + 1).padStart(2, "0")}-${fechaReserva.getUTCDate()}`;

      const canchasToQuery = [];
      /* Vemos todas las instalaciones que contengan ese deporte_ */
      const responseInstalaciones = await this.model_instalaciones.findAll({
        where: {
          status: true,
          sports: { [Op.contains]: [deporte.name] },
        },
        distinct: true,
        attributes: {
          exclude: ["created_at", "updated_at", "status"],
        },
        include: [
          {
            model: models.canchas,
            as: "canchas",
            attributes: ["id"],
            include: [
              {
                model: models.deportes,
                as: "deportes",
                attributes: ["id", "name"],
                through: { attributes: [] },
              },
              {
                model: models.tipos,
                as: "tipo",
                attributes: ["id", "name"],
              },
            ],
          },
        ],
      });

      /* Tenemos que filtramos las instalaciones que tengan canchas con el id de deporte especifico y el horario */
      const filteredInstalaciones = responseInstalaciones.filter(
        (instalacion) => {
          const remainingCanchas = instalacion.canchas.filter((cancha) => {
            /* Primero Filtramos */
            if (
              !cancha.deportes.some(
                (deporteCancha) => deporteCancha.id === deporte.id
              )
            ) {
              return false;
            }
            /* Segundo filtramos por el horarios definido por el administrador por cancha*/
            if (
              !ReservaController.horariosData[cancha.id][formattedDate][hour]
            ) {
              return false;
            }

            return true;
          });
          remainingCanchas.forEach((canchita) =>
            canchasToQuery.push(canchita.id)
          );
          return remainingCanchas.length > 0;
        }
      );
      /* Finalemente si existe instalaciones luego del filtrado procedemos a consultar la tabla reserva para cada cancha de la instalacion */
      /* Primero para optimizar traemos  las reservas para esa fecha y hora y id canchas que tiene ese deporte y horario definidods */
      if (filteredInstalaciones.length > 0) {
        const reservasResponse = await this.model_reservas.findAll({
          where: {
            fecha: formattedDate,
            id_cancha: { [Op.in]: canchasToQuery },
            hours: { [Op.contains]: [hour] },
          },
        });
        if (!(reservasResponse.length > 0)) {
          return res.status(200).json({ data: filteredInstalaciones });
        }
        const finalFiltered = filteredInstalaciones.filter((instalaciones) => {
          const remainingCanchas = instalaciones.canchas.filter((cancha) => {
            if (!canchasToQuery.includes(cancha.id)) return false;
            return !reservasResponse.some(
              (reserva) => reserva.id_cancha === cancha.id
            );
          });
          return remainingCanchas.length > 0;
        });
        return res.status(200).json({ data: finalFiltered });
      } else return res.status(200).json({ data: filteredInstalaciones });
    } catch (error) {
      return res.status(error?.code || 500).json({ message: error.message });
    }
  }

  async getAvailableHours(req, res) {
    const { instalacion_id, date: fecha, deporte_id, canchas } = req.body;

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
      /* Consultamos a la base de datos de reservas con la condicion agregada que no puedna ser de mas de un dia de antiguedad y si es asi tendria que esatr pagado */
      const yesterday =
        new Date(); /* Estoy manehadno con UTC porque parece que la BD hace comparaicones en UTC */
      yesterday.setDate(yesterday.getDate() - 1);

      const reservasRecords = await this.model.findAll({
        where: {
          [Op.and]: [
            { [Op.or]: conditions },
            {
              [Op.or]: [
                { pagado: true },
                { created_at: { [Op.gte]: yesterday } },
              ],
            },
          ],
        },
      });
      /* Para cada cancha crearemos un array de disponibilidad para luego hacer un reduce y ver si la horas estan dispibles */
      const setHorarioDeporte = new Set();
      const formattedDate = `${String(fechaReserva.getUTCFullYear()).padStart(2, "0")}-${String(fechaReserva.getUTCMonth() + 1).padStart(2, "0")}-${fechaReserva.getUTCDate()}`;
      const combinedHours = canchasPermitidas.map((cancha_id) => {
        const hours = Object.fromEntries(
          Array.from({ length: 24 }, (_, i) => {
            if (
              ReservaController.horariosData[cancha_id][formattedDate][
                i.toString().padStart(2, "0")
              ]
            ) {
              setHorarioDeporte.add(i.toString().padStart(2, "0"));
            }
            return [
              i.toString().padStart(2, "0"),
              ReservaController.horariosData[cancha_id][formattedDate][
                i.toString().padStart(2, "0")
              ],
            ];
          })
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
          this.horasDisponibles.forEach((hora) => {
            if (curr[key][hora]) {
              hourCanchas[hora] = key;
              acc[hora] = true;
            }
          });
          return acc;
        },
        Object.fromEntries(this.horasDisponibles.map((hora) => [hora, false])) // Asegurar que todas las claves sean strings
      );
      /* Enviamos solo las horas que estan disponibles para ese deporte */
      const availabeHoursResult = Object.entries(reducedHours).flatMap(
        ([hour, available]) =>
          available ? { hour, id_cancha: hourCanchas[hour] } : []
      );
      return res.status(200).json({
        data: {
          schedule: [...setHorarioDeporte],
          available: availabeHoursResult,
        },
      });
    } catch (error) {
      return res.status(error?.code || 500).json({ message: error.message });
    }
  }
  async makeReservation(req, res) {
    const { date, id_user, id_cancha, id_instalacion, hours } = req.body;
    try {
      console.log(hours);
      const fechaReserva = new Date(date);
      const formattedDate = `${String(fechaReserva.getUTCFullYear()).padStart(2, "0")}-${String(fechaReserva.getUTCMonth() + 1).padStart(2, "0")}-${fechaReserva.getUTCDate()}`;
      /* Primero verificamos que el horario este disponible para esa fecha */
      console.log(ReservaController.horariosData[id_cancha][formattedDate]);
      const hoursSchedule =
        ReservaController.horariosData[id_cancha][formattedDate];
      hours.forEach((hour) => {
        console.log(hour);
        if (!hoursSchedule[hour]) {
          console.log(hoursSchedule[hour]);
          throw new ReservaTaken();
        }
      });
      /* Luego verificamos que no este registrada */
      const recordReserva = await this.model.findAll({
        where: {
          fecha: fechaReserva.toISOString().split("T")[0],
          id_cancha,
          id_instalacion,
        },
      });
      const nowUTC5 = new Date(
        new Date().getTime() + this.utcOffset * 60 * 60 * 1000
      );
      nowUTC5.setDate(nowUTC5.getDate() - 1);
      if (recordReserva.length > 0) {
        recordReserva
          .filter((record) => {
            const fechaCreacion = tranformDateUTCTarget(
              record.created_at,
              this.utcOffset
            );
            console.log(fechaCreacion);
            return record.pagado || fechaCreacion >= nowUTC5;
          })
          .forEach((record) => {
            const hoursReservadas = record.hours;
            hours.forEach((hour) => {
              if (hoursReservadas.includes(hour)) {
                throw new ReservaTaken();
              }
            });
          });
      }
      /* Creamos la reserva */
      const resultReserva = await this.model.create({
        fecha: fechaReserva.toISOString().split("T")[0],
        id_user,
        id_cancha,
        id_instalacion,
        hours,
      });
      return res.status(201).json(resultReserva);
    } catch (error) {
      return res.status(error?.code || 500).json({ message: error.message });
    }
  }
}
export default ReservaController;
