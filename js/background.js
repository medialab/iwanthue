var updateBackground = function(){
	if($('#darkBackground').is(':checked')){
		$('#workbench').css('background-color', '#333333');
		$('#workbench').css('color', '#EEEEEE');
		$('.palette_item').removeClass('light');
		$('.palette_item').addClass('dark');
		$('.add-on').addClass('dark')
	} else {
		$('#workbench').css('background-color', '#F4F3F2');
		$('#workbench').css('color', '#555');
		$('.palette_item').removeClass('dark');
		$('.palette_item').addClass('light');
		$('.add-on').removeClass('dark')
	}
}