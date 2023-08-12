export default class ResponseService {
  constructor(res) {
    this.res = res;
  }

  sendResponse() {
    return this.res.status(this.status).json(this.message);
  }

  buildResponse(statusCode, message) {
    this.status = statusCode;
    this.message = message;
  }
}
