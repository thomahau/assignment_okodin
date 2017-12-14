'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable('Profiles', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        aboutMe: {
          type: Sequelize.TEXT
        },
        talents: {
          type: Sequelize.TEXT
        },
        favorites: {
          type: Sequelize.TEXT
        },
        whyMe: {
          type: Sequelize.TEXT
        },
        age: {
          type: Sequelize.INTEGER
        },
        gender: {
          type: Sequelize.STRING
        },
        maritalStatus: {
          type: Sequelize.STRING
        },
        height: {
          type: Sequelize.INTEGER
        },
        bodyType: {
          type: Sequelize.STRING
        },
        children: {
          type: Sequelize.BOOLEAN
        },
        occupation: {
          type: Sequelize.STRING
        },
        userId: {
          type: Sequelize.INTEGER
        },
        locationId: {
          type: Sequelize.INTEGER
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
        return queryInterface.addIndex('Profiles', ['age']);
      })
      .then(() => {
        return queryInterface.addIndex('Profiles', ['updatedAt']);
      });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Profiles');
  }
};
