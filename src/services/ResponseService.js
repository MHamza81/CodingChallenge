export default class ResponseService {
  constructor(res) {
    this.res = res;
  }

  sendResponse() {
    return this.res.status(this.status).send(this.message).json();
  }

  buildResponse(statusCode, message) {
    this.status = statusCode;
    this.message = message;
  }
}
