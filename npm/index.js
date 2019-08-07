/**
 * Iwanthue Library Endpoint
 * ==========================
 *
 * Exporting the main utilities of the library.
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

/**
 * Helpers.
 */
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

  if (settings.seed !== null && typeof settings.seed !== 'number')
    throw new Error('iwanthue: invalid `seed`. Expecting an integer.');

  return settings;
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
};
