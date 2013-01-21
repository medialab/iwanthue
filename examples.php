<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

<?php include('includes/codetop.php') ?>

        <style>
            body {
                padding-top: 60px;
                padding-bottom: 40px;
            }

            .node {
              border: solid 1px white;
              font: 9px sans-serif;
              line-height: 12px;
              overflow: hidden;
              position: absolute;
              text-indent: 2px;
              color: #333;
            }

            .arc path {
                stroke: #fff;
            }

            .dark .arc path{
                stroke: #000;
            }

            .intense .arc path{
                stroke: #FFF;
            }

            .dark{
                background-color: #000;
            }

            h3{
                margin-top: 80px;
            }

            .axis path,
            .axis line {
              fill: none;
              stroke: #666;
              shape-rendering: crispEdges;
            }

            .dot {
              stroke: #fff;
            }

        </style>
        
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
        <![endif]-->

<?php include('includes/header.php') ?>

        <div class="container">

            <!-- Main hero unit for a primary marketing message or call to action -->
            <div class="splash-unit row">
                <div class="span7">
                    <div class="image">
                        <a href="index.php"><img src="res/header.png"/></a>
                    </div>
                    <div class="title">
                        i want hue
                    </div>
                </div>
                <div class="span5">
                    <div class="abstract">
                        <p><strong>Colors for data scientists.</strong> Generate and refine palettes of optimally distinct colors.</p>
                    </div>
                </div>
            </div>
        </div>

        

        <div class="container">
            

            <div class="row">
                <div class="span12">
                    <h1>How it works</h1>
                </div>
            </div>
            
            
            <div class="row">
                <div class="span4">
                    <p>
                        <ol>
                            <li><strong>K-means</strong> or <strong>force vector repulsion</strong> algorithms ensure an even distribution of colors<br/><br/></li>
                            <li>The <strong>CIE L*a*b*</strong> color space is used for computation, since it fits human perception<br/><br/></li>
                            <li>The <strong>Hue/Chroma/Lightness*</strong> color space is used to set constraints, since it is user-friendly<br/><br/></li>
                        </ol>
                    </p>
                    <p>
                        <em><small>Example from Mike Bostock's <a href="http://bl.ocks.org/4063582" target="_blank">d3.js</a></small></em>
                    </p>
                </div>
                <div class="span4">
                    <div style="text-align: center" id="treemap_rand">
                        <!-- <img src="res/carto_rgbrand.png"/> -->
                    </div>
                    <br/>
                    <div class="alert alert-error">
                        <i class="icon-remove"></i> <em><strong>RGB random</strong> - Distracting colors, some colors are too similar, perceived lightness issues</em>
                    </div>
                    <button class='btn' onclick="traceRand()"><i class="icon-refresh"></i> Reroll random colors</button>
                </div>
                <div class="span4">
                    <div style="text-align: center" id="treemap_iwh">
                        <!-- <img src="res/carto_goodgen.png"/> -->
                    </div>
                    <br/>
                    <div class="alert alert-success">
                        <i class="icon-ok"></i> <em><strong>Custom palette</strong> - Coherent colors, optimally distinct, in the same range of perceived lightness</em>
                    </div>
                    <button class='btn' onclick="traceIWH()"><i class="icon-refresh"></i> Reroll Custom Palette</button>
                    <br/>
                    <br/>
                </div>
            </div>



            <div class="row">
                <div class="span12" style="">
                    <h1>Examples</h1>
                </div>
            </div>
            
            <div class="row">
                <div class="span12">
                    <h3 style="margin-top: 20px">Fancy colors</h3>
                </div>
            </div>
            <div class="row">
                <div class="span6">
                    <p>
                        Most of the time, we just want to achieve these simple goals:
                        <ul>
                            <li><strong>Distinct</strong> colors: always done by iWantHue</li>
                            <li><strong>Sober</strong>, discreet colors: a low chroma</li>
                            <li><strong>Coherent</strong> colors: a narrow Lightness range (depends on the background)</li>
                        </ul>
                        The <em>Fancy</em> preset aims at providing these qualities. It produces generic palettes up to 10 colors.
                        Since chroma and lightness have a narrow range, it does not handle much colors (up to 10).
                    </p>
                    <br/>
                </div>
                <div class="span6">
                    <h5>Color space</h5>
                    <div class="row">
                        <div class="span4" id="fancyLight_selectors"></div>
                        <div class="span2" id="fancyLight_pre"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="span6"><h5>Sample palette</h5><div id="fancyLight_palette"></div></div>
                <div class="span6"><h5>Example</h5><div id="fancyLight_chart"></div></div>
            </div>


            <div class="row">
                <div class="span12">
                    <h3>Fancy, dark background</h3>
                </div>
            </div>
            <div class="row">
                <div class="span6">
                    <p>
                        On a dark background, we have to set a different range for the Lightness. However, we keep the principle of narrow ranges for Chroma and Lightness.
                    </p>
                    <p>
                        In order to achieve consistency in the colors, you have to select a lightness range that is lightly contrasted with the background.
                        It has to be contrasted, since you want the content to be read. But you want keep this contrast quite close to the background to avoid agressive colors.
                    </p>
                    <br/>
                </div>
                <div class="span6">
                    <h5>Color space</h5>
                    <div class="row">
                        <div class="span4" id="fancyDark_selectors"></div>
                        <div class="span2" id="fancyDark_pre"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="span6"><h5>Sample palette</h5><div id="fancyDark_palette"></div></div>
                <div class="span6"><h5>Example</h5><div id="fancyDark_chart" class="dark"></div></div>
            </div>


            <div class="row">
                <div class="span12">
                    <h3>Tarnish</h3>
                </div>
            </div>
            <div class="row">
                <div class="span6">
                    <p>
                        This preset produces colored greys. You can achieve this with a very low maximum chroma.
                        It is useful when you want to avoid the distracting effect of saturated colors.
                    </p>
                    <p>
                        <strong>The more you restrain color space, the fewer the number of distinct colors you can obtain.</strong>
                        Since the chroma range is very narrow, we need a wider lightness range.
                        All the colors are close to grey, so we need to differentiate them with the lightness.
                    </p>
                    <br/>
                </div>
                <div class="span6">
                    <h5>Color space</h5>
                    <div class="row">
                        <div class="span4" id="tarnish_selectors"></div>
                        <div class="span2" id="tarnish_pre"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="span6"><h5>Sample palette</h5><div id="tarnish_palette"></div></div>
                <div class="span6"><h5>Example</h5><div id="tarnish_chart" style="background-color:#DDD;"></div></div>
            </div>


            <div class="row">
                <div class="span12">
                    <h3>Pimp</h3>
                </div>
            </div>
            <div class="row">
                <div class="span6">
                    <p>
                       In this example we maximized the impact of the colors by increasing the chroma.
                       The resulting colors are particularly intense.
                       Since we allowed a large range of chroma and lightness, we can produce more distinct colors.
                    </p>
                    <p>
                       You may have observed that we have several blue-purple colors while we have few greens and no yellow.
                       This is due to the way we perceived colors. The yellow for example is not allowed by our maximum lightness.
                    </p>
                    <br/>
                </div>
                <div class="span6">
                    <h5>Color space</h5>
                    <div class="row">
                        <div class="span4" id="pimp_selectors"></div>
                        <div class="span2" id="pimp_pre"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="span6"><h5>Sample palette</h5><div id="pimp_palette"></div></div>
                <div class="span6"><h5>Example</h5><div id="pimp_chart" class="intense" style="background-color:#DDD2CC;"></div></div>
            </div>


            <div class="row">
                <div class="span12">
                    <h3>Pimp, but lighter</h3>
                </div>
            </div>
            <div class="row">
                <div class="span6">
                    <p>
                       This example uses the same range of chroma, but a much lighter range of lightness.
                       Now we have more yellow and green, less purple and no red.
                       It is still a side effect of using the CIE Lab color space.
                    </p>
                    <br/>
                </div>
                <div class="span6">
                    <h5>Color space</h5>
                    <div class="row">
                        <div class="span4" id="pimpLighter_selectors"></div>
                        <div class="span2" id="pimpLighter_pre"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="span6"><h5>Sample palette</h5><div id="pimpLighter_palette"></div></div>
                <div class="span6"><h5>Example</h5><div id="pimpLighter_chart" style="background-color:#FFF5CC;"></div></div>
            </div>



            <div class="row">
                <div class="span12">
                    <h3>Variations on a given color</h3>
                </div>
            </div>
            <div class="row">
                <div class="span6">
                    <p>
                       <strong>A narrow hue range produces variations of a color.</strong>
                       If we select only green hues, the generated palette will be composed of distinct greens.
                       In order to have enough variations, we need a wider range for lightness and chroma.
                       However, we want to avoid low chromas because they produce greys.
                       We also want to avoid dark and light colors in order to get more homogeneity.
                    </p>
                    <br/>
                </div>
                <div class="span6">
                    <h5>Color space</h5>
                    <div class="row">
                        <div class="span4" id="green_selectors"></div>
                        <div class="span2" id="green_pre"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="span6"><h5>Sample palette</h5><div id="green_palette"></div></div>
                <div class="span6"><h5>Example</h5><div id="green_chart"></div></div>
            </div>


            
            <div class="row">
                <div class="span12">
                    <h3>Large palettes</h3>
                </div>
            </div>
            <div class="row">
                <div class="span6">
                    <p>
                       We can build quite large palettes as long as we have enough 'room' in the color space.
                       Here we just avoided dark colors since we have a white background and black text, and we avoided high chromas in order to keep homogeneity.
                       High chromas do not contain much color space, so we did not restrain too much the palette.
                    </p>
                    <br/>
                </div>
                <div class="span6">
                    <h5>Color space</h5>
                    <div class="row">
                        <div class="span4" id="large_selectors"></div>
                        <div class="span2" id="large_pre"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="span6"><h5>Sample palette</h5><div id="large_palette"></div></div>
                <div class="span6"><h5>Example</h5><div id="large_chart"></div></div>
            </div>
            <div class="row">
                <div class="span12"><h5>Another example</h5><div id="large_plot" style="height: 500px"></div></div>
            </div>



            
            <div class="row">
                <div class="span12">
                    <h3>Scandalously large palettes</h3>
                </div>
            </div>
            <div class="row">
                <div class="span6">
                    <p>
                       If the number of colors is too high for the size of the color space, there will be similar colors in the palette.
                       However, the colors are always sorted so that the first are the most distinct possible.
                    </p>
                    <p>
                        <strong>If you produce too many colors, you will still be able to use the first colors</strong>, since they will be distinct.
                    </p>
                    <p>
                        <em>In such extreme cases, it is necessary to choose the "hard (Force vector)" setting.</em>
                        This algorithm is able to generate colors even if there is very few color space, when the "soft (k-Means)" will fail.
                    </p>
                    <br/>
                </div>
                <div class="span6">
                    <h5>Color space</h5>
                    <div class="row">
                        <div class="span4" id="fiftyShades_selectors"></div>
                        <div class="span2" id="fiftyShades_pre"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="span6"><h5>Sample palette</h5><div id="fiftyShades_palette"></div></div>
                <div class="span6">
                    <h5>Example</h5>
                    <div id="fiftyShades_chart"></div>
                    <h5>Another example</h5>
                    <img src="res/50shades.png"/>
                </div>
            </div>


        </div>
    </div>

