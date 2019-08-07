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
var hjs = require('handlebars');

var HTML_TEMPLATE = hjs.compile(fs.readFileSync(path.join(__dirname, 'template.handlebars'), 'utf-8'));

var MAX_COUNT = 15;
var COUNTS = range(2, MAX_COUNT + 1);
var SEED = 'precomputed';

var PRECOMPUTED_PATH = path.join(__dirname, '..', 'precomputed');

function templateModule(palettes) {
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

function templateHtml(title, palettes) {
  return HTML_TEMPLATE({
    title: title,
    palettes: palettes.map(palette => {
      return {
        count: palette.length,
        palette: palette.map(color => {
          return {color: color};
        })
      };
    })
  });
}

fs.ensureDirSync(PRECOMPUTED_PATH);

var forceVectorPalettes = COUNTS.map(count => {
  return iwanthue(count, {
    seed: SEED,
    clustering: 'force-vector'
  });
});

fs.writeFileSync(path.join(PRECOMPUTED_PATH, 'force-vector.js'), templateModule(forceVectorPalettes));
fs.writeFileSync(path.join(PRECOMPUTED_PATH, 'force-vector.html'), templateHtml('Force Vector Palettes', forceVectorPalettes));
