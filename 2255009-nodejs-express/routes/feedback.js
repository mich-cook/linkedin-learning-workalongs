const express = require('express');

const router = express.Router();

module.exports = () => {

  router.get('/', (req, res) => {
    return res.send(`Feedback placeholder`);
  });

  router.post('/', (req, res) => {
    return res.send(`Post handler for feedback form`);
  });

  return router;
};
