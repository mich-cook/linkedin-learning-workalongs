const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = args => {

  router.get('/', (req, res) => {
    return res.render('layout', { "title": "Welcome", "template": "index" });
  });

  router.use('/speakers', speakersRoute(args));
  router.use('/feedback', feedbackRoute(args));

  return router;
};
