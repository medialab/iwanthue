var colorpicker = {
	pickedColor: chroma.hex('#54DF90')
	,squareSize: 120
	,bandSize: 160
	,bandWidth: 28
	,renderHeight: 106
	,resolution: 4
	,radius: 12
	,actualSize: undefined
	,grey1: '#CCCCCC'
	,grey2: '#EEEEEE'
	,drag: false

	// Functions
	,updateFields: function(){
		$('#colorpicker_hInput').val(	Math.round(colorpicker.pickedColor.hcl()[0])	)
		$('#colorpicker_cInput').val(	Math.round(colorpicker.pickedColor.hcl()[1])	)
		$('#colorpicker_lInput').val(	Math.round(colorpicker.pickedColor.lab()[0])	)
		$('#colorpicker_aInput').val(	Math.round(colorpicker.pickedColor.lab()[1])	)
		$('#colorpicker_bInput').val(	Math.round(colorpicker.pickedColor.lab()[2])	)
		$('#colorpicker_hexInput').val(colorpicker.pickedColor.hex())
	}

	,drawSelector: function(context, x, y, color){
		var radius = colorpicker.radius

		context.fillStyle = '#000'
		context.beginPath()
		context.moveTo(x, y-radius)
		context.lineTo(x+radius, y)
		context.lineTo(x, y+radius)
		context.lineTo(x-radius, y)
		context.lineTo(x, y-radius)
		context.closePath()
		context.fill()

		var offset_black = 2
		context.fillStyle = '#FFF'
		context.beginPath()
		context.moveTo(x, y-(radius-offset_black))
		context.lineTo(x+(radius-offset_black), y)
		context.lineTo(x, y+(radius-offset_black))
		context.lineTo(x-(radius-offset_black), y)
		context.lineTo(x, y-(radius-offset_black))
		context.closePath()
		context.fill()

		var offset_white = offset_black + 3
		context.fillStyle = color.hex()
		context.beginPath()
		context.moveTo(x, y-(radius-offset_white))
		context.lineTo(x+(radius-offset_white), y)
		context.lineTo(x, y+(radius-offset_white))
		context.lineTo(x-(radius-offset_white), y)
		context.lineTo(x, y-(radius-offset_white))
		context.closePath()
		context.fill()
	}

	,init: function(){
		colorpicker.actualSize = colorpicker.squareSize + 2 * colorpicker.radius

		// a* x b*
		$("#colorpicker_abContainer").html('<canvas id="abCanvas" width="'+colorpicker.actualSize+'" height="'+colorpicker.actualSize+'">Your browser doesn\'t seem to support CANVAS.</canvas>');
		colorpicker.abCanvas = document.getElementById('abCanvas')
		colorpicker.abContext = colorpicker.abCanvas.getContext('2d')

		// H
		$("#colorpicker_hContainer").html('<canvas id="hCanvas" width="'+colorpicker.bandSize+'" height="'+colorpicker.bandWidth+'px">Your browser doesn\'t seem to support CANVAS.</canvas>');
		colorpicker.hCanvas = document.getElementById('hCanvas')
		colorpicker.hContext = colorpicker.hCanvas.getContext('2d')

		// C
		$("#colorpicker_cContainer").html('<canvas id="cCanvas" width="'+colorpicker.bandSize+'" height="'+colorpicker.bandWidth+'px">Your browser doesn\'t seem to support CANVAS.</canvas>');
		colorpicker.cCanvas = document.getElementById('cCanvas')
		colorpicker.cContext = colorpicker.cCanvas.getContext('2d')

		// L
		$("#colorpicker_lContainer").html('<canvas id="lCanvas" width="'+colorpicker.bandSize+'" height="'+colorpicker.bandWidth+'px">Your browser doesn\'t seem to support CANVAS.</canvas>');
		colorpicker.lCanvas = document.getElementById('lCanvas')
		colorpicker.lContext = colorpicker.lCanvas.getContext('2d')

		// Render
		$("#colorpicker_renderContainer").html('<canvas id="renderCanvas" width="'+colorpicker.squareSize+'" height="'+colorpicker.renderHeight+'px">Your browser doesn\'t seem to support CANVAS.</canvas>');
		colorpicker.renderCanvas = document.getElementById('renderCanvas')
		colorpicker.renderContext = colorpicker.renderCanvas.getContext('2d')

		// Fields
		$('#colorpicker_hInput').keypress(function(event){
			if(event.charCode == 13){
				var hcl = colorpicker.pickedColor.hcl()
					,candidateColor = chroma.hcl(1 * $('#colorpicker_hInput').val(), hcl[1], hcl[2])
				if(candidateColor.rgb()[0] !== undefined){
					colorpicker.pickedColor = candidateColor
					colorpicker.update()
					$('#colorpicker_hInput').blur()
				}
			}
		})
		$('#colorpicker_cInput').keypress(function(event){
			if(event.charCode == 13){
				var hcl = colorpicker.pickedColor.hcl()
					,candidateColor = chroma.hcl(hcl[0], 1 * $('#colorpicker_cInput').val(), hcl[2])
				if(candidateColor.rgb()[0] !== undefined){
					colorpicker.pickedColor = candidateColor
					colorpicker.update()
					$('#colorpicker_cInput').blur()
				}
			}
		})
		$('#colorpicker_lInput').keypress(function(event){
			if(event.charCode == 13){
				var lab = colorpicker.pickedColor.lab()
					,candidateColor = chroma.lab(1 * $('#colorpicker_lInput').val(), lab[1], lab[2])
				if(candidateColor.rgb()[0] !== undefined){
					colorpicker.pickedColor = candidateColor
					colorpicker.update()
					$('#colorpicker_lInput').blur()
				}
			}
		})
		$('#colorpicker_aInput').keypress(function(event){
			if(event.charCode == 13){
				var lab = colorpicker.pickedColor.lab()
					,candidateColor = chroma.lab(lab[0], 1 * $('#colorpicker_aInput').val(), lab[2])
				if(candidateColor.rgb()[0] !== undefined){
					colorpicker.pickedColor = candidateColor
					colorpicker.update()
					$('#colorpicker_aInput').blur()
				}
			}
		})
		$('#colorpicker_bInput').keypress(function(event){
			if(event.charCode == 13){
				var lab = colorpicker.pickedColor.lab()
					,candidateColor = chroma.lab(lab[0], lab[1], 1 * $('#colorpicker_bInput').val())
				if(candidateColor.rgb()[0] !== undefined){
					colorpicker.pickedColor = candidateColor
					colorpicker.update()
					$('#colorpicker_bInput').blur()
				}
			}
		})
		$('#colorpicker_hexInput').keypress(function(event){
			if(event.charCode == 13){
				var candidateColor = chroma.hex($('#colorpicker_hexInput').val())
				if(candidateColor.rgb()[0] !== undefined){
					colorpicker.pickedColor = candidateColor
					colorpicker.update()
					$('#colorpicker_hexInput').blur()
				}
			}
		})

		// Interactions
		// AB
		var updateColor_ab = function(event){
			var cp = colorpicker
				,x = event.pageX - $(cp.abCanvas).offset().left
				,y = event.pageY - $(cp.abCanvas).offset().top
			if(cp.radius<=x && x<=cp.radius+cp.squareSize && cp.radius<=y && y<=cp.radius+cp.squareSize){
				var color = chroma.lab(cp.pickedColor.lab()[0], 100 - 200*(x - cp.radius)/(cp.squareSize), -100 + 200*(y - cp.radius)/(cp.squareSize))
				cp.pick(color)
			}
		}
		$(colorpicker.abCanvas).mousedown(function(event){
			colorpicker.drag = true
			updateColor_ab(event)
		})
		$(colorpicker.abCanvas).mouseup(function(){colorpicker.drag = false})
		$(colorpicker.abCanvas).mouseout(function(){colorpicker.drag = false})
		$(colorpicker.abCanvas).mousemove(function(event){
			var cp = colorpicker
				,x = event.pageX - $(cp.abCanvas).offset().left
				,y = event.pageY - $(cp.abCanvas).offset().top
			if(cp.radius<=x && x<=cp.radius+cp.squareSize && cp.radius<=y && y<=cp.radius+cp.squareSize){
				var color = chroma.lab(cp.pickedColor.lab()[0], 100 - 200*(x - cp.radius)/(cp.squareSize), -100 + 200*(y - cp.radius)/(cp.squareSize))
				if(isNaN(color.rgb()[0])){
					$(colorpicker.abCanvas).css('cursor', 'auto')
				} else {
					$(colorpicker.abCanvas).css('cursor', 'pointer')
				}
			} else {
				$(colorpicker.abCanvas).css('cursor', 'auto')
			}
			if(colorpicker.drag)
				updateColor_ab(event)
		})
		// H
		var updateColor_h = function(event){
			var cp = colorpicker
				,x = event.pageX - $(cp.hCanvas).offset().left
			if(0<=x && x<=cp.bandSize){
				var color = chroma.hcl(360*x/cp.bandSize, cp.pickedColor.hcl()[1], cp.pickedColor.hcl()[2])
				cp.pick(color)
			}
		}
		$(colorpicker.hCanvas).mousedown(function(event){
			colorpicker.drag = true
			updateColor_h(event)
		})
		$(colorpicker.hCanvas).mouseup(function(){colorpicker.drag = false})
		$(colorpicker.hCanvas).mouseout(function(){colorpicker.drag = false})
		$(colorpicker.hCanvas).mousemove(function(event){
			var cp = colorpicker
				,x = event.pageX - $(cp.hCanvas).offset().left
			if(0<=x && x<=cp.bandSize){
				var color = chroma.hcl(360*x/cp.bandSize, cp.pickedColor.hcl()[1], cp.pickedColor.hcl()[2])
				if(isNaN(color.rgb()[0])){
					$(colorpicker.hCanvas).css('cursor', 'auto')
				} else {
					$(colorpicker.hCanvas).css('cursor', 'pointer')
				}
			} else {
				$(colorpicker.hCanvas).css('cursor', 'auto')
			}
			if(colorpicker.drag)
				updateColor_h(event)
		})
		// C
		var updateColor_c = function(event){
			var cp = colorpicker
				,x = event.pageX - $(cp.cCanvas).offset().left
			if(0<=x && x<=cp.bandSize){
				var color = chroma.hcl(cp.pickedColor.hcl()[0], 100 * x/cp.bandSize, cp.pickedColor.hcl()[2])
				cp.pick(color)
			}
		}
		$(colorpicker.cCanvas).mousedown(function(event){
			colorpicker.drag = true
			updateColor_c(event)
		})
		$(colorpicker.cCanvas).mouseup(function(){colorpicker.drag = false})
		$(colorpicker.cCanvas).mouseout(function(){colorpicker.drag = false})
		$(colorpicker.cCanvas).mousemove(function(event){
			var cp = colorpicker
				,x = event.pageX - $(cp.cCanvas).offset().left
			if(0<=x && x<=cp.bandSize){
				var color = chroma.hcl(cp.pickedColor.hcl()[0], 100 * x/cp.bandSize, cp.pickedColor.hcl()[2])
				if(isNaN(color.rgb()[0])){
					$(colorpicker.cCanvas).css('cursor', 'auto')
				} else {
					$(colorpicker.cCanvas).css('cursor', 'pointer')
				}
			} else {
				$(colorpicker.cCanvas).css('cursor', 'auto')
			}
			if(colorpicker.drag)
				updateColor_c(event)
		})
		// L
		var updateColor_l = function(event){
			var cp = colorpicker
				,x = event.pageX - $(cp.lCanvas).offset().left
			if(0<=x && x<=cp.bandSize){
				var color = color = chroma.lab(100 * x/cp.bandSize, cp.pickedColor.lab()[1], cp.pickedColor.lab()[2])
				cp.pick(color)
			}
		}
		$(colorpicker.lCanvas).mousedown(function(event){
			colorpicker.drag = true
			updateColor_l(event)
		})
		$(colorpicker.lCanvas).mouseup(function(){colorpicker.drag = false})
		$(colorpicker.lCanvas).mouseout(function(){colorpicker.drag = false})
		$(colorpicker.lCanvas).mousemove(function(event){
			var cp = colorpicker
				,x = event.pageX - $(cp.lCanvas).offset().left
			if(0<=x && x<=cp.bandSize){
				var color = color = chroma.lab(100 * x/cp.bandSize, cp.pickedColor.lab()[1], cp.pickedColor.lab()[2])
				if(isNaN(color.rgb()[0])){
					$(colorpicker.lCanvas).css('cursor', 'auto')
				} else {
					$(colorpicker.lCanvas).css('cursor', 'pointer')
				}
			} else {
				$(colorpicker.lCanvas).css('cursor', 'auto')
			}
			if(colorpicker.drag)
				updateColor_l(event)
		})

		colorpicker.update()
	}

	,update: function(){
		var cp = colorpicker

		// a x b
		for(x=0; x<cp.actualSize; x+=cp.resolution){
			for(y=0; y<cp.actualSize; y+=cp.resolution){
				cp.abContext.fillStyle = Math.round((x+y)/cp.resolution%2)==0?cp.grey1:cp.grey2
				cp.abContext.fillRect(x,y, cp.resolution, cp.resolution)
			}
		}
		for(x=0; x<cp.squareSize; x+=cp.resolution){
			for(y=0; y<cp.squareSize; y+=cp.resolution){
				var a = 100 - 200*(x)/(cp.squareSize+cp.radius)
				var b = -100 + 200*(y)/(cp.squareSize+cp.radius)
				var color = chroma.lab(cp.pickedColor.lab()[0], a, b)
				if(!paletteGenerator.validateLab([cp.pickedColor.lab()[0], a, b])){
					//abContext.fillStyle = Math.round((x+y)/resolution%2)==0?cp.grey1:cp.grey1
				} else {
					cp.abContext.fillStyle = color.hex()
					cp.abContext.fillRect(cp.radius + x, cp.radius + y, cp.resolution, cp.resolution)
				}
			}
		}
		// Selector
		cp.drawSelector(cp.abContext, cp.radius + cp.squareSize*(100 - cp.pickedColor.lab()[1])/200, cp.radius + cp.squareSize*(cp.pickedColor.lab()[2] + 100)/200, cp.pickedColor)

		// Draw H
		for(x=0; x<cp.bandSize; x+=cp.resolution){
			for(y=0; y<cp.bandWidth; y+=cp.resolution){
				var color = chroma.hcl(360*x/cp.bandSize, cp.pickedColor.hcl()[1], cp.pickedColor.hcl()[2])
				if(isNaN(color.rgb()[0])){
					cp.hContext.fillStyle = Math.round((x+y)/cp.resolution%2)==0?cp.grey1:cp.grey2
				} else {
					cp.hContext.fillStyle = color.hex()
				}
				cp.hContext.fillRect(x, y, cp.resolution, cp.resolution)
			}
		}
		// Selector
		cp.drawSelector(cp.hContext, cp.pickedColor.hcl()[0] * cp.bandSize / 360, cp.bandWidth/2, cp.pickedColor)

		// Draw C
		for(x=0; x<cp.bandSize; x+=cp.resolution){
			for(y=0; y<cp.bandWidth; y+=cp.resolution){
				var color = chroma.hcl(cp.pickedColor.hcl()[0], 100 * x/cp.bandSize, cp.pickedColor.hcl()[2])
				if(isNaN(color.rgb()[0])){
					cp.cContext.fillStyle = Math.round((x+y)/cp.resolution%2)==0?cp.grey1:cp.grey2
				} else {
					cp.cContext.fillStyle = color.hex()
				}
				cp.cContext.fillRect(x, y, cp.resolution, cp.resolution)
			}
		}
		// Selector
		cp.drawSelector(cp.cContext, cp.pickedColor.hcl()[1] * cp.bandSize / 100, cp.bandWidth/2, cp.pickedColor)

		// Draw L
		for(x=0; x<cp.bandSize; x+=cp.resolution){
			for(y=0; y<cp.bandWidth; y+=cp.resolution){
				var color = chroma.lab(100 * x/cp.bandSize, cp.pickedColor.lab()[1], cp.pickedColor.lab()[2])
				if(isNaN(color.rgb()[0])){
					cp.lContext.fillStyle = Math.round((x+y)/cp.resolution%2)==0?cp.grey1:cp.grey2
				} else {
					cp.lContext.fillStyle = color.hex()
				}
				cp.lContext.fillRect(x, y, cp.resolution, cp.resolution)
			}
		}
		// Selector
		cp.drawSelector(cp.lContext, cp.pickedColor.lab()[0] * cp.bandSize / 100, cp.bandWidth/2, cp.pickedColor)

		// Draw render
		cp.renderContext.fillStyle = cp.pickedColor.hex()
		cp.renderContext.fillRect(0, 0, cp.squareSize, cp.renderHeight)

		cp.updateFields()
	}

	,pick: function(color){
		if(isNaN(color.rgb()[0])){
			console.log("False color picked")
		} else {
			colorpicker.pickedColor = color
			colorpicker.update()
		}
	}
}