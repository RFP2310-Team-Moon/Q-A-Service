<<<<<<< HEAD
const db = require('./db');

module.exports = {
  // handle requests and use sequelize to hanldle req, res
=======
const db = require('./db.js');

module.exports = {
>>>>>>> 3d911d24d18022bb95d15a201346845d9b9357bf
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
