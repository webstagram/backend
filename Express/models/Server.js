const Sequelize = require("sequelize");
const initModels=require("./init-models");
const sequelize = new Sequelize(
 'Test',
 'postgres',
 'XS4Us7b79Qcu7kodm',
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 module.exports =sequelize;