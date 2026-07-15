var assert = require('chai').assert;
var helpers = require('../helpers.js');
var CachedDistances = require('../distances.js');

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

  it('should be possible to sort resulting colors by differenciation.', function() {
    var distances = new CachedDistances();

    var colors = [
      '#83a143', // Order of first color is important!
      '#4dad98',
      '#ca5686',
      '#ca7040',
      '#8b71c9'
    ];

    var sortedColors = [
      '#83a143',
      '#8b71c9',
      '#ca5686',
      '#4dad98',
      '#ca7040'
    ];

    var output = helpers
      .diffSort(distances.get('euclidean'), colors.map(helpers.rgbHexToLab))
      .map(helpers.labToRgbHex);

    assert.deepEqual(output, sortedColors);
  });

  it('should be possible to find the smallest preset matching a palette', function () {
    var shades = ['#c6ccc2', '#2f251b', '#858a84', '#294240', '#655b4c'];
    assert.strictEqual(helpers.detectSmallestCompatibleColorSpace(shades), 'shades');

    // expected result: we find the smallest preset, fancy-light and pastels share lots of common colors,
    // fancy being smallest it's picked up in this case
    var pastels = ['#e6b8b3', '#a7dde2', '#d1bbdf', '#d4d9b6', '#aac4e2', '#9bc2af'];
    assert.strictEqual(helpers.detectSmallestCompatibleColorSpace(pastels), 'fancy-light');

    var ochreSand = ['#946056', '#e99478', '#995432', '#d79d91', '#b65f56'];
    assert.strictEqual(helpers.detectSmallestCompatibleColorSpace(ochreSand), 'ochre-sand');

    var intense = ['#749a50', '#6b47b8', '#c76c3f', '#cd53b8', '#6f86b5', '#a04a61'];
    assert.strictEqual(helpers.detectSmallestCompatibleColorSpace(intense), 'intense');
  });
});
