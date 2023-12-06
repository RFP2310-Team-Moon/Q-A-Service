const router = require('express').Router();
const controllers = require('./controllers');

// write the routes based on the controllers...
router.route('/qa/questions').get(controllers.questions.getQuestions);
router.route('/qa/questions').post(controllers.questions.postAnswer);
router
  .route('/qa/questions/:question_id/report')
  .put(controllers.questions.helpfulQuestion);
router
  .route('/qa/questions/:question_id/helpful')
  .put(controllers.questions.reportQuestion);

router
  .route('/qa/questions/:question_id/answers')
  .get(controllers.answers.getAnswers);
router
  .route('/qa/questions/:question_id/answers')
  .post(controllers.answers.postAnswer);
router
  .route('/qa/questions/:answer_id/report')
  .put(controllers.answers.helpfulAnswer);
router
  .route('/qa/questions/:answer_id/helpful')
  .put(controllers.answers.reportAnswer);
