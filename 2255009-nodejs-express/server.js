const express = require('express');
const path = require('path');

const FeedbackService = require('./tainted-code-to-remove-or-implement/services/FeedbackService');
const SpeakersService = require('./tainted-code-to-remove-or-implement/services/SpeakerService');

const feedbackService = new FeedbackService('./tainted-code-to-remove-or-implement/data/feedback.json');
const speakersService = new SpeakersService('./tainted-code-to-remove-or-implement/data/speakers.json');

const routes = require('./routes');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './static')));

app.use('/', routes({ feedbackService, speakersService }));

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
