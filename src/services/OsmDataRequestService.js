import RequestService from './RequestService.js';

export default class OsmDataRequestService {
  static fetchOsmData(bbox) {
    const apiUrl = 'https://www.openstreetmap.org/api/0.6/map';
    const headers = {
      Accept: 'application/xml',
    };

    const params = {
      bbox,
    };

    const options = {
      params,
      headers,
    };

    return RequestService.fetchData(apiUrl, options);
  }
}
