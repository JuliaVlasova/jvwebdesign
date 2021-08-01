$(document).ready(function() {
	var size = 600;
	var artContent = $('.artannotation');
	var arr = artContent.get();  

	$(window).resize(function(){
				if($(window).width() > 800) {
					var size = 600;
				}
				else if($(window).width() < 800 && $(window).width() > 700) {
					var size = 300;
				}
				else if($(window).width() < 700 && $(window).width() > 600) {
					var size = 100;
				}
				else if($(window).width() < 600 && $(window).width() > 500) {
					var size = 70;
				}
				else if($(window).width() < 500 && $(window).width() > 400) {
					var size = 60;
				}
				else if($(window).width() < 400 && $(window).width() > 300) {
					var size = 50;
				}
				else if($(window).width() < 300) {
					var size = 40;
				}
				

		for(var i = 0; i < arr.length; i++) {
			var artText = $(arr[i]).text();
			if(artText.length > size){
				$(arr[i]).text(artText.slice(0, size) + ' ...');
			}
		} 
	});

	if($(window).width() > 800) {
					var size = 600;
				}
				else if($(window).width() < 800 && $(window).width() > 700) {
					var size = 100;
				}
				else if($(window).width() < 700 && $(window).width() > 600) {
					var size = 80;
				}
				else if($(window).width() < 600 && $(window).width() > 500) {
					var size = 70;
				}
				else if($(window).width() < 500 && $(window).width() > 400) {
					var size = 60;
				}
				else if($(window).width() < 400 && $(window).width() > 300) {
					var size = 50;
				}
				else if($(window).width() < 300) {
					var size = 40;
				}
				
	for(var i = 0; i < arr.length; i++) {
			var artText = $(arr[i]).text();
			if(artText.length > size){
				$(arr[i]).text(artText.slice(0, size) + ' ...');
			}
	} 
});
