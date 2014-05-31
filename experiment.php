<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>iWantHue - Experiment</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

<?php include('includes/codetop.php') ?>

        <style>
            body {
                padding-top: 60px;
                padding-bottom: 40px;
            }
            /* Specific styles */
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
            .generator{
                margin-bottom: 30px;
            }
            .generators_zone{
                overflow-y: scroll;
                height: 280px;
                border-top: 1px solid  #a99;
                border-bottom: 1px solid  #a99;
                margin-top: 30px;
                margin-bottom: 10px;
                margin-right: -40px;
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
                    <h1>Random Colors: Experiment</h1>
                </div>
            </div>

            <div class="row">
                <div class="span3">
                    <h3>How it works</h3>
                    <p>
                        Choose a generator and look at how the random colors are distributed.
                    </p>
                    <p>
                        The purpose here is to observe the properties of different generators of colors.
                    </p>
                </div>
                <div class="span3">
                    <h3>Settings</h3>
                    <p>
                        <input id="nodescount" type="text" value="20" style="width:35px;"/> Colors
                    </p>
                    <p>
                        <input id="scatterplot" type="checkbox"/> Scatterplot style
                    </p>
                </div>
                <div class="span3">
                    <h3 class="infotitle">Use case A</h3>
                    <div class="info">
                        <p>
                            Set a small number of colors (10 to 50), generate several times to look if it fits your expectations.
                        </p>
                    </div>
                </div>
                <div class="span3">
                    <h3 class="infotitle">Use case B</h3>
                    <div class="info">
                        <p>
                            Set a large number of colors (1000 or more), check "scatterplot style", generate and you will observe how the probabilities are distributed (takes more time).
                        </p>
                    </div>
                </div>
            </div>
            <div class="generators_zone row"><div class="span12">
                <div class="row">
                    <div class="span2 generator">
                        <h3>RGB Naïve</h3>
                        <button class="go" onclick='rgbNaive()'>Go</button>
                        <script>
function rgbNaive(){
    var colors = [];
    for(i=0; i<parseInt($('#nodescount').val()); i++){
        var color = chroma.rgb(255*Math.random(),255*Math.random(),255*Math.random());
        colors.push(color);
    }
    drawBackground();
    drawColors(colors);
}
                        </script>
                        <p>
                            A random value in each red/green/blue channel.
                        </p>
                    </div>
                    <div class="span2 generator">
                        <h3>HSL Naïve</h3>
                        <button class="go" onclick='hslNaive()'>Go</button>
                        <script>
function hslNaive(){
    var colors = [];
    for(i=0; i<parseInt($('#nodescount').val()); i++){
        var color = chroma.hsl(360*Math.random(),Math.random(),Math.random());
        colors.push(color);
    }
    drawBackground();
    drawColors(colors);
}
                        </script>
                        <p>
                            A random value in each hue/saturation/lightness channel.
                        </p>
                    </div>
                    <div class="span2 generator">
                        <h3>HSV Naïve</h3>
                        <button class="go" onclick='hsvNaive()'>Go</button>
                        <script>
function hsvNaive(){
    var colors = [];
    for(i=0; i<parseInt($('#nodescount').val()); i++){
        var color = chroma.hsv(360*Math.random(),Math.random(),Math.random());
        colors.push(color);
    }
    drawBackground();
    drawColors(colors);
}
                        </script>
                        <p>
                            A random value in each hue/saturation/value channel.
                        </p>
                    </div>
                    <div class="span6">
                        <h3 class="infotitle">Naïve generators:</h3>
                        <div class="info">
                            <p>
                                Random numbers do not necessary make nice swatches. You may read sometimes that HSV random colors are better than RGB. I think that it is clearly not the case.
                            </p>
                            <p>
                                These basic generators allow to see that the "randomness" strongly depends on the color space that is randomized.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="span2 generator">
                        <h3>Lab Naïve</h3>
                        <button class="go" onclick='labNaive()'>Go</button>
                        <script>
function labNaive(){
    var colors = [];
    for(i=0; i<parseInt($('#nodescount').val()); i++){
        var color = chroma.lab(Math.random(),2*Math.random()-1,2*Math.random()-1);
        while(isNaN(color.rgb[0])){
            color = chroma.lab(Math.random(),2*Math.random()-1,2*Math.random()-1);
        }
        colors.push(color);
    }
    drawBackground();
    drawColors(colors);
}
                        </script>
                        <p>
                            A random value in each L*/a*/b* color coordinates (fits to how we perceive colors).
                        </p>
                    </div>
                    <div class="span2 generator">
                        <h3>Lab Pastel</h3>
                        <button class="go" onclick='labPastel()'>Go</button>
                        <script>
function labPastel(){
    var colors = [];
    
    function checkColor(color){
        var lab = color.lab();
        return !isNaN(color.rgb[0]) && color.rgb[0]>=0 && color.rgb[1]>=0 && color.rgb[2]>=0 && color.rgb[0]<256 && color.rgb[1]<256 && color.rgb[2]<256 && lab[0]<0.95 && lab[0]>0.6;
    }
    
    for(i=0; i<parseInt($('#nodescount').val()); i++){
        var color = chroma.lab(Math.random(),2*Math.random()-1,2*Math.random()-1);
        while(!checkColor(color)){
            color = chroma.lab(Math.random(),2*Math.random()-1,2*Math.random()-1);
        }
        colors.push(color);
    }
    drawBackground();
    drawColors(colors);
}
                        </script>
                        <p>
                            A random value in each L*/a*/b* color coordinates, filtered to keep only pastel colors.
                        </p>
                    </div>
                    <div class="span2 generator">
                        <h3>Lab Pimp</h3>
                        <button class="go" onclick='labPimp()'>Go</button>
                        <script>
function labPimp(){
    var colors = [];
    
    function checkColor(color){
        var lab = color.lab();
        var hcl = color.hcl();
        return !isNaN(color.rgb[0]) && color.rgb[0]>=0 && color.rgb[1]>=0 && color.rgb[2]>=0 && color.rgb[0]<256 && color.rgb[1]<256 && color.rgb[2]<256 && hcl[2]>0.5 && hcl[1]>0.8;
    }
    
    for(i=0; i<parseInt($('#nodescount').val()); i++){
        var color = chroma.lab(Math.random(),2*Math.random()-1,2*Math.random()-1);
        while(!checkColor(color)){
            color = chroma.lab(Math.random(),2*Math.random()-1,2*Math.random()-1);
        }
        colors.push(color);
    }
    drawBackground();
    drawColors(colors);
}
                        </script>
                        <p>
                            A random value in each L*/a*/b* color coordinates, filtered to keep only flashy colors.
                        </p>
                    </div>
                    <div class="span6">
                        <h3 class="infotitle">Lab generators:</h3>
                        <div class="info">
                            <p>
                                The L*a*b* color space is the more natural to the eye. Randomizing in this space gives more natural results.
                            </p>
                            <p>
                                Adding constraints helps to set some properties of the produced palette ('Pimp', 'Pastel'), and keeps the natural distribution of the colors.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="span2 generator">
                        <h3>RGB Force Vector</h3>
                        <button class="go" onclick='rgbForceVector()'>Go</button>
                        <script>
function rgbForceVector(){
    drawBackground();
    var colors = [];
    
    // Init
    var vectors = {};
    for(i=0; i<parseInt($('#nodescount').val()); i++){
        var color = [255*Math.random(),255*Math.random(),255*Math.random()];
        colors.push(color);
    }
    
    // Force vector: repulsion
    var repulsion = 10;
    var speed = 500;
    var steps = 1000;
    while(steps-- > 0){
        // Init
        for(i=0; i<colors.length; i++){
            vectors[i] = {dr:0, dg:0, db:0};
        }
        // Compute Force
        for(i=0; i<colors.length; i++){
            var colorA = colors[i];
            for(j=0; j<i; j++){
                var colorB = colors[j];
                
                // repulsion force
                var dr = colorA[0]-colorB[0];
                var dg = colorA[1]-colorB[1];
                var db = colorA[2]-colorB[2];
                var d = Math.sqrt(Math.pow(dr, 2)+Math.pow(dg, 2)+Math.pow(db, 2));
                if(d>0){
                    var force = repulsion/Math.pow(d,2);
                    
                    vectors[i].dr += dr * force / d;
                    vectors[i].dg += dg * force / d;
                    vectors[i].db += db * force / d;
                    
                    vectors[j].dr -= dr * force / d;
                    vectors[j].dg -= dg * force / d;
                    vectors[j].db -= db * force / d;
                } else {
                    // Jitter
                    vectors[j].dr += 2 - 4 * Math.random();
                    vectors[j].dg += 2 - 4 * Math.random();
                    vectors[j].db += 2 - 4 * Math.random();
                }
            }
        }
        // Apply Force
        for(i=0; i<colors.length; i++){
            var color = colors[i];
            var displacement = speed * Math.sqrt(Math.pow(vectors[i].dr, 2)+Math.pow(vectors[i].dg, 2)+Math.pow(vectors[i].db, 2));
            if(displacement>0){
                var ratio = speed * Math.min(50, displacement)/displacement;
                color[0] = Math.min(255, Math.max(0, color[0] + vectors[i].dr*ratio));
                color[1] = Math.min(255, Math.max(0, color[1] + vectors[i].dg*ratio));
                color[2] = Math.min(255, Math.max(0, color[2] + vectors[i].db*ratio));
            }
        }
    }
    drawColors(colors.map(function(rgb){return chroma.rgb(Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2]));}));
}
                        </script>
                        <p>
                            A Force Vector algorithm optimizes the distribution of colors inthe RGB color space.
                        </p>
                    </div>
                    <div class="span2 generator">
                        <h3>Lab Force Vector</h3>
                        <button class="go" onclick='labForceVector()'>Go</button>
                        <script>
