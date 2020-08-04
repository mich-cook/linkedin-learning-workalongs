const express = require('express');

const router = express.Router();

module.exports = args => {

  const { speakersService } = args;

  router.get('/', async (req, res) => {
    const speakers = await speakersService.getList();
    return res.json(speakers);
  });

  router.get('/:name', (req, res) => {
    return res.send(`Speaker page for ${req.params.name}`);
  });

  return router;
};
