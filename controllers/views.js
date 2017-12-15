const express = require('express');
const models = require('./../models');

const router = express.Router();
const sequelize = models.sequelize;
const Profile = models.Profile;
const Location = models.Location;
const View = models.View;

router.get('/', (req, res) => {
  let viewees = [];
  let viewers = [];

  sequelize
    .transaction(t => {
      return View.findAll({
        where: {
          viewerId: req.session.currentUser.id
        },
        order: [['updatedAt', 'DESC']],
        transaction: t
      })
        .then(views => {
          const vieweeIds = views.map(view => view.vieweeId);
          views.forEach(view => {
            viewees.push({
              vieweeId: view.vieweeId,
              updatedAt: Date.parse(view.updatedAt)
            });
          });

          return Profile.findAll({
            where: {
              userId: vieweeIds
            },
            include: [{ all: true }],
            transaction: t
          });
        })
        .then(profiles => {
          profiles.forEach(profile => {
            viewees.forEach(viewee => {
              if (viewee.vieweeId === profile.userId) {
                profile.viewUpdatedAt = viewee.updatedAt;
              }
            });
          });

          viewees = profiles.sort(function(a, b) {
            return b.viewUpdatedAt - a.viewUpdatedAt;
          });

          return View.findAll({
            where: {
              vieweeId: req.session.currentUser.id
            },
            order: [['updatedAt', 'DESC']],
            transaction: t
          });
        })
        .then(views => {
          const viewerIds = views.map(view => view.viewerId);
          views.forEach(view => {
            viewers.push({
              viewerId: view.viewerId,
              updatedAt: Date.parse(view.updatedAt)
            });
          });

          return Profile.findAll({
            where: {
              userId: viewerIds
            },
            include: [{ all: true }],
            transaction: t
          });
        })
        .then(profiles => {
          profiles.forEach(profile => {
            viewers.forEach(viewer => {
              if (viewer.viewerId === profile.userId) {
                profile.viewUpdatedAt = viewer.updatedAt;
              }
            });
          });

          viewers = profiles.sort(function(a, b) {
            return b.viewUpdatedAt - a.viewUpdatedAt;
          });

          res.render('views/index', { viewees, viewers });
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

module.exports = router;
