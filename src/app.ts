import express from 'express';
import { Application } from 'express';
import hbs from 'express-handlebars';
<<<<<<< HEAD
import * as path from 'path';
=======
>>>>>>> a6c611dfe24f9a77b4af6238ba7ada7677f8d4bb

class App {
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; middleWares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;
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
<<<<<<< HEAD
    this.app.use(express.static(path.join(__dirname, 'public')));

    // you don't need to do this
    // this.app.use(express.static('views'));
=======
    this.app.use(express.static('public'));
    this.app.use(express.static('views'));
>>>>>>> a6c611dfe24f9a77b4af6238ba7ada7677f8d4bb
  }

  private template() {
    this.app.engine(
<<<<<<< HEAD
      '.hbs',
      hbs({
        extname: '.hbs',
=======
      'hbs',
      hbs({
        extname: 'hbs',
>>>>>>> a6c611dfe24f9a77b4af6238ba7ada7677f8d4bb
        defaultView: 'default',
        layoutDir: __dirname + '/views/pages/',
        partialsDir: __dirname + '/views/partials/',
      })
    );

<<<<<<< HEAD
    this.app.set('view engine', '.hbs');
=======
    this.app.set('view engine', 'hbs');
>>>>>>> a6c611dfe24f9a77b4af6238ba7ada7677f8d4bb

    // hbs.registerPartials(__dirname + '/views/partials');
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
