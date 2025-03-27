import { Model, DataTypes } from "sequelize";

class PriceModel extends Model {
  static associate(models) {
    this.belongsTo(models.tipos, {
      foreignKey: "id_tipo",
      as: "tipo",
    });
  }

  static initModel(sequelize) {
    return super.init(
      {
        lights: {
          type: DataTypes.BOOLEAN,
        },
        price: {
          type: DataTypes.DECIMAL(4, 2),
        },
        players: {
          type: DataTypes.INTEGER,
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        id_tipo: {
          type: DataTypes.INTEGER,
          references: {
            model: "tipos",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      },
      {
        sequelize,
        tableName: "prices",
        modelName: "prices",
      }
    );
  }
}

export default PriceModel;
