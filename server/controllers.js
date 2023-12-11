// const db = require('./db');
const { Questions, Answers, Photos } = require('../postgres');
const models = require('./models');

module.exports = {
  questions: {
    getQuestions: async (req, res) => {
      try {
        const response = await models.getAllQuestions(req);
        res.status(200).send(response);
      } catch (error) {
        console.error('Error retriving Questions. Error: ', error);
        res.status(500).send('Internal Server Error');
      }
    },
    postQuestion: async (req, res) => {
      try {
        await models.postQuestion(req);
        res.status(201).send();
      } catch (error) {
        console.error('Error adding question. Error: ', error);
        res.status(500).send('Internal Server Error');
      }
    },
    reportQuestion: async (req, res) => {
      try {
        await models.reportQuestion(req);
        res.status(201).send();
      } catch (error) {
        console.error('Error reporting question. Error: ', error);
        res.status(500).send('Internal Server Error');
      }
    },
    helpfulQuestion: async (req, res) => {
      try {
        await models.helpfulQuestion(req);
        res.status(201).send();
      } catch (error) {
        console.error('Error unable to add helpful. Error: ', error);
        res.status(500).send('Internal Server Error');
      }
    },
  },
  // ANSWERS
  answers: {
    getAnswers: async (req, res) => {
      try {
        const answers = await models.getAllAnswers(req);
        res.status(200).send(answers);
      } catch (error) {
        console.error('Error retrieving Answers. Error: ', error);
        res.status(500).send('Internal Server Error');
      }
    },
    postAnswer: async (req, res) => {
      try {
        await models.postAnswer(req);
        res.status(201).send();
      } catch (error) {
        console.error('Error posting answer to Answers. Error: ', error);
        res.status(500).send('Internal Server Error');
      }
    },
    reportAnswer: async (req, res) => {
      try {
        await models.reportAnswer(req);
        res.status(201).send();
      } catch (error) {
        console.error('Error reporting question. Error: ', error);
        res.status(500).send('Internal Server Error');
      }
    },
    helpfulAnswer: async (req, res) => {
      try {
        await models.helpfulAnswer(req);
        res.status(201).send();
      } catch (error) {
        console.error('Error unable to add helpful. Error: ', error);
        res.status(500).send('Internal Server Error');
      }
    },
  },
};
