'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable('Locations', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        distance: {
          type: Sequelize.INTEGER
        },
        city: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        }
      })
      .then(() => {
        return queryInterface.addIndex('Locations', ['distance']);
      });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Locations');
  }
};
