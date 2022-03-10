/**
 * Iwanthue Palette Class
 * =======================
 *
 * A utility class representing a categorical color palette.
 */
var forEach = require('obliterator/foreach');
var iwanthue = require('./index.js');

function Palette(name, categories, settings) {
  if (!categories.length && !categories.size)
    throw new Error('iwanthue/palette: categories should be a list, set or map having at least one item');

  settings = Object.assign({
    colorSpace: 'sensible',
    seed: name,
    clustering: 'force-vector',
    attempts: 5
  }, settings);

  this.name = name;

  this.defaultColor = settings.defaultColor || '#ccc';

  var maxCount = settings.maxCount || Infinity;
  var inputCount = categories.length || categories.size;
  var count = Math.min(maxCount, inputCount);

  this.size = count;
  this.overflowing = settings.trueCount ? count < settings.trueCount : count < inputCount;

  var colors = count > 1 ? iwanthue(count, settings) : [this.defaultColor];
  var map = new Map();

  var i = 0;

  forEach(categories, function(category) {
    map.set(category, colors[i++]);
  });

  this.colors = colors;
  this.map = map;
}

Palette.prototype.get = function(category) {
  return this.map.get(category) || this.defaultColor;
};

Palette.prototype.forEach = function(callback) {
  this.map.forEach(callback);
};

module.exports = Palette;
