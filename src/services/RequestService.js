export default class RequestService {
  constructor(url) {
    this.url = url;
  }

  fetchData() {
    return this.url;
  }
}
