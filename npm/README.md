# iWantHue

**Colors for data scientists.** *Generate and refine palettes of optimally distinct colors.*

*[iWantHue](http://tools.medialab.sciences-po.fr/iwanthue/)* allows you to generate palettes of colors. It is about mastering the properties of a palette by setting a range of Hue, Chroma (unbiased saturation) and Lightness. You can generate palettes of any size or just get the generator for a javascript project. The algorithm optimizes the perceptive distance in the color subspace, ensuring an optimal readability.

## How it works
1. **K-means** or **force vector repulsion** algorithms ensure an even distribution of colors
2. The **CIE Lab** color space is used for computation, since it fits human perception
3. The **Hue/Chroma/Lightness** color space is used to set constraints, since it is user-friendly

[Examples](http://tools.medialab.sciences-po.fr/iwanthue/examples.php) and a [tutorial](http://tools.medialab.sciences-po.fr/iwanthue/tutorial.php)

## Idea
The idea behind *iWantHue* is to distribute colors **evenly**, in a **perceptively coherent** space,
constrained by **user-friendly** settings, to generate **high quality** custom palettes.

[Explanations](http://tools.medialab.sciences-po.fr/iwanthue/theory.php) and an [experiment](http://tools.medialab.sciences-po.fr/iwanthue/experiment.php) on color theory

## How to use it in your own code

You can install `iwanthue` for node.js and the browser using npm:

```
npm install iwanthue
```

### Usage

```js
var iwanthue = require('iwanthue');

// Generate a simple palette with 5 colors
var palette = iwanthue(5);

// With some options
var palette = iwanthue(5, {
  clustering: 'force-vector',
  seed: 'cool-palette',
  quality: 100
});
```

*Arguments*

* **count** *number*: number of colors in the generated palette.
* **settings** *?object*: Settings:
  * **colorFilter** *?function*: Function used to filter suitable colors. Takes a `[r, g, b]` color as sole argument.
  * **clustering** *?string* [`k-means`]: Clustering method to use. Can either be `k-means` or `force-vector`.
  * **quality** *?number* [`50`]: Quality of the clustering: iterations factor for `force-vector`, colorspace sampling for `k-means`.
  * **ultraPrecision** *?boolean* [`false`]: Ultra precision for `k-means` colorspace sampling?
  * **distance** *?string* [`euclidean`]: Distance function to use. Can be `euclidean`, `cmc`, `compromise` (colorblind), `protanope`, `deuteranope` or `tritanope`.
  * **sedd** *?string|number*: Random number generator seed. Useful to produce the same palette every time based on some data attribute.

### Precomputed palettes

If you don't want to load iwanthue's whole code into your client app or if you just want to prototype things quickly, the npm module also packs some precomputed palettes that you can import.

All of the presets export palettes ranging from `2` to `15` colors.

Here is how to import them:

```js
// Default palettes
var palettes = require('iwanthue/precomputed');

// Need a palette for 6 colors:
var sixColorsPalette = palettes[6];

// K-means palettes
var palettes = require('iwanthue/precomputed/k-means');

// Force vector palettes
var palettes = require('iwanthue/precomputed/force-vector');

// Colorblind alternatives
var palettes = require('iwanthue/precomputed/k-means-colorblind');
var palettes = require('iwanthue/precomputed/force-vector-colorblind');
```

## More info
* The tool itself is [available online](http://tools.medialab.sciences-po.fr/iwanthue/)
* Its source code is available on [GitHub](https://github.com/medialab/iwanthue/)
* If you have issues or requests, [tell us about them](https://github.com/medialab/iwanthue/issues)
* You will find more tools on [Médialab Tools](http://tools.medialab.sciences-po.fr/)
