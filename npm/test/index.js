var assert = require('assert');
var iwanthue = require('../');

describe('iwanthue', function() {
  it('should throw when arguments are invalid.', function() {

    var tests = [
      [-4],
      [null],
      [],
      [5, {colorFilter: 45}],
      [5, {clustering: 't-sne'}],
      [5, {quality: {hello: 'world'}}],
      [5, {quality: {hello: NaN}}],
      [5, {ultraPrecision: 43}],
      [5, {distance: 'manhattan'}],
      [5, {seed: 'test'}]
    ];

    tests.forEach(args => {
      assert.throws(() => iwanthue.apply(null, args), /iwanthue/);
    });
  });
});
