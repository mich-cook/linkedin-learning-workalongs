const express = require('express');

const { check, validationResult } = require('express-validator');

const router = express.Router();

module.exports = args => {

  const { feedbackService } = args;

  router.get('/', async (req, res, next) => {
    try {
      const feedback = await feedbackService.getList();
      const errors = req.session.feedback ? req.session.feedback.errors : false;
      req.session.feedback = {};
      // template-specific vars
      return res.render('layout', { "title": "Feedback", "template": "feedback", feedback, errors });
    } catch(err) {
      return next(err);
    }
  });

  router.post('/', [
      check('name').trim().isLength({ "min": 3}).escape().withMessage(`Name is not valid.`),
      check('email').trim().isEmail().normalizeEmail().withMessage(`Email is not valid`),
      check('title').trim().isLength({ "min": 3}).escape().withMessage(`Title is not valid`),
      check('message').trim().isLength({ "min": 5}).escape().withMessage(`Message is not valid`)],
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.feedback = {
        errors: errors.array()
      };
      return res.redirect('/feedback');
    }

    return res.send(`Post handler for feedback form`);
  });

  return router;
};
