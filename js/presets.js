// Presets
var presets = [
	{
		name: "All colors",
		dark: false,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 0,
		cmax: 100,
		lmin: 0,
		lmax: 100
	},
	{
		name: "Default preset",
		dark: false,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 30,
		cmax: 80,
		lmin: 35,
		lmax: 80
	},
	{
		name: "Colorblind friendly",
		dark: false,
		clbl: true,
		hmin: 0,
		hmax: 360,
		cmin: 40,
		cmax: 70,
		lmin: 15,
		lmax: 85
	},
	{
		name: "Fancy (light background)",
		dark: false,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 15,
		cmax: 40,
		lmin: 70,
		lmax: 100
	},
	{
		name: "Fancy (dark background)",
		dark: true,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 8,
		cmax: 40,
		lmin: 7,
		lmax: 40
	},
	{
		name: "---",
		dark: true,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 0,
		cmax: 100,
		lmin: 0,
		lmax: 100
	},
	{
		name: "Shades",
		dark: false,
		clbl: false,
		hmin: 0,
		hmax: 240,
		cmin: 0,
		cmax: 15,
		lmin: 0,
		lmax: 100
	},
	{
		name: "Tarnish",
		dark: false,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 0,
		cmax: 15,
		lmin: 30,
		lmax: 70
	},
	{
		name: "Pastel",
		dark: false,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 0,
		cmax: 30,
		lmin: 70,
		lmax: 100
	},
	{
		name: "Pimp",
		dark: false,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 30,
		cmax: 100,
		lmin: 25,
		lmax: 70
	},
	{
		name: "Intense",
		dark: false,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 20,
		cmax: 100,
		lmin: 15,
		lmax: 80
	},
	{
		name: "Fluo",
		dark: true,
		clbl: false,
		hmin: 0,
		hmax: 300,
		cmin: 35,
		cmax: 100,
		lmin: 75,
		lmax: 100
	},
	{
		name: "---",
		dark: true,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 0,
		cmax: 100,
		lmin: 0,
		lmax: 100
	},
	{
		name: "Red Roses",
		dark: true,
		clbl: false,
		hmin: 330,
		hmax: 20,
		cmin: 10,
		cmax: 100,
		lmin: 35,
		lmax: 100
	},
	{
		name: "Ochre Sand",
		dark: true,
		clbl: false,
		hmin: 20,
		hmax: 60,
		cmin: 20,
		cmax: 50,
		lmin: 35,
		lmax: 100
	},
	{
		name: "Yellow Lime",
		dark: true,
		clbl: false,
		hmin: 60,
		hmax: 90,
		cmin: 10,
		cmax: 100,
		lmin: 35,
		lmax: 100
	},
	{
		name: "Green Mint",
		dark: true,
		clbl: false,
		hmin: 90,
		hmax: 150,
		cmin: 10,
		cmax: 100,
		lmin: 35,
		lmax: 100
	},
	{
		name: "Ice Cube",
		dark: true,
		clbl: false,
		hmin: 150,
		hmax: 200,
		cmin: 0,
		cmax: 100,
		lmin: 35,
		lmax: 100
	},
	{
		name: "Blue Ocean",
		dark: true,
		clbl: false,
		hmin: 220,
		hmax: 260,
		cmin: 8,
		cmax: 80,
		lmin: 0,
		lmax: 50
	},
	{
		name: "Indigo Night",
		dark: true,
		clbl: false,
		hmin: 260,
		hmax: 290,
		cmin: 40,
		cmax: 100,
		lmin: 35,
		lmax: 100
	},
	{
		name: "Purple Wine",
		dark: true,
		clbl: false,
		hmin: 290,
		hmax: 330,
		cmin: 0,
		cmax: 100,
		lmin: 0,
		lmax: 40
	}

	
	
	
	
];

var updateSettings = function(){
	var preset = presets[$('#presets').val()];
	$('#hmin').val(preset.hmin);
	$('#hmax').val(preset.hmax);
	$('#cmin').val(preset.cmin);
	$('#cmax').val(preset.cmax);
	$('#lmin').val(preset.lmin);
	$('#lmax').val(preset.lmax);
	selectorsState.hue.min = preset.hmin/360;
	selectorsState.hue.max = preset.hmax/360;
	selectorsState.chroma.min = preset.cmin/maxChroma;
	selectorsState.chroma.max = preset.cmax/maxChroma;
	selectorsState.lightness.min = preset.lmin/maxLightness;
	selectorsState.lightness.max = preset.lmax/maxLightness;
	if(preset.clbl){
		$('#colorblindFriendly').attr('checked', true);
	} else {
		$('#colorblindFriendly').attr('checked', false);
	}
	if(preset.dark){
		$('#darkBackground').attr('checked', true);
	} else {
		$('#darkBackground').attr('checked', false);
	}
	
	if(palette)
		initFitting();
	updateBackground();
	updateSelectors();
	updateColorSpace();
};

var initPresets = function(p) {
	$('#presets').val(p)
	updateSettings()
}