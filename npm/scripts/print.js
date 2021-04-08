var iwanthue = require('../');
var chalk = require('chalk');
var repeat = require('lodash/repeat')

var n = +process.argv[2];
var seed = process.argv[3];

var COLOR_SPACE = {
  cmin: 25.59,
  cmax: 55.59,
  lmin: 60.94,
  lmax: 90.94
};

var options = {
  clustering: 'force-vector',
  colorSpace: COLOR_SPACE,
  attempts: 3
};

if (seed)
  options.seed = seed;

var palette = iwanthue(n, options);

console.log();
console.log('Generating palette with ' + n + ' colors.');
console.log();

var line = repeat(' ', 30);

palette.forEach(function(color) {
  console.log(chalk.bgHex(color)(line) + ' ' + color);
});

console.log();
