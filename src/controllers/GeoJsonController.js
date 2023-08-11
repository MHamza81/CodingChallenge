import OsmToJsonService from '../services/OsmToJsonService.js';
import RequestService from '../services/RequestService.js';
import ResponseService from '../services/ResponseService.js';

export default class GeoJsonController {
  static getGeoJsonFeatures(req, res) {
    const apiUrl = 'https://abc.com';
    const requestService = new RequestService(apiUrl);
    const osmData = requestService.fetchData();

    const osmToJsonService = new OsmToJsonService(osmData);
    const jsonData = osmToJsonService.toJSON();

    const response = ResponseService.buildResponse(200, jsonData);

    return ResponseService.sendResponse(res, response);
  }
}
