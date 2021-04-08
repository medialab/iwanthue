/**
 * Iwanthue Library Endpoint
 * ==========================
 *
 * Exporting the main utilities of the library.
 */
var Random = require('./rng.js');
var CachedDistances = require('./distances.js');
var helpers = require('./helpers.js');
var presets = require('./presets.js');

var validateRgb = helpers.validateRgb;
var labToRgb = helpers.labToRgb;
var labToRgbHex = helpers.labToRgbHex;
var labToHcl = helpers.labToHcl;
var diffSort = helpers.diffSort;

/**
 * Constants.
 */
var DEFAULT_SETTINGS = {
  attempts: 1,
  colorFilter: null,
  colorSpace: 'default',
  clustering: 'k-means',
  quality: 50,
  ultraPrecision: false,
  distance: 'euclidean',
  seed: null
};

var VALID_CLUSTERINGS = new Set(['force-vector', 'k-means']);

var VALID_DISTANCES = new Set([
  'euclidean',
  'cmc',
  'compromise',
  'protanope',
  'deuteranope',
  'tritanope'
]);

var VALID_PRESETS = new Set(Object.keys(presets));

/**
 * Helpers.
 */
function stringSum(string) {
  var sum = 0;

  for (var i = 0, l = string.length; i < l; i++)
    sum += string.charCodeAt(i);

  return sum;
}

function resolveAndValidateSettings(userSettings) {
  var settings = Object.assign({}, DEFAULT_SETTINGS, userSettings);

  if (typeof settings.attempts !== 'number' || settings.attempts <= 0)
    throw new Error('iwanthue: invalid `attempts` setting. Expecting a positive number.');

  if (settings.colorFilter && typeof settings.colorFilter !== 'function')
    throw new Error('iwanthue: invalid `colorFilter` setting. Expecting a function.');

  if (!VALID_CLUSTERINGS.has(settings.clustering))
    throw new Error('iwanthue: unknown `clustering` "' + settings.clustering + '".');

  if (typeof settings.quality !== 'number' || isNaN(settings.quality) || settings.quality < 1)
    throw new Error('iwanthue: invalid `quality`. Expecting a number > 0.');

  if (typeof settings.ultraPrecision !== 'boolean')
    throw new Error('iwanthue: invalid `ultraPrecision`. Expecting a boolean.');

  if (!VALID_DISTANCES.has(settings.distance))
    throw new Error('iwanthue: unknown `distance` "' + settings.distance + '".');

  if (typeof settings.seed === 'string')
    settings.seed = stringSum(settings.seed);

  if (settings.seed !== null && typeof settings.seed !== 'number')
    throw new Error('iwanthue: invalid `seed`. Expecting an integer or a string.');

  // Building color filter from preset?
  if (!settings.colorFilter) {
    if (
      settings.colorSpace &&
      settings.colorSpace !== 'all'
    ) {

      var preset;

      if (typeof settings.colorSpace === 'string') {
        if (!VALID_PRESETS.has(settings.colorSpace))
          throw new Error('iwanthue: unknown `colorSpace` "' + settings.colorSpace + '".');

        preset = presets[settings.colorSpace];
      }
      else if (Array.isArray(settings.colorSpace)) {

        if (settings.colorSpace.length !== 6)
          throw new Error('iwanthue: expecting a `colorSpace` array of length 6 ([hmin, hmax, cmin, cmax, lmin, lmax]).');

        preset = settings.colorSpace;
      }
      else {
        preset = [
          settings.colorSpace.hmin || 0,
          settings.colorSpace.hmax || 360,
          settings.colorSpace.cmin || 0,
          settings.colorSpace.cmax || 100,
          settings.colorSpace.lmin || 0,
          settings.colorSpace.lmax || 100
        ];
      }

      if (preset[0] < preset[1])
        settings.colorFilter = function(rgb, lab) {
          var hcl = labToHcl(lab);

          return (
            hcl[0] >= preset[0] && hcl[0] <= preset[1] &&
            hcl[1] >= preset[2] && hcl[1] <= preset[3] &&
            hcl[2] >= preset[4] && hcl[2] <= preset[5]
          );
        };
      else
      settings.colorFilter = function(rgb, lab) {
        var hcl = labToHcl(lab);

        return (
          (hcl[0] >= preset[0] || hcl[0] <= preset[1]) &&
          hcl[1] >= preset[2] && hcl[1] <= preset[3] &&
          hcl[2] >= preset[4] && hcl[2] <= preset[5]
        );
      };
    }
  }

  return settings;
}

