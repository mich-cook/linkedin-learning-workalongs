const express = require('express');

const router = express.Router();

module.exports = args => {

  const { speakersService } = args;

  router.get('/', async (req, res, next) => {
    try {
      const speakers = await speakersService.getList();
      return res.render('layout', { "title": "Speakers", "template": "speakers", speakers });
    } catch(err) {
      return next(err);
    }
  });

  router.get('/:name', async (req, res, next) => {
    try {
      const speaker = await speakersService.getSpeaker(req.params.name);
      return res.render('layout', { "title": "Speakers", "template": "speaker", speaker });
    } catch(err) {
      return next(err);
    }
  });

  return router;
};