function labForceVector(){
    drawBackground();
    var colors = [];
    
    // It will be necessary to check if a Lab color exists in the rgb space.
    function checkLab(lab){
        var color = chroma.lab(lab[0], lab[1], lab[2]);
        return !isNaN(color.rgb[0]) && color.rgb[0]>=0 && color.rgb[1]>=0 && color.rgb[2]>=0 && color.rgb[0]<256 && color.rgb[1]<256 && color.rgb[2]<256;
    }
    
    // Init
    var vectors = {};
    for(i=0; i<parseInt($('#nodescount').val()); i++){
        // Find a valid Lab color
        var color = [Math.random(),2*Math.random()-1,2*Math.random()-1];
        while(!checkLab(color)){
            color = [Math.random(),2*Math.random()-1,2*Math.random()-1];
        }
        colors.push(color);
    }
    
    // Force vector: repulsion
    var repulsion = 0.1;
    var speed = 0.05;
    var steps = 1000;
    while(steps-- > 0){
        // Init
        for(i=0; i<colors.length; i++){
            vectors[i] = {dl:0, da:0, db:0};
        }
        // Compute Force
        for(i=0; i<colors.length; i++){
            var colorA = colors[i];
            for(j=0; j<i; j++){
                var colorB = colors[j];
                
                // repulsion force
                var dl = colorA[0]-colorB[0];
                var da = colorA[1]-colorB[1];
                var db = colorA[2]-colorB[2];
                var d = Math.sqrt(Math.pow(dl, 2)+Math.pow(da, 2)+Math.pow(db, 2));
                if(d>0){
                    var force = repulsion/Math.pow(d,2);
                    
                    vectors[i].dl += dl * force / d;
                    vectors[i].da += da * force / d;
                    vectors[i].db += db * force / d;
                    
                    vectors[j].dl -= dl * force / d;
                    vectors[j].da -= da * force / d;
                    vectors[j].db -= db * force / d;
                } else {
                    // Jitter
                    vectors[j].dl += 0.02 - 0.04 * Math.random();
                    vectors[j].da += 0.02 - 0.04 * Math.random();
                    vectors[j].db += 0.02 - 0.04 * Math.random();
                }
            }
        }
        // Apply Force
        for(i=0; i<colors.length; i++){
            var color = colors[i];
            var displacement = speed * Math.sqrt(Math.pow(vectors[i].dl, 2)+Math.pow(vectors[i].da, 2)+Math.pow(vectors[i].db, 2));
            if(displacement>0){
                var ratio = speed * Math.min(0.1, displacement)/displacement;
                candidateLab = [color[0] + vectors[i].dl*ratio, color[1] + vectors[i].da*ratio, color[2] + vectors[i].db*ratio];
                if(checkLab(candidateLab)){
                    colors[i] = candidateLab;
                }
            }
            //drawColors(colors.map(function(lab){return chroma.lab(lab[0], lab[1], lab[2]);}));
        }
    }
    drawColors(colors.map(function(lab){return chroma.lab(lab[0], lab[1], lab[2]);}));
}
                        </script>
                        <p>
                            A Force Vector algorithm optimizes the distribution of colors inthe L*a*b* color space.
                        </p>
                    </div>
                    <div class="span2 generator">
                        <h3>Lab Fancy Force Vector</h3>
                        <button class="go" onclick='labFancyForceVector()'>Go</button>
                        <script>
