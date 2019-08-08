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

    var paletteString = palette.map(color => '\'' + color + '\'').join(', ');

    lines.push('  ' + palette.length + ': [' + paletteString + ']' + end);
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

var FILES = [
  {
    name: 'force-vector',
    title: 'Precomputed Force Vector Palettes',
    settings: {
      clustering: 'force-vector'
    }
  },
  {
    name: 'index',
    title: 'Precomputed K-Means Palettes',
    settings: {
      clustering: 'k-means'
    }
  },
  {
    name: 'k-means',
    title: 'Precomputed K-Means Palettes',
    settings: {
      clustering: 'k-means'
    }
  },
  {
    name: 'ultra-k-means',
    title: 'Precomputed K-Means Palettes With Ultra Precision',
    settings: {
      clustering: 'k-means',
      ulraPrecision: true
    }
  },
  {
    name: 'force-vector-colorblind',
    title: 'Precomputed Colorblind Force Vector Palettes',
    settings: {
      clustering: 'force-vector',
      distance: 'compromise'
    }
  },
  {
    name: 'k-means-colorblind',
    title: 'Precomputed Colorblind K-Means Palettes',
    settings: {
      clustering: 'k-means',
      distance: 'compromise'
    }
  }
];

FILES.forEach(file => {
  var palettes = COUNTS.map(count => {
    var settings = Object.assign({}, {seed: SEED}, file.settings);

    return iwanthue(count, settings);
  });

  var p = file.path || '';

  fs.writeFileSync(
    path.join(PRECOMPUTED_PATH, p, file.name + '.js'),
    templateModule(palettes)
  );
  fs.writeFileSync(
    path.join(PRECOMPUTED_PATH, p, file.name + '.html'),
    templateHtml(file.title, palettes)
  );
});

