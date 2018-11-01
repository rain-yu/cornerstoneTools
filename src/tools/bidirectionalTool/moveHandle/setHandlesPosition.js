import external from '../../../externalModules.js';
import perpendicularBothFixedLeft from './perpendicularBothFixedLeft.js';
import perpendicularBothFixedRight from './perpendicularBothFixedRight.js';
import perpendicularLeftFixedPoint from './perpendicularLeftFixedPoint.js';
import perpendicularRightFixedPoint from './perpendicularRightFixedPoint.js';

// Sets position of handles(start, end, perpendicularStart, perpendicularEnd)
export default function (handle, eventData, data) {
  let movedPoint;
  let outOfBounds;
  let result;
  let intersection;
  let d1;
  let d2;

  const longLine = {};
  const perpendicularLine = {};

  if (handle.index === 0) {
    // If long-axis start point is moved
    result = perpendicularBothFixedLeft(eventData, data);
    if (result) {
      handle.x = eventData.currentPoints.image.x;
      handle.y = eventData.currentPoints.image.y;
    } else {
      eventData.currentPoints.image.x = handle.x;
      eventData.currentPoints.image.y = handle.y;
    }

  } else if (handle.index === 1) {
    // If long-axis end point is moved
    result = perpendicularBothFixedRight(eventData, data);
    if (result) {
      handle.x = eventData.currentPoints.image.x;
      handle.y = eventData.currentPoints.image.y;
    } else {
      eventData.currentPoints.image.x = handle.x;
      eventData.currentPoints.image.y = handle.y;
    }

  } else if (handle.index === 2) {
    outOfBounds = false;
    // If perpendicular start point is moved
    longLine.start = {
      x: data.handles.start.x,
      y: data.handles.start.y
    };
    longLine.end = {
      x: data.handles.end.x,
      y: data.handles.end.y
    };

    perpendicularLine.start = {
      x: data.handles.perpendicularEnd.x,
      y: data.handles.perpendicularEnd.y
    };
    perpendicularLine.end = {
      x: eventData.currentPoints.image.x,
      y: eventData.currentPoints.image.y
    };

    intersection = external.cornerstoneMath.lineSegment.intersectLine(longLine, perpendicularLine);
    if (!intersection) {
      perpendicularLine.end = {
        x: data.handles.perpendicularStart.x,
        y: data.handles.perpendicularStart.y
      };

      intersection = external.cornerstoneMath.lineSegment.intersectLine(longLine, perpendicularLine);

      d1 = external.cornerstoneMath.point.distance(intersection, data.handles.start);
      d2 = external.cornerstoneMath.point.distance(intersection, data.handles.end);

      if (!intersection || d1 < 3 || d2 < 3) {
        outOfBounds = true;
      }
    }

    movedPoint = false;

    if (!outOfBounds) {
      movedPoint = perpendicularLeftFixedPoint(eventData, data);

      if (!movedPoint) {
        eventData.currentPoints.image.x = data.handles.perpendicularStart.x;
        eventData.currentPoints.image.y = data.handles.perpendicularStart.y;
      }
    }

  } else if (handle.index === 3) {
    outOfBounds = false;

    // If perpendicular end point is moved
    longLine.start = {
      x: data.handles.start.x,
      y: data.handles.start.y
    };
    longLine.end = {
      x: data.handles.end.x,
      y: data.handles.end.y
    };

    perpendicularLine.start = {
      x: data.handles.perpendicularStart.x,
      y: data.handles.perpendicularStart.y
    };
    perpendicularLine.end = {
      x: eventData.currentPoints.image.x,
      y: eventData.currentPoints.image.y
    };

    intersection = external.cornerstoneMath.lineSegment.intersectLine(longLine, perpendicularLine);
    if (!intersection) {
      perpendicularLine.end = {
        x: data.handles.perpendicularEnd.x,
        y: data.handles.perpendicularEnd.y
      };

      intersection = external.cornerstoneMath.lineSegment.intersectLine(longLine, perpendicularLine);

      d1 = external.cornerstoneMath.point.distance(intersection, data.handles.start);
      d2 = external.cornerstoneMath.point.distance(intersection, data.handles.end);

      if (!intersection || d1 < 3 || d2 < 3) {
        outOfBounds = true;
      }
    }

    movedPoint = false;

    if (!outOfBounds) {
      movedPoint = perpendicularRightFixedPoint(eventData, data);

      if (!movedPoint) {
        eventData.currentPoints.image.x = data.handles.perpendicularEnd.x;
        eventData.currentPoints.image.y = data.handles.perpendicularEnd.y;
      }
    }
  }
}