function labFancyForceVector(){
    drawBackground();
    var colors = [];
    
    // It will be necessary to check if a Lab color exists in the rgb space.
    function checkLab(lab){
        var color = chroma.lab(lab[0], lab[1], lab[2]);
        var hcl = color.hcl();
        return !isNaN(color.rgb[0]) && color.rgb[0]>=0 && color.rgb[1]>=0 && color.rgb[2]>=0 && color.rgb[0]<256 && color.rgb[1]<256 && color.rgb[2]<256 && hcl[2]>0.6 && hcl[1]>0.6;
    }
    
    // Init
    var vectors = {};
    for(i=0; i<parseInt($('#nodescount').val()); i++){
        // Find a valid Lab color
        var color = [Math.random(),2*Math.random()-1,2*Math.random()-1];
        while(!checkLab(color)){
            color = [Math.random(),2*Math.random()-1,2*Math.random()-1];
        }
        colors.push(color);
    }
    
    // Force vector: repulsion
    var repulsion = 0.2;
    var speed = 0.05;
    var steps = 1000;
    while(steps-- > 0){
        // Init
        for(i=0; i<colors.length; i++){
            vectors[i] = {dl:0, da:0, db:0};
        }
        // Compute Force
        for(i=0; i<colors.length; i++){
            var colorA = colors[i];
            for(j=0; j<i; j++){
                var colorB = colors[j];
                
                // repulsion force
                var dl = colorA[0]-colorB[0];
                var da = colorA[1]-colorB[1];
                var db = colorA[2]-colorB[2];
                var d = Math.sqrt(Math.pow(dl, 2)+Math.pow(da, 2)+Math.pow(db, 2));
                if(d>0){
                    var force = repulsion/Math.pow(d,2);
                    
                    vectors[i].dl += dl * force / d;
                    vectors[i].da += da * force / d;
                    vectors[i].db += db * force / d;
                    
                    vectors[j].dl -= dl * force / d;
                    vectors[j].da -= da * force / d;
                    vectors[j].db -= db * force / d;
                } else {
                    // Jitter
                    vectors[j].dl += 0.02 - 0.04 * Math.random();
                    vectors[j].da += 0.02 - 0.04 * Math.random();
                    vectors[j].db += 0.02 - 0.04 * Math.random();
                }
            }
        }
        // Apply Force
        for(i=0; i<colors.length; i++){
            var color = colors[i];
            var displacement = speed * Math.sqrt(Math.pow(vectors[i].dl, 2)+Math.pow(vectors[i].da, 2)+Math.pow(vectors[i].db, 2));
            if(displacement>0){
                var ratio = speed * Math.min(0.1, displacement)/displacement;
                candidateLab = [color[0] + vectors[i].dl*ratio, color[1] + vectors[i].da*ratio, color[2] + vectors[i].db*ratio];
                if(checkLab(candidateLab)){
                    colors[i] = candidateLab;
                }
            }
            //drawColors(colors.map(function(lab){return chroma.lab(lab[0], lab[1], lab[2]);}));
        }
    }
    drawColors(colors.map(function(lab){return chroma.lab(lab[0], lab[1], lab[2]);}));
}
                        </script>
                        <p>
                            A Force Vector algorithm optimizes the distribution of colors inthe L*a*b* color space. Additional conditions apply to restrain the color space to flashy colors.
                        </p>
                    </div>
                    <div class="span6 last">
                        <h3 class="infotitle">Force Vector generators:</h3>
                        <div class="info">
                            <p>
                                The Force Vector strategy allows an even distribution of the colors in the space. It still allows some coontrol on the produced palette ('Fancy').
                            </p>
                            <p>
                                Note that contrary to the "naïve" generators, the colors are generated all at the same time (they depend on each other).
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="span2 generator">
                        <h3>RGB kMeans</h3>
                        <button class="go" onclick='rgbKMeans()'>Go</button>
                        <script>
function rgbKMeans(){
    drawBackground();
    
    var kMeans = [];
    for(i=0; i<parseInt($('#nodescount').val()); i++){
        var rgb = [255*Math.random(),255*Math.random(),255*Math.random()];
        kMeans.push(rgb);
    }
    
    var colorSamples = [];
    var samplesClosest = [];
    for(r=0; r<=255; r+=10){
        for(g=0; g<=255; g+=10){
            for(b=0; b<=255; b+=10){
                var rgb = [r, g, b];
                colorSamples.push(rgb);
                samplesClosest.push(null);
            }
        }
    }
    
    // Steps
    var steps = 50;
    while(steps-- > 0){
        // kMeans -> Samples Closest
        for(i=0; i<colorSamples.length; i++){
            var rgb = colorSamples[i];
            var maxDistance = 1000000;
            for(j=0; j<kMeans.length; j++){
                var kMean = kMeans[j];
                var distance = Math.sqrt(Math.pow(rgb[0]-kMean[0], 2) + Math.pow(rgb[1]-kMean[1], 2) + Math.pow(rgb[2]-kMean[2], 2));
                if(distance < maxDistance){
                    maxDistance = distance;
                    samplesClosest[i] = j;
                }
            }
        }
        
        // Samples -> kMeans
        for(j=0; j<kMeans.length; j++){
            var count = 0;
            kMeans[j] = [0, 0, 0];
            for(i=0; i<colorSamples.length; i++){
                if(samplesClosest[i] == j){
                    count++;
                    kMeans[j][0] += colorSamples[i][0];
                    kMeans[j][1] += colorSamples[i][1];
                    kMeans[j][2] += colorSamples[i][2];
                }
            }
            kMeans[j][0] /= count;
            kMeans[j][1] /= count;
            kMeans[j][2] /= count;
        }
    }
    drawColors(kMeans.map(function(rgb){return chroma.rgb(Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2]));}));
}
                        </script>
                        <p>
                            The k-Means algorithm clusterises the RGB color space. The resulting palette is constituted of these k-Means (the "centers" of color clusters).
                        </p>
                    </div>
                    <div class="span2 generator">
                        <h3>Lab kMeans</h3>
                        <button class="go" onclick='labKMeans()'>Go</button>
                        <script>
