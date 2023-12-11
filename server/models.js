const { Questions, Answers, Photos } = require('../postgres');

module.exports = {
  getAllQuestions: async (req) => {
    const { product_id } = req.params;
    let { page, count } = req.query;
    if (!page) {
      page = 1;
    }
    if (!count) {
      count = 5;
    }
    const offset = (page - 1) * count;
    const questions = await Questions.findAll({
      include: [
        {
          model: Answers,
          attributes: [
            'id',
            'body',
            'date_written',
            'answerer_name',
            'helpful',
          ],
          include: [
            {
              model: Photos,
              attributes: ['url'],
            },
          ],
        },
      ],
      where: { product_id },
      limit: count,
      offset,
    });
    const response = {
      product_id,
      results: questions.map((question) => ({
        question_id: question.id,
        question_body: question.body,
        question_date: question.date_written,
        asker_name: question.asker_name,
        question_helpfulness: question.helpful,
        reported: question.reported,
        answers: question.Answers.reduce((acc, answer) => {
          const { id, body, date_written, answerer_name, helpful, Photos } =
            answer;
          const answerObj = {
            id,
            body,
            date: date_written,
            answerer_name,
            helpfulness: helpful,
            photos: Photos,
          };
          acc[id] = answerObj;
          return acc;
        }, {}),
      })),
    };
    return response;
  },
  postQuestion: async (req) => {
    const { body, asker_name, asker_email, product_id } = req.body;
    const event = new Date();
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
  },
  reportQuestion: async (req) => {
    const { question_id } = req.params;
    const question = await Questions.findByPk(question_id);
    question.update({ reported: true });
  },
  helpfulQuestion: async (req) => {
    const { question_id } = req.params;
    const question = await Questions.findByPk(question_id);
    question.increment(['helpful'], {
      by: 1,
    });
  },
  getAllAnswers: async (req) => {
    const { question_id } = req.params;
    let { page, count } = req.query;
    if (!page) {
      page = 1;
    }
    if (!count) {
      count = 5;
    }
    const offset = (page - 1) * count;
    const answers = await Answers.findAll({
      include: [{ model: Photos, attributes: ['url'] }],
      where: { question_id },
      limit: count,
      offset,
    });
    return answers;
  },

  postAnswer: async (req) => {
    const { question_id } = req.params;
    const { body, name, email, photos } = req.body;
    const event = new Date();
    const isoDateTime = event.toISOString();
    await Answers.create(
      {
        question_id,
        body,
        date_written: isoDateTime,
        answerer_name: name,
        answerer_email: email,
        reported: false,
        helpful: 0,
      },
      {
        fields: [
          'id',
          'question_id',
          'body',
          'date_written',
          'answerer_name',
          'answerer_email',
          'reported',
          'helpful',
        ],
      }
    );
    if (photos) {
      await Photos.create({});
    }
  },
  reportAnswer: async (req) => {
    const { answer_id } = req.params;
    const answer = await Answers.findByPk(answer_id);
    answer.update({ reported: true });
  },
  helpfulAnswer: async (req) => {
    const { answer_id } = req.params;
    const answer = await Answers.findByPk(answer_id);
    answer.increment(['helpful'], {
      by: 1,
    });
  },
};
