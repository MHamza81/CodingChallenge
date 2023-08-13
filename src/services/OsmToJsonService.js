import osmtogeojson from 'osmtogeojson';

export default class OsmToJsonService {
  static toJSON(osmData) {
    return osmtogeojson(osmData);
  }
}
