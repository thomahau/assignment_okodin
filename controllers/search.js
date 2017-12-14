const express = require('express');
const models = require('./../models');
const { formatSearchParams } = require('./../helpers/params_helper');

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

router.post('/', (req, res) => {
  console.dir(req.body, { colors: true, depth: null });

  const search = req.body.search;
  const gender = search.profile.gender || '';
  const minAge = search.profile.minAge || 18;
  const maxAge = search.profile.maxAge || 100;
  const searchDistance = search.location ? search.location.distance : 200;
  const userId = req.session.currentUser.id;
  let currentOrder = search.order || 'age';
  let newOrder;
  let userCity;
  let userDistance;
  let locations;
  let profiles;

  sequelize.transaction(t => {
    return User.findById(req.session.currentUser.id, {
      include: [
        {
          all: true,
          include: [
            {
              all: true
            }
          ]
        }
      ],
      transaction: t
    })
      .then(user => {
        userCity = user.Profile.Location.city;
        userDistance = user.Profile.Location.distance;

        return Location.findAll({
          where: {
            distance: {
              $between: [
                userDistance - searchDistance,
                userDistance + searchDistance
              ]
            }
          },
          transaction: t
        });
      })
      .then(results => {
        locations = results.map(result => result.id);

        if (search.sort === 'age') {
          newOrder = [search.sort];
        } else if (search.sort === 'distance') {
          newOrder = [[Profile.associations.Location, search.sort]];
        } else if (search.sort === 'updatedAt') {
          newOrder = [[Profile.associations.User, search.sort]];
        }
        currentOrder = newOrder;

        const searchParams = formatSearchParams(search, locations, userId);

        return Profile.findAll({
          where: searchParams,
          include: [
            {
              all: true,
              include: [{ all: true }]
            }
          ],
          order: newOrder,
          transaction: t
        });
      })
      .then(result => {
        profiles = result;
        res.render('searches/index', {
          profiles,
          search,
          userCity,
          currentOrder
        });
      })
      .catch(e => {
        if (e.errors) {
          e.errors.forEach(err => req.flash('error', err.message));
          res.redirect('back');
        } else {
          res.status(500).send(e.stack);
        }
      });
  });
});

module.exports = router;
