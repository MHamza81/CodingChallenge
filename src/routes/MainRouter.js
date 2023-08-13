import express from 'express';
import GeoJsonRouter from './GeoJsonRouter.js';

export default class MainRouter {
  constructor() {
    this.router = express.Router();
    this.router.use('/', new GeoJsonRouter().router);
  }
}
