const router = require('express').Router();
const controllers = require('./controllers');

// write the routes based on the controllers...
router.get('/qa/questions', controllers.questions.getQuestions);
router.post('/qa/questions', controllers.questions.postQuestion);
router.put(
  '/qa/questions/:question_id/report',
  controllers.questions.helpfulQuestion
);
router.put(
  '/qa/questions/:question_id/helpful',
  controllers.questions.reportQuestion
);

router.get(
  '/qa/questions/:question_id/answers',
  controllers.answers.getAnswers
);
router.post(
  '/qa/questions/:question_id/answers',
  controllers.answers.postAnswer
);
router.put(
  '/qa/questions/:answer_id/report',
  controllers.answers.helpfulAnswer
);
router.put(
  '/qa/questions/:answer_id/helpful',
  controllers.answers.reportAnswer
);

module.exports = router;
