// const { redisClient } = require('./db');
const models = require('./models');

module.exports = {
  loaderIO: {
    getVerification: async (req, res) => {
      try {
        res.status(200).send(process.env.LOADER_IO);
      } catch (error) {
        console.error('error with LoaderIO');
        res.status(500).send();
      }
    },
  },
  questions: {
    getRandomQuestions: async (req, res) => {
      // RNG
      const MIN = 900000;
      const MAX = 1000000;
      function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
      }
      const product_id = await Math.round(getRandomArbitrary(MIN, MAX));
      const reqBuilder = (product_id) => {
        const newReq = {
          params: null,
          query: {
            page: null,
            count: null,
          },
        };
        newReq.params = product_id;
        newReq.query.page = 1;
        newReq.query.count = 5;
        return newReq;
      };
      const page = 1;
      const count = 5;
      const response = await models.getAllQuestions(product_id, page, count);
      await res.status(200).send(response);
    },
    getQuestions: async (req, res) => {
      const { product_id } = req.params;
      const { page, count } = req.query;
      // const key = `Q${product_id} + ${page} + ${count}`;
      // let isCached = false;
      let response;
      try {
        // const cacheResults = await redisClient.get(key);
        // if (cacheResults) {
        //   // isCached = true;
        //   response = JSON.parse(cacheResults);
        // } else {
        //   response = await models.getAllQuestions(req);
        //   await redisClient.set(key, JSON.stringify(response), {
        //     EX: 30,
        //   });
        // }
        response = await models.getAllQuestions(product_id, page, count);
        // console.log(isCached);
        await res.status(200).send(response);
      } catch (error) {
        console.error('Error retriving Questions. Error: ', error);
        res.status(500).send('Internal Server Error');
      }
    },
    postQuestion: async (req, res) => {
      try {
        await models.postQuestion(req);
        res.status(201).send();
        // update redis with the proper values from DB after sending response?
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
      // const { question_id } = req.params;
      // const { page, count } = req.query;
      // const key = `A${question_id} + ${page} + ${count}`;
      // let isCached = false;
      let response;
      try {
        // const cacheResults = await redisClient.get(key);
        // if (cacheResults) {
        //   isCached = true;
        //   response = JSON.parse(cacheResults);
        // } else {
        //   response = await models.getAllAnswers(req);
        //   await redisClient.set(key, JSON.stringify(response), {
        //     EX: 30,
        //   });
        // }
        response = await models.getAllAnswers(req);
        // console.log(isCached);
        res.status(200).send(response);
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
