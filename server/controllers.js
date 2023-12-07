const db = require('./db');
const { Questions, Answers, Photos } = require('../postgres');

module.exports = {
  // handle requests and use sequelize to hanldle req, res
  questions: {
    getQuestions: async (req, res) => {
      try {
        let { product_id } = req.params;
        let { page, count } = req.query;
        if (!page) {
          page = 1;
        }
        if (!count) {
          count = 5;
        }
        const offset = (page - 1) * count;
        const questions = await Questions.findAll({
          where: { product_id },
          limit: count,
          offset,
        });
        // need to attach the proper values to match initial api interactions??
        res.status(200).send(questions);
      } catch (error) {
        console.error('Error retriving Questions. Error: ', error);
        res.status(500).send('Internal Server Error');
      }
    },
    postQuestion: (req, res) => {},
    reportQuestion: (req, res) => {},
    helpfulQuestion: (req, res) => {},
  },
  answers: {
    getAnswers: async (req, res) => {
      console.log('hit');
      try {
        let { question_id } = req.params;
        let { page, count } = req.query;
        if (!page) {
          page = 1;
        }
        if (!count) {
          count = 5;
        }
        const offset = (page - 1) * count;
        const answers = await Answers.findAll({
          where: { question_id },
          limit: count,
          offset,
        });
        res.status(200).send(answers);
      } catch (error) {
        console.error('Error retrieving Answers. Error: ', error);
        res.status(500).send('Internal Server Error');
      }
    },
    postAnswer: (req, res) => {},
    reportAnswer: (req, res) => {},
    helpfulAnswer: (req, res) => {},
  },
};