<?php include('includes/codebottom.php'); ?>

        <script src="js/libs/d3.v3.min.js"></script>

        <script src="js/background.js"></script>
        <script src="js/colorspace.js"></script>
        <script src="js/presets.js"></script>
        <script src="js/selectors.js"></script>
        <script src="js/fitting.js"></script>
        <script src="js/palettegeneration.js"></script>
        <script src="js/examples.js"></script>

        <script src="js/sandbox.js"></script>

        <script>



var margin = {top: 20, right: 0, bottom: 0, left: 0},
    width = $("#treemap_rand").width() - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(true)
    .value(function(d) { return d.size; })

function traceRand(){
    $("#treemap_rand").html('')

    var divRand = d3.select("#treemap_rand").append("div")
        .style("position", "relative")
        .style("width", (width + margin.left + margin.right) + "px")
        .style("height", (height + margin.top + margin.bottom) + "px")
        .style("left", margin.left + "px")
        .style("top", margin.top + "px")

    var colorRand = d3.scale.ordinal().range(d3.range(0,20).map(function(i){return chroma.rgb(255*Math.random(),255*Math.random(),255*Math.random()).hex()}));

    d3.json("res/flare.json", function(error, root) {
      var node = divRand.datum(root).selectAll(".node")
          .data(treemap.nodes)
        .enter().append("div")
          .attr("class", "node")
          .call(position)
          .style("background", function(d, i) { return d.children ? colorRand(d.name) : null })
          .text(function(d) { return d.children ? null : d.name })

      d3.selectAll("input").on("change", function change() {
        var value = this.value === "count"
            ? function() { return 1 }
            : function(d) { return d.size }

        node
            .data(treemap.value(value).nodes)
          .transition()
            .duration(1500)
            .call(position)
      })
    })
}

