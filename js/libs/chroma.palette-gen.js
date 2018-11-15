/**
      chroma.palette-gen.js - a palette generator for data scientists
	  based on Chroma.js HCL color space
      Copyright (C) 2016  Mathieu Jacomy
  
  	The JavaScript code in this page is free software: you can
      redistribute it and/or modify it under the terms of the GNU
      General Public License (GNU GPL) as published by the Free Software
      Foundation, either version 3 of the License, or (at your option)
      any later version.  The code is distributed WITHOUT ANY WARRANTY;
      without even the implied warranty of MERCHANTABILITY or FITNESS
      FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
  
      As additional permission under GNU GPL version 3 section 7, you
      may distribute non-source (e.g., minimized or compacted) forms of
      that code without the copy of the GNU GPL normally required by
      section 4, provided you include this license notice and a URL
      through which recipients can access the Corresponding Source.  
  */
 
// v0.2
 
var paletteGenerator = (function(undefined){
	ns = {}

	ns.generate = function(colorsCount, checkColor, forceMode, quality, ultra_precision, distanceType){
		// Default
		if(colorsCount === undefined)
			colorsCount = 8;
		if(checkColor === undefined)
			checkColor = function(x){return true;};
		if(forceMode === undefined)
			forceMode = false;
		if(quality === undefined)
			quality = 50;
		if(distanceType === undefined)
			distanceType = 'Default';
		ultra_precision = ultra_precision || false

		console.log('Generate palettes for '+colorsCount+' colors using color distance "'+distanceType+'"')

		if(forceMode){
			// Force Vector Mode
			
			var colors = [];
			
			// It will be necessary to check if a Lab color exists in the rgb space.
			function checkLab(lab){
				var color = chroma.lab(lab[0], lab[1], lab[2]);
				return ns.validateLab(lab) && checkColor(color);
			}
			
			// Init
			var vectors = {};
			for(i=0; i<colorsCount; i++){
				// Find a valid Lab color
				var color = [100*Math.random(),100*(2*Math.random()-1),100*(2*Math.random()-1)];
				while(!checkLab(color)){
					color = [100*Math.random(),100*(2*Math.random()-1),100*(2*Math.random()-1)];
				}
				colors.push(color);
			}
			
			// Force vector: repulsion
			var repulsion = 100;
			var speed = 100;
			var steps = quality * 20;
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
						var d = ns.getColorDistance(colorA, colorB, distanceType)
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
							vectors[j].dl += 2 - 4 * Math.random();
							vectors[j].da += 2 - 4 * Math.random();
							vectors[j].db += 2 - 4 * Math.random();
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
				}
			}
			return colors.map(function(lab){return chroma.lab(lab[0], lab[1], lab[2]);});
			
		} else {
			
			// K-Means Mode
			function checkColor2(lab){
				// Check that a color is valid: it must verify our checkColor condition, but also be in the color space
				var color = chroma.lab(lab);
				var hcl = color.hcl();
				return ns.validateLab(lab) && checkColor(color);
			}
			
			var kMeans = [];
			for(i=0; i<colorsCount; i++){
				var lab = [100*Math.random(),100*(2*Math.random()-1),100*(2*Math.random()-1)];
				var failsafe=10;
				while(!checkColor2(lab) && failsafe-->0){
					lab = [100*Math.random(),100*(2*Math.random()-1),100*(2*Math.random()-1)];
				}
				kMeans.push(lab);
			}

			
			var colorSamples = [];
			var samplesClosest = [];
			if(ultra_precision){
				for(l=0; l<=100; l+=1){
					for(a=-100; a<=100; a+=5){
						for(b=-100; b<=100; b+=5){
							if(checkColor2([l, a, b])){
								colorSamples.push([l, a, b]);
								samplesClosest.push(null);
							}
						}
					}
				}
			} else {
				for(l=0; l<=100; l+=5){
					for(a=-100; a<=100; a+=10){
						for(b=-100; b<=100; b+=10){
							if(checkColor2([l, a, b])){
								colorSamples.push([l, a, b]);
								samplesClosest.push(null);
							}
						}
					}
				}
			}

			// Steps
			var steps = quality;
			while(steps-- > 0){
				// kMeans -> Samples Closest
				for(i=0; i<colorSamples.length; i++){
					var lab = colorSamples[i];
					var minDistance = Infinity;
					for(j=0; j<kMeans.length; j++){
						var kMean = kMeans[j];
						var distance = ns.getColorDistance(lab, kMean, distanceType);
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
					}
					
					if(count!=0 && checkColor2([candidateKMean[0], candidateKMean[1], candidateKMean[2]]) && candidateKMean){
						kMeans[j] = candidateKMean;
					} else {
						// The candidate kMean is out of the boundaries of the color space, or unfound.
						if(freeColorSamples.length>0){
							// We just search for the closest FREE color of the candidate kMean
							var minDistance = Infinity;
							var closest = -1;
							for(i=0; i<freeColorSamples.length; i++){
								var distance = ns.getColorDistance(freeColorSamples[i], candidateKMean, distanceType);
								if(distance < minDistance){
									minDistance = distance;
									closest = i;
								}
							}
							if (closest>=0)
								kMeans[j] = colorSamples[closest];

						} else {
							// Then we just search for the closest color of the candidate kMean
							var minDistance = Infinity;
							var closest = -1;
							for(i=0; i<colorSamples.length; i++){
								var distance = ns.getColorDistance(colorSamples[i], candidateKMean, distanceType)
								if(distance < minDistance){
									minDistance = distance;
									closest = i;
								}
							}
							if (closest>=0)
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
			return kMeans.map(function(lab){return chroma.lab(lab[0], lab[1], lab[2]);});
		}
	}

	ns.diffSort = function(colorsToSort, distanceType){
		// Sort
		var diffColors = [colorsToSort.shift()];
		while(colorsToSort.length>0){
			var index = -1;
			var maxDistance = -1;
			for(candidate_index=0; candidate_index<colorsToSort.length; candidate_index++){
				var d = Infinity;
				for(i=0; i<diffColors.length; i++){
					var colorA = colorsToSort[candidate_index].lab();
					var colorB = diffColors[i].lab();
					var d = ns.getColorDistance(colorA, colorB, distanceType);
				}
				if(d > maxDistance){
					maxDistance = d;
					index = candidate_index;
				}
			}
			var color = colorsToSort[index];
			diffColors.push(color);
			colorsToSort = colorsToSort.filter(function(c,i){return i!=index;});
		}
		return diffColors;
	}

	ns.getColorDistance = function(lab1, lab2, _type) {

		var type = _type || 'Default'

		if (type == 'Default') return _euclidianDistance(lab1, lab2)
		if (type == 'Euclidian') return _euclidianDistance(lab1, lab2)
		if (type == 'CMC') return _cmcDistance(lab1, lab2, 2, 1)
		if (type == 'Compromise') return compromiseDistance(lab1, lab2)
		else return distanceColorblind(lab1, lab2, type)

		function distanceColorblind(lab1, lab2, type) {
			var lab1_cb = ns.simulate(lab1, type);
			var lab2_cb = ns.simulate(lab2, type);
			return _cmcDistance(lab1_cb, lab2_cb, 2, 1);
		}

		function compromiseDistance(lab1, lab2) {
			var distances = []
			var coeffs = []
			distances.push(_cmcDistance(lab1, lab2, 2, 1))
			coeffs.push(1000)
			var types = ['Protanope', 'Deuteranope', 'Tritanope']
			types.forEach(function(type){
				var lab1_cb = ns.simulate(lab1, type);
				var lab2_cb = ns.simulate(lab2, type);
				if( !(lab1_cb.some(isNaN) || lab2_cb.some(isNaN)) ) {
					var c
					switch (type) {
						case('Protanope'):
							c = 100;
							break;
						case('Deuteranope'):
							c = 500;
							break;
						case('Tritanope'):
							c = 1;
							break;
					}
					distances.push(_cmcDistance(lab1_cb, lab2_cb, 2, 1))
					coeffs.push(c)
				}
			})
			var total = 0
			var count = 0
			distances.forEach(function(d, i){
				total += coeffs[i] * d
				count += coeffs[i]
			})
			return total / count;
		}

		function _euclidianDistance(lab1, lab2) {
			return Math.sqrt(Math.pow(lab1[0]-lab2[0], 2) + Math.pow(lab1[1]-lab2[1], 2) + Math.pow(lab1[2]-lab2[2], 2));
		}

		// http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CMC.html
		function _cmcDistance(lab1, lab2, l, c) {
			var L1 = lab1[0]
			var L2 = lab2[0]
			var a1 = lab1[1]
			var a2 = lab2[1]
			var b1 = lab1[2]
			var b2 = lab2[2]
			var C1 = Math.sqrt(Math.pow(a1, 2) + Math.pow(b1, 2))
			var C2 = Math.sqrt(Math.pow(a2, 2) + Math.pow(b2, 2))
			var deltaC = C1 - C2
			var deltaL = L1 - L2
			var deltaa = a1 - a2
			var deltab = b1 - b2
			var deltaH = Math.sqrt(Math.pow(deltaa, 2) + Math.pow(deltab, 2) + Math.pow(deltaC, 2))
			var H1 = Math.atan2(b1, a1) * (180 / Math.PI)
			while (H1 < 0) { H1 += 360 }
			var F = Math.sqrt( Math.pow(C1, 4) / ( Math.pow(C1, 4) + 1900 ) )
			var T = (164 <= H1 && H1 <= 345) ? ( 0.56 + Math.abs(0.2 * Math.cos(H1 + 168)) ) : ( 0.36 + Math.abs(0.4 * Math.cos(H1 + 35)) )
			var S_L = (lab1[0]<16) ? (0.511) : (0.040975 * L1 / (1 + 0.01765 * L1) )
			var S_C = (0.0638 * C1 / (1 + 0.0131 * C1)) + 0.638
			var S_H = S_C * (F*T + 1 - F)
			var result = Math.sqrt( Math.pow(deltaL/(l*S_L), 2) + Math.pow(deltaC/(c*S_C), 2) + Math.pow(deltaH/S_H, 2) )
			return result
		}

	}

	ns.confusionLines = {
		"Protanope": {
			x: 0.7465,
			y: 0.2535,
			m: 1.273463,
			yint: -0.073894
		},
		"Deuteranope": {
			x: 1.4,
			y: -0.4,
			m: 0.968437,
			yint: 0.003331
		},
		"Tritanope": {
			x: 0.1748,
			y: 0.0,
			m: 0.062921,
			yint: 0.292119
		}
	}

	ns.simulate_cache = {}

	ns.simulate = function(lab, type, _amount) {
		// WARNING: may return [NaN, NaN, NaN]

		var amount = _amount || 1

		// Cache
		var key = lab.join('-') + '-' + type + '-' + amount
		var cache = ns.simulate_cache[key]
		if (cache) return cache

		// Get data from type
		var confuse_x = ns.confusionLines[type].x;
		var confuse_y = ns.confusionLines[type].y; 
		var confuse_m = ns.confusionLines[type].m;
		var confuse_yint = ns.confusionLines[type].yint;

		// Code adapted from http://galacticmilk.com/labs/Color-Vision/Javascript/Color.Vision.Simulate.js
		var color = chroma.lab(lab[0], lab[1], lab[2]);
		var sr = color.rgb()[0];
		var sg = color.rgb()[1];
		var sb = color.rgb()[2];
		var dr = sr; // destination color
		var dg = sg;
		var db = sb;
		// Convert source color into XYZ color space
		var pow_r = Math.pow(sr, 2.2);
		var pow_g = Math.pow(sg, 2.2);
		var pow_b = Math.pow(sb, 2.2);
		var X = pow_r * 0.412424  + pow_g * 0.357579 + pow_b * 0.180464; // RGB->XYZ (sRGB:D65)
		var Y = pow_r * 0.212656  + pow_g * 0.715158 + pow_b * 0.0721856;
		var Z = pow_r * 0.0193324 + pow_g * 0.119193 + pow_b * 0.950444;
		// Convert XYZ into xyY Chromacity Coordinates (xy) and Luminance (Y)
		var chroma_x = X / (X + Y + Z);
		var chroma_y = Y / (X + Y + Z);
		// Generate the "Confusion Line" between the source color and the Confusion Point
		var m = (chroma_y - confuse_y) / (chroma_x - confuse_x); // slope of Confusion Line
		var yint = chroma_y - chroma_x * m; // y-intercept of confusion line (x-intercept = 0.0)
		// How far the xy coords deviate from the simulation
		var deviate_x = (confuse_yint - yint) / (m - confuse_m);
		var deviate_y = (m * deviate_x) + yint;
		// Compute the simulated color's XYZ coords
		var X = deviate_x * Y / deviate_y;
		var Z = (1.0 - (deviate_x + deviate_y)) * Y / deviate_y;
		// Neutral grey calculated from luminance (in D65)
		var neutral_X = 0.312713 * Y / 0.329016; 
		var neutral_Z = 0.358271 * Y / 0.329016; 
		// Difference between simulated color and neutral grey
		var diff_X = neutral_X - X;
		var diff_Z = neutral_Z - Z;
		diff_r = diff_X * 3.24071 + diff_Z * -0.498571; // XYZ->RGB (sRGB:D65)
		diff_g = diff_X * -0.969258 + diff_Z * 0.0415557;
		diff_b = diff_X * 0.0556352 + diff_Z * 1.05707;
		// Convert to RGB color space
		dr = X * 3.24071 + Y * -1.53726 + Z * -0.498571; // XYZ->RGB (sRGB:D65)
		dg = X * -0.969258 + Y * 1.87599 + Z * 0.0415557;
		db = X * 0.0556352 + Y * -0.203996 + Z * 1.05707;
		// Compensate simulated color towards a neutral fit in RGB space
		var fit_r = ((dr < 0.0 ? 0.0 : 1.0) - dr) / diff_r;
		var fit_g = ((dg < 0.0 ? 0.0 : 1.0) - dg) / diff_g;
		var fit_b = ((db < 0.0 ? 0.0 : 1.0) - db) / diff_b;
		var adjust = Math.max( // highest value
			(fit_r > 1.0 || fit_r < 0.0) ? 0.0 : fit_r, 
			(fit_g > 1.0 || fit_g < 0.0) ? 0.0 : fit_g, 
			(fit_b > 1.0 || fit_b < 0.0) ? 0.0 : fit_b
		);
		// Shift proportional to the greatest shift
		dr = dr + (adjust * diff_r);
		dg = dg + (adjust * diff_g);
		db = db + (adjust * diff_b);
		// Apply gamma correction
		dr = Math.pow(dr, 1.0 / 2.2);
		dg = Math.pow(dg, 1.0 / 2.2);
		db = Math.pow(db, 1.0 / 2.2);
		// Anomylize colors
		dr = sr * (1.0 - amount) + dr * amount; 
		dg = sg * (1.0 - amount) + dg * amount;
		db = sb * (1.0 - amount) + db * amount;
		var dcolor = chroma.rgb(dr, dg, db);
		var result = dcolor.lab()
		ns.simulate_cache[key] = result
		return result
	}

	ns.validateLab = function(lab) {
		// Code from Chroma.js 2016
		
		var LAB_CONSTANTS = {
	    // Corresponds roughly to RGB brighter/darker
	    Kn: 18,
	    
	    // D65 standard referent
	    Xn: 0.950470,
	    Yn: 1,
	    Zn: 1.088830,
			
	    t0: 0.137931034,  // 4 / 29
	    t1: 0.206896552,  // 6 / 29
	    t2: 0.12841855,   // 3 * t1 * t1
	    t3: 0.008856452   // t1 * t1 * t1
		}

		var l = lab[0]
		var a = lab[1]
		var b = lab[2]

		var y = (l + 16) / 116
    var x = (isNaN(a)) ? (y) : (y + a / 500)
    var z = (isNaN(b)) ? (y) : (y - b / 200)

    y = LAB_CONSTANTS.Yn * lab_xyz(y)
    x = LAB_CONSTANTS.Xn * lab_xyz(x)
    z = LAB_CONSTANTS.Zn * lab_xyz(z)

    var r = xyz_rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z)  // D65 -> sRGB
    var g = xyz_rgb( -0.9692660 * x + 1.8760108 * y + 0.0415560 * z)
    var b = xyz_rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z)

    return r >= 0 && r <= 255
    		&& g >= 0 && g <= 255
    		&& b >= 0 && b <= 255

    function xyz_rgb(r) {
	    return Math.round(255 * ( (r <= 0.00304) ? (12.92 * r) : (1.055 * Math.pow(r, 1 / 2.4) - 0.055) ) )
	  }

		function lab_xyz(t) {
		  return (t > LAB_CONSTANTS.t1) ? (t * t * t) : ( LAB_CONSTANTS.t2 * (t - LAB_CONSTANTS.t0) )
		}
	}

	return ns
})();