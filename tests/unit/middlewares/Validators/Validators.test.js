import { jest } from '@jest/globals';
import { validationResult } from 'express-validator';
import Validator from '../../../../src/middlewares/validators/Validator.js';

describe('bboxValidator tests', () => {
  const mockNext = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should pass validation for valid bbox', async () => {
    const mockReq = {
      query: {
        bbox: '-100,-50,100,50',
      },
    };
    const mockRes = {};
    const validator = Validator.bboxValidator();

    await Promise.all(validator.map(((item) => item(mockReq, mockRes, mockNext))));

    const errors = validationResult(mockReq);
    expect(errors.isEmpty()).toBe(true);
  });

  it('should fail validation for invalid format', async () => {
    const mockReq = {
      query: {
        bbox: 'invalid-format',
      },
    };
    const mockRes = {};
    const validator = Validator.bboxValidator();

    await Promise.all(validator.map((item) => item(mockReq, mockRes, mockNext)));

    const errors = validationResult(mockReq);
    expect(errors.array()).toHaveLength(1);
    expect(errors.array()[0].msg).toBe('bbox should be in the format minLon,minLat,maxLon,maxLat');
  });

  it('should fail validation for bbox values out of range', async () => {
    const mockReq = {
      query: {
        bbox: '-200,-100,200,100',
      },
    };
    const mockRes = {};
    const validator = Validator.bboxValidator();

    await Promise.all(validator.map((item) => item(mockReq, mockRes, mockNext)));

    const errors = validationResult(mockReq);
    expect(errors.array()).toHaveLength(1);
    expect(errors.array()[0].msg).toBe('bbox values out of range');
  });

  it('should fail validation for empty bbox', async () => {
    const mockReq = {
      query: {
        bbox: '',
      },
    };
    const mockRes = {};
    const validator = Validator.bboxValidator();

    await Promise.all(validator.map((item) => item(mockReq, mockRes, mockNext)));

    const errors = validationResult(mockReq);
    expect(errors.array()).toHaveLength(1);
    expect(errors.array()[0].msg).toBe('bbox is required');
  });
});
