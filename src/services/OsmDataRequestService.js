import RequestService from './RequestService.js';

export default class OsmDataRequestService {
  static fetchOsmData(bbox) {
    const apiUrl = 'https://www.openstreetmap.org/api/0.6/map';
    const options = {
      params: {
        bbox,
      },
    };

    return RequestService.fetchData(apiUrl, options);
  }
}
