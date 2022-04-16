/**
 * Iwanthue Palette Class
 * =======================
 *
 * A utility class representing a categorical color palette.
 */
var forEach = require('obliterator/foreach');
var iwanthue = require('./index.js');

function Palette(name, map, defaultColor) {
  defaultColor = defaultColor || '#ccc';

  this.name = name;
  this.defaultColor = defaultColor;
  this.map = map;
  this.size = map.size;
}

Palette.prototype.get = function(value) {
  var color = this.map.get(value);

  if (color === undefined) return this.defaultColor;

  return color;
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

Palette.generateFromValues = function(name, values, settings) {
  settings = Object.assign({
    colorSpace: 'sensible',
    seed: name,
    clustering: 'force-vector',
    attempts: 5
  }, settings);

  var count = 'size' in values ? values.size : values.length;

  if (!count) return new Palette(name, new Map(), settings.defaultColor);

  var colors = iwanthue(count, settings);
  var map = new Map();

  var i = 0;

  forEach(values, function(value) {
    map.set(value, colors[i++]);
  });

  return new Palette(name, map, settings.defaultColor);
};

Palette.fromEntries = function(name, entries, defaultColor) {
  const map = new Map();

  forEach(entries, function(entry) {
    map.set(entry[0], entry[1]);
  });

  return new Palette(name, map, defaultColor);
};

Palette.fromMapping = function(name, mapping, defaultColor) {
  const map = new Map();

  forEach(mapping, function(color, value) {
    map.set(value, color);
  });

  return new Palette(name, map, defaultColor);
};

module.exports = Palette;
