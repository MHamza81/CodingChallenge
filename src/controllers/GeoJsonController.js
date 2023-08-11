import OsmDataRequestService from '../services/OsmDataRequestService.js';
import OsmToJsonService from '../services/OsmToJsonService.js';
import ResponseService from '../services/ResponseService.js';

export default class GeoJsonController {
  static async getGeoJsonFeatures(req, res) {
    const osmData = await OsmDataRequestService.fetchOsmData('-0.150464, 51.500521, -0.141806, 51.503142');

    const osmToJsonService = new OsmToJsonService(osmData);
    const jsonData = osmToJsonService.toJSON();

    const response = ResponseService.buildResponse(200, jsonData);

    return ResponseService.sendResponse(res, response);
  }
}
