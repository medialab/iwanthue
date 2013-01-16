iWantHue
========
**Colors for data scientists.** *Generate and refine palettes of optimally distinct colors.*

*[iWantHue](http://lab.medialab.sciences-po.fr/iwanthue/)* allows you to generate palettes of colors. It is about mastering the properties of a palette by setting a range of Hue, Chroma (unbiased saturation) and Lightness. You can generate palettes of any size or just get the generator for a javascript project. The algorithm optimizes the perceptive distance in the color subspace, ensuring an optimal readability.

###How it works
1. **K-means** or **force vector repulsion** algorithms ensure an even distribution of colors
2. The **CIE Lab** color space is used for computation, since it fits human perception
3. The **Hue/Chroma/Lightness** color space is used to set constraints, since it is user-friendly

[Examples](http://lab.medialab.sciences-po.fr/iwanthue/examples.php) and a [tutorial](http://lab.medialab.sciences-po.fr/iwanthue/tutorial.php)

###Idea
The idea behind *iWantHue* is to distribute colors **evenly**, in a **perceptively coherent** space, 
constrained by **user-friendly** settings, to generate **high quality** custom palettes.

[Explanations](http://lab.medialab.sciences-po.fr/iwanthue/theory.php) and an [experiment](http://lab.medialab.sciences-po.fr/iwanthue/experiment.php) on color theory

###More info
* The tool itself is [available online](http://lab.medialab.sciences-po.fr/iwanthue/)
* Its source code is available on [GitHub](https://github.com/medialab/iwanthue/)
* If you have issues or requests, [tell us about them](https://github.com/medialab/iwanthue/issues)
* You will find more tools on [Médialab Tools](http://tools.medialab.sciences-po.fr/)