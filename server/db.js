// const { Questions, Answers, Photos } = require('../postgres.js');
require('dotenv').config();
const { Sequelize } = require('sequelize');
// const csv = require('csvtojson');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.PORT,
  }
);

// const csvFilePath = '../csv_files/questions.csv';

// const questions = await csv().fromFile(csvFilePath);

// await questions.bulkCreate(questions);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('Database schema synchronized');
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
}

testConnection();

module.exports = { sequelize };
