$(document).ready(function() {
	$(".up").hide();
	$(window).scroll(function() {
		if($(window).scrollTop() > $(window).height()) {
			$(".up").show(500).addClass("animated fadeInUp");
		}
		else {
			$(".up").hide(500).removeClass("animated fadeInUp");
		}	
	});
	$(".up").click(function() {
		$('html, body').animate({scrollTop: 0},500);
			return false;
	});
});
