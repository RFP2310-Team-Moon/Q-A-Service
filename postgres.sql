const { DataTypes } = require('sequelize');
const { sequelize } = require('./server/db.js');

const Questions = sequelize.define('Questions', {
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    autoIncrement: true,
    primaryKey: true,
  },
  question_body: {
    type: DataTypes.STRING (1000),
    allowNull: true,
  },
  question_date: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  asker_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  asker_email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  question_helpfulness: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  reported {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
});

const Answers = sequelize.define('Answers', {
  answer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  answerer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answerer_email: {
    type: Datatypes.STRING,
    allowNull: false,
  },
});

const Photos = sequelize.define('Phone', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Question.hasMany(Answer, { foreignKey: 'question_id' });
Answer.belongsTo(Question, { foreignKey: 'question_id' });

Answer.hasMany(Photo, { foreignKey: 'answer_id' });
Photo.belongsTo(Answer, { foreignKey: 'answer_id' });

module.exports = { Question, Answer, Photos };
