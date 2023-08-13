import { jest } from '@jest/globals';

import OsmToJsonService from '../../../src/services/OsmToJsonService';
import payload from '../../data/index';

// Mock the osmtogeojson module
jest.mock('osmtogeojson', () => payload.output.geoJsonData);

describe('OsmToJsonService tests', () => {
  it('should convert OSM data to JSON', () => {
    const { osmData } = payload.input;

    const result = OsmToJsonService.toJSON(osmData);

    expect(result).toEqual(payload.output.geoJsonData);
  });
});