function labKMeans(){
    drawBackground();
    
    function checkColor(color){
        var lab = color.lab();
        var hcl = color.hcl();
        return !isNaN(color.rgb[0]) && color.rgb[0]>=0 && color.rgb[1]>=0 && color.rgb[2]>=0 && color.rgb[0]<256 && color.rgb[1]<256 && color.rgb[2]<256 /*&& hcl[2]>0.5 && hcl[1]>0.8*/;
    }
    
    var kMeans = [];
    for(i=0; i<parseInt($('#nodescount').val()); i++){
        var lab = [Math.random(),2*Math.random()-1,2*Math.random()-1];
        while(!checkColor(chroma.lab(lab))){
            lab = [Math.random(),2*Math.random()-1,2*Math.random()-1];
        }
        kMeans.push(lab);
    }
    
    var colorSamples = [];
    var samplesClosest = [];
    for(l=0; l<=1; l+=0.05){
        for(a=-1; a<=1; a+=0.1){
            for(b=-1; b<=1; b+=0.1){
                if(checkColor(chroma.lab(l, a, b))){
                    colorSamples.push([l, a, b]);
                    samplesClosest.push(null);
                }
            }
        }
    }
    
    // Steps
    var steps = 50;
    while(steps-- > 0){
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
            candidateKMean[0] /= count;
            candidateKMean[1] /= count;
            candidateKMean[2] /= count;
            
            if(checkColor(chroma.lab(candidateKMean[0], candidateKMean[1], candidateKMean[2]))){
                kMeans[j] = candidateKMean;
            } else {
                // The candidate kMean is out of the boundaries of the color space...
                // Then we just search for the closest color, in the sample, of the candidate kMean
                var minDistance = 1000000;
                var closest = -1;
                for(i=0; i<colorSamples.length; i++){
                    if(samplesClosest[i] == j){
                        var distance = Math.sqrt(Math.pow(colorSamples[i][0]-candidateKMean[0], 2) + Math.pow(colorSamples[i][1]-candidateKMean[1], 2) + Math.pow(colorSamples[i][2]-candidateKMean[2], 2));
                        if(distance < minDistance){
                            minDistance = distance;
                            closest = i;
                        }
                    }
                }
                kMeans[j] = colorSamples[closest];
            }
        }
    }
    drawColors(kMeans.map(function(lab){return chroma.lab(lab[0], lab[1], lab[2]);}));
}
                        </script>
                        <p>
                            The k-Means algorithm clusterises the L*a*b* color space. The resulting palette is constituted of these k-Means (the "centers" of color clusters).
                        </p>
                    </div>
                    <div class="span2 generator">
                        <h3>Lab Fancy kMeans</h3>
                        <button class="go" onclick='labFancyKMeans()'>Go</button>
                        <script>
