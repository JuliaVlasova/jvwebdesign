$(document).ready(function() {
	var movingBat = new Image();
	movingBat.src = 'images/bat1.gif';
	var batSimple = new Image();
	batSimple.src = 'images/bat1.png';
	var bat = document.getElementById("bat");	
	
	bat.onmouseover = function() {
		bat.firstChild.src = movingBat.src;
		
		var newLeft = Math.round($(window).width() * Math.random());
		if(newLeft > $(window).width() - $(this).width()) {
			newLeft = Math.round($(window).width()/2 * Math.random());
		}
		newLeft.toString();
		
		var newTop = Math.round($(window).height() * Math.random());
		if(newTop > $(window).height() - $(this).height() ) {
			newTop = Math.round($(window).height()/2  * Math.random());	
		}
		newTop.toString();
				
		bat.style.left =  newLeft + 'px';
		bat.style.top =  newTop + 'px';	
	}
});
