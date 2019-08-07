/**
 * Iwanthue Library Endpoint
 * ==========================
 *
 * Exporting the main utilities of the library.
 */
var Random = require('./rng.js');

/**
 * Constants.
 */
var DEFAULT_SETTINGS = {
  colorFilter: null,
  clustering: 'k-means',
  quality: 50,
  ultraPrecision: false,
  distance: 'colorblind',
  seed: null
};

var VALID_CLUSTERINGS = new Set(['force-vector', 'k-means']);

var VALID_DISTANCES = new Set([
  'colorblind',
  'euclidean',
  'cmc',
  'compromise'
]);

var LAB_CONSTANTS = {
  // Corresponds roughly to RGB brighter/darker
  Kn: 18,

  // D65 standard referent
  Xn: 0.95047,
  Yn: 1,
  Zn: 1.08883,

  t0: 0.137931034, // 4 / 29
  t1: 0.206896552, // 6 / 29
  t2: 0.12841855, // 3 * t1 * t1
  t3: 0.008856452 // t1 * t1 * t1
};

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

  return settings;
}

function xyzToRgb(r) {
  return Math.round(
    255 *
    (r <= 0.00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055)
  );
}

function labToXyz(t) {
  return t > LAB_CONSTANTS.t1 ?
    t * t * t :
    LAB_CONSTANTS.t2 * (t - LAB_CONSTANTS.t0);
}

function labToRgb(lab) {
  var l = lab[0];
  var a = lab[1];
  var b = lab[2];

  var y = (l + 16) / 116;
  var x = isNaN(a) ? y : y + a / 500;
  var z = isNaN(b) ? y : y - b / 200;

  y = LAB_CONSTANTS.Yn * labToXyz(y);
  x = LAB_CONSTANTS.Xn * labToXyz(x);
  z = LAB_CONSTANTS.Zn * labToXyz(z);

  var r = xyzToRgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z); // D65 -> sRGB
  var g = xyzToRgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z);
  var b = xyzToRgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);

  return [r, g, b];
}

function validateRgb(rgb) {
  var r = rgb[0];
  var g = rgb[1];
  var b = rgb[2];

  return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
}

function sampleLabColors(rng, count, colorFilter) {
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

    } while (!validateRgb(rgb) && (!colorFilter || !colorFilter(rgb)));

    colors[i] = lab;
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

  var colors = sampleLabColors(rng, count, settings.colorFilter);

  console.log(colors);
};
