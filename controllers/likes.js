const express = require('express');
const models = require('./../models');

const router = express.Router();
const sequelize = models.sequelize;
const Profile = models.Profile;
const Like = models.Like;

router.get('/', (req, res) => {
  let likees = [];
  let likers = [];
  let mutualLikes = [];

  sequelize
    .transaction(t => {
      return Like.findAll({
        where: {
          likerId: req.session.currentUser.id
        },
        order: [['updatedAt', 'DESC']],
        transaction: t
      })
        .then(likes => {
          const likeeIds = likes.map(like => like.likeeId);
          likes.forEach(like => {
            likees.push({
              likeeId: like.likeeId,
              updatedAt: Date.parse(like.updatedAt)
            });
          });

          return Profile.findAll({
            where: {
              userId: likeeIds
            },
            include: [{ all: true }],
            transaction: t
          });
        })
        .then(profiles => {
          profiles.forEach(profile => {
            likees.forEach(likee => {
              if (likee.likeeId === profile.userId) {
                profile.viewUpdatedAt = likee.updatedAt;
              }
            });
          });

          likees = profiles.sort(function(a, b) {
            return b.viewUpdatedAt - a.viewUpdatedAt;
          });

          return Like.findAll({
            where: {
              likeeId: req.session.currentUser.id
            },
            order: [['updatedAt', 'DESC']],
            transaction: t
          });
        })
        .then(likes => {
          const likerIds = likes.map(like => like.likerId);
          likes.forEach(like => {
            likers.push({
              likerId: like.likerId,
              updatedAt: Date.parse(like.updatedAt)
            });
          });

          return Profile.findAll({
            where: {
              userId: likerIds
            },
            include: [{ all: true }],
            transaction: t
          });
        })
        .then(profiles => {
          profiles.forEach(profile => {
            likers.forEach(liker => {
              if (liker.likerId === profile.userId) {
                profile.viewUpdatedAt = liker.updatedAt;
              }
            });
          });

          likers = profiles.sort(function(a, b) {
            return b.viewUpdatedAt - a.viewUpdatedAt;
          });

          likees.forEach(likee => {
            likers.forEach(liker => {
              if (likee.userId === liker.userId) {
                mutualLikes.push(liker);
              }
            });
          });

          mutualLikes = mutualLikes.sort(function(a, b) {
            return b.viewUpdatedAt - a.viewUpdatedAt;
          });

          res.render('likes/index', { likees, likers, mutualLikes });
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

router.post('/', (req, res) => {
  const likeParams = {
    likerId: req.session.currentUser.id,
    likeeId: req.body.likee
  };

  Like.findOrCreate({
    defaults: likeParams,
    where: likeParams
  })
    .spread((like, created) => {
      if (created === true) {
        req.flash('success', 'Like registered!');
      } else {
        req.flash('info', 'You already like this user...');
      }
      res.redirect('back');
    })
    .catch(e => {
      if (e.error) {
        e.errors.forEach(err => req.flash('error', err.message));
        res.redirect('back');
      } else {
        res.status(500).send(e.stack);
      }
    });
});

module.exports = router;
