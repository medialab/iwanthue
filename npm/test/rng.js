var assert = require('assert');
var range = require('lodash/range');
var Random = require('../rng.js');

var RANDOM_INTS = [
  2067261,
  384717275,
  2017463455,
  888985702,
  1138961335,
  2001411634,
  1688969677,
  1074515293,
  1188541828,
  2077102449
];

var RANDOM_FLOATS = [
  0.1707555308665666,
  0.8882137643063569,
  0.2087375714524999,
  0.2523695945296153,
  0.5757811102790582,
  0.1531237798306381,
  0.5513742412918938,
  0.9468769039463968,
  0.16012504246097528,
  0.22159521442055258
];

describe('rng', function() {
  it('should be deterministic when seeded.', function() {
    var rng = new Random(123);

    assert.deepEqual(range(10).map(() => rng.next()), RANDOM_INTS);
    assert.deepEqual(range(10).map(() => rng.nextFloat()), RANDOM_FLOATS);
  });
});
