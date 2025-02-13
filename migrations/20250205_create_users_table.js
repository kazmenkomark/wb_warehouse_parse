'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('warehouseList', {
      warehouseName: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      boxDeliveryAndStorageExpr: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      boxDeliveryBase: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      boxDeliveryLiter: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      boxStorageBase: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      boxStorageLiter: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('warehouseList');
  }
};