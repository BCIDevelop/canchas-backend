import models from "../models";

import {
  ServicioNotFound,
  ServicioInactive,
  ServiciosNotFound
} from "../exceptions/servicios.exceptions";

class ServicioController {

  constructor() {
    this.model = models.servicios;
  }

  // Controlador para obtener un servicio por ID (GENERAL) :
  async getServicioById(req, res) {

    const { id } = req.params;

    try {
      const response = await this.model.findByPk(id);
      if (!response) throw new ServicioNotFound();
      if (!response.status) throw new ServicioInactive();

      return res.status(200).json({
        message: "Servicio obtenido exitosamente",
        data: response,
      });

    } catch (error) {
      return res.status(error?.code || 500).json({
        message: error.message
      });
    }
  }

  // Controlador para obtener todos los servicios (GENERAL) :
  async getServicios(req, res) {

    try {
      const response = await this.model.findAndCountAll({
        where: { status: true }
      });
      if (!response.count) throw new ServiciosNotFound();

      return res.status(200).json({
        message: "Servicios obtenidos exitosamente",
        data: {
          data: response.rows,
          total: response.count,
        },
      });

    } catch (error) {
      return res.status(error?.code || 500).json({
        message: error.message
      });
    }
  }
}

export default ServicioController;