// NOTE: this function has complexity O(∞).
function sampleLabColors(rng, count, validColor) {
  var colors = new Array(count),
      lab,
      rgb;

  for (var i = 0; i < count; i++) {

    do {
      lab = [
        100 * rng(),
        100 * (2 * rng() - 1),
        100 * (2 * rng() - 1)
      ];

      rgb = labToRgb(lab);

    } while (!validColor(rgb, lab));

    colors[i] = lab;
  }

  return colors;
}

var REPULSION = 100;
var SPEED = 100;

function forceVector(rng, distance, validColor, colors, settings) {
  var vectors = new Array(colors.length);
  var steps = settings.quality * 20;

  var i, j, l = colors.length;

  var A, B;

  var d, dl, da, db, force, candidateLab, color, ratio, displacement, rgb;

  while (steps-- > 0) {

    // Initializing vectors
    for (i = 0; i < l; i++)
      vectors[i] = {dl: 0, da: 0, db: 0};

    // Computing force
    for (i = 0; i < l; i++) {
      A = colors[i];

      for (j = 0; j < i; j++) {
        B = colors[j];

        // Repulsion
        d = distance(A, B);

        if (d > 0) {
          dl = A[0] - B[0];
          da = A[1] - B[1];
          db = A[2] - B[2];

          force = REPULSION / Math.pow(d, 2);

          vectors[i].dl += (dl * force) / d;
          vectors[i].da += (da * force) / d;
          vectors[i].db += (db * force) / d;

          vectors[j].dl -= (dl * force) / d;
          vectors[j].da -= (da * force) / d;
          vectors[j].db -= (db * force) / d;
        }
        else {

          // Jitter
          vectors[j].dl += 2 - 4 * rng();
          vectors[j].da += 2 - 4 * rng();
          vectors[j].db += 2 - 4 * rng();
        }
      }
    }

    // Applying force
    for (i = 0; i < l; i++) {
      color = colors[i];
      displacement = SPEED * Math.sqrt(
        Math.pow(vectors[i].dl, 2) +
        Math.pow(vectors[i].da, 2) +
        Math.pow(vectors[i].db, 2)
      );

      if (displacement > 0) {
        ratio = (SPEED * Math.min(0.1, displacement)) / displacement;
        candidateLab = [
          color[0] + vectors[i].dl * ratio,
          color[1] + vectors[i].da * ratio,
          color[2] + vectors[i].db * ratio
        ];

        rgb = labToRgb(candidateLab);

        if (validColor(rgb, candidateLab))
          colors[i] = candidateLab;
      }
    }
  }
}

