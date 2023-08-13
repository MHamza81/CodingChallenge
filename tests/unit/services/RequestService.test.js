import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import RequestService from '../../../src/services/RequestService';

describe('RequestService tests', () => {
  let axiosMock;

  beforeEach(() => {
    axiosMock = new AxiosMockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.restore();
  });

  it('fetches data successfully', async () => {
    const responseData = { key: 'value' };
    axiosMock.onGet('www.exampleurl.com').reply(200, responseData);

    const url = 'www.exampleurl.com';
    const options = { params: { param: 'value' } };

    const result = await RequestService.fetchData(url, options);

    expect(result).toEqual(responseData);
  });

  it('handles request error', async () => {
    const errorMessage = 'Network Error';
    axiosMock.onGet('www.exampleurl.com').networkError();

    const url = 'www.exampleurl.com';
    const options = { params: { bbox: '1,2,3,4' } };

    await expect(RequestService.fetchData(url, options)).rejects.toThrow(errorMessage);
  });
});
