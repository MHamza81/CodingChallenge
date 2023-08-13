import { jest } from '@jest/globals';
import ResponseService from '../../../src/services/ResponseService';

describe('ResponseService tests', () => {
  let mockRes;

  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should build and send response', () => {
    const responseService = new ResponseService(mockRes);
    responseService.buildResponse(200, { message: 'Success' });

    responseService.sendResponse();

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalled();
  });

  it('should build response with proper status and message', () => {
    const responseService = new ResponseService(mockRes);
    responseService.buildResponse(404, 'Not Found');

    expect(responseService.status).toEqual(404);
    expect(responseService.message).toEqual('Not Found');
  });
});
