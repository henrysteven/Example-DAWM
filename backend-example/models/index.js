'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize, DataTypes} = require("sequelize");
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
console.log(env)
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  console.log(sequelize)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.USER = require('./usuario.model')(sequelize,DataTypes)

module.exports = db;