var iwanthue = require('../');
var chalk = require('chalk');
var repeat = require('lodash/repeat')

var n = +process.argv[2];

var palette = iwanthue(n, {
  clustering: 'k-means'
});

console.log();
console.log('Generating palette with ' + n + ' colors.');
console.log();

var line = repeat(' ', 30);

palette.forEach(function(color) {
  console.log(chalk.bgHex(color)(line) + ' ' + color);
});

console.log();
