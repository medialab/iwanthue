var assert = require('chai').assert;
var helpers = require('../helpers.js');

var LAB_COLORS = [
  [45.19047619047619, 42.698412698412696, 17.142857142857142],
  [52.210648148148145, -2.384259259259259, -8.00925925925926],
  [64.6812749003984, 3.8247011952191237, 42.11155378486056],
  [44.67966573816156, 46.155988857938716, -45.65459610027855],
  [74.76588628762542, -39.49832775919732, 41.03678929765886]
];

function deepApproximatelyEqual(a1, a2) {
  assert.strictEqual(a1.length, a2.length);

  a1.forEach(function(x, i) {
    var y = a2[i];
    assert.approximately(x, y, 0.5);
  });
}

describe('helpers', function() {

  it('conversions should work in both direction.', function() {
    LAB_COLORS.forEach(lab => {
      deepApproximatelyEqual(helpers.rgbToLab(helpers.labToRgb(lab)), lab);
    });
  });
});
