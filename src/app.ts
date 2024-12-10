import express from 'express';
import cors from 'cors';

const expressWinston = require('express-winston');
const bodyParser = require('body-parser');
import Logger from './utility/logger';
import { handle404Error, handleError } from './middleware/customErrorHandler';
import router from './routes/index.routes';

const app = express();

app.use(
  expressWinston.logger({
    winstonInstance: Logger,
    meta: false,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: true,
  }),
);

app.use(cors());

app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, ngrok-skip-browser-warning");
  Logger.info('MHSLOG : Router LOGs ->>  ', {
    time: new Date(),
    origin: req.headers.origin,
    path: req.path,
    method: req.method,
    body: req.body,
  });

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);
app.use(handleError);
app.use(handle404Error);

export default app;
