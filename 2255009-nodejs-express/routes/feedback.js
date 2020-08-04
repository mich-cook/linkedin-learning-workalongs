const express = require('express');

const router = express.Router();

module.exports = args => {

  const { feedbackService } = args;

  router.get('/', async (req, res, next) => {
    try {
      const feedback = await feedbackService.getList();
      // template-specific vars
      return res.render('layout', { "title": "Feedback", "template": "feedback", feedback });
    } catch(err) {
      return next(err);
    }
  });

  router.post('/', (req, res) => {
    return res.send(`Post handler for feedback form`);
  });

  return router;
};
