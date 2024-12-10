import mongoose from 'mongoose';
require('dotenv').config({
  path: process.env.ENV_FILE,
});


const URL: string =
  process.env.NODE_ENV === 'development'
    ? process.env.DATABASE_URL_DEVELOPMENT
    : process.env.DATABASE_URL_PRODUCTION;

const mongoDbConnection = mongoose.connect(URL, {});

export default mongoDbConnection;
