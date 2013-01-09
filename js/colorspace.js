function updateColorSpace(colors, keepPositions){
	var subspaceSamples = getSubColorSpace();
	
	$('#colorspace_title').text("Sub-space ("+subspaceSamples.length+" color samples)");
	$('#colorspace').html(subspaceSamples.map(function(color){
		return "<span style='width: 8px;background-color:"+color.hex()+";'>_</span>";
	}).join(""));
	
	var positionsIndex = {};
	if(keepPositions){
		s.iterNodes(function(n){
			positionsIndex[n.id] = {x:n.x, y:n.y};
		});
	}
	
	s.stopForceAtlas2();
	initSigma();
	
	// Building the graph
	s.emptyGraph();
	subspaceSamples.forEach(function(color){
		s.addNode(color.hex(),{
			x: 1000 - 1000 * (color.lab()[1]-0.37*color.lab()[0]),
			y: 1000 * (color.lab()[2]-0.58*color.lab()[0]),
			size: 1,
			label: color.hex(),
			color: color.hex()
		});
	});
	
	if(keepPositions){
		s.iterNodes(function(n){
			if(positionsIndex[n.id]){
				n.x = positionsIndex[n.id].x;
				n.y = positionsIndex[n.id].y;
			}
		});
	}

	// If colors are passed...
	if(colors && colors.length>0){
		var matchings = {};
		colors.forEach(function(color){
			matchings[color.hex()] = [];
		});
		
		
		subspaceSamples.forEach(function(color){
			var lab = color.lab();
			var bestMatch;
			var minDistance = 10000000;
			colors.forEach(function(matchingCandidate){
				var lab2 = matchingCandidate.lab();
				var distance = Math.sqrt(Math.pow(lab[0]-lab2[0], 2) + Math.pow(lab[1]-lab2[1], 2) + Math.pow(lab[2]-lab2[2], 2));
				if(distance < minDistance){
					minDistance = distance;
					bestMatch = matchingCandidate;
				}
			});
			matchings[bestMatch.hex()].push(color.hex());
		});
		
		// Add some random edges
		for(times=0; times<2; times++){
			colors.forEach(function(groupColor){
				var group = matchings[groupColor.hex()];
				group = shuffle(group);
				for(i=0; i<group.length; i++){
					var c1 = group[i];
					var c2 = group[(i+1)%group.length];
					s.addEdge(times+"_"+c1+"_"+c2, c1, c2, {});
				}			
			});
		}
		
		drawPalette(colors, matchings);		
	} else if(palette){
		// Keep same colors, but redraw the palette to have the matchings on rollovers
		var matchings = {};
		palette.forEach(function(color){
			matchings[color.hex] = [];
		});
		
		subspaceSamples.forEach(function(color){
			var lab = color.lab();
			var bestMatch;
			var minDistance = 10000000;
			palette.forEach(function(matchingCandidate){
				var lab2 = matchingCandidate.lab;
				var distance = Math.sqrt(Math.pow(lab[0]-lab2[0], 2) + Math.pow(lab[1]-lab2[1], 2) + Math.pow(lab[2]-lab2[2], 2));
				if(distance < minDistance){
					minDistance = distance;
					bestMatch = matchingCandidate;
				}
			});
			matchings[bestMatch.hex].push(color.hex());
		});
		
		drawPalette(palette.map(function(c){return c.color}), matchings);
	}
	
	if(colors && colors.length>0){
		s.startForceAtlas2();
	} else {
		s.draw();
	}	
}


var getSubColorSpace = function(){
	// Variables
	var hmin = +$('#hmin').val();
	var hmax = +$('#hmax').val();
	var cmin = +$('#cmin').val();
	var cmax = +$('#cmax').val();
	var lmin = +$('#lmin').val();
	var lmax = +$('#lmax').val();
	
	// Conditions restraining the color space
	var hcondition;
	var hcondition_txt;
	if(hmin<hmax){
		hcondition = function(hcl){return hcl[0]>=hmin && hcl[0]<=hmax};
		hcondition_txt = "hcl[0]>="+hmin+" && hcl[0]<="+hmax;
	} else {
		hcondition = function(hcl){return hcl[0]>=hmin || hcl[0]<=hmax};
		hcondition_txt = "(hcl[0]>="+hmin+" || hcl[0]<="+hmax+")";
	}
	var ccondition = function(hcl){return hcl[1]>=cmin && hcl[1]<=cmax};
	var ccondition_txt = "hcl[1]>="+cmin+" && hcl[1]<="+cmax;
	var lcondition = function(hcl){return hcl[2]>=lmin && hcl[2]<=lmax};
	var lcondition_txt = "hcl[2]>="+lmin+" && hcl[2]<="+lmax;
	
	// General condition for selecting the color space
	var colorspaceSelector = function(hcl){
		return hcondition(hcl) && ccondition(hcl) && lcondition(hcl);
	}
	
	// Sample the color space (for monitoring)
	var subspaceSamples = [];
	colorSamples.forEach(function(c){
		// Test if the color is in the specified subspace
		if(colorspaceSelector(c.hcl)){
			subspaceSamples.push(c.color);
		}
	});
	
	return subspaceSamples;
}

function shuffle(array) {
    var tmp, current, top = array.length;

    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array;
}