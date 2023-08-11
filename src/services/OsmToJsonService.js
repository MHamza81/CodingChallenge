export default class OsmToJsonService {
  constructor(osmData) {
    this.osmData = osmData;
  }

  toJSON() {
    return this.osmData;
  }
}
