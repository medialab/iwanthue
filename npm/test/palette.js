/* eslint no-new: 0 */
var assert = require('assert');
var Palette = require('../palette.js');

describe('Palette', function() {
  it('should throw if given bad values.', function() {
    assert.throws(function() {
      new Palette('test', null);
    });
  });

  it('should provide a sensible palette.', function() {
    var palette = new Palette('test', ['one', 'two', 'three']);

    assert.strictEqual(palette.size, 3);
    assert.strictEqual(palette.defaultColor, '#ccc');
    assert.strictEqual(palette.overflowing, false);
    assert.deepStrictEqual(palette.colors, ['#ffb4c0', '#02aeb0', '#bfcf62']);

    var entries = [];

    palette.forEach(function(color, category) {
      entries.push([category, color]);
    });

    var expected = [
      ['one', '#ffb4c0'],
      ['two', '#02aeb0'],
      ['three', '#bfcf62']
    ];

    assert.deepStrictEqual(entries, expected);
    assert.deepStrictEqual(palette.map, new Map(expected));

    assert.strictEqual(palette.get('two'), '#02aeb0');
    assert.strictEqual(palette.get('unknown'), '#ccc');
  });

  it('should be possible to pass settings.', function() {
    var palette = new Palette('test', ['one', 'two', 'three'], {colorSpace: 'fancy-light'});

    assert.strictEqual(palette.size, 3);
    assert.strictEqual(palette.defaultColor, '#ccc');
    assert.strictEqual(palette.overflowing, false);
    assert.deepStrictEqual(palette.colors, ['#82b4fb', '#faffc6', '#ffb0b5']);

    var entries = [];

    palette.forEach(function(color, category) {
      entries.push([category, color]);
    });

    var expected = [
      ['one', '#82b4fb'],
      ['two', '#faffc6'],
      ['three', '#ffb0b5']
    ];

    assert.deepStrictEqual(entries, expected);
    assert.deepStrictEqual(palette.map, new Map(expected));

    assert.strictEqual(palette.get('two'), '#faffc6');
    assert.strictEqual(palette.get('unknown'), '#ccc');
  });

  it('should work with a single category.', function() {
    var palette = new Palette('test', ['single']);

    assert.strictEqual(palette.get('test'), '#ccc');
  });

  it('should work with a default value.', function() {
    var palette = new Palette('test', ['one', 'two', 'three'], {defaultColor: '#000'});

    assert.strictEqual(palette.get('unknown'), '#000');
  });

  it('should be possible to clamp & overflow.', function() {
    var palette = new Palette('test', ['one', 'two', 'three'], {maxCount: 2});

    assert.deepStrictEqual(palette.colors, ['#19d3a2', '#7f92f5']);
    assert.strictEqual(palette.get('three'), '#ccc');
    assert.strictEqual(palette.overflowing, true);

    palette = new Palette('test', ['one', 'two'], {trueCount: 3});

    assert.deepStrictEqual(palette.colors, ['#19d3a2', '#7f92f5']);
    assert.strictEqual(palette.get('three'), '#ccc');
    assert.strictEqual(palette.overflowing, true);
  });
});
