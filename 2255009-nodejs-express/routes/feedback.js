const express = require('express');

const router = express.Router();

module.exports = args => {

  const { feedbackService } = args;

  router.get('/', async (req, res) => {
    const feedback = await feedbackService.getList();
    return res.json(feedback);
  });

  router.post('/', (req, res) => {
    return res.send(`Post handler for feedback form`);
  });

  return router;
};
