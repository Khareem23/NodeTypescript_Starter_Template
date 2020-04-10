import express, { Application, Request, Response, NextFunction } from 'express';
// import * as express from 'express';

const app: Application = express();

const add = (a: number, b: number) => a + b;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log(add(5, 4));
  res.send('Hello TypeScript  & Express');
});

app.listen(5000, () => console.log('Server Running'));
