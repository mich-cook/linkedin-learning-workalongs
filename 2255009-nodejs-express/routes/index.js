const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = args => {

  const { speakersService } = args;

  router.get('/', async (req, res) => {
    const topSpeakers = await speakersService.getList();
    // template-specific vars
    return res.render('layout', { "title": "Welcome", "template": "index", topSpeakers });
  });

  router.use('/speakers', speakersRoute(args));
  router.use('/feedback', feedbackRoute(args));

  return router;
};
