/**
 * Iwanthue Distance Functions
 * ============================
 *
 * Bunch of color-related distance functions, some of which take daltonism
 * into account.
 */
var CONFUSION_LINES = {
  protanope: {
    x: 0.7465,
    y: 0.2535,
    m: 1.273463,
    yint: -0.073894
  },
  deuteranope: {
    x: 1.4,
    y: -0.4,
    m: 0.968437,
    yint: 0.003331
  },
  tritanope: {
    x: 0.1748,
    y: 0.0,
    m: 0.062921,
    yint: 0.292119
  }
};

function euclidean(lab1, lab2) {
  return Math.sqrt(
    Math.pow(lab1[0] - lab2[0], 2) +
    Math.pow(lab1[1] - lab2[1], 2) +
    Math.pow(lab1[2] - lab2[2], 2)
  );
}

module.exports = {
  euclidean: euclidean
};
