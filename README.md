iWantHue
========

*[http://lab.medialab.sciences-po.fr/iwanthue/examples.php](iWantHue)* is a tool about mastering the properties of a palette by setting a range of Hue, Chroma (unbiased saturation) and Lightness. You can generate palettes of any size or just get the generator for a javascript project. The algorithm optimizes the perceptive distance in the color subspace, ensuring an optimal readability.

###How it works
1. **K-means** or **force vector repulsion** algorithms ensure an even distribution of colors
2. The **CIE Lab** color space is used for computation, since it fits human perception
3. The **Hue/Chroma/Lightness** color space is used to set constraints, since it is user-friendly

[http://lab.medialab.sciences-po.fr/iwanthue/examples.php](Examples) and a [http://lab.medialab.sciences-po.fr/iwanthue/tutorial.php](tutorial)

###Idea
The idea behind *iWantHue* is to distribute colors **evenly**, in a **perceptively coherent** space, 
constrained by **user-friendly** settings, to generate **high quality** custom palettes.

[http://lab.medialab.sciences-po.fr/iwanthue/theory.php](Explanations) and an [http://lab.medialab.sciences-po.fr/iwanthue/experiment..php](experiment) on color theory

###More info
* The tool itself is [http://lab.medialab.sciences-po.fr/iwanthue/examples.php](available online)
* Its source code is available on [https://github.com/medialab/iwanthue/](GitHub)
* If you have issues or requests, [https://github.com/medialab/iwanthue/issues](tell us about them)
* You will find more tools on [http://tools.medialab.sciences-po.fr/](Médialab Tools)