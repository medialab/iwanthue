<!doctype html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title>iWantHue - Palette Completion</title>

<?php include("includes/codetop.php"); ?>

	<style>
#hs_div, #sl_div, #hl_div, #sv_div, #hv_div, #rg_div, #gb_div, #rb_div{
	max-width: 300px;
}
.generator button{
	width: 100%;
	height: 30px;
}
.infotitle{
	font-family: "Helvetica Neue", "Lucida Grande", Helvetica, Arial, Verdana, sans-serif;
	color:#a99;
}
.info{
	font-family: "Helvetica Neue", "Lucida Grande", Helvetica, Arial, Verdana, sans-serif;
	color: #a99;
	text-indent: 20px;
}
#colorspace{
	color:#FFF;
	word-wrap: break-word;
	height: 120px;
	font-size: 9px;
	overflow-y:auto;
}
#colorspace span{
	margin-right: 1px;
}

#correctionsTable{
	font-size: 10px;
	width: 100%;
}
.colorcell{
	border: 5px solid #FFF;
	text-align: center;
	padding: 10px;
}
.colorcell.selected, .colorcell.highlighted{
	border: none;
}
.colorcell span{
	text-shadow: -1px -1px #FFF, 1px 1px #333;
}
.colorcell, .colorcell span{
	cursor: pointer;
}
.key.selected{
	background-color: #EEE;
	border-left: 5px solid #FFF;
	border-right: 5px solid #FFF;
	
}

#palette_result{
	border: 10px solid #EEE;
	padding: 16px;
}

#palette{
	line-height: 60px;
	text-shadow: -1px -1px #FFF, 1px 1px #333;
}
body {
    padding-top: 60px;
    padding-bottom: 40px;
}
	</style>
</head>
<body>

<?php include("includes/header.php"); ?>

	<div class="container">
        <!-- Main hero unit for a primary marketing message or call to action -->
        <div class="splash-unit row">
            <div class="span7">
                <div class="image">
                    <a href="index.php"><img src="res/header.png"/></a>
                </div>
                <div class="title">
                    <small class="muted">(old version)</small>
                </div>
            </div>
            <div class="span5">
            	<br/>
            	<br/>
                <div class="alert alert-error">
				  <strong>Outdated version!</strong> Check out our fresh new interface 
				</div>
				<a class="btn btn-primary" href="index.php"><i class="icon-white icon-arrow-right"></i> Current version</a>
            </div>
        </div>
    </div>

	<div class="container">
		<div class="row">
			<div class="span12 last">
				<h2>Palette Completion</h2>
				<p>
					Paste some colors and get more well-distributed colors to fill a larger palette.
				</p>
			</div>
		</div>
		<div class="row">
			<div class="span3">
				<h3>Source colors</h3>
				<textarea id="source" style="width:100%;height:100px;">Paste your colors here.
Use the "hex" format: #FF0, #666699, #123456...
It will be recognized and extracted (so you can paste json as well)</textarea>
				<h3>Palette Size</h3>
				<p>
					<input id="nodescount" type="text" value="10" style="width:35px;"/> Colors
				</p>
				<h3>Color Space</h3>
				<p>
					<select id="presets" onchange="updateSettings()">
					</select>
				</p>
				<p>
					<b>Hue</b> (range: 0 to 360)
					<br/>
					<input id="hmin" type="text" value="0" style="width:35px;"/> Minimum
					<br/>
					<input id="hmax" type="text" value="360" style="width:35px;"/> Maximum
				</p>
				<p>
					<b>Chroma</b> (range: 0 to 10)
					<br/>
					<input id="cmin" type="text" value="0" style="width:35px;"/> Minimum
					<br/>
					<input id="cmax" type="text" value="1.2" style="width:35px;"/> Maximum
				</p>
				<p>
					<b>Lightness</b> (range: 0 to 10)
					<br/>
					<input id="lmin" type="text" value="0.5" style="width:35px;"/> Minimum
					<br/>
					<input id="lmax" type="text" value="10" style="width:35px;"/> Maximum
				</p>
				<h3 id="colorspace_title">Sub-space</h3>
				<div id="colorspace"></div>
			</div>
			<div class="span9">
				<h3>Palette Completion</h3>
				<button onclick="correct();">Give me more colors !</button>
				<table id="correctionsTable">
				</table>
				<h3>Palette</h3>
				<div id="palette"></div>
				<h3>Hex colors</h3>
				<textarea id="output_hexjson" style="width:80%;height:80px;">
				</textarea>
			</div>
		</div>
	</div>

<?php include("includes/footer.php"); ?>

</div> <!--! end of #container -->

<?php include("includes/codebottom.php"); ?>

<script>
var checkedRows = [];
var selectedCol = 5;
var colors;

