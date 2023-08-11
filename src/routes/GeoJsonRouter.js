import GeoJsonController from '../controllers/GeoJsonController.js';
import BaseRouter from './BaseRouter.js';

export default class GeoJsonRouter extends BaseRouter {
  constructor() {
    super();
    this.router.get('/geojsonfeatures', GeoJsonController.getGeoJsonFeatures);
  }
}
