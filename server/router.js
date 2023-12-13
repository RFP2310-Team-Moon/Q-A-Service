const router = require('express').Router();
const controllers = require('./controllers');
require('dotenv').config();

// LOADER_IO
router
  .route(`/${process.env.LOADER_IO}`)
  .get(controllers.loaderIO.getVerification);

// QUESTIONS
router
  .route('/qa/questions/:product_id')
  .get(controllers.questions.getQuestions);
router.route('/qa/questions').post(controllers.questions.postQuestion);
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
router.put('/qa/answers/:answer_id/helpful', controllers.answers.helpfulAnswer);
router.put('/qa/answers/:answer_id/report', controllers.answers.reportAnswer);

module.exports = router;
