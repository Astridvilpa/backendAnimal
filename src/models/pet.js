'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pet.belongsTo(models.User, { foreignKey: 'user_id' });
      Pet.hasMany(models.Appointment, { foreignKey: 'Pet_id' });
    }
  }
  Pet.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    user_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pet',
    tableName:  'pets'
  });
  return Pet;
};