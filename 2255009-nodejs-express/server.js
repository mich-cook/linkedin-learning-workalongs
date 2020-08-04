const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');
const bodyParser = require('body-parser');

const FeedbackService = require('./tainted-code-to-remove-or-implement/services/FeedbackService');
const SpeakersService = require('./tainted-code-to-remove-or-implement/services/SpeakerService');
const feedbackService = new FeedbackService('./tainted-code-to-remove-or-implement/data/feedback.json');
const speakersService = new SpeakersService('./tainted-code-to-remove-or-implement/data/speakers.json');

const routes = require('./routes');

const app = express();
const port = 3000;

app.set('trust proxy', 1); // cookies through reverse proxy are ok.

app.use(cookieSession({
    name: 'session',
    keys: ['hdhfhwjefkvksk3kk88d8cc', 'fh2h329f9fhn23r0fbfaal3ly']  // just random
}));

app.use(bodyParser.urlencoded({ "extended": true }));

app.locals.site = 'nodejs/express demo';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './static')));

app.use(async (req, res, next) => {
  try {
    const names = await speakersService.getNames();
    res.locals.speakerNames = names;  // global template var
    return next();
  } catch(err) {
    return next(err);
  }
});

app.use('/', routes({ feedbackService, speakersService }));

app.use((req, res, next) => {
  return next(createError(404, `File not found`));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  console.error(err);
  const status = err.status || 500;
  res.locals.status = status;
  res.status(status);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
