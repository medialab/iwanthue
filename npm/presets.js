/**
 * Iwanthue Color Presets
 * =======================
 *
 * Website collection presets.
 */

// Format is [hmin, hmax, cmin, cmax, lmin, lmax] to save up some space
var presets = {
  'all': [0, 360, 0, 100, 0, 100],
  'default': [0, 360, 30, 80, 35, 80],
  'colorblind': [0, 360, 40, 70, 15, 85],
  'fancy-light': [0, 360, 15, 40, 70, 100],
  'fancy-dark': [0, 360, 8, 40, 7, 40],
  'shades': [0, 240, 0, 15, 0, 100],
  'tarnish': [0, 360, 0, 15, 30, 70],
  'pastel': [0, 360, 0, 30, 70, 100],
  'pimp': [0, 360, 30, 100, 25, 70],
  'intense': [0, 360, 20, 100, 15, 80],
  'fluo': [0, 300, 35, 100, 75, 100],
  'red-roses': [330, 20, 10, 100, 35, 100],
  'ochre-sand': [20, 60, 20, 50, 35, 100],
  'yellow-lime': [60, 90, 10, 100, 35, 100],
  'green-mint': [90, 150, 10, 100, 35, 100],
  'ice-cube': [150, 200, 0, 100, 35, 100],
  'blue-ocean': [220, 260, 8, 80, 0, 50],
  'indigo-night': [260, 290, 40, 100, 35, 100],
  'purple-wine': [290, 330, 0, 100, 0, 40]
};

module.exports = presets;
