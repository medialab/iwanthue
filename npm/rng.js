/**
 * Iwanthue RNG Utilities
 * =======================
 *
 * Simple & fast seedable RNG.
 *
 * [References]:
 * https://gist.github.com/blixt/f17b47c62508be59987b
 * http://www.firstpr.com.au/dsp/rand31/
 *
 */
function Random(seed) {
  this.seed = seed % 2147483647;

  if (this.seed <= 0)
    this.seed += 2147483646;
}

Random.prototype.next = function() {
  this.seed = (this.seed * 16807) % 2147483647;

  return this.seed;
};

Random.prototype.nextFloat = function() {
  return (this.next() - 1) / 2147483646;
};

module.exports = Random;
