const express = require('express');

const router = express.Router();

module.exports = args => {

  const { speakersService } = args;

  router.get('/', async (req, res) => {
    const speakers = await speakersService.getList();
    return res.render('layout', { "title": "Speakers", "template": "speakers", speakers });
  });

  router.get('/:name', async (req, res) => {
    const speaker = await speakersService.getSpeaker(req.params.name);
    return res.render('layout', { "title": "Speakers", "template": "speaker", speaker });
  });

  return router;
};
