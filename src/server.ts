import { createConnection } from 'typeorm';
import App from './app';

import * as bodyParser from 'body-parser';
import loggerMiddleware from './middleware/logger';
import catalogController from './controllers/catalog.controller';

createConnection()
  .then(async (connection) => {
    const portNo = 5010;
    const app = new App({
      port: portNo,
      controllers: [new catalogController()],
      middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware,
      ],
    });

    app.listen();
    console.log('Express application is up and running on port :', portNo);
  })
  .catch((error) => console.log('TypeORM connection Error : ', error));
