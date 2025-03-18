import { Model, DataTypes } from 'sequelize';

class PagoModel extends Model {

  static associate(models) {
    this.belongsTo(models.reservas, {
      foreignKey: 'id_reserva',
      as: 'reserva',
    });
  }

  static initModel(sequelize) {
    return super.init(
      {
        security_token: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        monto: {
          type: DataTypes.DECIMAL(10,2)
        },
        id_reserva: {
          type: DataTypes.INTEGER,
          references: {
            model: 'reservas',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      },
      {
        sequelize,
        tableName: 'pagos',
        modelName: 'pagos',
      }
    );
  }
}

export default PagoModel;