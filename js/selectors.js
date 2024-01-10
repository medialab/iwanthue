/// Selectors
var selectorsState = {
	currentValues:{
		hue:300,
		chroma:1,
		lightness:1,
		fitting:0
	},
	defaultValues:{
		hue:300,
		chroma:1,
		lightness:1,
		fitting:0
	},
	hue:{
		drag:'none',
		extravar:'none',
		offset:0,
		min:0,
		max:1
	},
	chroma:{
		drag:'none',
		extravar:'none',
		min:0,
		max:1
	},
	lightness:{
		drag:'none',
		extravar:'none',
		min:0,
		max:1
	},
	dragPosition:0,
	clickOffset:0,
	activeWidth: 15
};

var maxLightness = 100;
var maxChroma = 134;

var hue_context;
var chroma_context;
var lightness_context;

// Init
var initSelectors = function(){

	var width = $("#hueSelector").width();
	var height = 28;

	// Hue
	$("#hueSelector").html('<canvas id="hue_canvas" width="'+width+'" height="'+height+'">Your browser doesn\'t support CANVAS.</canvas>');
	var hue_canvas = document.getElementById('hue_canvas');
	hue_context = hue_canvas.getContext('2d');

	$("#hueSelector").unbind();
	$("#hueSelector").mousedown(function(event){
		event.stopPropagation();
		var offsetX = Math.round(event.pageX - $(event.target).position().left);

		if(Math.abs(offsetX-width*selectorsState.hue.min)<selectorsState.activeWidth || Math.abs(offsetX-width*selectorsState.hue.max)<selectorsState.activeWidth){
			// Something dragged
			if(Math.abs(offsetX-width*selectorsState.hue.min)<Math.abs(offsetX-width*selectorsState.hue.max)){
				// Min cursor dragged
				selectorsState.hue.drag = 'min';
				selectorsState.clickOffset = offsetX - selectorsState.hue.min * width
			} else {
				// Max cursor dragged
				selectorsState.hue.drag = 'max';
				selectorsState.clickOffset = offsetX - selectorsState.hue.max * width
			}
		} else if(
			(selectorsState.hue.min<selectorsState.hue.max && width*selectorsState.hue.min < offsetX && offsetX < width*selectorsState.hue.max)
			|| (selectorsState.hue.max<selectorsState.hue.min && (width*selectorsState.hue.min < offsetX || offsetX < width*selectorsState.hue.max))
		){
			// Drag all
			selectorsState.hue.drag = 'all';
			selectorsState.dragPosition = offsetX/width;
		}
	});
	$("#hueSelector").mousemove(function(event){
		event.stopPropagation();
		var offsetX = Math.round(event.pageX - $(event.target).position().left);

		// Display
		selectorsState.chroma.extravar = 'hue';
		selectorsState.lightness.extravar = 'hue';
		selectorsState.currentValues.hue = 360 * offsetX/width;

		// Display cursor
		if(
			(selectorsState.hue.min<selectorsState.hue.max && Math.abs(offsetX-width*selectorsState.hue.min)<selectorsState.activeWidth)
			|| (selectorsState.hue.min<selectorsState.hue.max && Math.abs(offsetX-width*selectorsState.hue.max)<selectorsState.activeWidth)
			|| (selectorsState.hue.min<selectorsState.hue.max && width*selectorsState.hue.min < offsetX && offsetX < width*selectorsState.hue.max)
			|| (selectorsState.hue.max<=selectorsState.hue.min && (width*selectorsState.hue.min < offsetX || offsetX < width*selectorsState.hue.max))
		){
			$('#hueSelector').addClass('hover');
		} else {
			$('#hueSelector').removeClass('hover');
		}

		updateSelectors();
	});
	$("#hueSelector").mouseout(function(event){
		event.stopPropagation();
		if(selectorsState.hue.drag == 'none'){
			selectorsState.chroma.extravar = 'none';
			selectorsState.lightness.extravar = 'none';
			selectorsState.currentValues.hue = selectorsState.defaultValues.hue;
			selectorsState.currentValues.chroma = selectorsState.defaultValues.chroma;
			selectorsState.currentValues.lightness = selectorsState.defaultValues.lightness;
			selectorsState.hue.drag = 'none';
			updateSelectors();
		}
	});

	// Chroma
	$("#chromaSelector").html('<canvas id="chroma_canvas" width="'+width+'" height="'+height+'">Your browser doesn\'t support CANVAS.</canvas>');
	var chroma_canvas = document.getElementById('chroma_canvas');
	chroma_context = chroma_canvas.getContext('2d');

	$("#chromaSelector").unbind();
	$("#chromaSelector").mousedown(function(event){
		event.stopPropagation();
		var offsetX = Math.round(event.pageX - $(event.target).position().left);

		if(Math.abs(offsetX-width*selectorsState.chroma.min)<selectorsState.activeWidth || Math.abs(offsetX-width*selectorsState.chroma.max)<selectorsState.activeWidth){
			// Something dragged
			if(Math.abs(offsetX-width*selectorsState.chroma.min)<Math.abs(offsetX-width*selectorsState.chroma.max)){
				// Min cursor dragged
				selectorsState.chroma.drag = 'min'
				selectorsState.clickOffset = offsetX - selectorsState.chroma.min * width
			} else {
				// Max cursor dragged
				selectorsState.chroma.drag = 'max'
				selectorsState.clickOffset = offsetX - selectorsState.chroma.max * width
			}
		} else if(width*selectorsState.chroma.min < offsetX && offsetX < width*selectorsState.chroma.max){
			// Drag all
			selectorsState.chroma.drag = 'all';
			selectorsState.dragPosition = offsetX/width;
		}
	});
	$("#chromaSelector").mousemove(function(event){
		event.stopPropagation();
		var offsetX = Math.round(event.pageX - $(event.target).position().left);

		// Display
		selectorsState.hue.extravar = 'chroma';
		selectorsState.lightness.extravar = 'chroma';
		selectorsState.currentValues.chroma = maxChroma*offsetX/width;

		// Display cursor
		if(Math.abs(offsetX-width*selectorsState.chroma.min)<selectorsState.activeWidth
		|| Math.abs(offsetX-width*selectorsState.chroma.max)<selectorsState.activeWidth
		|| (width*selectorsState.chroma.min < offsetX && offsetX < width*selectorsState.chroma.max)){
			$('#chromaSelector').addClass('hover');
		} else {
			$('#chromaSelector').removeClass('hover');
		}

		updateSelectors();
	});
	$("#chromaSelector").mouseout(function(event){
		event.stopPropagation();
		if(selectorsState.chroma.drag == 'none'){
			selectorsState.hue.extravar = 'none';
			selectorsState.lightness.extravar = 'none';
			selectorsState.currentValues.hue = selectorsState.defaultValues.hue;
			selectorsState.currentValues.chroma = selectorsState.defaultValues.chroma;
			selectorsState.currentValues.lightness = selectorsState.defaultValues.lightness;
			selectorsState.chroma.drag = 'none';
			updateSelectors();
		}
	});

	// Lightness
	$("#lightnessSelector").html('<canvas id="lightness_canvas" width="'+width+'" height="'+height+'">Your browser doesn\'t support CANVAS.</canvas>');
	var lightness_canvas = document.getElementById('lightness_canvas');
	lightness_context = lightness_canvas.getContext('2d');

	$("#lightnessSelector").unbind();
	$("#lightnessSelector").mousedown(function(event){
		event.stopPropagation();
		var offsetX = Math.round(event.pageX - $(event.target).position().left);

		if(Math.abs(offsetX-width*selectorsState.lightness.min)<selectorsState.activeWidth || Math.abs(offsetX-width*selectorsState.lightness.max)<selectorsState.activeWidth){
			// Something dragged
			if(Math.abs(offsetX-width*selectorsState.lightness.min)<Math.abs(offsetX-width*selectorsState.lightness.max)){
				// Min cursor dragged
				selectorsState.lightness.drag = 'min'
				selectorsState.clickOffset = offsetX - selectorsState.lightness.min * width
			} else {
				// Max cursor dragged
				selectorsState.lightness.drag = 'max'
				selectorsState.clickOffset = offsetX - selectorsState.lightness.max * width
			}
		} else if(width*selectorsState.lightness.min < offsetX && offsetX < width*selectorsState.lightness.max){
			// Drag all
			selectorsState.lightness.drag = 'all';
			selectorsState.dragPosition = offsetX/width;
		}
	});
	$("#lightnessSelector").mousemove(function(event){
		event.stopPropagation();
		var offsetX = Math.round(event.pageX - $(event.target).position().left);

		// Display
		selectorsState.hue.extravar = 'lightness';
		selectorsState.chroma.extravar = 'lightness';
		selectorsState.currentValues.lightness = maxLightness*offsetX/width;

		// Display cursor
		if(Math.abs(offsetX-width*selectorsState.lightness.min)<selectorsState.activeWidth
		|| Math.abs(offsetX-width*selectorsState.lightness.max)<selectorsState.activeWidth
		|| (width*selectorsState.lightness.min < offsetX && offsetX < width*selectorsState.lightness.max)){
			$('#lightnessSelector').addClass('hover');
		} else {
			$('#lightnessSelector').removeClass('hover');
		}

		updateSelectors();
	});
	$("#lightnessSelector").mouseout(function(event){
		event.stopPropagation();
		if(selectorsState.lightness.drag == 'none'){
			selectorsState.hue.extravar = 'none';
			selectorsState.chroma.extravar = 'none';
			selectorsState.currentValues.hue = selectorsState.defaultValues.hue;
			selectorsState.currentValues.chroma = selectorsState.defaultValues.chroma;
			selectorsState.currentValues.lightness = selectorsState.defaultValues.lightness;
			selectorsState.lightness.drag = 'none';
			updateSelectors();
		}
	});

	$("#selectorsTable, #hueSelector, #chromaSelector, #lightnessSelector").mousemove(function(event){
		// Drag
		var offsetX = Math.round(event.pageX - $("#hueSelector").position().left - selectorsState.clickOffset)
		var drag = false;
		var move;
		if(selectorsState.hue.drag == 'min'){
			selectorsState.hue.min = Math.max(offsetX/width, 0)
			$('#hmin').val(Math.round(selectorsState.hue.min*360));
			drag = true;
		} else if(selectorsState.hue.drag == 'max'){
			selectorsState.hue.max = Math.min(1, offsetX/width)
			$('#hmax').val(Math.round(selectorsState.hue.max*360));
			drag = true;
		} else if(selectorsState.hue.drag == 'all'){
			move = offsetX/width-selectorsState.dragPosition;

			selectorsState.hue.min = (selectorsState.hue.min + move)%1
			selectorsState.hue.max = (selectorsState.hue.max + move)%1
			if(selectorsState.hue.min<0)
				selectorsState.hue.min++
			if(selectorsState.hue.max<0)
				selectorsState.hue.max++

			$('#hmin').val(Math.round(selectorsState.hue.min*360))
			$('#hmax').val(Math.round(selectorsState.hue.max*360))
			drag = true

			selectorsState.dragPosition = offsetX/width;
		} else if(selectorsState.chroma.drag == 'min'){
			selectorsState.chroma.min = Math.min(Math.max(offsetX/width, 0), selectorsState.chroma.max)
			$('#cmin').val(0.01*Math.round(100*selectorsState.chroma.min*maxChroma));
			drag = true;
		} else if(selectorsState.chroma.drag == 'max'){
			selectorsState.chroma.max = Math.max(Math.min(offsetX/width, 1), selectorsState.chroma.min)
			$('#cmax').val(0.01*Math.round(100*selectorsState.chroma.max*maxChroma));
			drag = true;
		} else if(selectorsState.chroma.drag == 'all'){
			move = offsetX/width-selectorsState.dragPosition;
			if(selectorsState.chroma.min + move <0){
				move = -selectorsState.chroma.min;
			}
			if(selectorsState.chroma.max + move >1){
				move = selectorsState.chroma.max;
			}
			if(selectorsState.chroma.min + move >= 0 && selectorsState.chroma.max + move <= 1){
				selectorsState.chroma.min += move;
				selectorsState.chroma.max += move;
				$('#cmin').val(0.01*Math.round(100*selectorsState.chroma.min*maxChroma));
				$('#cmax').val(0.01*Math.round(100*selectorsState.chroma.max*maxChroma));
				drag = true;
			}
			selectorsState.dragPosition = offsetX/width;
		} else if(selectorsState.lightness.drag == 'min'){
			selectorsState.lightness.min = Math.min(Math.max(offsetX/width, 0), selectorsState.lightness.max)
			$('#lmin').val(0.01*Math.round(100*selectorsState.lightness.min*maxLightness));
			drag = true;
		} else if(selectorsState.lightness.drag == 'max'){
			selectorsState.lightness.max = Math.max(Math.min(offsetX/width, 1), selectorsState.lightness.min)
			$('#lmax').val(0.01*Math.round(100*selectorsState.lightness.max*maxLightness));
			drag = true;
		} else if(selectorsState.lightness.drag == 'all'){
			move = offsetX/width-selectorsState.dragPosition;
			if(selectorsState.lightness.min + move <0){
				move = -selectorsState.lightness.min;
			}
			if(selectorsState.lightness.max + move >1){
				move = selectorsState.lightness.max;
			}
			if(selectorsState.lightness.min + move >= 0 && selectorsState.lightness.max + move <= 1){
				selectorsState.lightness.min += move;
				selectorsState.lightness.max += move;
				$('#lmin').val(0.01*Math.round(100*selectorsState.lightness.min*maxLightness));
				$('#lmax').val(0.01*Math.round(100*selectorsState.lightness.max*maxLightness));
				drag = true;
			}
			selectorsState.dragPosition = offsetX/width;
		}

		if(drag){
			updateSelectors();
			updateColorSpace();
		}
	});

	$("#selectorsTable, #hueSelector, #chromaSelector, #lightnessSelector").mouseup(function(event){
		event.stopPropagation();
		selectorsState.hue.drag = 'none';
		selectorsState.chroma.drag = 'none';
		selectorsState.lightness.drag = 'none';
		if(palette){
			initFitting();
		}
	});

	updateSelectors();

	// Also update the numeric fields
	$('#cmax').val(maxChroma);
	$('#lmax').val(maxLightness);
}

