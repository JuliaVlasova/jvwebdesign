 $(document).ready(function() {
	
	var starENon = new Image();
	starENon.src = 'images/starENon.png';
	var starENoff = new Image();
	starENoff.src = 'images/starENoff.png';
	var starRUoff = new Image();
	starRUoff.src = 'images/starRUoff.png';
	var starRUon = new Image();
	starRUon.src = 'images/starRUon.png';
	
	

	var star = document.getElementById("star1");
	var starimg = star.firstChild.firstChild;
	star.onmouseover = function() {
		if(starimg.src == starRUoff.src) {
			starimg.src = starRUon.src; 
		}
		else if (starimg.src == starENoff.src) {
			starimg.src = starENon.src; 
		}	
	}
	
	star.onmouseout = function() {
		if(starimg.src == starRUon.src) {
			starimg.src = starRUoff.src; 
		}
		else if (starimg.src == starENon.src) {
			starimg.src = starENoff.src; 
		}	
	}
});
