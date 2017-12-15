const express = require('express');
const models = require('./../models');

const router = express.Router();
const sequelize = models.sequelize;
const User = models.User;
const Profile = models.Profile;
// const Location = models.Location;
const View = models.View;

router.get('/', (req, res) => {});

module.exports = router;
