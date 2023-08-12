export default class ResponseService {
  constructor(res) {
    this.res = res;
  }

  sendResponse() {
    return this.res.send(this.message).json();
  }

  buildResponse(status, message) {
    this.message = {
      statusCode: status,
      message,
    };
  }
}
