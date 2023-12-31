import { AxiosError } from 'axios';
import { validationResult } from 'express-validator';

import OsmDataRequestService from '../services/OsmDataRequestService.js';
import OsmToJsonService from '../services/OsmToJsonService.js';
import ResponseService from '../services/ResponseService.js';

export default class GeoJsonController {
  static async getGeoJsonFeatures(req, res) {
    const responseService = new ResponseService(res);
    try {
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
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        const { response } = err;
        responseService.buildResponse(response.status, { error: response.data });
      } else {
        responseService.buildResponse(502, { error: 'Internal Server Error' });
      }

      return responseService.sendResponse();
    }
  }
}