traceRand()

function traceIWH(){
    $('#treemap_iwh').html('')
    var divIWH = d3.select("#treemap_iwh").append("div")
        .style("position", "relative")
        .style("width", (width + margin.left + margin.right) + "px")
        .style("height", (height + margin.top + margin.bottom) + "px")
        .style("left", margin.left + "px")
        .style("top", margin.top + "px")

    var colorIWH = d3.scale.ordinal().range(paletteGenerator.generate(
      20, // Colors
      function(color){ // This function filters valid colors
        var hcl = color.hcl();
        return hcl[0]>=0 && hcl[0]<=360
          && hcl[1]>=0 && hcl[1]<=0.8
          && hcl[2]>=1.0 && hcl[2]<=1.8;
      },
      false, // Using Force Vector instead of k-Means
      50 // Steps (quality)
    ).map(function(color){return color.hex()}));

    d3.json("res/flare.json", function(error, root) {
      var node = divIWH.datum(root).selectAll(".node")
          .data(treemap.nodes)
        .enter().append("div")
          .attr("class", "node")
          .call(position)
          .style("background", function(d, i) { return d.children ? colorIWH(d.name) : null })
          .text(function(d) { return d.children ? null : d.name })

      d3.selectAll("input").on("change", function change() {
        var value = this.value === "count"
            ? function() { return 1 }
            : function(d) { return d.size }

        node
            .data(treemap.value(value).nodes)
          .transition()
            .duration(1500)
            .call(position)
      })
    })
}

