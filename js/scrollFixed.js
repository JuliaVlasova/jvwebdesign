$(document).ready(function () {
// grab the initial top offset of the navigation 
	var sticky_navigation_offset_top = $('nav').offset().top;
	
// our function that decides weather the navigation bar should have "fixed" css position or not.
	var sticky_navigation = function(){
	var scroll_top = $(window).scrollTop(); // our current vertical position from the top
		
// if we've scrolled more than the navigation, change its position to fixed to stick to top, otherwise change it back to relative
		if (scroll_top > sticky_navigation_offset_top) { 
			$('nav').addClass('navbar-fixed-top');
			$('.content').addClass('menu-padding');
		} else {
			$('nav').removeClass('navbar-fixed-top');
			$('.content').removeClass('menu-padding');
		}   
	};
	
	sticky_navigation();
	
	$(window).scroll(function() {
		 sticky_navigation();
	});	
});
