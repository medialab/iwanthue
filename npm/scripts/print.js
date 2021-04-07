var iwanthue = require('../');
var chalk = require('chalk');
var repeat = require('lodash/repeat')

var n = +process.argv[2];
var seed = process.argv[3]; // Examples: carefôjeffff, carefôjefffffg

var options = {
  clustering: 'force-vector'
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
