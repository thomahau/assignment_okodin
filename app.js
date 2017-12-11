const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const cookieSession = require('cookie-session');
app.use(
  cookieSession({
    name: 'session',
    keys: ['asdf1234']
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.currentUser = req.session.currentUser;
  next();
});

const methodOverride = require('method-override');
const getPostSupport = require('express-method-override-get-post-support');
app.use(methodOverride(getPostSupport.callback, getPostSupport.options));

// app.use((req, res, next) => {
//   req.session.backUrl = req.header('Referer') || '/';
//   next();
// });

const morgan = require('morgan');
app.use(morgan('tiny'));

// Routes
const sessionsRoutes = require('./controllers/sessions')(app);
app.use('/', sessionsRoutes);

const expressHandlebars = require('express-handlebars');

const hbs = expressHandlebars.create({
  partialsDir: 'views/',
  defaultLayout: 'application'
  // helpers:
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const port = process.env.PORT || process.argv[2] || 3000;
const host = 'localhost';

let args;
process.env.NODE_ENV === 'production' ? (args = [port]) : (args = [port, host]);

args.push(() => {
  console.log(`Listening: http://${host}:${port}`);
});

app.listen.apply(app, args);

module.exports = app;
