import { Model, DataTypes } from "sequelize";

class ServicioModel extends Model {
  static associate(models) {}
  static initModel(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        tableName: "servicios",
        modelName: "servicios",
      }
    );
  }
}

export default ServicioModel;
