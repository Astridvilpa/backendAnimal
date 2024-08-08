'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      Appointment.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Appointment.belongsTo(models.Pet, { foreignKey: 'Pet_id', as: 'pet' });
      Appointment.belongsTo(models.Service, { foreignKey: 'Service_id', as: 'service' });
      Appointment.belongsTo(models.Veterinario, { foreignKey: 'Veterinario_id', as: 'veterinario' });
    }
  }

  Appointment.init({
    type: DataTypes.STRING,
    date: DataTypes.DATE,
    Service_id: DataTypes.INTEGER,
    Pet_id: DataTypes.INTEGER,
    Veterinario_id: DataTypes.INTEGER,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments'
  });

  return Appointment;
};