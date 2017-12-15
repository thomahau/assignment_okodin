const express = require('express');
const models = require('./../models');
const { formatProfileParams } = require('./../helpers/profile_helper');

const router = express.Router();
const sequelize = models.sequelize;
const User = models.User;
const Profile = models.Profile;
const Location = models.Location;
const View = models.View;

// Show
router.get('/:id', (req, res) => {
  let editable = false;
  let profile;

  sequelize.transaction(t => {
    return Profile.findOne({
      where: {
        userId: req.params.id
      },
      include: [{ model: User }, { model: Location }],
      transaction: t
    })
      .then(result => {
        profile = result;
        if (profile) {
          if (profile.userId === req.session.currentUser.id) {
            editable = true;
            return Promise.resolve();
          } else {
            const viewParams = {
              viewerId: req.session.currentUser.id,
              vieweeId: profile.userId
            };
            return View.findOrCreate({
              defaults: viewParams,
              where: viewParams,
              transaction: t
            });
          }
        } else {
          res.send(404);
          return Promise.reject();
        }
      })
      .then(() => {
        res.render('profiles/show', { profile, editable });
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

// Edit
router.get('/:id/edit', (req, res) => {
  Profile.findOne({
    where: {
      userId: req.params.id
    },
    include: [{ model: User }, { model: Location }]
  })
    .then(profile => {
      if (profile) {
        res.render('profiles/edit', { profile });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// Update
router.put('/:id', (req, res) => {
  const profileParams = formatProfileParams(req.body.profile);
  const locationParams = {
    distance: req.body.location.distance,
    city: req.body.location.city
  };
  let location;

  sequelize.transaction(t => {
    return Profile.update(profileParams, {
      where: {
        userId: req.params.id
      },
      transaction: t
    })
      .then(() => {
        return Location.findOrCreate({
          defaults: locationParams,
          where: {
            distance: locationParams.distance,
            city: locationParams.city
          },
          transaction: t
        });
      })
      .spread(result => {
        location = result;
        return Profile.update(
          { locationId: location.id },
          {
            where: {
              userId: req.params.id
            },
            limit: 1,
            transaction: t
          }
        );
      })
      .then(() => {
        req.method = 'GET';
        res.redirect(`/profiles/${req.params.id}`);
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
