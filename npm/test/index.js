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
      [5, {seed: undefined}]
    ];

    tests.forEach(args => {
      assert.throws(() => iwanthue.apply(null, args), /iwanthue/);
    });
  });

  it('should return suitable palettes.', function() {
    var palette = iwanthue(5, {seed: 123, clustering: 'force-vector'});

    assert.deepEqual(palette, ['#ffdfd1', '#006172', '#ffff5b', '#933cff', '#00c30c']);

    palette = iwanthue(5, {seed: 123, clustering: 'k-means'});

    assert.deepEqual(palette, ['#b04951', '#717e8a', '#ba9850', '#8d4cb7', '#84c969']);

    palette = iwanthue(15, {seed: 'precomputed', clustering: 'k-means'});

    assert.deepEqual(palette, [
      '#7a38cf',
      '#3f473f',
      '#d45f34',
      '#86d6a8',
      '#c597bc',
      '#4d295b',
      '#5b7e3b',
      '#696ec6',
      '#c5a377',
      '#cd4972',
      '#73d751',
      '#c850bd',
      '#cfc84b',
      '#7cafc2',
      '#7d3e33']
    );
  });
});
