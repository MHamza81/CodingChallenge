import express from 'express';

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
    this.app.use('/', (req, res) => res.send('Working'));
  }

  async start(port) {
    return this.app.listen(port);
  }
}
