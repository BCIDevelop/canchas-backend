import models from "../models";

import {
  SportNotFound,
  SportNotAllowed,
  SportsNotFound,
} from "../exceptions/deporte.exceptions";

class SportController {
  constructor() {
    this.model = models.deportes;
  }

  // Controlador para obtener un deporte por ID (GENERAL) :
  async getSportById(req, res) {
    const { id } = req.params;

    try {
      const response = await this.model.findByPk(id);
      if (!response) throw new SportNotFound();
      if (!response.status) throw new SportNotAllowed();

      return res.status(200).json({
        message: "Deporte obtenido exitosamente",
        data: response,
      });
    } catch (error) {
      return res.status(error?.code || 500).json({
        message: error.message,
      });
    }
  }

  // Controlador para obtener todos los deportes (GENERAL) :
  async getSports(req, res) {
    const { search } = req.query;

    try {
      const whereCondition = {
        status: true,
        ...(search && {
          [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }],
        }),
      };

      const response = await this.model.findAndCountAll({
        where: whereCondition,
        order: [["name", "ASC"]],
      });
      if (!response) throw new SportsNotFound();

      return res.status(200).json({
        message: "Deportes obtenidos exitosamente",
        data: {
          data: response.rows,
          total: response.count,
        },
      });
    } catch (error) {
      return res.status(error?.code || 500).json({
        message: error.message,
      });
    }
  }

  // Controlador para crear un deporte (SUPERVISORES) :
  async createSport(req, res) {
    const { name } = req.body;

    try {
      const response = await this.model.create({ name });
      return res.status(200).json({
        message: "Deporte creado exitosamente",
        data: response,
      });
    } catch (error) {
      return res.status(error?.code || 500).json({
        message: error.message,
      });
    }
  }
}

export default SportController;
