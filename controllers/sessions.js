const url = require('url');
const express = require('express');
const models = require('./../models');

const router = express.Router();
const sequelize = models.sequelize;
const User = models.User;

module.exports = app => {
  // Auth
  app.use((req, res, next) => {
    const reqUrl = url.parse(req.url);
    if (
      !req.session.currentUser &&
      !['/', '/login', '/sessions'].includes(reqUrl.pathname)
    ) {
      res.redirect('/login');
    } else {
      next();
    }
  });

  // New
  const onNew = (req, res) => {
    if (req.session.currentUser) {
      User.findOne({
        where: {
          id: req.session.currentUser.id
        }
      })
        .then(user => {
          res.redirect(`/profiles/${req.session.currentUser.id}`);
        })
        .catch(e => res.status(500).send(e.stack));
    } else {
      res.render('sessions/new');
    }
  };
  router.get('/', onNew);
  router.get('/login', onNew);

  // Create
  router.post('/sessions', (req, res) => {
    User.findOne({
      where: {
        username: req.body.username,
        email: req.body.email
      }
    })
      .then(user => {
        if (user) {
          req.session.currentUser = {
            username: user.username,
            email: user.email,
            id: user.id
          };
          req.flash('success', 'Welcome back');
          res.redirect(`/profiles/${req.session.currentUser.id}`);
        } else {
          req.flash('error', 'User not found');
          res.redirect('/login');
        }
      })
      .catch(e => res.status(500).send(e.stack));
  });

  // Destroy
  const onDestroy = (req, res) => {
    req.session.currentUser = null;
    res.redirect('/login');
  };
  router.get('/logout', onDestroy);
  router.delete('/logout', onDestroy);

  return router;
};
