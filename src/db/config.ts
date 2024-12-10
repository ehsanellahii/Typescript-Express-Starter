require('dotenv').config({
  path: process.env.ENV_FILE,
});

export const dbConfig = {
  host: process.env.PostGreSQL_DB_HOST,
  port: parseInt(process.env.PostGreSQL_DB_PORT),
  user: process.env.PostGreSQL_DB_USER,
  password: process.env.PostGreSQL_DB_PASSWORD,
  database: process.env.PostGreSQL_DB_NAME,
  dialect: process.env.DB_DIALECT,
};
