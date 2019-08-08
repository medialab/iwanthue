/**
 * Iwanthue Distance Functions
 * ============================
 *
 * Bunch of color-related distance functions, some of which take daltonism
 * into account.
 */
var helpers = require('./helpers.js');

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

function CachedDistances() {
  this.cache = {};
}

CachedDistances.prototype.simulate = function(lab, type, amount) {
  amount = amount || 1;

  // Cache
  var key = lab.join('-') + '-' + type + '-' + amount;
  var cache = this.cache[key];
  if (cache)
    return cache;

  // Get data from type
  var confuseX = CONFUSION_LINES[type].x;
  var confuseY = CONFUSION_LINES[type].y;
  var confuseM = CONFUSION_LINES[type].m;
  var confuseYint = CONFUSION_LINES[type].yint;

  // Code adapted from http://galacticmilk.com/labs/Color-Vision/Javascript/Color.Vision.Simulate.js
  var color = helpers.labToRgb(lab);

  var sr = color[0];
  var sg = color[1];
  var sb = color[2];
  var dr = sr; // destination color
  var dg = sg;
  var db = sb;
  // Convert source color into XYZ color space
  var powR = Math.pow(sr, 2.2);
  var powG = Math.pow(sg, 2.2);
  var powB = Math.pow(sb, 2.2);
  var X = powR * 0.412424 + powG * 0.357579 + powB * 0.180464; // RGB->XYZ (sRGB:D65)
  var Y = powR * 0.212656 + powG * 0.715158 + powB * 0.0721856;
  var Z = powR * 0.0193324 + powG * 0.119193 + powB * 0.950444;
  // Convert XYZ into xyY Chromacity Coordinates (xy) and Luminance (Y)
  var chromaX = X / (X + Y + Z);
  var chromaY = Y / (X + Y + Z);
  // Generate the "Confusion Line" between the source color and the Confusion Point
  var m = (chromaY - confuseY) / (chromaX - confuseX); // slope of Confusion Line
  var yint = chromaY - chromaX * m; // y-intercept of confusion line (x-intercept = 0.0)
  // How far the xy coords deviate from the simulation
  var deviateX = (confuseYint - yint) / (m - confuseM);
  var deviateY = m * deviateX + yint;
  // Compute the simulated color's XYZ coords
  X = (deviateX * Y) / deviateY;
  Z = ((1.0 - (deviateX + deviateY)) * Y) / deviateY;
  // Neutral grey calculated from luminance (in D65)
  var neutralX = (0.312713 * Y) / 0.329016;
  var neutralZ = (0.358271 * Y) / 0.329016;
  // Difference between simulated color and neutral grey
  var diffX = neutralX - X;
  var diffZ = neutralZ - Z;
  var diffR = diffX * 3.24071 + diffZ * -0.498571; // XYZ->RGB (sRGB:D65)
  var diffG = diffX * -0.969258 + diffZ * 0.0415557;
  var diffB = diffX * 0.0556352 + diffZ * 1.05707;
  // Convert to RGB color space
  dr = X * 3.24071 + Y * -1.53726 + Z * -0.498571; // XYZ->RGB (sRGB:D65)
  dg = X * -0.969258 + Y * 1.87599 + Z * 0.0415557;
  db = X * 0.0556352 + Y * -0.203996 + Z * 1.05707;
  // Compensate simulated color towards a neutral fit in RGB space
  var fitR = ((dr < 0.0 ? 0.0 : 1.0) - dr) / diffR;
  var fitG = ((dg < 0.0 ? 0.0 : 1.0) - dg) / diffG;
  var fitB = ((db < 0.0 ? 0.0 : 1.0) - db) / diffB;
  var adjust = Math.max(
    // highest value
    fitR > 1.0 || fitR < 0.0 ? 0.0 : fitR,
    fitG > 1.0 || fitG < 0.0 ? 0.0 : fitG,
    fitB > 1.0 || fitB < 0.0 ? 0.0 : fitB
  );
  // Shift proportional to the greatest shift
  dr = dr + adjust * diffR;
  dg = dg + adjust * diffG;
  db = db + adjust * diffB;
  // Apply gamma correction
  dr = Math.pow(dr, 1.0 / 2.2);
  dg = Math.pow(dg, 1.0 / 2.2);
  db = Math.pow(db, 1.0 / 2.2);
  // Anomylize colors
  dr = sr * (1.0 - amount) + dr * amount;
  dg = sg * (1.0 - amount) + dg * amount;
  db = sb * (1.0 - amount) + db * amount;
  var dcolor = [dr, dg, db];
  var result = helpers.rgbToLab(dcolor);
  this.cache[key] = result;

  return result;
};

CachedDistances.prototype.euclidean = euclidean;

module.exports = CachedDistances;
