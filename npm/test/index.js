var assert = require('chai').assert;
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
      [5, {seed: undefined}],
      [6, {colorSpace: 'tabundeshou'}],
      [3, {attempts: 'test'}]
    ];

    tests.forEach(args => {
      assert.throws(() => iwanthue.apply(null, args), /iwanthue/);
    });
  });

  it('should return suitable palettes.', function() {
    var palette = iwanthue(5, {seed: 123, clustering: 'force-vector', colorSpace: null});

    assert.sameMembers(palette, ['#ffdfd1', '#006172', '#ffff5b', '#933cff', '#00c30c']);

    palette = iwanthue(5, {seed: 123, clustering: 'k-means', colorSpace: null});

    assert.sameMembers(palette, ['#b04951', '#717e8a', '#ba9850', '#8d4cb7', '#84c969']);

    palette = iwanthue(15, {seed: 'precomputed', clustering: 'k-means', colorSpace: null});

    assert.sameMembers(palette, [
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

    palette = iwanthue(5, {seed: 123, clustering: 'k-means', ultraPrecision: true, colorSpace: null});

    assert.sameMembers(palette, ['#b1494f', '#707f8a', '#b99650', '#8f4cb5', '#85c967']);
  });

  it('should be possible to pass colorSpace as an array.', function() {

    var palette = iwanthue(5, {seed: 123, colorSpace: [0, 360, 25.59, 55.59, 60.94, 90.94]});

    assert.sameMembers(palette, ['#6ed5b1', '#71b9e7', '#bdc579', '#db9bd3', '#e79d78']);

    var palette2 = iwanthue(5, {seed: 123, colorSpace: {cmin: 25.59, cmax: 55.59, lmin: 60.94, lmax: 90.94}});

    assert.sameMembers(palette, palette2);
  });


  it('should be possible to pass originalColorsToExpand to expand palette.', function() {

    var palette = iwanthue(3, {originalColorsToExpand: ['#60a862', '#c15ca5'], seed: 123, colorSpace: 'all'});
    assert.sameMembers(palette, ['#60a862', '#c15ca5', '#986e5e']);


    var palette3 = iwanthue(5, {originalColorsToExpand: ['#94b3b9', '#9552b3', '#98bf5a', '#c7614e'], seed: 123, colorSpace: 'all'});
    assert.includeMembers(palette3, ['#94b3b9', '#9552b3', '#98bf5a', '#c7614e', '#4f4142']);

    var palette2 = iwanthue(8, {originalColorsToExpand: [
      '#6785ce', '#ca576b', '#5eab65', '#b55eb2',
      '#aa9b41', '#c86a38', '#6596cd'], seed: 123, colorSpace: 'all'});
    // original colors are still there
    assert.includeMembers(palette2, ['#6785ce', '#ca576b', '#5eab65', '#b55eb2', '#aa9b41', '#c86a38', '#6596cd']);
    // the new one has been added
    assert.includeMembers(palette2, ['#514343']);
    var palette4 = iwanthue(5, {
      originalColorsToExpand: ['#e6b8c4', '#98d4e4', '#e1c4aa', '#bfbee0'],
      colorSpace: 'fancy-light',
      seed: 123
    });
    assert.includeMembers(palette4, ['#9dd7b4']);
  });

  it('should be possible to pass originalColorsToExpand to expand palette without a colorSpace.', function() {

    var palette = iwanthue(3, {originalColorsToExpand: ['#60a862', '#c15ca5'], seed: 123});
    assert.sameMembers(palette, ['#60a862', '#c15ca5', '#be6d40']);

    var palette3 = iwanthue(5, {originalColorsToExpand: ['#94b3b9', '#9552b3', '#98bf5a', '#c7614e'], seed: 123});
    assert.includeMembers(palette3, ['#94b3b9', '#9552b3', '#98bf5a', '#c7614e', '#4f4142']);

    var palette2 = iwanthue(8, {originalColorsToExpand: [
      '#6785ce', '#ca576b', '#5eab65', '#b55eb2',
      '#aa9b41', '#c86a38', '#6596cd'], seed: 123});
    // original colors are still there
    assert.includeMembers(palette2, ['#6785ce', '#ca576b', '#5eab65', '#b55eb2', '#aa9b41', '#c86a38', '#6596cd']);
    // the new one has been added
    assert.includeMembers(palette2, ['#49b2a0']);
    var palette4 = iwanthue(5, {
      originalColorsToExpand: ['#e6b8c4', '#98d4e4', '#e1c4aa', '#bfbee0'],
      seed: 123
    });
    assert.includeMembers(palette4, ['#9dd7b4']);
  });
});

