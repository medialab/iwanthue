/**
 * Iwanthue Library Helpers
 * =========================
 *
 * Collection of color-related helpers used throughout the library.
 */
var LAB_CONSTANTS = {
  // Corresponds roughly to RGB brighter/darker
  Kn: 18,

  // D65 standard referent
  Xn: 0.95047,
  Yn: 1,
  Zn: 1.08883,

  t0: 0.137931034, // 4 / 29
  t1: 0.206896552, // 6 / 29
  t2: 0.12841855, // 3 * t1 * t1
  t3: 0.008856452 // t1 * t1 * t1
};

function xyzToRgb(r) {
  return Math.round(
    255 *
    (r <= 0.00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055)
  );
}

function labToXyz(t) {
  return t > LAB_CONSTANTS.t1 ?
    t * t * t :
    LAB_CONSTANTS.t2 * (t - LAB_CONSTANTS.t0);
}

function labToRgb(lab) {
  var l = lab[0];
  var a = lab[1];
  var b = lab[2];

  var y = (l + 16) / 116;
  var x = isNaN(a) ? y : y + a / 500;
  var z = isNaN(b) ? y : y - b / 200;

  y = LAB_CONSTANTS.Yn * labToXyz(y);
  x = LAB_CONSTANTS.Xn * labToXyz(x);
  z = LAB_CONSTANTS.Zn * labToXyz(z);

  var r = xyzToRgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z); // D65 -> sRGB
  var g = xyzToRgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z);
  b = xyzToRgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);

  // r, g or b can be -0, beware...
  return [r, g, b];
}

function validateRgb(rgb) {
  var r = rgb[0];
  var g = rgb[1];
  var b = rgb[2];

  return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
}

function hexPad(x) {
  return ('0' + x.toString(16)).slice(-2);
}

function labToRgbHex(lab) {
  var rgb = labToRgb(lab);

  return (
    '#' +
    hexPad(rgb[0]) +
    hexPad(rgb[1]) +
    hexPad(rgb[2])
  );
}

exports.validateRgb = validateRgb;
exports.labToRgb = labToRgb;
exports.labToRgbHex = labToRgbHex;