// Colorspaces
var colorspaces = [
	{
		name: "Presets...",
		hclrange:[[0,360],[0,1.2],[0.5,10]],
	},
	{
		name: "Clear",
		hclrange:[[0,360],[0,1.2],[0.5,10]],
	},
	{
		name: "Pastel",
		hclrange:[[0,360],[0,0.9],[1,10]],
	},
	{
		name: "Fancy",
		hclrange:[[0,360],[0.6,1.2],[0.8,10]],
	},
	{
		name: "Pimp",
		hclrange:[[0,360],[0.9,10],[0.4,10]],
	},
	{
		name: "Tarnish",
		hclrange:[[0,360],[0,0.6],[0.4,1.1]],
	},
	{
		name: "Intense",
		hclrange:[[0,360],[0.6,10],[0.2,1.1]],
	},
	{
		name: "Shades",
		hclrange:[[0,360],[0,0.4],[0,10]],
	},
	{
		name: "Full colorspace",
		hclrange:[[0,360],[0,10],[0,10]],
	}
];

var correct = function(settles_set){
	colors = extract();
	var colorsSteps = [];
	
	if(!settles_set){
		checkedRows = [];
	}
	
	// Color Samples
	// Variables
	var hmin = +$('#hmin').val();
	var hmax = +$('#hmax').val();
	var cmin = +$('#cmin').val();
	var cmax = +$('#cmax').val();
	var lmin = +$('#lmin').val();
	var lmax = +$('#lmax').val();
	// Conditions restraining the color space
	var hcondition;
	if(hmin<hmax){
		hcondition = function(hcl){return hcl[0]>=hmin && hcl[0]<=hmax};
	} else {
		hcondition = function(hcl){return hcl[0]>=hmin || hcl[0]<=hmax};
	}
	var ccondition = function(hcl){return hcl[1]>=cmin && hcl[1]<=cmax};
	var lcondition = function(hcl){return hcl[2]>=lmin && hcl[2]<=lmax};
	
	
	// General condition for selecting the color space
	var colorspaceSelector = function(color){
		var hcl = color.hcl();
		return !isNaN(color.rgb[0]) && color.rgb[0]>=0 && color.rgb[1]>=0 && color.rgb[2]>=0 && color.rgb[0]<256 && color.rgb[1]<256 && color.rgb[2]<256 && hcondition(hcl) && ccondition(hcl) && lcondition(hcl);
	}
	
	// Get the color Samples
	var colorSamples = [];
	for(l=0; l<=1; l+=0.05){
		for(a=-1; a<=1; a+=0.1){
			for(b=-1; b<=1; b+=0.1){
				var color = chroma.lab(l, a, b);
				if(colorspaceSelector(color)){
					colorSamples.push(color);
				}
			}
		}
	}
	
	// Original colors: unchanged
	checkedRow = [];
	colors.forEach(function(c,i){checkedRows.push(i);});
	
	// Additional colors at random
	var colorsCount = +$('#nodescount').val();
	for(var i=colors.length; i<colorsCount; i++){
		var color = paletteGenerator.generate(1, colorspaceSelector, false, 0)[0];
		colors.push(color);
	}
	
	// Completion: 50 passes
	colors = kMeans(colors, colorSamples, colorspaceSelector, 5);
	
	
	
	// Display the result
	updateViz();
}

