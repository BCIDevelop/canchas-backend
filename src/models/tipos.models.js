import { Model, DataTypes } from "sequelize";

class TipoModel extends Model {
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
        tableName: "tipos",
        modelName: "tipos",
      }
    );
  }
}

export default TipoModel;
