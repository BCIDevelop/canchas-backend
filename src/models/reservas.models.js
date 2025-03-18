import { Model, DataTypes } from "sequelize";

class ReservaModel extends Model {
  static associate(models) {
    this.belongsTo(models.instalaciones, {
      foreignKey: "id_instalacion",
      as: "instalacion",
    });
    this.belongsTo(models.tipos, {
      foreignKey: "id_cancha",
      as: "cancha",
    });
    this.belongsTo(models.users, {
      foreignKey: "id_user",
      as: "user",
    });
  }

  static initModel(sequelize) {
    return super.init(
      {
        fecha: {
          type: DataTypes.DATEONLY(),
        },
        hours: {
          type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        count_hours: {
          type: DataTypes.INTEGER,
        },
        pagado: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        id_instalacion: {
          type: DataTypes.INTEGER,
          references: {
            model: "instalaciones",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        id_cancha: {
          type: DataTypes.INTEGER,
          references: {
            model: "canchas",
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
        tableName: "reservas",
        modelName: "reservas",
      }
    );
  }
}

export default ReservaModel;