traceIWH()

function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}



var fancyLight = {
    colorsCount: 5
    ,hmin: 0
    ,hmax: 360
    ,cmin: 0
    ,cmax: 0.9
    ,lmin: 1
    ,lmax: 1.5
    ,colors: [
        chroma.hex('#D2D1B1')
        ,chroma.hex('#C3CBE1')
        ,chroma.hex('#D4D17F')
        ,chroma.hex('#EAAFA3')
        ,chroma.hex('#9BDEBD')
    ]
}
makeSelectors('fancyLight_selectors', fancyLight)
makePre('fancyLight_pre', fancyLight)
function update_fancyLight(){
    makePalette('fancyLight_palette', fancyLight)
    $('#fancyLight_palette').append(
        $('<button class="btn"><i class="icon-refresh"></i> Reroll colors</button>')
            .click(function(){
                computeColors(fancyLight)
                update_fancyLight()
            })
    )
    makeDoughnut('fancyLight_chart', fancyLight.colors, 190, 3, {})
}
update_fancyLight()


var fancyDark = {
    colorsCount: 5
    ,hmin: 0
    ,hmax: 360
    ,cmin: 0.2
    ,cmax: 1.2
    ,lmin: 0.1
    ,lmax: 0.6
    ,colors: [
        chroma.hex('#6A4E2C')
        ,chroma.hex('#585163')
        ,chroma.hex('#325952')
        ,chroma.hex('#7A4749')
        ,chroma.hex('#4B5D32')
    ]
}
makeSelectors('fancyDark_selectors', fancyDark)
makePre('fancyDark_pre', fancyDark)
function update_fancyDark(){
    makePalette('fancyDark_palette', fancyDark)
    $('#fancyDark_palette').append(
        $('<button class="btn"><i class="icon-refresh"></i> Reroll colors</button>')
            .click(function(){
                computeColors(fancyDark)
                update_fancyDark()
            })
    )
    makeDoughnut('fancyDark_chart', fancyDark.colors, 190, 3, {textColor:'#EEEEEE'})
}
update_fancyDark()


