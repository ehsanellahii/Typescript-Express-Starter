const http = require('http');
import Logger from './src/utility/logger';
import app from './src/app';
import mongoDbConnection from './src/db/mongoDbConnection';

require('dotenv').config({
  path: process.env.ENV_FILE,
});

const server = http.createServer(app);
const port = process.env.SERVER_PORT || 3000;

mongoDbConnection
  .then(() => {
    Logger.info('MongoDB Connected!');
    server.listen(port, () => {
      Logger.info(`Server started on port: ${port}`);
    });
  })
  .catch(err => {
    Logger.error('Failed to connect to database. error: ', err);
  });

process.on('SIGTERM', () => {
  Logger.info('Received SIGTERM. Closing server gracefully...');
  // Perform cleanup tasks here
  server.close(() => {
    Logger.info('Server closed.');
    process.exit(0);
  });
});
