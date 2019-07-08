var Loadbar = function(div_id){
	this.div_id = div_id;
	this.reader;
	// Init
	$('#'+this.div_id).html('<div class="progress_bar_message">0%</div>');
	this.errorHandler = function(evt){
		switch(evt.target.error.code) {
			case evt.target.error.NOT_FOUND_ERR:
				alert('File Not Found!');
				break;
			case evt.target.error.NOT_READABLE_ERR:
				alert('Oops, the file cannot be read...');
				break;
			case evt.target.error.ABORT_ERR:
				break; // noop
			default:
				alert('Arf, an error occurred reading this file.');
		};
	}
	this.handleFileSelect = function(evt, callback) {
		// Reset progress indicator on new file selection.
		var div = $('#'+this.div_id);
		/*var*/ progress_div = $('#'+this.div_id+' div.progress_bar_message');
		progress_div.css({width:'0%'});
		progress_div.text('0%');
		
		var reader = new FileReader();
		reader.onerror = this.errorHandler;
		reader.onprogress = function(evt){
			// evt is an ProgressEvent.
			if (evt.lengthComputable) {
				var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
				// Increase the progress bar length.
				if (percentLoaded < 100) {
					progress_div.css({width:percentLoaded+'%'});
					progress_div.text(percentLoaded+'%');
				}
			}
		}
		reader.onabort = function(e) {
			alert('File read cancelled');
		};
		reader.onloadstart = function(e) {
			div.addClass("loading");
			progress_div.removeClass("fail_message");
			progress_div.removeClass("success_message");
		};
		reader.onload = function(e) {
			// Ensure that the progress bar displays 100% at the end.
			progress_div.css({width:'100%'});
			progress_div.text('100%');
			var result = reader.result;
			setTimeout(function(){callback(result);}, 500);
		}
		reader.readAsText(evt.target.files[0]);
	}
	
	this.makeFileSelectHandler = function(callback){
		var loader = this;
		return function(evt){
			loader.handleFileSelect(evt, callback);
		};
	}
	
	this.finalize = function(success, message, timeout){
		var message = message || ((success)?("Loading complete"):("Loading failed"));
		var progress_div = $('#'+this.div_id+' div.progress_bar_message');
		var timeout = timeout || 2000;
		if(success){
			progress_div.addClass("success_message");
			progress_div.html(message);
			setTimeout('$("#'+this.div_id+'").removeClass("loading");', timeout);
		} else {
			progress_div.addClass("fail_message");
			progress_div.html(message);
			setTimeout('$("#'+this.div_id+'").removeClass("loading");', timeout);
		}
	}
}