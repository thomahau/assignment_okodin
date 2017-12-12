'use strict';
const models = require('./../models');
const faker = require('faker');
const config = require('./seed-config');

const SEEDS = config.seeds;
const MAX_DISTANCE = config.maxDistance;

faker.locale = 'nb_NO';

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
    const locations = [];
    for (let i = 1; i <= SEEDS; i++) {
      locations.push({
        distance: Math.floor(Math.random() * MAX_DISTANCE) + 1,
        city: faker.address.city()
      });
    }
    return queryInterface.bulkInsert('Locations', locations);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Locations', null, {}, models.Location);
  }
};
