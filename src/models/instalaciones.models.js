import { Model, DataTypes } from "sequelize";

class InstalacionModel extends Model {
  static associate(models) {
    this.belongsTo(models.admins, {
      foreignKey: "id_admin",
      as: "admin",
    });
    this.hasMany(models.canchas, {
      foreignKey: 'id_instalacion',
      as: 'canchas'
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
        address: {
          type: DataTypes.STRING
        },
        sports: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true
        },
        servicios: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true
        },
        id_admin: {
          type: DataTypes.INTEGER,
          references: {
            model: "admins",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        }
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
