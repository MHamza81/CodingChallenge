import { validationResult } from 'express-validator';

import OsmDataRequestService from '../services/OsmDataRequestService.js';
import OsmToJsonService from '../services/OsmToJsonService.js';
import ResponseService from '../services/ResponseService.js';

export default class GeoJsonController {
  static async getGeoJsonFeatures(req, res) {
    const responseService = new ResponseService(res);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      responseService.buildResponse(400, { errors: errors.array() });

      return responseService.sendResponse();
    }

    const { bbox } = req.query;
    const osmData = await OsmDataRequestService.fetchOsmData(bbox);

    const jsonData = OsmToJsonService.toJSON(osmData);

    responseService.buildResponse(200, jsonData);

    return responseService.sendResponse();
  }
}
