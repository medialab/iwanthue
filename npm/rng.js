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
function randomInteger(a, b) {
  return a + Math.floor(Math.random() * (b - a + 1));
}

function Random(seed) {
  if (!seed)
    seed = randomInteger(0, Math.pow(2, 31) - 1);

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
