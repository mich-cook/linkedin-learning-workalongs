const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = args => {

  const { speakersService } = args;

  router.get('/', async (req, res, next) => {
    try {
      const topSpeakers = await speakersService.getList();
      // template-specific vars
      return res.render('layout', { "title": "Welcome", "template": "index", topSpeakers });
    } catch(err) {
      return next(err);
    }
  });

  router.use('/speakers', speakersRoute(args));
  router.use('/feedback', feedbackRoute(args));

  return router;
};
