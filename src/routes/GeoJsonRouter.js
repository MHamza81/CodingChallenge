import GeoJsonController from '../controllers/GeoJsonController.js';
import BaseRouter from './BaseRouter.js';
import Validator from '../middlewares/validators/Validator.js';

export default class GeoJsonRouter extends BaseRouter {
  constructor() {
    super();
    this.router.get('/geojsonfeatures', Validator.bboxValidator(), GeoJsonController.getGeoJsonFeatures);
  }
}
