import { jest } from '@jest/globals';
import { AxiosError } from 'axios';
import supertest from 'supertest';

import Server from '../../src/Server';
import OsmDataRequestService from '../../src/services/OsmDataRequestService';
import RequestService from '../../src/services/RequestService';
import payload from '../data/index';

const server = new Server();
const request = supertest(server.app);

jest.mock('../../src/services/OsmDataRequestService');
jest.mock('../../src/services/RequestService');

describe('Integration Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle validation errors', async () => {
    const response = await request.get('/geojsonfeatures').query({ bbox: 'invalid_bbox' });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should handle axios errors', async () => {
    RequestService.fetchData = jest.fn().mockImplementation(() => {
      throw new AxiosError('Bad Request', null, null, null, { status: 400, data: 'Bad Request' });
    });

    const bbox = '-10,-10,10,10';
    const response = await request.get('/geojsonfeatures').query({ bbox });

    expect(response.status).toBe(400);
  });

  it('should handle internal server errors', async () => {
    OsmDataRequestService.fetchOsmData = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    const bbox = '-10,-10,10,10';
    const response = await request.get('/geojsonfeatures').query({ bbox });

    expect(response.status).toBe(502);
  });

  it('should fetch GeoJSON features', async () => {
    OsmDataRequestService.fetchOsmData = jest.fn().mockResolvedValue(payload.input.osmData);

    const bbox = '-0.150464,51.500521,-0.141806,51.503142';
    const response = await request.get('/geojsonfeatures').query({ bbox });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(payload.output.geoJsonData);
  });
});