function labFancyKMeans(){
    drawBackground();
    
    function checkColor(color){
        var lab = color.lab();
        var hcl = color.hcl();
        return !isNaN(color.rgb[0]) && color.rgb[0]>=0 && color.rgb[1]>=0 && color.rgb[2]>=0 && color.rgb[0]<256 && color.rgb[1]<256 && color.rgb[2]<256 && hcl[2]>0.6 && hcl[1]>0.6;
    }
    
    var kMeans = [];
    for(i=0; i<parseInt($('#nodescount').val()); i++){
        var lab = [Math.random(),2*Math.random()-1,2*Math.random()-1];
        while(!checkColor(chroma.lab(lab))){
            lab = [Math.random(),2*Math.random()-1,2*Math.random()-1];
        }
        kMeans.push(lab);
    }
    
    var colorSamples = [];
    var samplesClosest = [];
    for(l=0; l<=1; l+=0.05){
        for(a=-1; a<=1; a+=0.1){
            for(b=-1; b<=1; b+=0.1){
                if(checkColor(chroma.lab(l, a, b))){
                    colorSamples.push([l, a, b]);
                    samplesClosest.push(null);
                }
            }
        }
    }
    
    // Steps
    var steps = 50;
    while(steps-- > 0){
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
            candidateKMean[0] /= count;
            candidateKMean[1] /= count;
            candidateKMean[2] /= count;
            
            if(checkColor(chroma.lab(candidateKMean[0], candidateKMean[1], candidateKMean[2]))){
                kMeans[j] = candidateKMean;
            } else {
                // The candidate kMean is out of the boundaries of the color space...
                // Then we just search for the closest color, in the sample, of the candidate kMean
                var minDistance = 1000000;
                var closest = -1;
                for(i=0; i<colorSamples.length; i++){
                    if(samplesClosest[i] == j){
                        var distance = Math.sqrt(Math.pow(colorSamples[i][0]-candidateKMean[0], 2) + Math.pow(colorSamples[i][1]-candidateKMean[1], 2) + Math.pow(colorSamples[i][2]-candidateKMean[2], 2));
                        if(distance < minDistance){
                            minDistance = distance;
                            closest = i;
                        }
                    }
                }
                kMeans[j] = colorSamples[closest];
            }
        }
    }
    drawColors(kMeans.map(function(lab){return chroma.lab(lab[0], lab[1], lab[2]);}));
}
                        </script>
                        <p>
                            Idem, but with an additional constraint (high chroma and lightness*).
                        </p>
                    </div>
                    <div class="span6">
                        <h3 class="infotitle">K-Means generators:</h3>
                        <div class="info">
                            <p>
                                This strategy also allows an even distribution of the colors, but with less "extreme" colors (the borders of the color space are not occupied). It allows more coordinated colors on small palettes.
                            </p>
                            <p>
                                NB: The palette strongly depends on the number of colors asked.
                            </p>
                        </div>
                    </div>
                </div>
            </div></div>
            <div class="row">
                <div class="span3">
                    <br/>
                    <b>Green x Blue</b>
                    <div id="gb_div"></div>
                </div>
                <div class="span3">
                    <br/>
                    <b>a* x b*</b>
                    <div id="aStarbStar_div"></div>
                </div>
                <div class="span3">
                    <br/>
                    <b>h* x L*</b>
                    <div id="hStarLStar_div"></div>
                </div>
                <div class="span3">
                    <br/>
                    <b>Hue x Value</b>
                    <div id="hv_div"></div>
                </div>
            </div>
            <div class="row">
                <div class="span3">
                    <br/>
                    <b>Red x Green</b>
                    <div id="rg_div"></div>
                </div>
                <div class="span3">
                    <br/>
                    <b>L* x a*</b>
                    <div id="LStaraStar_div"></div>
                </div>
                <div class="span3">
                    <br/>
                    <b>Hue x Lightness</b>
                    <div id="hl_div"></div>
                </div>
                <div class="span3">
                    <br/>
                    <b>Hue x Saturation</b>
                    <div id="hs_div"></div>
                </div>
            </div>
            <div class="row">
                <div class="span3">
                    <br/>
                    <b>Red x Blue</b>
                    <div id="rb_div"></div>
                </div>
                <div class="span3">
                    <br/>
                    <b>L* x b*</b>
                    <div id="LStarbStar_div"></div>
                </div>
                <div class="span3">
                    <br/>
                    <b>Saturation x Lightness</b>
                    <div id="sl_div"></div>
                </div>
                <div class="span3">
                    <br/>
                    <b>Saturation x Value</b>
                    <div id="sv_div"></div>
                </div>
            </div>
            <div class="row">
                <div id="width_reference" class="span12">
                    <br/>
                    <b>Random colors</b>
                    <div id="random_div"></div>
                </div>
            </div>
            <div class="row">
                <div class="span12">
                    <br/>
                    <b>Sorted by Hue</b>
                    <div id="h_div"></div>
                </div>
            </div>
            <div class="row">
                <div class="span12">
                    <br/>
                    <b>Sorted by Saturation</b>
                    <div id="s_div"></div>
                </div>
            </div>
            <div class="row">
                <div class="span12">
                    <br/>
                    <b>Sorted by Chroma (similar to saturation, but normalized to fit our perception)</b>
                    <div id="c_div"></div>
                </div>
            </div>
            <div class="row">
                <div class="span12">
                    <br/>
                    <b>Sorted by Lightness</b>
                    <div id="l_div"></div>
                </div>
            </div>
            <div class="row">
                <div class="span12">
                    <br/>
                    <b>Sorted by Lightness* (normalized to fit our perception)</b>
                    <div id="lStar_div"></div>
                </div>
            </div>
            <div class="row">
                <div class="span12">
                    <br/>
                    <b>Sorted by Value</b>
                    <div id="v_div"></div>
                </div>
            </div>
            <div class="row" hidden="true">
                <div class="span12">
                    <br/>
                    <b>Sorted by Red channel</b>
                    <div id="r_div"></div>
                </div>
            </div>
            <div class="row" hidden="true">
                <div class="span12">
                    <br/>
                    <b>Sorted by Green channel</b>
                    <div id="g_div"></div>
                </div>
            </div>
            <div class="row" hidden="true">
                <div class="span12">
                    <br/>
                    <b>Sorted by Blue channel</b>
                    <div id="b_div"></div>
                </div>
            </div>
            <div class="row">
                <div class="span6">
                    <h3 class="infotitle">Properties of color spaces</h3>
                    <div class="info">
                        <p>
                            <b>RGB</b> or "Red Green Blue": the most easy to compute since it fits to how computer screens and TV work. Actually it fits quite well to our perception.
                        </p>
                        <p>
                            <b>HSV</b> or "Hue Saturation Value": used in softwares like Photoshop, since it allows to separate the hue (the color itself) for other parameters. It allows strong perceptual biases since the hues are not perceived with the same lightness (yellow is light, blue is dark...).
                        </p>
                        <p>
                            <b>HSL</b> or "Hue Saturation Lightness" is a variant of this space, and is biased as well.
                        </p>
                        <p>
                            <b>L*a*b*</b> or "Lightness* a* b*" is a space designed to fit to our perception. Lightness* is the unbiased version of lightness (a scale from black to color to white) and the a* and b* dimensions describe the colors (and grays).
                            It is not easy to deal with it, since every color does not exist, but it gives the most appropriate results.
                        </p>
                        <p>
                            <b>HCL</b> or "Hue Chroma Lightness*" is a transformation of L*a*b* where the Hue has been separated. It can be considered as the unbiased version of HSL, where saturation is named Chroma and the unbiased version of Lightness is Lightness* (the star indicates the difference).
                            Like with L*a*b*, every color does not exist. What's more, it is not a convex space, and this is an issue for computing colors. That's why I prefer L*a*b* to compute, but HCL is the best space to monitor results.
                        </p>
                    </div>
                </div>
                <div class="span6">
                    <h3 class="infotitle">Reading the color spaces</h3>
                    <div class="info">
                        <p>
                            The squares above are projections of different color spaces. Example: the RGB space is represented with R x G, G x B and R x B.
                            They allow you to determine where the colors accumulate and where they are sparse.
                            For instance you will observe that an even distribution in a given space (say, HSV) can be uneven in another space (RGB).
                        </p>
                        <p>
                            We assume that our goal is to generate varied colors. So we want to avoid accumulation, since it means that some colors are too similar, thus the palette is confusing.
                        </p>
                        <p>
                            The most suitable palettes are probably the ones that are evenly distributed in the L*a*b* color space.
                        </p>
                    </div>
                    <h3 class="infotitle">Reading sorted palettes</h3>
                    <div class="info">
                        <p>
                            The sorted palette contain the exact same colors (the ones that were generated) but sorted different ways.
                        </p>
                        <p>
                            The goal is just to check if there are similar colors. Sorting the colors allows to put similar colors together. For instance if two shades of blue are very similar, they will be put together in the "Hue" palette.
                        </p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="span12">
                    <h2>The "best" palette</h3>
                    <b>Sorted by differenciation first</b>
                    <div id="diff_div"></div>
                    <p>
                        Here are the colors sorted so that the most different colors are put first. This is very useful in many cases, since we often know what we want to differentiate in priority.
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="span6">
                    <h3>Hex colors as a list</h3>
                    <textarea id="output_hexlist" style="width:100%;height:100px;">
                    </textarea>
                </div>
                <div class="span6">
                    <h3>Hex colors as a json</h3>
                    <textarea id="output_hexjson" style="width:100%;height:100px;">
                    </textarea>
                </div>
            </div>

<?php include('includes/footer.php') ?>
        </div>
        
<?php include('includes/codebottom.php'); ?>

        <script src="js/libs/sigma.min.js"></script>
        <script src="js/libs/sigma.forceatlas2.js"></script>

        <script src="js/background.js"></script>
        <script src="js/colorspace.js"></script>
        <script src="js/presets.js"></script>
        <script src="js/selectors.js"></script>
        <script src="js/fitting.js"></script>
        <script src="js/palettegeneration.js"></script>
        <script src="js/colorpicker.js"></script>

        <script src="js/sandbox.js"></script>

<script>
// Settings
var resolution = 5;
var size = 150;
var radius = 8;

// Functions
var drawBackground;
var drawColors;

// Contexts
var hs_context, sl_context, hl_context, sv_context, hv_context, rg_context, gb_context, rb_context;
var random_context, h_context, s_context, l_context, v_context, r_context, g_context, b_context;

