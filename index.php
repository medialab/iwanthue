<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>iWantHue</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

<?php include('includes/codetop.php') ?>

        <style>
            body {
                padding-top: 60px;
                padding-bottom: 40px;
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

        
        <div  id="workbench">
            <div class="container">
                <div class="row">
                    <div class="span9 spacetitle">
                        <h3>Color space</h3>
                    </div>
                    <div class="span3 spacetitle">
                        <h3>Palette</h3>
                    </div>
                </div>
                <div class="row unselectable">
                    <div class="span4">
                        <select id="presets" onchange="updateSettings()"><option>Presets...</option></select>
                        <table id="selectorsTable" style="width: 100%;">
                            <tr>
                                <td>
                                    <div class="input-append input-prepend"><span title="Hue" class="add-on">H</span><input id="hmin" type="text" value="0" style="width:30px;"/></div>
                                </td>
                                <td style="width: 100%;"><div id="hueSelector"></div></td>
                                <td>
                                    <div class="input-prepend"><input id="hmax" type="text" value="360" style="width:30px;"/></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="input-append input-prepend"><span title="Chroma (from gray to colorfull)" class="add-on">C</span><input id="cmin" type="text" value="0" style="width:30px;"/></div>
                                </td>
                                <td><div id="chromaSelector"></div></td>
                                <td>
                                    <div class="input-prepend"><input id="cmax" type="text" value="10" style="width:30px;"/></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="input-append input-prepend"><span title="Lightness" class="add-on">L</span><input id="lmin" type="text" value="0" style="width:30px;"/></div>
                                </td>
                                <td><div id="lightnessSelector"></div></td>
                                <td>
                                    <div class="input-prepend"><input id="lmax" type="text" value="10" style="width:30px;"/></div>
                                </td>
                            </tr>
                        </table>
                        <br/>
                        <label class="checkbox">
                            <input type="checkbox" id="darkBackground"/> Dark background
                        </label>
                    </div>
                    <div class="span5">
                        <div id="carto">...</div>
                    </div>
                    <div class="span3">

                       <div class="row">
                            <div class="input-append span1">
                                <input id="colorsCount" type="text" value="5" style="width:20px;"/>
                                <span class="add-on">colors</span>
                            </div>
                            <div class="span2">
                                <select id="algo" class="span2">
                                    <option value="kmeans" selected=true>soft (k-Means)</option>
                                    <option value="forcevector" >hard (Force vector)</option>
                                </select>
                            </div>
                        </div>

                        <button class="btn" id="reduceToPalette" style="width: 100%" onclick="reduceToPalette();"><i class="icon-hand-right"></i> Make a palette</button>
                        
                        <div id="palette_visual">
                        </div>

                        <div class="unselectable">
                            <div id="refine" style="/*display:none;*/">
                            </div>                  
                        </div>                  
                    </div>
                </div>
            </div>
        </div>
        <div class="container" style="display: none" id="resultColors_container">
            <div class="row">
                <div class="span6">
                    <h3>Colors</h3>
                    <div id="resultColors">
                        <span class="muted">You must make a palette</span>
                    </div>
                </div>
                <div class="span6">
                    <div class="row">
                        <div class="span3">
                            <h3>JSON</h3>
                            <h5>HEX json</h5>
                            <div id="resultColors_hexjson">
                                <span class="muted">You must make a palette</span>
                            </div>
                            <h5>RGB json</h5>
                            <div id="resultColors_rgbjson">
                                <span class="muted">You must make a palette</span>
                            </div>
                            <h5>HCL json</h5>
                            <div id="resultColors_hcljson">
                                <span class="muted">You must make a palette</span>
                            </div>
                            <h5>LAB json</h5>
                            <div id="resultColors_labjson">
                                <span class="muted">You must make a palette</span>
                            </div>
                        </div>
                        <div class="span3">
                            <h3>CSS</h3>
                            <h5>HEX list for CSS</h5>
                            <div id="resultColors_hexlist">
                                <span class="muted">You must make a palette</span>
                            </div>
                            <h5>RGB list for CSS</h5>
                            <div id="resultColors_rgblist">
                                <span class="muted">You must make a palette</span>
                            </div>
                        </div>
                    </div>

                    <h3>Javascript</h3>
                    <h5>Generate a palette with these settings</h5>
                    <div id="resultColors_jsGeneration">
                        <span class="muted">You must make a palette</span>
                    </div>
                </div>
            </div>
        </div>

        
<?php include('includes/footer.php') ?>


        <!-- Color Picker Modal -->
        <div id="colorPicker_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h3 id="myModalLabel">Color picker</h3>
            </div>
            <div class="modal-body">
                <table>
                    <tr>
                        <td>
                            <div id="colorpicker_abContainer" class="unselectable"></div>
                        </td>
                        <td>
                            <table>
                                <tr><td style="padding-left: 20px">
                                    <table>
                                        <tr>
                                            <td>
                                                <div class="input-append input-prepend"><span title="Hue" class="add-on">H</span><input id="colorpicker_hInput" type="text" value="0" style="width:36px;"/></div>
                                            </td>
                                            <td>
                                                <div id="colorpicker_hContainer" class="unselectable"></div>
                                            </td>
                                        </tr><tr>
                                            <td>
                                                <div class="input-append input-prepend"><span title="Chroma (from gray to colorfull)" class="add-on">C</span><input id="colorpicker_cInput" type="text" value="0" style="width:36px;"/></div>
                                            </td>
                                            <td>
                                                <div id="colorpicker_cContainer" class="unselectable"></div>
                                            </td>
                                        </tr><tr>
                                            <td>
                                                <div class="input-append input-prepend"><span title="Lightness" class="add-on">L</span><input id="colorpicker_lInput" type="text" value="0" style="width:36px;"/></div>
                                            </td>
                                            <td>
                                                <div id="colorpicker_lContainer" class="unselectable"></div>
                                            </td>
                                        </tr><tr>
                                    </table>
                                </td></tr><tr><td>
                                    <table>
                                        <tr>
                                            <td><div class="input-append input-prepend"><input id="colorpicker_aInput" type="text" value="0" style="width:36px;"/><span title="a* color axis, from Red to Green" class="add-on">A</span></div></td>
                                            <td><div class="input-append input-prepend"><input id="colorpicker_bInput" type="text" value="0" style="width:36px;"/><span title="b* color axis, from Blue to Yellow" class="add-on">B</span></div></td>
                                        </tr>
                                    </table>
                                </td></tr>
                            </table>
                        </td>
                        <td>
                            <table>
                                <tr><td>
                                    <div id="colorpicker_renderContainer"></div>
                                </td></tr><tr><td>
                                    <div style="height: 38px" class="pull-right">
                                        <div class="input-prepend"><span class="add-on">Hex</span><input id="colorpicker_hexInput" type="text" value="#" style="width:60px;"/></div>
                                    </div>
                                </td></tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
                <button class="btn btn-primary" id="colorPicker_pickButton">Pick color</button>
            </div>
        </div>
<?php include('includes/codebottom.php'); ?>

        <script src="js/libs/prettify.js"></script>

        <script src="js/libs/FileSaver.js"></script>

        <script src="js/libs/sigma.min.js"></script>
        <script src="js/libs/sigma.layout.forceatlas2.min.js"></script>

        <script src="js/background.js"></script>
        <script src="js/colorspace.js"></script>
        <script src="js/presets.js"></script>
        <script src="js/selectors.js"></script>
        <script src="js/fitting.js"></script>
        <script src="js/palettegeneration.js"></script>
        <script src="js/colorpicker.js"></script>

        <script src="js/sandbox.js"></script>

        <script>

$(document).ready(function(){
    // Init selectors fields
    $('#hmin').val(0);
    $('#hmax').val(360);
    $('#cmin').val(0);
    $('#cmax').val(3);
    $('#lmin').val(0);
    $('#lmax').val(1.5);
    $('#colorsCount').val(5);

    initSelectors()
    colorpicker.init()
    updateColorSpace()
    initVisualPalette()
    initPresets(1)
});

// Init the color samples once for all
console.log("Initializing color sampling...")
var colorSamples = []
var lstep = 0.03
var astep = 0.08
var bstep = 0.08
for(l=0; l<=1; l+=lstep){
    for(a=-1; a<=1; a+=astep){
        for(b=-1; b<=1; b+=bstep){
            var color = chroma.lab(l, a, b)
            // Test if the color exists in the RGB color space (there are holes in the CIE Labs space)
            if(!isNaN(color.rgb[0]) && color.rgb[0]>=0 && color.rgb[1]>=0 && color.rgb[2]>=0 && color.rgb[0]<256 && color.rgb[1]<256 && color.rgb[2]<256){
                colorSamples.push({color:color, hex:color.hex(), lab:color.lab(), hcl:color.hcl()})
            }
        }
    }
}
console.log("...done")

/// PALETTE GENERATION
$('#colorsCount').change(function(){
    initVisualPalette()
})

/// COLOR SPACE
$('#hmin, #hmax, #cmin, #cmax, #lmin, #lmax').change(function(){
    var width = $("#hueSelector").width();
    
    selectorsState.hue.min = parseFloat($('#hmin').val())/360;
    selectorsState.hue.max = parseFloat($('#hmax').val())/360;
    selectorsState.chroma.min = parseFloat($('#cmin').val())/maxChroma;
    selectorsState.chroma.max = parseFloat($('#cmax').val())/maxChroma;
    selectorsState.lightness.min = parseFloat($('#lmin').val())/maxLightness;
    selectorsState.lightness.max = parseFloat($('#lmax').val())/maxLightness;
    updateSelectors();
    updateColorSpace();
})

// Colors network
var s;
var forceStopTimers = [];
var initSigma = function(){
    // Clean old sigma instances if needed
    for(sid in sigma.instances()){
        var sInstance = sigma.instances()[sid]
        sInstance.stopForceAtlas2()
        sInstance.graph.clear()
        sInstance.kill()
    }
    $('#carto').empty()
    forceStopTimers.forEach(function(t){
        clearTimeout(t)
    })

    // INIT SIGMA
    s = new sigma({
      container: 'carto'
      ,settings: {
        // Labels:
        font: "'Arial', sans-serif;",
        defaultLabelColor: '#333',
        defaultLabelSize: 16,
        defaultLabelBGColor: '#fff',
        defaultLabelHoverColor: '#000',
        labelThreshold: 100,
        
        // Edges
        defaultEdgeType: 'line',
        drawEdges: false,

        maxNodeSize: 8,

        mouseEnabled: false,
        blockScroll: true,
        minRatio: 1,
        maxRatio: 1
      }
    });
    
    // Mouse actions
    s.bind('overnodes',function(e){
        // Cursor: pointer for hovered nodes
        $('#carto').addClass("nodehovered");    // Actually, the whole canvas has the property
    });
    s.bind('outnodes',function(e){
        // Remove the pointer cursor on node out
        $('#carto').removeClass("nodehovered");
    });
}

// Init network viz (sigma)
initSigma();

// Dynamic resize update
window.onresize = function(){
    resizeWidget();
}

// Resize graph
var resizeWidget = function(){
    // s.refresh();
    s.render();
    updateSelectors();
}

// Background
$('#darkBackground').click(function(){
    updateBackground();
});

// Presets
presets.forEach(function(preset, i){
    $('#presets').append('<option value="'+i+'">'+preset.name+'</option>');
});

// No selection on certain parts of the interface
$('.unselectable').attr('unselectable', 'on')
   .css({
       '-moz-user-select':'none',
       '-webkit-user-select':'none',
       'user-select':'none',
       '-ms-user-select':'none'
   })
   .each(function() {
       this.onselectstart = function() { return false; };
   });

        </script>

    </body>
</html>
