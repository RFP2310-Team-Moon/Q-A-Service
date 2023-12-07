const db = require('./db');

module.exports = {
  // handle requests and use sequelize to hanldle req, res
  questions: {
    getQuestions: (req, res) => {},
    postQuestion: (req, res) => {},
    reportQuestion: (req, res) => {},
    helpfulQuestion: (req, res) => {},
  },
  answers: {
    getAnswers: (req, res) => {},
    postAnswer: (req, res) => {},
    reportAnswer: (req, res) => {},
    helpfulAnswer: (req, res) => {},
  },
};
