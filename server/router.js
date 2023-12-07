const router = require('express').Router();
const controllers = require('./controllers');

// write the routes based on the controllers...
<<<<<<< HEAD
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
=======
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
>>>>>>> 3d911d24d18022bb95d15a201346845d9b9357bf
