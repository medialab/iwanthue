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
var presets = require('../presets.js');

var HTML_TEMPLATE = hjs.compile(fs.readFileSync(path.join(__dirname, 'palettes.handlebars'), 'utf-8'));
var SUMMARY_TEMPLATE = hjs.compile(fs.readFileSync(path.join(__dirname, 'summary.handlebars'), 'utf-8'));

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
      distance: 'compromise',
      colorSpace: 'colorblind'
    }
  },
  {
    name: 'k-means-colorblind',
    title: 'Precomputed Colorblind K-Means Palettes',
    settings: {
      clustering: 'k-means',
      distance: 'compromise',
      colorSpace: 'colorblind'
    }
  }
];

for (var name in presets) {
  if (name === 'colorblind' || name === 'default')
    continue;

  FILES.push({
    name: 'k-means-' + name,
    title: 'Precomputed K-Means Palettes With the `' + name + '` Preset',
    settings: {
      clustering: 'k-means',
      colorSpace: name
    }
  });

  FILES.push({
    name: 'force-vector-' + name,
    title: 'Precomputed Force Vector Palettes With the `' + name + '` Preset',
    settings: {
      clustering: 'force-vector',
      colorSpace: name
    }
  });
}


FILES.forEach(file => {
  console.log('Computing ' + file.name + ' palettes...');

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

console.log('\n\nFinished computing the following palettes:')
FILES.forEach(file => {
  console.log('iwanthue/precomputed/' + file.name);
});

fs.writeFileSync(
  path.join(PRECOMPUTED_PATH, 'summary.html'),
  SUMMARY_TEMPLATE({
    palettes: FILES.map(file => ({name: file.name}))
  })
);
