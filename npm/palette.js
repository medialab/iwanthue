/**
 * Iwanthue Palette Class
 * =======================
 *
 * A utility class representing a categorical color palette.
 */
var some = require('obliterator/some');
var forEach = require('obliterator/foreach');
var iwanthue = require('./index.js');

function Palette(name, map, options) {
  options = options || {};

  this.name = name;
  this.overflowing = options.overflowing === true;
  this.defaultColor = options.defaultColor || '#ccc';
  this.map = map;
  this.size = map.size;
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

Palette.prototype.colors = function() {
  return Array.from(this.map.values());
};

Palette.fromValues = function(name, values, settings) {
  if (!values.size && !values.length) return new Palette(name, new Map());

  settings = Object.assign({
    colorSpace: 'sensible',
    seed: name,
    clustering: 'force-vector',
    attempts: 5
  }, settings);

  var maxCount = settings.maxCount || Infinity;
  var inputCount = values.length || values.size;
  var count = Math.min(maxCount, inputCount);

  var overflowing = settings.trueCount ? count < settings.trueCount : count < inputCount;

  var colors = iwanthue(count, settings);
  var map = new Map();

  var i = 0;

  some(values, function(value) {
    map.set(value, colors[i++]);
    if (i >= maxCount) return true;
  });

  settings = {
    defaultColor: settings.defaultColor,
    overflowing: overflowing
  };

  return new Palette(name, map, settings);
};

Palette.fromEntries = function(name, entries, settings) {
  const map = new Map();

  forEach(entries, function(entry) {
    map.set(entry[0], entry[1]);
  });

  return new Palette(name, map, settings);
};

Palette.fromMapping = function(name, mapping, settings) {
  const map = new Map();

  forEach(mapping, function(color, value) {
    map.set(value, color);
  });

  return new Palette(name, map, settings);
};

module.exports = Palette;
