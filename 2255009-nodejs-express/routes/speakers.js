const express = require('express');

const router = express.Router();

module.exports = () => {

  router.get('/', (req, res) => {
    return res.send(`Speakers placeholder`);
  });

  router.get('/:name', (req, res) => {
    return res.send(`Speaker page for ${req.params.name}`);
  });

  return router;
};
