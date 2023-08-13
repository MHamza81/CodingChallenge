import { query } from 'express-validator';

export default class Validator {
  static bboxValidator() {
    return [
      query('bbox')
        .notEmpty().withMessage('bbox is required')
        .bail()
        .matches(/^(-?\d+(\.\d+)?),? ?(-?\d+(\.\d+)?),? ?(-?\d+(\.\d+)?),? ?(-?\d+(\.\d+)?)$/)
        .withMessage('bbox should be in the format minLon,minLat,maxLon,maxLat')
        .bail()
        .custom((bbox) => {
          const [minLon, minLat, maxLon, maxLat] = bbox.split(',').map(parseFloat);

          const minLonLimit = -180;
          const maxLonLimit = 180;
          const minLatLimit = -90;
          const maxLatLimit = 90;

          if (minLon < minLonLimit || maxLon > maxLonLimit
              || minLat < minLatLimit || maxLat > maxLatLimit) {
            throw new Error('bbox values out of range');
          }

          return true;
        }),
    ];
  }
}
