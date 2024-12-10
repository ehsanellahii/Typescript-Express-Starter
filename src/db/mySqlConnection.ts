import { dbConfig } from './config';
import { Sequelize } from 'sequelize';

console.log('DBConfig', dbConfig);

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

export const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  // users: require("../models/user"),
  // applicants: require("../models/applicant"),
  // applies: require("../models/apply"),
  // jobs: require("../models/job")
};
