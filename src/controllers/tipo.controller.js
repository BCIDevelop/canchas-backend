import models from "../models";

import {
  TipoNotFound,
  TipoInactive,
  TiposNotFound
} from "../exceptions/tipos.exceptions";

class TipoController {

  constructor() {
    this.model = models.tipos;
  }

  // Controlador para obtener un tipo de cancha por ID (GENERAL) :
  async getTipoById(req, res) {

    const { id } = req.params;

    try {
      const response = await this.model.findByPk(id);
      if (!response) throw new TipoNotFound();
      if (!response.status) throw new TipoInactive();

      return res.status(200).json({
        message: "Tipo obtenido exitosamente",
        data: response,
      });

    } catch (error) {
      return res.status(error?.code || 500).json({
        message: error.message
      });
    }
  }

  // Controlador para obtener todos los tipos de cancha (GENERAL) :
  async getTipos(req, res) {

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
        order: [["name", "ASC"]]
      });
      if (!response.count) throw new TiposNotFound();

      return res.status(200).json({
        message: "Tipos obtenidos exitosamente",
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

  // Controlador para crear un tipo de cancha (SUPERVISORES) :
  async createTipo(req, res) {

    const { name } = req.body;

    try {
      const response = await this.model.create({ name });
      return res.status(200).json({
        message: "Tipo creado exitosamente",
        data: response,
      });

    } catch (error) {
      return res.status(error?.code || 500).json({
        message: error.message
      });
    }
  }
}

export default TipoController;
