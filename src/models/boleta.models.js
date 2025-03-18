import { Model, DataTypes } from "sequelize";

class BoletaModel extends Model {
  static associate(models) {
    this.belongsTo(models.pagos, {
      foreignKey: "id_pago",
      as: "pago",
    });
    this.belongsTo(models.users, {
      foreignKey: "id_user",
      as: "user",
    });
  }

  static initModel(sequelize) {
    return super.init(
      {
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        id_pago: {
          type: DataTypes.INTEGER,
          references: {
            model: "pagos",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        id_user: {
          type: DataTypes.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      },
      {
        sequelize,
        tableName: "boletas",
        modelName: "boletas",
      }
    );
  }
}

export default BoletaModel;