var tarnish = {
    colorsCount: 5
    ,hmin: 0
    ,hmax: 360
    ,cmin: 0
    ,cmax: 0.4
    ,lmin: 0.4
    ,lmax: 1.1
    ,colors: [
        chroma.hex('#949C8D')
        ,chroma.hex('#6E6557')
        ,chroma.hex('#B8917A')
        ,chroma.hex('#A69E77')
        ,chroma.hex('#B9A29A')
    ]
}
makeSelectors('tarnish_selectors', tarnish)
makePre('tarnish_pre', tarnish)
function update_tarnish(){
    makePalette('tarnish_palette', tarnish)
    $('#tarnish_palette').append(
        $('<button class="btn"><i class="icon-refresh"></i> Reroll colors</button>')
            .click(function(){
                computeColors(tarnish)
                update_tarnish()
            })
    )
    makeDoughnut('tarnish_chart', tarnish.colors, 190, 3, {})
}
update_tarnish()




var pimp = {
    colorsCount: 8
    ,hmin: 0
    ,hmax: 360
    ,cmin: 0.9
    ,cmax: 3
    ,lmin: 0.4
    ,lmax: 1
    ,colors: [
        chroma.hex('#8568D5')
        ,chroma.hex('#678F39')
        ,chroma.hex('#C84961')
        ,chroma.hex('#3C92A8')
        ,chroma.hex('#C4602E')
        ,chroma.hex('#BD5296')
        ,chroma.hex('#D24ED2')
        ,chroma.hex('#7372AF')
    ]
}
makeSelectors('pimp_selectors', pimp)
makePre('pimp_pre', pimp)
function update_pimp(){
    makePalette('pimp_palette', pimp)
    $('#pimp_palette').append(
        $('<button class="btn"><i class="icon-refresh"></i> Reroll colors</button>')
            .click(function(){
                computeColors(pimp)
                update_pimp()
            })
    )
    makeDoughnut('pimp_chart', pimp.colors, 190, 3, {textColor:'#EEEEEE'})
}
update_pimp()



var pimpLighter = {
    colorsCount: 5
    ,hmin: 0
    ,hmax: 360
    ,cmin: 0.9
    ,cmax: 3
    ,lmin: 1
    ,lmax: 1.5
    ,colors: [
        chroma.hex('#CADA45')
        ,chroma.hex('#D4A2E1')
        ,chroma.hex('#55E0C6')
        ,chroma.hex('#F0B13C')
        ,chroma.hex('#75E160')
    ]
}
makeSelectors('pimpLighter_selectors', pimpLighter)
makePre('pimpLighter_pre', pimpLighter)
function update_pimpLighter(){
    makePalette('pimpLighter_palette', pimpLighter)
    $('#pimpLighter_palette').append(
        $('<button class="btn"><i class="icon-refresh"></i> Reroll colors</button>')
            .click(function(){
                computeColors(pimpLighter)
                update_pimpLighter()
            })
    )
    makeDoughnut('pimpLighter_chart', pimpLighter.colors, 190, 3, {textColor:'#755'})
}
update_pimpLighter()


