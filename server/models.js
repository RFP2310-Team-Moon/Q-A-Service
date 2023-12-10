const { Questions, Answers, Photos } = require('../postgres');

const getAllQuestions = async (product_id, count, offset) => {
  const questions = await Questions.findAll({
    include: [
      {
        model: Answers,
        attributes: ['id', 'body', 'date_written', 'answerer_name', 'helpful'],
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
};

module.exports = { getAllQuestions };
