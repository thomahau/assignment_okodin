'use strict';
const models = require('./../models');
const SEEDS = require('./seed-config').seeds;

module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const users = [];
    for (let i = 1; i <= SEEDS; i++) {
      users.push({
        username: `vikinglover${i}`,
        email: `viking${i}@gmail.com`,
        profileId: i
      });
    }
    return queryInterface.bulkInsert('Users', users);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {}, models.User);
  }
};
