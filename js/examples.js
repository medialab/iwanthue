function makePalette(elementId, settings){
	$('#'+elementId).html('').append(
		$('<ul class="inlinePalette"></ul>').append(
			settings.colors.map(function(color){
				var hex = color.hex()
				return $('<li style="background-color: '+hex+'"><p>'+hex+'</p></li> ')
			})
		)
	)
}

function computeColors(settings){
	console.log('Computing colors...')
	settings.colors = paletteGenerator.generate(
  		settings.colorsCount,
  		function(color){
    		var hcl = color.hcl();
    		if(settings.hmin < settings.hmax)
	   			return hcl[0]>=settings.hmin && hcl[0]<=settings.hmax
	      			&& hcl[1]>=settings.cmin && hcl[1]<=settings.cmax
	      			&& hcl[2]>=settings.lmin && hcl[2]<=settings.lmax;
	      			else
	   			return (hcl[0]<=settings.hmax || hcl[0]>=settings.hmin)
	      			&& hcl[1]>=settings.cmin && hcl[1]<=settings.cmax
	      			&& hcl[2]>=settings.lmin && hcl[2]<=settings.lmax;
  		},
  		settings.useFV || false, // Using Force Vector instead of k-Means
  		50, // Steps (quality)
  		settings.ultra_precision || false
	)
	settings.colors = paletteGenerator.diffSort(settings.colors);
}

function makePre(elementId, settings){
	$('#'+elementId).html('<pre>Hue: '+settings.hmin+' to '+settings.hmax+' \nChroma: '+settings.cmin+' to '+settings.cmax+' \nLightness: '+settings.lmin+' to '+settings.lmax+'</pre>')
}

function makeSelectors(elementId, settings){
	var width = $('#'+elementId).width() - 114
		,height = 28

	$('#'+elementId).html(
		'<table style="width: 100%;">'

    	+'<tr><td><div class="input-append input-prepend"><span title="Hue" class="add-on">H</span><input type="text" class="hmin uneditable-input" value="'+settings.hmin+'" style="width:30px;"/></div></td>'
    	+'<td style="width: 100%;"><div><canvas id="'+elementId+'_h_canvas" width="'+width+'" height="'+height+'">Your browser doesn\'t support CANVAS.</canvas></div></td>'
        +'<td><div class="input-prepend"><input class="hmax uneditable-input" type="text" value="'+settings.hmax+'" style="width:30px;"/></div></td></tr>'
    	
    	+'<tr><td><div class="input-append input-prepend"><span title="Chroma" class="add-on">C</span><input type="text" class="cmin uneditable-input" value="'+settings.cmin+'" style="width:30px;"/></div></td>'
    	+'<td style="width: 100%;"><div><canvas id="'+elementId+'_c_canvas" width="'+width+'" height="'+height+'">Your browser doesn\'t support CANVAS.</canvas></div></td>'
        +'<td><div class="input-prepend"><input class="cmax uneditable-input" type="text" value="'+settings.cmax+'" style="width:30px;"/></div></td></tr>'
    	
    	+'<tr><td><div class="input-append input-prepend"><span title="Lightness" class="add-on">L</span><input type="text" class="lmin uneditable-input" value="'+settings.lmin+'" style="width:30px;"/></div></td>'
    	+'<td style="width: 100%;"><div><canvas id="'+elementId+'_l_canvas" width="'+width+'" height="'+height+'">Your browser doesn\'t support CANVAS.</canvas></div></td>'
        +'<td><div class="input-prepend"><input class="lmax uneditable-input" type="text" value="'+settings.lmax+'" style="width:30px;"/></div></td></tr>'

		+'</table>'
		)

	var h_canvas = document.getElementById(elementId+'_h_canvas')
		,h_context = h_canvas.getContext('2d')
		,c_canvas = document.getElementById(elementId+'_c_canvas')
		,c_context = c_canvas.getContext('2d')
		,l_canvas = document.getElementById(elementId+'_l_canvas')
		,l_context = l_canvas.getContext('2d')

	var w = $("#"+elementId+'_h_canvas').width()
		,h = $("#"+elementId+'_h_canvas').height()
		,xResolution = 8
		,yResolution = 2
	
	// Hue
	h_context.clearRect(0, 0, w, h);
	if(settings.hmin < settings.hmax){
		for(x=Math.round(w*settings.hmin/360); x<Math.round(w*settings.hmax/360); x+=1){
			var color = chroma.hcl((360*x/w)%360, 50, 50);
			if(!isNaN(color.rgb[0])){
				h_context.fillStyle = color.hex();
				h_context.fillRect(x, 0, 1, h);
			}
		}
	} else {
		for(x=0; x<Math.round(w*settings.hmax/360); x+=1){
			var color = chroma.hcl((360*x/w)%360, 50, 50);
			if(!isNaN(color.rgb[0])){
				h_context.fillStyle = color.hex();
				h_context.fillRect(x, 0, 1, h);
			}
		}
		for(x=Math.round(w*settings.hmin/360); x<w; x+=1){
			var color = chroma.hcl((360*x/w)%360, 50, 50);
			if(!isNaN(color.rgb[0])){
				h_context.fillStyle = color.hex();
				h_context.fillRect(x, 0, 1, h);
			}
		}
	}
	drawSelector(h_context, settings.hmin/360, w, h, true)
	drawSelector(h_context, settings.hmax/360, w, h, false)

	// Chroma
	c_context.clearRect(0, 0, w, h);
	for(x=Math.round(w*settings.cmin/maxChroma); x<Math.round(w*settings.cmax/maxChroma); x+=1){
		var color = chroma.hcl(290, maxChroma*x/w, 50);
		if(!isNaN(color.rgb[0])){
			c_context.fillStyle = color.hex();
			c_context.fillRect(x, 0, 1, h);
		}
	}
	drawSelector(c_context, settings.cmin/maxChroma, w, h, true)
	drawSelector(c_context, settings.cmax/maxChroma, w, h, false)

	// Lightness
	l_context.clearRect(0, 0, w, h);
	for(x=Math.round(w*settings.lmin/maxLightness); x<Math.round(w*settings.lmax/maxLightness); x+=1){
		var color = chroma.hcl(200, 50, maxLightness*x/w);
		if(!isNaN(color.rgb[0])){
			l_context.fillStyle = color.hex();
			l_context.fillRect(x, 0, 1, h);
		}
	}
	drawSelector(l_context, settings.lmin/maxLightness, w, h, true)
	drawSelector(l_context, settings.lmax/maxLightness, w, h, false)
}