var green = {
    colorsCount: 5
    ,hmin: 90
    ,hmax: 150
    ,cmin: 0.5
    ,cmax: 3
    ,lmin: 0.7
    ,lmax: 1.3
}
function update_green(){
    green.hmin = Math.round(360 + 360*Math.random())%360
    green.hmax = Math.round(60 + green.hmin)%360
    makeSelectors('green_selectors', green)
    makePre('green_pre', green)
    computeColors(green)
    makePalette('green_palette', green)
    $('#green_palette').append(
        $('<button class="btn"><i class="icon-refresh"></i> Reroll colors</button>')
            .click(update_green)
    )
    var bgColor = chroma.hcl((green.hmin<green.hmax)?((green.hmin+green.hmax)/2):(((360+green.hmin+green.hmax)/2)%360), 0.3, 1.2)
    $('#green_chart').css('background-color', bgColor.hex())
    makeDoughnut('green_chart', green.colors, 190, 3, {textColor:'#000'})
}
update_green()



var large = {
    colorsCount: 15
    ,hmin: 0
    ,hmax: 360
    ,cmin: 0
    ,cmax: 1.8
    ,lmin: 0.5
    ,lmax: 1.5
    ,colors: [
        chroma.hex('#99D78B')
        ,chroma.hex('#C089D0')
        ,chroma.hex('#CB6E34')
        ,chroma.hex('#D4C6BD')
        ,chroma.hex('#CED745')
        ,chroma.hex('#7BA5D6')
        ,chroma.hex('#A37B5D')
        ,chroma.hex('#79D8C5')
        ,chroma.hex('#5E8C6D')
        ,chroma.hex('#78D853')
        ,chroma.hex('#CDA64B')
        ,chroma.hex('#D06465')
        ,chroma.hex('#698838')
        ,chroma.hex('#BF6B92')
        ,chroma.hex('#6C7B8D')
    ]
}
makeSelectors('large_selectors', large)
makePre('large_pre', large)
function update_large(){
    makePalette('large_palette', large)
    $('#large_palette').append(
        $('<button class="btn"><i class="icon-refresh"></i> Reroll colors</button>')
            .click(function(){
                computeColors(large)
                update_large()
            })
    )
    makeDoughnut('large_chart', large.colors, 285, 2, {doughnutWidth:60})

    // Large scatterplot
    ;(function(colors){
        $("#large_plot").html('')
        var margin = {top: 20, right: 20, bottom: 30, left: 40}
            ,width = $("#large_plot").width() - margin.left - margin.right
            ,height = 500 - margin.top - margin.bottom

        var x = d3.scale.linear()
            .range([0, width])

        var y = d3.scale.linear()
            .range([height, 0])

        // var color = d3.scale.category10()
        var color = d3.scale.ordinal()
            .range(colors.map(function(color){return color.hex()}))

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")

        var svg = d3.select("#large_plot").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        var data = []
        // Build data
        colors.forEach(function(color, cat){
            // Let's build a class.
            var targetX = 60 + 50 * Math.random()
                ,targetY = 160 + 30 * Math.random()
                ,population = 1.5 * (5 + 30 * Math.random())
                ,xVar = 0.8 * (5 + Math.random()*10)
                ,yVar = 0.8 * (10 + Math.random()*20)

            var tweakRandomness = function(random){
                var centered = 2 * (random - 0.5)
                    ,sign = Math.abs(centered)/centered
                return sign * Math.abs(centered * centered * centered)
            }

            for(i=0; i<population; i++){
               data.push({
                    cat: cat
                    ,X: 0.5 * Math.round( 2 * (targetX + xVar * tweakRandomness( Math.random() ) ) )
                    ,Y: Math.round(targetY + yVar * tweakRandomness(Math.random()))
                })
            }
        })


        x.domain(d3.extent(data, function(d) { return d.X; })).nice()
        y.domain(d3.extent(data, function(d) { return d.Y; })).nice()

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
        .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text("Weight (kg)")

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
        .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Height (cm)")

        svg.selectAll(".dot")
            .data(data)
        .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 4)
            .attr("cx", function(d) { return x(d.X) })
            .attr("cy", function(d) { return y(d.Y) })
            .style("fill", function(d) { return color(d.cat) })

        var legend = svg.selectAll(".legend")
            .data(color.domain())
        .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")" })

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color)

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d })

    })(large.colors)
}
update_large()






