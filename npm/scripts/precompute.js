/**
 * Iwanthue Precompute Script
 * ===========================
 *
 * Script generating the precomputed palettes.
 */
var fs = require('fs-extra');
var path = require('path');
var iwanthue = require('../');
var range = require('lodash/range');

var MAX_COUNT = 15;
var COUNTS = range(2, MAX_COUNT + 1);
var SEED = 123;

var PRECOMPUTED_PATH = path.join(__dirname, '..', 'precomputed');

function template(palettes) {
  var lines = [
    'module.exports = {'
  ];

  palettes.forEach((palette, i) => {
    var end = i === palettes.length - 1 ? '' : ',';

    lines.push('  ' + palette.length + ': ' + JSON.stringify(palette) + end);
  });

  lines.push('};');

  return lines.join('\n');
}

fs.ensureDirSync(PRECOMPUTED_PATH);

var forceVectorPalettes = COUNTS.map(count => {
  return iwanthue(count, {
    seed: SEED,
    clustering: 'force-vector'
  });
});

fs.writeFileSync(path.join(PRECOMPUTED_PATH, 'force-vector.js'), template(forceVectorPalettes));
