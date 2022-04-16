/* eslint no-new: 0 */
var assert = require('assert');
var Palette = require('../palette.js');

describe('Palette', function() {
  it('should throw if given bad values.', function() {
    assert.throws(function() {
      Palette.generateFromValues('test', null);
    });
  });

  it('should provide a sensible palette.', function() {
    var palette = Palette.generateFromValues('test', ['one', 'two', 'three']);

    assert.strictEqual(palette.size, 3);
    assert.strictEqual(palette.defaultColor, '#ccc');
    assert.deepStrictEqual(palette.colors(), ['#ffb4c0', '#02aeb0', '#bfcf62']);

    var entries = [];

    palette.forEach(function(color, value) {
      entries.push([value, color]);
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
    var palette = Palette.generateFromValues('test', ['one', 'two', 'three'], {colorSpace: 'fancy-light'});

    assert.strictEqual(palette.size, 3);
    assert.strictEqual(palette.defaultColor, '#ccc');
    assert.deepStrictEqual(palette.colors(), ['#82b4fb', '#faffc6', '#ffb0b5']);

    var entries = [];

    palette.forEach(function(color, value) {
      entries.push([value, color]);
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

  it('should work with a single value.', function() {
    var palette = Palette.generateFromValues('test', ['single']);

    assert.strictEqual(palette.get('test'), '#ccc');
  });

  it('should work with a default value.', function() {
    var palette = Palette.generateFromValues('test', ['one', 'two', 'three'], {defaultColor: '#000'});

    assert.strictEqual(palette.get('unknown'), '#000');
  });

  it('should be possible to create a palette from entries.', function() {
    var palette = Palette.fromEntries('test', [['one', 'red'], ['two', 'blue']]);

    assert.strictEqual(palette.size, 2);
    assert.strictEqual(palette.get('two'), 'blue');
    assert.strictEqual(palette.get('unknown'), '#ccc');
    assert.strictEqual(palette.defaultColor, '#ccc');
    assert.deepStrictEqual(palette.colors(), ['red', 'blue']);
  });

  it('should be possible to create a palette from a mapping.', function() {
    var palette = Palette.fromMapping('test', {one: 'red', two: 'blue'});

    assert.strictEqual(palette.size, 2);
    assert.strictEqual(palette.get('two'), 'blue');
    assert.strictEqual(palette.get('unknown'), '#ccc');
    assert.strictEqual(palette.defaultColor, '#ccc');
    assert.deepStrictEqual(palette.colors(), ['red', 'blue']);
  });
});