// Updating the visual appearance of the selectors
var updateSelectors = function(){
	var w = $("#hue_canvas").width();
	var h = $("#hue_canvas").height();
	var xResolution = 8;
	var yResolution = 2;
	var h_default = 340;
	var c_default = 40;
	var l_default = 70;

	/// Hue
	// Draw
	hue_context.clearRect(0, 0, w, h);
	if(selectorsState.hue.extravar == 'none'){
		if(selectorsState.hue.min < selectorsState.hue.max){
			for(x=Math.round(w*selectorsState.hue.min); x<Math.round(w*selectorsState.hue.max); x+=1){
				var color = chroma.hcl((selectorsState.hue.offset + 360*x/w)%360, c_default, l_default);
				if(!isNaN(color.rgb()[0])){
					hue_context.fillStyle = color.hex();
					hue_context.fillRect(x, 0, 1, h);
				}
			}
		} else {
			for(x=0; x<Math.round(w*selectorsState.hue.max); x+=1){
				var color = chroma.hcl((selectorsState.hue.offset + 360*x/w)%360, c_default, l_default);
				if(!isNaN(color.rgb()[0])){
					hue_context.fillStyle = color.hex();
					hue_context.fillRect(x, 0, 1, h);
				}
			}
			for(x=Math.round(w*selectorsState.hue.min); x<w; x+=1){
				var color = chroma.hcl((selectorsState.hue.offset + 360*x/w)%360, c_default, l_default);
				if(!isNaN(color.rgb()[0])){
					hue_context.fillStyle = color.hex();
					hue_context.fillRect(x, 0, 1, h);
				}
			}
		}
	} else if(selectorsState.hue.extravar == 'chroma'){
		for(x=0; x<w; x+=xResolution){
			for(y=0; y<h; y+=yResolution){
				var color = chroma.hcl((selectorsState.hue.offset + 360*x/w)%360, selectorsState.currentValues.chroma, maxLightness*(selectorsState.lightness.min + (selectorsState.lightness.max - selectorsState.lightness.min)*(h-y)/h));
				if(!isNaN(color.rgb()[0])){
					hue_context.fillStyle = color.hex();
					hue_context.fillRect(x, y, xResolution, yResolution);
				}
			}
		}
	} else if(selectorsState.hue.extravar == 'lightness'){
		for(x=0; x<w; x+=xResolution){
			for(y=0; y<h; y+=yResolution){
				var color = chroma.hcl((selectorsState.hue.offset + 360*x/w)%360, maxChroma*(selectorsState.chroma.min + (selectorsState.chroma.max - selectorsState.chroma.min)*(h-y)/h), selectorsState.currentValues.lightness);
				if(!isNaN(color.rgb()[0])){
					hue_context.fillStyle = color.hex();
					hue_context.fillRect(x, y, xResolution, yResolution);
				}
			}
		}
	}
	// Selectors
	drawSelector(hue_context, selectorsState.hue.min, w, h, true);
	drawSelector(hue_context, selectorsState.hue.max, w, h, false);

	/// Chroma
	// Draw
	chroma_context.clearRect (0, 0, w, h);
	if(selectorsState.chroma.extravar == 'none'){
		for(x=Math.round(w*selectorsState.chroma.min); x<Math.round(w*selectorsState.chroma.max); x+=1){
			var color = chroma.hcl(h_default, maxChroma*x/w, l_default);
			if(!isNaN(color.rgb()[0])){
				chroma_context.fillStyle = color.hex();
				chroma_context.fillRect(x, 0, 1, h);
			}
		}
	} else if(selectorsState.chroma.extravar == 'hue'){
		for(x=0; x<w; x+=xResolution){
			for(y=0; y<h; y+=yResolution){
				var color = chroma.hcl(selectorsState.currentValues.hue, maxChroma*x/w, maxLightness*(selectorsState.lightness.min + (selectorsState.lightness.max - selectorsState.lightness.min)*(h-y)/h));
				if(!isNaN(color.rgb()[0])){
					chroma_context.fillStyle = color.hex();
					chroma_context.fillRect(x, y, xResolution, yResolution);
				}
			}
		}
	} else if(selectorsState.chroma.extravar == 'lightness'){
		for(x=0; x<w; x+=xResolution){
			for(y=0; y<h; y+=yResolution){
				var color = chroma.hcl((selectorsState.hue.min + (selectorsState.hue.max-selectorsState.hue.min)*y/h)*360, maxChroma*x/w, selectorsState.currentValues.lightness);
				if(!isNaN(color.rgb()[0])){
					chroma_context.fillStyle = color.hex();
					chroma_context.fillRect(x, y, xResolution, yResolution);
				}
			}
		}
	}
	// Selectors
	drawSelector(chroma_context, selectorsState.chroma.min, w, h, true);
	drawSelector(chroma_context, selectorsState.chroma.max, w, h, false);

	/// Lightness
	// Draw
	lightness_context.clearRect (0, 0, w, h);
	if(selectorsState.lightness.extravar == 'none'){
		for(x=Math.round(w*selectorsState.lightness.min); x<Math.round(w*selectorsState.lightness.max); x+=1){
			var color = chroma.hcl(0, 0, maxLightness*x/w);
			if(!isNaN(color.rgb()[0])){
				lightness_context.fillStyle = color.hex();
				lightness_context.fillRect(x, 0, 1, h);
			}
		}
	} else if(selectorsState.lightness.extravar == 'hue'){
		for(x=0; x<w; x+=xResolution){
			for(y=0; y<h; y+=yResolution){
				var color = chroma.hcl(selectorsState.currentValues.hue, maxChroma*(selectorsState.chroma.min + (selectorsState.chroma.max - selectorsState.chroma.min)*(h-y)/h), maxLightness*x/w);
				if(!isNaN(color.rgb()[0])){
					lightness_context.fillStyle = color.hex();
					lightness_context.fillRect(x, y, xResolution, yResolution);
				}
			}
		}
	} else if(selectorsState.lightness.extravar == 'chroma'){
		for(x=0; x<w; x+=xResolution){
			for(y=0; y<h; y+=yResolution){
				var color = chroma.hcl((selectorsState.hue.min + (selectorsState.hue.max-selectorsState.hue.min)*y/h)*360, selectorsState.currentValues.chroma, maxLightness*x/w);
				if(!isNaN(color.rgb()[0])){
					lightness_context.fillStyle = color.hex();
					lightness_context.fillRect(x, y, xResolution, yResolution);
				}
			}
		}
	}
	// Selectors
	drawSelector(lightness_context, selectorsState.lightness.min, w, h, true);
	drawSelector(lightness_context, selectorsState.lightness.max, w, h, false);

}


var drawSelector = function(context, ratio, w, h, leftToRight){
	context.fillStyle = '#000';
	if(leftToRight){
		context.beginPath();
		context.moveTo(ratio*w, 0);
		context.lineTo(ratio*w+14, h/2);
		context.lineTo(ratio*w, h);
		context.lineTo(ratio*w, 0);
		context.closePath();
		context.fill();
	} else {
		context.beginPath();
		context.moveTo(ratio*w, 0);
		context.lineTo(ratio*w-14, h/2);
		context.lineTo(ratio*w, h);
		context.lineTo(ratio*w, 0);
		context.closePath();
		context.fill();
	}
}