var extract = function(){
	var source = $('#source').val();
	return source.match(/#[0-9abcdef][0-9abcdef][0-9abcdef]([0-9abcdef][0-9abcdef][0-9abcdef])?/gi).map(function(hex){return chroma.hex(hex);});
}

var kMeans = function(colors, colorSamples_chroma, colorspaceSelector, steps){
	var kMeans = colors.map(function(c){return c.lab();});
	var colorSamples = colorSamples_chroma.map(function(color){return color.lab();});
	var samplesClosest = colorSamples_chroma.map(function(color){return null;});
	
	while(steps-- > 0){
		console.log("Step");
		// kMeans -> Samples Closest
		for(i=0; i<colorSamples.length; i++){
			var lab = colorSamples[i];
			var minDistance = 1000000;
			for(j=0; j<kMeans.length; j++){
				var kMean = kMeans[j];
				var distance = Math.sqrt(Math.pow(lab[0]-kMean[0], 2) + Math.pow(lab[1]-kMean[1], 2) + Math.pow(lab[2]-kMean[2], 2));
				if(distance < minDistance){
					minDistance = distance;
					samplesClosest[i] = j;
				}
			}
		}
		
		// Samples -> kMeans
		var freeColorSamples = colorSamples.slice(0);
		for(j=0; j<kMeans.length; j++){
			var count = 0;
			var candidateKMean = [0, 0, 0];
			for(i=0; i<colorSamples.length; i++){
				if(samplesClosest[i] == j){
					count++;
					candidateKMean[0] += colorSamples[i][0];
					candidateKMean[1] += colorSamples[i][1];
					candidateKMean[2] += colorSamples[i][2];
				}
			}
			if(count!=0){
				candidateKMean[0] /= count;
				candidateKMean[1] /= count;
				candidateKMean[2] /= count;
			} else {
				candidateKMean = kMeans[j];
			}
			
			var settled = checkedRows.some(function(r){return r==j;});
			if(settled){
				// We do note change the kMean for its new version
			} else {
				if(count!=0 && colorspaceSelector(chroma.lab(candidateKMean[0], candidateKMean[1], candidateKMean[2])) && candidateKMean){
					kMeans[j] = candidateKMean;
				} else {
					// The candidate kMean is out of the boundaries of the color space, or unfound.
					if(freeColorSamples.length>0){
						// We just search for the closest FREE color of the candidate kMean
						var minDistance = 10000000000;
						var closest = -1;
						for(i=0; i<freeColorSamples.length; i++){
							var distance = Math.sqrt(Math.pow(freeColorSamples[i][0]-candidateKMean[0], 2) + Math.pow(freeColorSamples[i][1]-candidateKMean[1], 2) + Math.pow(freeColorSamples[i][2]-candidateKMean[2], 2));
							if(distance < minDistance){
								minDistance = distance;
								closest = i;
							}
						}
						kMeans[j] = freeColorSamples[closest];
					} else {
						// Then we just search for the closest color of the candidate kMean
						var minDistance = 10000000000;
						var closest = -1;
						for(i=0; i<colorSamples.length; i++){
							var distance = Math.sqrt(Math.pow(colorSamples[i][0]-candidateKMean[0], 2) + Math.pow(colorSamples[i][1]-candidateKMean[1], 2) + Math.pow(colorSamples[i][2]-candidateKMean[2], 2));
							if(distance < minDistance){
								minDistance = distance;
								closest = i;
							}
						}
						kMeans[j] = colorSamples[closest];
					}
				}
				freeColorSamples = freeColorSamples.filter(function(color){
					return color[0] != kMeans[j][0]
						|| color[1] != kMeans[j][1]
						|| color[2] != kMeans[j][2];
				});
			}
		}
	}
	
	return kMeans.map(function(lab){return chroma.lab(lab[0], lab[1], lab[2]);});
}

// Update Settings
function updateSettings(){
	var cs = colorspaces[$('#presets').val()];
	$('#hmin').val(cs.hclrange[0][0]);
	$('#hmax').val(cs.hclrange[0][1]);
	$('#cmin').val(cs.hclrange[1][0]);
	$('#cmax').val(cs.hclrange[1][1]);
	$('#lmin').val(cs.hclrange[2][0]);
	$('#lmax').val(cs.hclrange[2][1]);
	
	// Color Samples
	// Variables
	var hmin = +$('#hmin').val();
	var hmax = +$('#hmax').val();
	var cmin = +$('#cmin').val();
	var cmax = +$('#cmax').val();
	var lmin = +$('#lmin').val();
	var lmax = +$('#lmax').val();
	// Conditions restraining the color space
	var hcondition;
	if(hmin<hmax){
		hcondition = function(hcl){return hcl[0]>=hmin && hcl[0]<=hmax};
	} else {
		hcondition = function(hcl){return hcl[0]>=hmin || hcl[0]<=hmax};
	}
	var ccondition = function(hcl){return hcl[1]>=cmin && hcl[1]<=cmax};
	var lcondition = function(hcl){return hcl[2]>=lmin && hcl[2]<=lmax};
	
	
	// General condition for selecting the color space
	var colorspaceSelector = function(color){
		var hcl = color.hcl();
		return !isNaN(color.rgb[0]) && color.rgb[0]>=0 && color.rgb[1]>=0 && color.rgb[2]>=0 && color.rgb[0]<256 && color.rgb[1]<256 && color.rgb[2]<256 && hcondition(hcl) && ccondition(hcl) && lcondition(hcl);
	}
	// Get the color Samples
	var colorSamples = [];
	for(l=0; l<=1; l+=0.05){
		for(a=-1; a<=1; a+=0.1){
			for(b=-1; b<=1; b+=0.1){
				var color = chroma.lab(l, a, b);
				if(colorspaceSelector(color)){
					colorSamples.push(color);
				}
			}
		}
	}
	$('#colorspace_title').text("Sub-space ("+colorSamples.length+" color samples)");
	$('#colorspace').html(colorSamples.map(function(color){
		return "<span style='width: 8px;background-color:"+color.hex()+";'>_</span>";
	}).join(""));
}

// Update the visualization with a given palette
function updateViz(){
	$('#palette').empty();
	colors.forEach(function(color){
		$('#palette').append('<span style="border: 20px solid '+color.hex()+'; color:'+color.hex()+'; background-color:'+color.hex()+';">'+color.hex()+'</span> ');
	});
	
	$('#output_hexjson').html(
		"[\n"+
		colors.map(function(color){
			return "\t\""+color.hex()+"\"";
		}).join(",\n")
		+"\n]"
	);
}

// Update checked colors
function updateSettles(){
	checkedRows = [];
	var settlers = $('.settler').splice(0).forEach(function(settler){
		var settler = $(settler);
		var row = settler.attr('row');
		var checked = settler.is(':checked');
		if(checked){
			checkedRows.push(row);
		}
	});
	correct(true);
}
window.onload = function(){
	colorspaces.forEach(function(cs, i){
		$('#presets').append('<option value="'+i+'">'+cs.name+'</option>');
	});
	updateSettings();
}
</script>

</body>
</html>
