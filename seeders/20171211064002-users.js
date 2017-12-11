'use strict';
const models = require('./../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
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
    for (let i = 0; i < 10; i++) {
      users.push({
        username: `ThorLuvsU${i}`,
        email: `thor${i}@gmail.com`
      });
    }
    return queryInterface.bulkInsert('Users', users);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {}, models.User);
  }
};