var fiftyShades = {
    colorsCount: 50
    ,hmin: 0
    ,hmax: 360
    ,cmin: 0
    ,cmax: 0.1
    ,lmin: 0
    ,lmax: 1.5
    ,useFV: true
    ,colors:[
        chroma.hex('#5C5547')
        ,chroma.hex('#FFEED9')
        ,chroma.hex('#B49E86')
        ,chroma.hex('#D2C8AB')
        ,chroma.hex('#887A6F')
        ,chroma.hex('#3F3830')
        ,chroma.hex('#F7E2BE')
        ,chroma.hex('#BEAD9E')
        ,chroma.hex('#E6D1BE')
        ,chroma.hex('#999078')
        ,chroma.hex('#7A715D')
        ,chroma.hex('#75695F')
        ,chroma.hex('#C2BBA7')
        ,chroma.hex('#E4CCAE')
        ,chroma.hex('#E5DBC3')
        ,chroma.hex('#96887B')
        ,chroma.hex('#CAB7A0')
        ,chroma.hex('#B19F8F')
        ,chroma.hex('#52493F')
        ,chroma.hex('#BEAC91')
        ,chroma.hex('#FCE8CC')
        ,chroma.hex('#F0E6D0')
        ,chroma.hex('#8E8472')
        ,chroma.hex('#9B8A77')
        ,chroma.hex('#DDC7B3')
        ,chroma.hex('#AA9C86')
        ,chroma.hex('#837766')
        ,chroma.hex('#D1C1A9')
        ,chroma.hex('#DAD2B4')
        ,chroma.hex('#7D6F61')
        ,chroma.hex('#8B8276')
        ,chroma.hex('#DED2BA')
        ,chroma.hex('#ECDAB7')
        ,chroma.hex('#A3967E')
        ,chroma.hex('#625C4D')
        ,chroma.hex('#AD9888')
        ,chroma.hex('#554F45')
        ,chroma.hex('#E8D4B5')
        ,chroma.hex('#C2AD96')
        ,chroma.hex('#B6A797')
        ,chroma.hex('#8A7E6D')
        ,chroma.hex('#C2B29C')
        ,chroma.hex('#B4A288')
        ,chroma.hex('#837864')
        ,chroma.hex('#AF9E86')
        ,chroma.hex('#F8E5C7')
        ,chroma.hex('#B1A193')
        ,chroma.hex('#978776')
        ,chroma.hex('#E2CCB0')
        ,chroma.hex('#D2C0A8')
    ]
    //,ultra_precision: true
}
makeSelectors('fiftyShades_selectors', fiftyShades)
makePre('fiftyShades_pre', fiftyShades)
function update_fiftyShades(){
    makePalette('fiftyShades_palette', fiftyShades)
    $('#fiftyShades_palette').append(
        $('<button class="btn"><i class="icon-refresh"></i> Reroll colors</button>')
            .click(function(){
                computeColors(fiftyShades)
                update_fiftyShades()
            })
    )
    makeDoughnut('fiftyShades_chart', fiftyShades.colors, 570, 1, {doughnutWidth:80})
}
update_fiftyShades()

        </script>
    </body>
</html>
