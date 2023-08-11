import express from 'express';
import MainRouter from './routes/MainRouter.js';

export default class Server {
  constructor() {
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
