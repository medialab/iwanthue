// Presets
var presets = [
	{
		name: "All colors",
		dark: false,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 0,
		cmax: 3,
		lmin: 0,
		lmax: 1.5
	},
	{
		name: "Default preset",
		dark: false,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 0.9,
		cmax: 2.4,
		lmin: 0.5,
		lmax: 1.2
	},
	{
		name: "Colorblind friendly",
		dark: false,
		clbl: true,
		hmin: 0,
		hmax: 360,
		cmin: 1.2,
		cmax: 2,
		lmin: 0.2,
		lmax: 1.3
	},
	{
		name: "Fancy (light background)",
		dark: false,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 0.4,
		cmax: 1.2,
		lmin: 1,
		lmax: 1.5
	},
	{
		name: "Fancy (dark background)",
		dark: true,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 0.2,
		cmax: 1.2,
		lmin: 0.1,
		lmax: 0.6
	},
	{
		name: "---",
		dark: true,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 0,
		cmax: 3,
		lmin: 0,
		lmax: 1.5
	},
	{
		name: "Shades",
		dark: false,
		clbl: false,
		hmin: 0,
		hmax: 240,
		cmin: 0,
		cmax: 0.4,
		lmin: 0,
		lmax: 1.5
	},
	{
		name: "Tarnish",
		dark: false,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 0,
		cmax: 0.4,
		lmin: 0.4,
		lmax: 1.1
	},
	{
		name: "Pastel",
		dark: false,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 0,
		cmax: 0.9,
		lmin: 1,
		lmax: 1.5
	},
	{
		name: "Pimp",
		dark: false,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 0.9,
		cmax: 3,
		lmin: 0.4,
		lmax: 1
	},
	{
		name: "Intense",
		dark: false,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 0.6,
		cmax: 3,
		lmin: 0.2,
		lmax: 1.1
	},
	{
		name: "Fluo",
		dark: true,
		clbl: false,
		hmin: 0,
		hmax: 300,
		cmin: 1,
		cmax: 3,
		lmin: 1.1,
		lmax: 1.5
	},
	{
		name: "---",
		dark: true,
		clbl: false,
		hmin: 0,
		hmax: 360,
		cmin: 0,
		cmax: 3,
		lmin: 0,
		lmax: 1.5
	},
	{
		name: "Red Roses",
		dark: true,
		clbl: false,
		hmin: 330,
		hmax: 20,
		cmin: 0.3,
		cmax: 3,
		lmin: 0.5,
		lmax: 1.5
	},
	{
		name: "Ochre Sand",
		dark: true,
		clbl: false,
		hmin: 20,
		hmax: 60,
		cmin: 0.3,
		cmax: 1.6,
		lmin: 0.5,
		lmax: 1.5
	},
	{
		name: "Yellow Lime",
		dark: true,
		clbl: false,
		hmin: 60,
		hmax: 90,
		cmin: 0.3,
		cmax: 3,
		lmin: 0.5,
		lmax: 1.5
	},
	{
		name: "Green Mint",
		dark: true,
		clbl: false,
		hmin: 90,
		hmax: 150,
		cmin: 0.3,
		cmax: 3,
		lmin: 0.5,
		lmax: 1.5
	},
	{
		name: "Ice Cube",
		dark: true,
		clbl: false,
		hmin: 150,
		hmax: 200,
		cmin: 0,
		cmax: 3,
		lmin: 0.5,
		lmax: 1.5
	},
	{
		name: "Blue Ocean",
		dark: true,
		clbl: false,
		hmin: 220,
		hmax: 260,
		cmin: 0.2,
		cmax: 2.5,
		lmin: 0,
		lmax: 0.8
	},
	{
		name: "Indigo Night",
		dark: true,
		clbl: false,
		hmin: 260,
		hmax: 290,
		cmin: 1.2,
		cmax: 3,
		lmin: 0.5,
		lmax: 1.5
	},
	{
		name: "Purple Wine",
		dark: true,
		clbl: false,
		hmin: 290,
		hmax: 330,
		cmin: 0,
		cmax: 3,
		lmin: 0,
		lmax: 0.6
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