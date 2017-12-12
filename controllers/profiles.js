const url = require('url');
const express = require('express');
const models = require('./../models');

const router = express.Router();
const sequelize = models.sequelize;
const User = models.User;
const Profile = models.Profile;
const Location = models.Location;

router.get('/:id', (req, res) => {
  Profile.findOne({
    where: {
      userId: req.params.id
    },
    include: [{ model: User }, { model: Location }]
  }).then(profile => {
    res.render('profiles/show', { profile });
  });
});

module.exports = router;
