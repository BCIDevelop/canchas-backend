import { Model, DataTypes } from "sequelize";

class InstalacionModel extends Model {
  static associate(models) {
    this.belongsTo(models.admins, {
      foreignKey: "id_admin",
      as: "admin",
    });
  }

  static initModel(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
        },
        latitude: {
          type: DataTypes.DECIMAL(9, 6),
        },
        longitude: {
          type: DataTypes.DECIMAL(9, 6),
        },
        rating: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        images: {
          type: DataTypes.ARRAY(DataTypes.STRING),
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        id_admin: {
          type: DataTypes.INTEGER,
          references: {
            model: "admins",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        images: {
          type: DataTypes.ARRAY(DataTypes.STRING),
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        sports: {
          type: DataTypes.ARRAY(DataTypes.STRING),
        },
      },
      {
        sequelize,
        tableName: "instalaciones",
        modelName: "instalaciones",
      }
    );
  }
}

export default InstalacionModel;
