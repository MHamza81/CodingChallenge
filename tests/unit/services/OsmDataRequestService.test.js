import { jest } from '@jest/globals';
import mockedEnv from 'mocked-env';

import OsmDataRequestService from '../../../src/services/OsmDataRequestService';
import RequestService from '../../../src/services/RequestService';

jest.mock('../../../src/services/RequestService');

const restoreEnv = mockedEnv({
  API_URL: 'www.exampleurl.com',
});

describe('OsmDataRequestService tests', () => {
  afterEach(() => {
    restoreEnv();
  });

  const apiUrl = process.env.API_URL;
  const bbox = '-180,-90,180,90';

  it('fetches OSM data using RequestService', async () => {
    RequestService.fetchData = jest.fn(() => Promise.resolve('mocked response'));

    const options = {
      params: {
        bbox,
      },
    };

    const result = await OsmDataRequestService.fetchOsmData(bbox);

    expect(RequestService.fetchData).toHaveBeenCalledWith(apiUrl, options);
    expect(result).toEqual('mocked response');
  });

  it('handles RequestService error', async () => {
    const errorMessage = 'Request error';
    RequestService.fetchData = jest.fn(() => Promise.reject(new Error(errorMessage)));

    await expect(OsmDataRequestService.fetchOsmData(bbox)).rejects.toThrow(errorMessage);
  });
});
