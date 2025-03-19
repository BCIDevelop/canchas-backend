import { Model, DataTypes } from 'sequelize';

class CanchaModel extends Model {

  static associate(models) {
    this.belongsTo(models.instalaciones, {
      foreignKey: 'id_instalacion',
      as: 'instalacion',
    });
    this.belongsTo(models.tipos, {
      foreignKey: 'id_tipo',
      as: 'tipo',
    });
    this.belongsToMany(models.deportes, {
      through: 'cancha_deporte', // Tabla intermedia
      foreignKey: 'id_cancha',
      otherKey: 'id_deporte',
      as: 'deportes',
    });
  }

  static initModel(sequelize) {
    return super.init(
      {
        price_day: {
          type: DataTypes.DECIMAL(4,2)
        },
        price_night: {
          type: DataTypes.DECIMAL(4,2)
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        },
        id_instalacion: {
          type: DataTypes.INTEGER,
          references: {
            model: 'instalaciones',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        id_tipo: {
          type: DataTypes.INTEGER,
          references: {
            model: 'tipos',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      },
      {
        sequelize,
        tableName: 'canchas',
        modelName: 'canchas',
      }
    );
  }
}

export default CanchaModel;