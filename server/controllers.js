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
        // this is the only sequelize that I'm using at the moment
        const questions = await Questions.findAll({
          where: { product_id },
          limit: count,
          offset,
        });
        // need to attach the proper values to match initial api interactions??
        // the questions are sent attached to results?? also attach the answers...
        res.status(200).send(questions);
      } catch (error) {
        console.error('Error retriving Questions. Error: ', error);
        res.status(500).send('Internal Server Error');
      }
    },
    postQuestion: async (req, res) => {
      console.log('hit');
      try {
        let { body, asker_name, asker_email, product_id } = req.body;
        let event = new Date();
        const isoDateTime = event.toISOString();
        await Questions.create(
          {
            body,
            date_written: isoDateTime,
            asker_name,
            asker_email,
            product_id,
            reported: false,
            helpful: 0,
          },
          {
            fields: [
              'id',
              'body',
              'date_written',
              'asker_name',
              'asker_email',
              'product_id',
              'reported',
              'helpful',
            ],
          }
        );
        res.status(201).send();
      } catch (error) {
        console.error('Error adding question. Error: ', error);
        res.status(500).send('Internal Server Error');
      }
    },
    reportQuestion: (req, res) => {},
    helpfulQuestion: (req, res) => {},
  },
  answers: {
    getAnswers: async (req, res) => {
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
