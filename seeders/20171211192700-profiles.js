'use strict';
const models = require('./../models');
const faker = require('faker');
const config = require('./seed-config');

const SEEDS = config.seeds;
const MIN_AGE = config.minAge;
const MAX_AGE = config.maxAge;
const MIN_HEIGHT = config.minHeight;
const MAX_HEIGHT = config.maxHeight;
const maritalStatus = config.maritalStatus;
const bodyTypes = config.bodyTypes;

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
    const profiles = [];
    for (let i = 1; i <= SEEDS; i++) {
      profiles.push({
        aboutMe: faker.lorem.paragraph(),
        talents: faker.lorem.paragraph(),
        favorites: faker.lorem.paragraph(),
        whyMe: faker.lorem.paragraph(),
        age: Math.floor(Math.random() * (MAX_AGE - MIN_AGE)) + MIN_AGE,
        gender: i % 2 === 0 ? 'Male' : 'Female',
        maritalStatus:
          maritalStatus[Math.floor(Math.random() * maritalStatus.length)],
        height:
          Math.floor(Math.random() * (MAX_HEIGHT - MIN_HEIGHT)) + MIN_HEIGHT,
        bodyType: bodyTypes[Math.floor(Math.random() * bodyTypes.length)],
        children: faker.random.boolean(),
        occupation: faker.name.jobTitle(),
        userId: i,
        locationId: i
      });
    }
    return queryInterface.bulkInsert('Profiles', profiles);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Profiles', null, {}, models.Profile);
  }
};
