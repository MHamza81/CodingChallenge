export default class ResponseService {
  static sendResponse(res, data) {
    return res.send(data).json();
  }

  static buildResponse(status, message) {
    return {
      statusCode: status,
      message,
    };
  }
}
