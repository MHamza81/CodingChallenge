import express from 'express';
import dotenv from 'dotenv';
import MainRouter from './routes/MainRouter.js';

export default class Server {
  constructor() {
    dotenv.config();
    this.app = express();
    this.config();
    this.routerConfig();
  }

  config() {
    this.app.use(express.json());
  }

  routerConfig() {
    this.app.use('/', new MainRouter().router);
  }

  async start(port) {
    return this.app.listen(port);
  }
}
