const router = require('express').Router();
const controllers = require('./controllers');

// write the routes based on the controllers...
router
  .route('/qa/questions/:product_id')
  .get(controllers.questions.getQuestions);
router
  .route('/qa/questions/:product_id')
  .get(controllers.questions.postQuestion);
router
  .route('/qa/questions/:question_id/helpful')
  .put(controllers.questions.helpfulQuestion);
router
  .route('/qa/questions/:question_id/report')
  .put(controllers.questions.reportQuestion);

// ANSWERS
router
  .route('/qa/questions/:question_id/answers')
  .get(controllers.answers.getAnswers);
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
