const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = args => {

  router.get('/', (req, res) => {
    return res.render('pages/index', { title: "Welcome" });
  });

  router.use('/speakers', speakersRoute(args));
  router.use('/feedback', feedbackRoute(args));

  return router;
};
