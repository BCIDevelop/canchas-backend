import { Model, DataTypes } from "sequelize";

export default class CanchaDeporte extends Model {
  static initModel(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_cancha: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_deporte: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "cancha_deporte",
        tableName: "cancha_deporte",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.canchas, { foreignKey: "id_cancha", as: "cancha" });
    this.belongsTo(models.deportes, {
      foreignKey: "id_deporte",
      as: "deporte",
    });
  }
}