window.onload = function(){
    
    // Dynamic resize update
    window.onresize = function(){
        drawBackground();
    };
    
    drawBackground = function(){
        // Dynamic rescaling
        size = $("#hs_div").width() - 10 - 2 * radius;
        
        var actualsize = size + 2 * radius;
        
        // HS: hue x saturation
        $("#hs_div").html('<canvas id="hs_canvas" width="'+actualsize+'" height="'+actualsize+'" style="border:1px solid black">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var hs_canvas = document.getElementById('hs_canvas');
        hs_context = hs_canvas.getContext('2d');
        
        // SL: saturation x lightness
        $("#sl_div").html('<canvas id="sl_canvas" width="'+actualsize+'" height="'+actualsize+'" style="border:1px solid black">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var sl_canvas = document.getElementById('sl_canvas');
        sl_context = sl_canvas.getContext('2d');
        
        // HL: hue x lightness
        $("#hl_div").html('<canvas id="hl_canvas" width="'+actualsize+'" height="'+actualsize+'" style="border:1px solid black">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var hl_canvas = document.getElementById('hl_canvas');
        hl_context = hl_canvas.getContext('2d');
        
        // SV: saturation x value
        $("#sv_div").html('<canvas id="sv_canvas" width="'+actualsize+'" height="'+actualsize+'" style="border:1px solid black">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var sv_canvas = document.getElementById('sv_canvas');
        sv_context = sv_canvas.getContext('2d');
        
        // HV: hue x value
        $("#hv_div").html('<canvas id="hv_canvas" width="'+actualsize+'" height="'+actualsize+'" style="border:1px solid black">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var hv_canvas = document.getElementById('hv_canvas');
        hv_context = hv_canvas.getContext('2d');
        
        // RG: red x green
        $("#rg_div").html('<canvas id="rg_canvas" width="'+actualsize+'" height="'+actualsize+'" style="border:1px solid black">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var rg_canvas = document.getElementById('rg_canvas');
        rg_context = rg_canvas.getContext('2d');
        
        // GB: green x blue
        $("#gb_div").html('<canvas id="gb_canvas" width="'+actualsize+'" height="'+actualsize+'" style="border:1px solid black">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var gb_canvas = document.getElementById('gb_canvas');
        gb_context = gb_canvas.getContext('2d');
        
        // RB: red x blue
        $("#rb_div").html('<canvas id="rb_canvas" width="'+actualsize+'" height="'+actualsize+'" style="border:1px solid black">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var rb_canvas = document.getElementById('rb_canvas');
        rb_context = rb_canvas.getContext('2d');
        
        // L*a*: L* x a*
        $("#LStaraStar_div").html('<canvas id="LStaraStar_canvas" width="'+actualsize+'" height="'+actualsize+'" style="border:1px solid black">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var LStaraStar_canvas = document.getElementById('LStaraStar_canvas');
        LStaraStar_context = LStaraStar_canvas.getContext('2d');
        
        // L*b*: L* x b*
        $("#LStarbStar_div").html('<canvas id="LStarbStar_canvas" width="'+actualsize+'" height="'+actualsize+'" style="border:1px solid black">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var LStarbStar_canvas = document.getElementById('LStarbStar_canvas');
        LStarbStar_context = LStarbStar_canvas.getContext('2d');
        
        // a*b*: a* x b*
        $("#aStarbStar_div").html('<canvas id="aStarbStar_canvas" width="'+actualsize+'" height="'+actualsize+'" style="border:1px solid black">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var aStarbStar_canvas = document.getElementById('aStarbStar_canvas');
        aStarbStar_context = aStarbStar_canvas.getContext('2d');
        
        // h*L*: h* x L*
        $("#hStarLStar_div").html('<canvas id="hStarLStar_canvas" width="'+actualsize+'" height="'+actualsize+'" style="border:1px solid black">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var hStarLStar_canvas = document.getElementById('hStarLStar_canvas');
        hStarLStar_context = hStarLStar_canvas.getContext('2d');
        
        
        // Dynamic rescaling of stripes
        var stripSize = $("#width_reference").width();
        console.log(stripSize);
        
        // Random: random sort colors
        $("#random_div").html('<canvas id="random_canvas" height="30" width="'+stripSize+'" style="background-color:#EEE;">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var random_canvas = document.getElementById('random_canvas');
        random_context = random_canvas.getContext('2d');
        
        // H: Hue sort colors
        $("#h_div").html('<canvas id="h_canvas" height="30" width="'+stripSize+'" style="background-color:#EEE;">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var h_canvas = document.getElementById('h_canvas');
        h_context = h_canvas.getContext('2d');
        
        // S: Saturation sort colors
        $("#s_div").html('<canvas id="s_canvas" height="30" width="'+stripSize+'" style="background-color:#EEE;">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var s_canvas = document.getElementById('s_canvas');
        s_context = s_canvas.getContext('2d');
        
        // C: Chroma sort colors
        $("#c_div").html('<canvas id="c_canvas" height="30" width="'+stripSize+'" style="background-color:#EEE;">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var c_canvas = document.getElementById('c_canvas');
        c_context = c_canvas.getContext('2d');
        
        // L: Lightness sort colors
        $("#l_div").html('<canvas id="l_canvas" height="30" width="'+stripSize+'" style="background-color:#EEE;">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var l_canvas = document.getElementById('l_canvas');
        l_context = l_canvas.getContext('2d');
        
        // L*: L* sort colors
        $("#lStar_div").html('<canvas id="lStar_canvas" height="30" width="'+stripSize+'" style="background-color:#EEE;">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var lStar_canvas = document.getElementById('lStar_canvas');
        lStar_context = lStar_canvas.getContext('2d');
        
        // V: Value sort colors
        $("#v_div").html('<canvas id="v_canvas" height="30" width="'+stripSize+'" style="background-color:#EEE;">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var v_canvas = document.getElementById('v_canvas');
        v_context = v_canvas.getContext('2d');
        
        // R: Red sort colors
        $("#r_div").html('<canvas id="r_canvas" height="30" width="'+stripSize+'" style="background-color:#EEE;">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var r_canvas = document.getElementById('r_canvas');
        r_context = r_canvas.getContext('2d');
        
        // G: Green sort colors
        $("#g_div").html('<canvas id="g_canvas" height="30" width="'+stripSize+'" style="background-color:#EEE;">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var g_canvas = document.getElementById('g_canvas');
        g_context = g_canvas.getContext('2d');
        
        // B: Blue sort colors
        $("#b_div").html('<canvas id="b_canvas" height="30" width="'+stripSize+'" style="background-color:#EEE;">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var b_canvas = document.getElementById('b_canvas');
        b_context = b_canvas.getContext('2d');
        
        // Diff: Sort by differenciation first
        $("#diff_div").html('<canvas id="diff_canvas" height="30" width="'+stripSize+'" style="background-color:#EEE;">Your browser doesn\'t support CANVAS. Burn in Hell or get another one.</canvas>');
        var diff_canvas = document.getElementById('diff_canvas');
        diff_context = diff_canvas.getContext('2d');
        
        if(!$('#scatterplot').is(':checked')){
            // Draw HS with a fixed L of 0.5
            for(x=0; x<size; x+=resolution){
                for(y=0; y<size; y+=resolution){
                    var color = chroma.hsl(360*x/size, y/size, 0.5);
                    hs_context.fillStyle = color.hex();
                    hs_context.fillRect(radius + x, radius + y, resolution, resolution);
                }
            }
            
            // Draw SL with a fixed H of 200°
            for(x=0; x<size; x+=resolution){
                for(y=0; y<size; y+=resolution){
                    var color = chroma.hsl(200, x/size, y/size);
                    sl_context.fillStyle = color.hex();
                    sl_context.fillRect(radius + x, radius + y, resolution, resolution);
                }
            }
            
            // Draw HL with a fixed S of 0.8
            for(x=0; x<size; x+=resolution){
                for(y=0; y<size; y+=resolution){
                    var color = chroma.hsl(360*x/size, 0.8, y/size);
                    hl_context.fillStyle = color.hex();
                    hl_context.fillRect(radius + x, radius + y, resolution, resolution);
                }
            }
            
            // Draw SV with a fixed H of 0.5
            for(x=0; x<size; x+=resolution){
                for(y=0; y<size; y+=resolution){
                    var color = chroma.hsv(200, x/size, y/size);
                    sv_context.fillStyle = color.hex();
                    sv_context.fillRect(radius + x, radius + y, resolution, resolution);
                }
            }
            
            // Draw HV with a fixed S of 0.8
            for(x=0; x<size; x+=resolution){
                for(y=0; y<size; y+=resolution){
                    var color = chroma.hsv(360*x/size, 0.8, y/size);
                    hv_context.fillStyle = color.hex();
                    hv_context.fillRect(radius + x, radius + y, resolution, resolution);
                }
            }
            
            // Draw RG with a fixed B of 0
            for(x=0; x<size; x+=resolution){
                for(y=0; y<size; y+=resolution){
                    var color = chroma.rgb(255*x/size, 255*y/size, 0);
                    rg_context.fillStyle = color.hex();
                    rg_context.fillRect(radius + x, radius + y, resolution, resolution);
                }
            }
            
            // Draw GB with a fixed R of 0
            for(x=0; x<size; x+=resolution){
                for(y=0; y<size; y+=resolution){
                    var color = chroma.rgb(0, 255*x/size, 255*y/size);
                    gb_context.fillStyle = color.hex();
                    gb_context.fillRect(radius + x, radius + y, resolution, resolution);
                }
            }
            
            // Draw RB with a fixed G of 0
            for(x=0; x<size; x+=resolution){
                for(y=0; y<size; y+=resolution){
                    var color = chroma.rgb(255*x/size, 0, 255*y/size);
                    rb_context.fillStyle = color.hex();
                    rb_context.fillRect(radius + x, radius + y, resolution, resolution);
                }
            }
            
            // Draw L*a* with a fixed b* of 0
            for(x=0; x<size; x+=resolution){
                for(y=0; y<size; y+=resolution){
                    var color = chroma.lab(x/size, -1 + 2*y/size, 0);
                    if(isNaN(color.rgb[0])){
                        LStaraStar_context.fillStyle = Math.round((x+y)/resolution%2)==0?"#CCCCCC":"#EEEEEE";
                    } else {
                        LStaraStar_context.fillStyle = color.hex();
                    }
                    LStaraStar_context.fillRect(radius + x, radius + y, resolution, resolution);
                }
            }
            
            // Draw L*b* with a fixed a* of 0
            for(x=0; x<size; x+=resolution){
                for(y=0; y<size; y+=resolution){
                    var color = chroma.lab(x/size, 0, -1 + 2*y/size);
                    if(isNaN(color.rgb[0])){
                        LStarbStar_context.fillStyle = Math.round((x+y)/resolution%2)==0?"#CCCCCC":"#EEEEEE";
                    } else {
                        LStarbStar_context.fillStyle = color.hex();
                    }
                    LStarbStar_context.fillRect(radius + x, radius + y, resolution, resolution);
                }
            }
            
            // Draw a*b* with a fixed L* of 0.6
            for(x=0; x<size; x+=resolution){
                for(y=0; y<size; y+=resolution){
                    var color = chroma.lab(0.6, -1 + 2*x/size, -1 + 2*y/size);
                    if(isNaN(color.rgb[0])){
                        aStarbStar_context.fillStyle = Math.round((x+y)/resolution%2)==0?"#CCCCCC":"#EEEEEE";
                    } else {
                        aStarbStar_context.fillStyle = color.hex();
                    }
                    aStarbStar_context.fillRect(radius + x, radius + y, resolution, resolution);
                }
            }
            
            // Draw h*L* with a fixed c of 1
            for(x=0; x<size; x+=resolution){
                for(y=0; y<size; y+=resolution){
                    var color = chroma.hcl(360*x/size, 1, 1.6 * y/size);
                    if(isNaN(color.rgb[0])){
                        hStarLStar_context.fillStyle = Math.round((x+y)/resolution%2)==0?"#CCCCCC":"#EEEEEE";
                    } else {
                        hStarLStar_context.fillStyle = color.hex();
                    }
                    hStarLStar_context.fillRect(radius + x, radius + y, resolution, resolution);
                }
            }
        }
    }
    
    drawColors = function(colors){
        colors.forEach(function(color){
            var rgb = color.rgb;
            var hsl = color.hsl();
            var hsv = color.hsv();
            var hcl = color.hcl();
            var lab = color.lab();
            var x, y;
            
            var scatterplot_style = $('#scatterplot').is(':checked');
            
            // HS
            x = Math.round(hsl[0] * size / 360);
            y = Math.round(hsl[1] * size);
            drawMark(hs_context, x, y, color, scatterplot_style);
            
            // SL
            x = Math.round(hsl[1] * size);
            y = Math.round(hsl[2] * size);
            drawMark(sl_context, x, y, color, scatterplot_style);
            
            // HL
            x = Math.round(hsl[0] * size / 360);
            y = Math.round(hsl[2] * size);
            drawMark(hl_context, x, y, color, scatterplot_style);
            
            // SV
            x = Math.round(hsv[1] * size);
            y = Math.round(hsv[2] * size);
            drawMark(sv_context, x, y, color, scatterplot_style);
            
            // HV
            x = Math.round(hsv[0] * size / 360);
            y = Math.round(hsv[2] * size);
            drawMark(hv_context, x, y, color, scatterplot_style);
            
            // RG
            x = Math.round(rgb[0] * size / 255);
            y = Math.round(rgb[1] * size / 255);
            drawMark(rg_context, x, y, color, scatterplot_style);
            
            // GB
            x = Math.round(rgb[1] * size / 255);
            y = Math.round(rgb[2] * size / 255);
            drawMark(gb_context, x, y, color, scatterplot_style);
            
            // RB
            x = Math.round(rgb[0] * size / 255);
            y = Math.round(rgb[2] * size / 255);
            drawMark(rb_context, x, y, color, scatterplot_style);
            
            // L*a*
            x = Math.round(lab[0] * size);
            y = Math.round((lab[1] + 1) * size / 2);
            drawMark(LStaraStar_context, x, y, color, scatterplot_style);
            
            // L*b*
            x = Math.round(lab[0] * size);
            y = Math.round((lab[2] + 1) * size / 2);
            drawMark(LStarbStar_context, x, y, color, scatterplot_style);
            
            // a*b*
            x = Math.round((lab[1] + 1) * size / 2);
            y = Math.round((lab[2] + 1) * size / 2);
            drawMark(aStarbStar_context, x, y, color, scatterplot_style);
            
            // h*L*
            x = Math.round(hcl[0] * size / 360);
            y = Math.round(hcl[2] * size / 1.6);
            drawMark(hStarLStar_context, x, y, color, scatterplot_style);
        });
        
        // Sorted Colors
        rgbColors = colors.map(function(color){
            return color.rgb;
        });
        hslColors = colors.map(function(color){
            return color.hsl();
        });
        hsvColors = colors.map(function(color){
            return color.hsv();
        });
        hclColors = colors.map(function(color){
            return color.hcl();
        });
        
        // Random
        drawRibbon(colors, random_context);
        
        // H
        hslColors.sort(function(a,b){
            var A = a[0] || 0;
            var B = b[0] || 0;
            if(A > B)
                return 1;
            if(A < B)
                return -1;
            return 0;
        });
        drawRibbon(hslColors.map(function(hsl){
            return chroma.hsl(hsl);
        }), h_context);
        
        // S
        hsvColors.sort(function(a,b){
            var A = a[1] || 0;
            var B = b[1] || 0;
            if(A > B)
                return 1;
            if(A < B)
                return -1;
            return 0;
        });
        drawRibbon(hsvColors.map(function(hsv){
            return chroma.hsv(hsv);
        }), s_context);
        
        // C
        hclColors.sort(function(a,b){
            var A = a[1] || 0;
            var B = b[1] || 0;
            if(A > B)
                return 1;
            if(A < B)
                return -1;
            return 0;
        });
        drawRibbon(hclColors.map(function(hcl){
            return chroma.hcl(hcl);
        }), c_context);
        
        // L
        hslColors.sort(function(a,b){
            var A = a[2] || 0;
            var B = b[2] || 0;
            if(A > B)
                return 1;
            if(A < B)
                return -1;
            return 0;
        });
        drawRibbon(hslColors.map(function(hsl){
            return chroma.hsl(hsl);
        }), l_context);
        
        // L*
        hclColors.sort(function(a,b){
            var A = a[2] || 0;
            var B = b[2] || 0;
            if(A > B)
                return 1;
            if(A < B)
                return -1;
            return 0;
        });
        drawRibbon(hclColors.map(function(hcl){
            return chroma.hcl(hcl);
        }), lStar_context);
        
        // V
        hsvColors.sort(function(a,b){
            var A = a[2] || 0;
            var B = b[2] || 0;
            if(A > B)
                return 1;
            if(A < B)
                return -1;
            return 0;
        });
        drawRibbon(hsvColors.map(function(hsv){
            return chroma.hsv(hsv);
        }), v_context);
        
        // R
        rgbColors.sort(function(a,b){
            var A = a[0] || 0;
            var B = b[0] || 0;
            if(A > B)
                return 1;
            if(A < B)
                return -1;
            return 0;
        });
        drawRibbon(rgbColors.map(function(rgb){
            return chroma.rgb(rgb);
        }), r_context);
        
        // G
        rgbColors.sort(function(a,b){
            var A = a[1] || 0;
            var B = b[1] || 0;
            if(A > B)
                return 1;
            if(A < B)
                return -1;
            return 0;
        });
        drawRibbon(rgbColors.map(function(rgb){
            return chroma.rgb(rgb);
        }), g_context);
        
        // B
        rgbColors.sort(function(a,b){
            var A = a[2] || 0;
            var B = b[2] || 0;
            if(A > B)
                return 1;
            if(A < B)
                return -1;
            return 0;
        });
        drawRibbon(rgbColors.map(function(rgb){
            return chroma.rgb(rgb);
        }), b_context);
        
        // Diff
        var colorsToSort = colors.slice(0);
        var diffColors = [colorsToSort.shift()];
        while(colorsToSort.length>0){
            if(diffColors.length < 10){
                var index = -1;
                var maxDistance = -1;
                for(candidate_index=0; candidate_index<colorsToSort.length; candidate_index++){
                    var d = 1000000000;
                    for(i=0; i<diffColors.length; i++){
                        var colorA = colorsToSort[candidate_index].lab();
                        var colorB = diffColors[i].lab();
                        var dl = colorA[0]-colorB[0];
                        var da = colorA[1]-colorB[1];
                        var db = colorA[2]-colorB[2];
                        d = Math.min(d, Math.sqrt(Math.pow(dl, 2)+Math.pow(da, 2)+Math.pow(db, 2)));
                    }
                    if(d > maxDistance){
                        maxDistance = d;
                        index = candidate_index;
                    }
                }
            } else {
                index = 0;
            }
            var color = colorsToSort[index];
            diffColors.push(color);
            colorsToSort = colorsToSort.filter(function(c,i){return i!=index;});
        }
        drawRibbon(diffColors, diff_context);
        
        // Output
        $('#output_hexlist').html(
            diffColors.map(function(color){
                return color.hex();
            }).join("\n")
        );
        $('#output_hexjson').html(
            "[\n"+
            diffColors.map(function(color){
                return "\t\""+color.hex()+"\"";
            }).join(",\n")
            +"\n]"
        );
        
        
        // Functions
        
        function drawMark(context, x, y, color, scatterplot_style){
            if(scatterplot_style){
                context.beginPath();
                context.fillStyle = "rgba(0,0,0,0.05)";
                context.arc(radius + x, radius + y, 2, 0, Math.PI*2, true);
                context.fill();
                
                context.beginPath();
                context.fillStyle = "#000000";
                context.arc(radius + x, radius + y, 0.5, 0, Math.PI*2, true);
                context.fill();
            } else {
                context.beginPath();
                context.arc(radius + x, radius + y, radius, 0, Math.PI*2, true);
                context.fillStyle = "#333333";
                context.fill();
                
                context.beginPath();
                context.fillStyle = "#FFFFFF";
                context.arc(radius + x, radius + y, radius-1, 0, Math.PI*2, true);
                context.fill();
                
                context.beginPath();
                context.fillStyle = color.hex();
                context.arc(radius + x, radius + y, radius-3, 0, Math.PI*2, true);
                context.fill();
            }
        }
        
        function drawRibbon(colors, context){
            var W = context.canvas.width;
            var H = context.canvas.height;
            var w = W/colors.length;
            colors.forEach(function(color, i){
                context.fillStyle = color.hex();
                context.fillRect(i*w, 0, w, H);
            });
        }
    }
    
    drawBackground();
}
</script>
    </body>
</html>
