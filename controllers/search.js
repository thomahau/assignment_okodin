const express = require('express');
const models = require('./../models');

const router = express.Router();
const sequelize = models.sequelize;
const User = models.User;
const Profile = models.Profile;
const Location = models.Location;

router.get('/', (req, res) => {
  Profile.findAll({
    where: {
      userId: { $ne: req.session.currentUser.id }
    },
    include: [{ model: User }, { model: Location }]
  }).then(profiles => {
    res.render('searches/index', { profiles });
  });
});

module.exports = router;