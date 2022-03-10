/**
 * Iwanthue Palette Class
 * =======================
 *
 * A utility class representing a categorical color palette.
 */
var forEach = require('obliterator/foreach');
var iwanthue = require('./index.js');

function Palette(name, values, settings) {
  if (!values.length && !values.size)
    throw new Error('iwanthue/palette: values should be an array or set having at least one item');

  settings = Object.assign({
    colorSpace: 'sensible',
    seed: name,
    clustering: 'force-vector',
    attempts: 5
  }, settings);

  this.name = name;

  this.defaultColor = settings.defaultColor || '#ccc';

  var maxCount = settings.maxCount || Infinity;
  var inputCount = values.length || values.size;
  var count = Math.min(maxCount, inputCount);

  this.size = count;
  this.overflowing = settings.trueCount ? count < settings.trueCount : count < inputCount;

  var colors = count > 1 ? iwanthue(count, settings) : [this.defaultColor];
  var map = new Map();

  var i = 0;

  forEach(values, function(value) {
    map.set(value, colors[i++]);
  });

  this.colors = colors;
  this.map = map;
}

Palette.prototype.get = function(value) {
  return this.map.get(value) || this.defaultColor;
};

Palette.prototype.has = function(value) {
  return this.map.has(value);
};

Palette.prototype.forEach = function(callback) {
  this.map.forEach(callback);
};

module.exports = Palette;
