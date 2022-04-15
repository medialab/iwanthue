/**
 * Iwanthue Palette Builder Class
 * ===============================
 *
 * A utility class that can be used to build a color palette while streaming
 * data.
 */
var MultiSet = require('mnemonist/multi-set');
var Palette = require('./palette.js');

function PaletteBuilder(name, maxCount, settings) {
  this.name = name;
  this.frequencies = new MultiSet();
  this.settings = settings;
  this.maxCount = maxCount;
}

PaletteBuilder.prototype.add = function(value) {
  this.frequencies.add(value);
};

PaletteBuilder.prototype.build = function() {
  const values = this.frequencies.top(this.maxCount).map(function(entry) {
    return entry[0];
  });

  const settings = Object.assign({
    trueCount: this.frequencies.dimension,
    maxCount: this.maxCount
  }, this.settings);

  return Palette.fromValues(this.name, values, settings);
};

module.exports = PaletteBuilder;
