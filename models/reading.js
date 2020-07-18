'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reading extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Reading.init({
    datetime: DataTypes.DATE,
    solar_voltage: DataTypes.FLOAT,
    solar_current: DataTypes.FLOAT,
    battery_voltage: DataTypes.FLOAT,
    charging_current: DataTypes.FLOAT,
    state_of_charge: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Reading',
  });
  return Reading;
};