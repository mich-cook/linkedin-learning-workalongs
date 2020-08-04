const express = require('express');

const { check, validationResult } = require('express-validator');

const router = express.Router();

const validations = [
  check('name').trim().isLength({ "min": 3}).escape().withMessage(`Name is not valid.`),
  check('email').trim().isEmail().normalizeEmail().withMessage(`Email is not valid`),
  check('title').trim().isLength({ "min": 3}).escape().withMessage(`Title is not valid`),
  check('message').trim().isLength({ "min": 5}).escape().withMessage(`Message is not valid`)
];

module.exports = args => {

  const { feedbackService } = args;

  router.get('/', async (req, res, next) => {
    try {
      const feedback = await feedbackService.getList();
      const errors = req.session.feedback ? req.session.feedback.errors : false;
      const successMessage = req.session.feedback ? req.session.feedback.message : false;
      req.session.feedback = {};
      // template-specific vars
      return res.render('layout', { "title": "Feedback", "template": "feedback", feedback, errors, successMessage });
    } catch(err) {
      return next(err);
    }
  });

  router.post('/', validations, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.feedback = {
        errors: errors.array()
      };
      return res.redirect('/feedback');
    }

    const { name, email, title, message } = req.body;
    await feedbackService.addEntry(name, email, title, message);

    req.session.feedback = {
      "message": "Your message has been received successfully."
    };

    return res.redirect('/feedback');
  });

  return router;
};
