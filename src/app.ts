import express from 'express';
import { Application } from 'express';
import hbs from 'express-handlebars';
import * as path from 'path';
import bodyParser from 'body-parser';

class App {
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; middleWares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;
    
    // Body parser helps me wrap up form info into a json payload
    // and submit it to the server
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    
    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    this.assets();
    this.template();
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private assets() {
    this.app.use(express.static(path.join(__dirname, 'public')));

    // you don't need to do this
    // this.app.use(express.static('views'));
  }

  private template() {
    this.app.engine(
      '.hbs',
      hbs({
        extname: '.hbs',
        defaultView: 'default',
        layoutDir: __dirname + '/views/pages/',
        partialsDir: __dirname + '/views/partials/',
      })
    );

    this.app.set('view engine', '.hbs');

   
    // hbs.registerPartials(__dirname + '/views/partials');
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