function kMeans(distance, validColor, colors, settings) {
  var colorSamples = [];
  var samplesClosest = [];

  var l, a, b;

  var lab, rgb;

  var linc = 5,
      ainc = 10,
      binc = 10;

  if (settings.ultraPrecision) {
    linc = 1;
    ainc = 5;
    binc = 5;
  }

  for (l = 0; l <= 100; l += linc) {
    for (a = -100; a <= 100; a += ainc) {
      for (b = -100; b <= 100; b += binc) {
        lab = [l, a, b];
        rgb = labToRgb(lab);

        if (!validColor(rgb, lab))
          continue;

        colorSamples.push(lab);
        samplesClosest.push(null);
      }
    }
  }

  // Steps
  var steps = settings.quality;

  var i, j;

  var A, B;

  var li = colorSamples.length,
      lj = colors.length;


  var d, minDistance, freeColorSamples, count, candidate, closest;

  while (steps-- > 0) {

    // Finding closest color
    for (i = 0; i < li; i++) {
      B = colorSamples[i];
      minDistance = Infinity;

      for (j = 0; j < lj; j++) {
        A = colors[j];

        d = distance(A, B);

        if (d < minDistance) {
          minDistance = d;
          samplesClosest[i] = j;
        }
      }
    }

    freeColorSamples = colorSamples.slice();

    for (j = 0; j < lj; j++) {
      count = 0;
      candidate = [0, 0, 0];

      for (i = 0; i < li; i++) {
        if (samplesClosest[i] === j) {
          count++;
          candidate[0] += colorSamples[i][0];
          candidate[1] += colorSamples[i][1];
          candidate[2] += colorSamples[i][2];
        }
      }

      if (count !== 0) {
        candidate[0] /= count;
        candidate[1] /= count;
        candidate[2] /= count;

        rgb = labToRgb(candidate);

        if (validColor(rgb, candidate)) {
          colors[j] = candidate;
        }
        else {
          // The candidate is out of the boundaries of our color space or unfound

          if (freeColorSamples.length > 0) {

            // We just search for the closest free color
            minDistance = Infinity;
            closest = -1;

            for (i = 0; i < freeColorSamples.length; i++) {
              d = distance(freeColorSamples[i], candidate);

              if (d < minDistance) {
                minDistance = d;
                closest = i;
              }
            }

            colors[j] = colorSamples[closest];
          }
          else {

            // Then we just search for the closest color
            minDistance = Infinity;
            closest = -1;

            for (i = 0; i < colorSamples.length; i++) {
              d = distance(colorSamples[i], candidate);

              if (d < minDistance) {
                minDistance = d;
                closest = i;
              }
            }

            colors[j] = colorSamples[closest];
          }

          // Cleaning up free samples
          /* eslint-disable */
          freeColorSamples = freeColorSamples.filter(function(color) {
            return (
              color[0] !== colors[j][0] ||
              color[1] !== colors[j][1] ||
              color[2] !== colors[j][2]
            )
          });
          /* eslint-enable */
        }
      }
    }
  }

  return colors;
}

/**
 * Function generating a iwanthue palette.
 *
 * @param  {number}   count            - Number of colors in the palette.
 * @param  {object}   settings         - Optional settings:
 * @param  {function}   colorFilter      - Function filtering unwanted colors.
 * @param  {string}     clustering       - Clustering method to use. Either 'force-vector' or 'k-means'.
 * @param  {number}     quality          - Quality of the clustering, i.e. number of steps/iterations.
 * @param  {boolean}    ultraPrecision   - Whether to use ultra precision or not.
 * @param  {string}     distance         - Name of the color distance function to use. Defaults to 'colorblind'.
 * @param  {number}     seed             - Seed for random number generation.
 * @return {Array}                     - The computed palette as an array of hexadecimal colors.
 */
module.exports = function generatePalette(count, settings) {
  if (typeof count !== 'number' || count < 2)
    throw new Error('iwanthue: expecting a color count > 2.');

  settings = resolveAndValidateSettings(settings);

  var random = new Random(settings.seed);

  var rng = function() {
    return random.nextFloat();
  };

  var distances = new CachedDistances();
  var distance = distances.get(settings.distance);

  var validColor = function(rgb, lab) {
    // if (arguments.length < 2)
    //   throw new Error('validColor takes both rgb and lab!');

    if (!validateRgb(rgb))
      return false;

    if (!settings.colorFilter)
      return true;

    if (!settings.colorFilter(rgb, lab))
      return false;

    return true;
  };

  var attempts = 1;

  var colors;

  while (attempts > 0) {
    colors = sampleLabColors(rng, count, validColor);

    if (settings.clustering === 'force-vector')
      forceVector(rng, distance, validColor, colors, settings);
    else
      kMeans(distance, validColor, colors, settings);

    attempts--;
  }

  colors = diffSort(distance, colors);

  return colors.map(labToRgbHex);
};
