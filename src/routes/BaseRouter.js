import express from 'express';

export default class BaseRouter {
  constructor() {
    this.router = express.Router();
  }
}
