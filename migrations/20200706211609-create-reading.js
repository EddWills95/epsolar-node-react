'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Readings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      datetime: {
        type: Sequelize.DATE
      },
      solar_voltage: {
        type: Sequelize.FLOAT
      },
      solar_voltage: {
        type: Sequelize.FLOAT
      },
      battery_voltage: {
        type: Sequelize.FLOAT
      },
      charging_voltage: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Readings');
  }
};