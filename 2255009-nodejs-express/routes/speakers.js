const express = require('express');

const router = express.Router();

module.exports = args => {

  const { speakersService } = args;

  router.get('/', async (req, res) => {
    const speakers = await speakersService.getList();
    return res.render('layout', { "title": "Speakers", "template": "speakers", speakers });
  });

  router.get('/:name', (req, res) => {
    return res.send(`Speaker page for ${req.params.name}`);
  });

  return router;
};