function makeDoughnut(elementId, colors, width, doughnutsCount, settings){
	$('#'+elementId).html('')

    // Doughnut Chart
    var height = width,
        radius = Math.min(width, height) / 2

    var color = d3.scale.ordinal()
        .range(colors.map(function(color){return color.hex()}))

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - ( 10 + ( settings.doughnutWidth || 40 ) ) )

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.count })

    for(doughnutId=0; doughnutId<doughnutsCount; doughnutId++){
    	$('#'+elementId).append('<div id="'+elementId+'_doughnut_'+doughnutId+'" style="width: '+width+'px; display:inline-block;"/>')

	   	var svg = d3.select("#"+elementId+'_doughnut_'+doughnutId).append("svg")
	        .attr("width", width)
	        .attr("height", height)
	    .append("g")
	        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	    var data
	    if(doughnutId == 0){
	    	var predata = colors.map(function(){return Math.round(Math.random()*100)})
	    	predata.sort(function(a,b){
	    		if(+a<+b)
	    			return 1
	    		else if(+b<+a)
	    			return -1
	    		else return 0
	    	})
			data = colors.map(function(color, i){
		        return {
		        	//label: ['Alfred', 'Bernard', 'Christophe', 'Damien', 'Erik', 'François', 'Gérard', 'Henry', 'Ian', 'Jacob', 'Karina', 'Laurent', 'Marie', 'Nadia', 'Olaf', 'Pierre', 'Quentin', 'Reginald', 'Sabine', 'Thibault'][i]
		        	label: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[i]
		        	,count: 500 + predata[i] * predata[i]
		        }
		    })
	    } else {
		    data = colors.map(function(color, i){
		        return {
		        	//label: ['Alfred', 'Bernard', 'Christophe', 'Damien', 'Erik', 'François', 'Gérard', 'Henry', 'Ian', 'Jacob', 'Karina', 'Laurent', 'Marie', 'Nadia', 'Olaf', 'Pierre', 'Quentin', 'Reginald', 'Sabine', 'Thibault'][i]
		        	label: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[i]
		        	,count:Math.round(15 + Math.random()*85)
		        }
		    })
	    }

	    var g = svg.selectAll(".arc")
	        .data(pie(data))
	    .enter().append("g")
	        .attr("class", "arc")

	    g.append("path")
	        .attr("d", arc)
	        .style("fill", function(d) { return color(d.data.label) });

	    g.append("text")
	        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")" })
	        .attr('fill', settings.textColor || '#000000')
	        .attr("dy", ".35em")
	        .style("text-anchor", "middle")
	        .text(function(d) { return d.data.label })
    }


}
