// const csv = require('csvtojson');
const { DataTypes } = require('sequelize');
const { sequelize } = require('./server/db');

const Questions = sequelize.define(
  'Questions',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    date_written: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    asker_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asker_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reported: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    helpful: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { logging: false, timestamps: false }
);

const Answers = sequelize.define(
  'Answers',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    body: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    date_written: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    answerer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answerer_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reported: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    helpful: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { logging: false, timestamps: false }
);

const Photos = sequelize.define(
  'Photo',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { logging: false, timestamps: false }
);

Questions.hasMany(Answers, { foreignKey: 'question_id' });
Answers.belongsTo(Questions, { foreignKey: 'question_id' });

Answers.hasMany(Photos, { foreignKey: 'answer_id' });
Photos.belongsTo(Answers, { foreignKey: 'answer_id' });

// redundant??
Questions.sync();
Answers.sync();
Photos.sync();

// OLD INSERT METHOD - NOW USING COPY THROUGH POSTGRES
// const questionsFilePath = './csv_files/test.questions.csv';

// async function bulkInsert() {
//   try {
//     const questions = await csv().fromFile(questionsFilePath);
//     await Questions.bulkCreate(questions);
//   } catch (error) {
//     console.error(error);
//   }
// }
// bulkInsert();

module.exports = { Questions, Answers, Photos };
