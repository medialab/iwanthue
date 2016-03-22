var fitting_top_bottom_size = 10;
var fitting_band_size = 1;
var fitting_margin = 0;

var sourcePalette = false;

var fitting = false;

var initFitting = function(){
	$("#refine").show();
	
	fitting = {
		activeWidth:30,
		ratio:0,
		old_ratio:0,
		drag:false,
		crosshair:false,
		correction:false
	};
	
	var width = $("#refine").width();
	var height = 24;
	
	$("#refine").html(
		'<h3>Fit to color space</h3>'
		+'<canvas id="fit_canvas" width="'+width+'" height="'+height+'">Your browser doesn\'t support CANVAS.</canvas><br/><br/>'
	);
	var fit_canvas = document.getElementById('fit_canvas');
	fit_context = fit_canvas.getContext('2d');
	
	// Interactions
	$("#refine").unbind();
	$("#refine").mousedown(function(event){
		event.stopPropagation();
		var offsetX = Math.round(event.pageX - $(event.target).position().left);
		
		if(Math.abs(offsetX-(width-height)*fitting.ratio)<fitting.activeWidth){
			fitting.drag = true;
		}
	});
	$("#refine").mousemove(function(event){
		event.stopPropagation();
		var offsetX = Math.round(event.pageX - $(event.target).position().left);
		
		// Display cursor
		if(Math.abs(offsetX-(width-height)*fitting.ratio)<fitting.activeWidth){
			$('#refine').addClass('hover');
		} else {
			$('#refine').removeClass('hover');
		}
		
		updateFittingDisplay();
	});
	$("#refine").mouseout(function(event){
		event.stopPropagation();
		if(!fitting.drag){
			updateFittingDisplay();
		}
	});
	
	$("#refine").mousemove(function(event){
		// Drag
		var offsetX = Math.round(event.pageX - $("#refine").position().left);

		if(fitting.drag){
			fitting.ratio = offsetX/(width-height);
			fitting.ratio = Math.min(1, Math.max(0, fitting.ratio));
			updateFittingDisplay();
			actualizePalette();
		}
	});

	$("#refine").mouseup(function(event){
		event.stopPropagation();
		fitting.old_ratio = fitting.ratio;
		fitting.drag = false;
		updateFittingDisplay();
		actualizePalette();
		updateColorSpace(palette.map(function(c){return c.color;}), true);
	});

	$("#refine").mouseleave(function(event){
		if(fitting.drag){
			fitting.drag = false;
			fitting.ratio = fitting.old_ratio;
			updateFittingDisplay();
			actualizePalette();
			updateColorSpace(palette.map(function(c){return c.color;}), true);
		}
	});

	sourcePalette = palette;
	
	setFitting();
}

var setFitting = function(){
	var subspaceSamples = getSubColorSpace();
	
	// Variables
	var hmin = +$('#hmin').val();
	var hmax = +$('#hmax').val();
	var cmin = +$('#cmin').val();
	var cmax = +$('#cmax').val();
	var lmin = +$('#lmin').val();
	var lmax = +$('#lmax').val();
	var distanceType = $('#colorblindFriendly').is(':checked') ? ('Compromise') : ('Default')
	
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
	var colorspaceSelector = function(hcl){
		return hcondition(hcl) && ccondition(hcl) && lcondition(hcl);
	}
	
	// Correction
	fitting.correction = kMeans(sourcePalette, subspaceSamples, colorspaceSelector, 10, distanceType);
	
	updateFittingDisplay();
}

var updateFittingDisplay = function(){
	var steps = 18;
	
	// Cursors
	var w = $("#fit_canvas").width();
	var h = $("#fit_canvas").height();
	var m = Math.ceil(h/2);
	var band_h = h/sourcePalette.length;

	var crosshair_x = m + fitting.ratio*(w-2*m);

	fit_context.clearRect(0, 0, w, h);
	
	sourcePalette.forEach(function(c,i){
		for(x=0; x<1; x+=1/steps){
			var color = chroma.interpolate(c.color, fitting.correction[i], x+1/steps, 'lab');
			fit_context.fillStyle = color.hex();
			fit_context.fillRect(Math.floor(m+x*(w - 2*m)), band_h*i, Math.ceil((w-2*m)/steps), band_h);
		}
	});

	drawFittingSelector(w, h, m);
}

var drawFittingSelector = function(w, h, m){
	fit_context.fillStyle = '#000';
	fit_context.beginPath();
	fit_context.moveTo(m+fitting.ratio*(w-2*m), 0);
	fit_context.lineTo(m+fitting.ratio*(w-2*m)+m, h/2);
	fit_context.lineTo(m+fitting.ratio*(w-2*m), h);
	fit_context.lineTo(m+fitting.ratio*(w-2*m)-m, h/2);
	fit_context.lineTo(m+fitting.ratio*(w-2*m), 0);
	fit_context.closePath();
	fit_context.fill();
}

var actualizePalette = function(){
	palette = sourcePalette.map(function(c,i){
		var color = chroma.interpolate(c.color, fitting.correction[i], fitting.ratio, 'lab');
		$('#palette_color_'+i).css('background-color', color.hex());
		return {color:color, hex:color.hex(), hcl:color.hcl(), lab:color.lab()};
	});
}

var kMeans = function(palette_, colorSamples_chroma, colorspaceSelector, steps, distanceType){
	var kMeans = palette_.map(function(c){return c.lab;});
	var colorSamples = colorSamples_chroma.map(function(color){return color.lab();});
	var samplesClosest = colorSamples_chroma.map(function(color){return null;});
	
	while(steps-- > 0){
		// kMeans -> Samples Closest
		for(i=0; i<colorSamples.length; i++){
			var lab = colorSamples[i];
			var minDistance = Infinity;
			for(j=0; j<kMeans.length; j++){
				var kMean = kMeans[j];
				var distance = paletteGenerator.getColorDistance(lab, kMean, distanceType);
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
			
			var settled = locks[j]
			if(settled){
				// We do note change the kMean for its new version
			} else {
				if(count!=0 && colorspaceSelector(chroma.lab(candidateKMean[0], candidateKMean[1], candidateKMean[2])) && candidateKMean){
					kMeans[j] = candidateKMean;
				} else {
					// The candidate kMean is out of the boundaries of the color space, or unfound.
					if(freeColorSamples.length>0){
						// We just search for the closest FREE color of the candidate kMean
						var minDistance = Infinity;
						var closest = -1;
						for(i=0; i<freeColorSamples.length; i++){
							var distance = paletteGenerator.getColorDistance(freeColorSamples[i], candidateKMean, distanceType);
							if(distance < minDistance){
								minDistance = distance;
								closest = i;
							}
						}
						kMeans[j] = freeColorSamples[closest];
					} else {
						// Then we just search for the closest color of the candidate kMean
						var minDistance = Infinity;
						var closest = -1;
						for(i=0; i<colorSamples.length; i++){
							var distance = paletteGenerator.getColorDistance(colorSamples[i], candidateKMean, distanceType);
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