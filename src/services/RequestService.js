import axios from 'axios';

export default class RequestService {
  static async fetchData(url, options = {}) {
    const response = await axios.get(url, options);

    return response.data;
  }
}
