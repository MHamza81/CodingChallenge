import RequestService from './RequestService.js';

export default class OsmDataRequestService {
  static fetchOsmData(bbox) {
    const apiUrl = process.env.API_URL;
    const options = {
      params: {
        bbox,
      },
    };

    return RequestService.fetchData(apiUrl, options);
  }
}
