$(document).ready(function() {
	
	$(".phrase").css("opacity", "0");
	$(".img_serv").css("opacity", "0");
	$(".phrase1").addClass("visible animated fadeInRight");
	$(".phrase2").addClass("visible animated fadeInRight");
	$(".phrase3").addClass("visible animated fadeInRight");
	$(".about-me").css("opacity", "0");
	$(".about-me-item").css("opacity", "0");
	  
	
	$(".steps .col-sm-3").mouseenter(function() {
		$(this).find(".number").hide();
		$(this).find(".step_heading").hide();
		$(this).find(".step_content").show();
	});
	
	$(".steps .col-sm-3").mouseleave(function() {
		$(this).find(".number").show();
		$(this).find(".step_heading").show();
		$(this).find(".step_content").hide();
	});
	
	$(".hidden_a").hide();
	$(".image").mouseover(function() {
		$(this).find(".hidden_a").show();
		$(this).find("img").addClass("hover");
	});
	
	$(".image").mouseout(function() {
		$(this).find(".hidden_a").hide();
		$(this).find("img").removeClass("hover");	
	});
	
	
	//Move when mousemove occurs
	$('.lant').mousemove(function(e){
		$('.lant').css('top', e.pageY/30 - 20);
		$('.lant').css('right', e.pageX/20 - 10);
	});
	
	
	//Star1 hover
	
	
	var lanternLeft = ($(window).width()/2 - $(".lantern").width()/2).toString() + "px";
	$(".lantern").css("left",lanternLeft);
	$(window).resize(function(){
	var lanternLeft = ($(window).width()/2 - $(".lantern").width()/2).toString() + "px";
	$(".lantern").css("left",lanternLeft);
	});
	
	/* Изменение пунктов меню при прокрутке */ 
	var lastId,
	topMenu = $("#nav"),
	topMenuHeight = topMenu.outerHeight() + 15,
	// All list items
	menuItems = topMenu.find("a"),
	// Anchors corresponding to menu items
	scrollItems = menuItems.map(function() {
		var item = $($(this).attr("href"));
		if (item.length) {
			return item;
		}
	});
		/* Изменение пунктов меню при прокрутке */ 
		
	$(window).scroll(function() {
		var lanternLeft = ($(window).width()/2 - $(".lantern").width()/2).toString() + "px";
		$(".lantern").css("left",lanternLeft);
		/* Изменение пунктов меню при прокрутке */ 
		// Get container scroll position
		var fromTop = $(this).scrollTop() + topMenuHeight;

		// Get id of current scroll item
		var cur = scrollItems.map(function() {
			if ($(this).offset().top < fromTop) {
				return this;
			}
			
		});
		// Get the id of the current element
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems
			.parent().removeClass("activeli")
			.end().filter("[href='#" + id + "']").parent().addClass("activeli");
		}
		/* Изменение пунктов меню при прокрутке */ 
			
		if ($(this).scrollTop() >= $(".stars").outerHeight()/5) {
			$(".phrase3").fadeOut();
						
		}  
		else {
			$(".phrase3").fadeIn();
		}
						
		if ($(this).scrollTop() >= $(".stars").outerHeight()/2) {
			$(".phrase2").fadeOut();
		}  
		else {
			$(".phrase2").fadeIn();
		}
					
		if ($(this).scrollTop() >= $(".stars").outerHeight()/1.5) {
			$(".phrase1").fadeOut();
			$(".moon").css("top", "50px");
			$(".star1").css("top", "20px");
			$(".star3").css("top", "190px");
			$("#bat").css("top", "157px");
		} 

					
		else {
			$(".phrase1").fadeIn();
			$(".moon").css("top", "150px");
			$("#bat").css("top", "80px");
			$(".star1").css("top", "30px");
			$(".star3").css("top", "218px");
		}
					
					
		if ($(this).scrollTop() > $(".stars").outerHeight()) {
			$(".star1").hide();
			$(".star2").hide();
			$(".star3").hide();
			$(".star4").hide();
			$(".star5").hide();
			$(".star6").hide();
			$(".moon").hide();
			$("#bat").hide();
		}

		else {
			$(".star1").show();
			$(".star2").show();
			$(".star3").show();
			$(".star4").show();
			$(".star5").show();
			$(".star6").show();
			$(".moon").show();
			$("#bat").show();
		}
					
					
		if ($(this).scrollTop() > $(window).height() - 100) {
			$(".img_serv").addClass("visible animated fadeInUp");
		}
									
		if ($(this).scrollTop() > $("#servDetail").outerHeight() + $(".serv_whole").outerHeight() + $(".steps").outerHeight() + $(".stars").outerHeight() + $(".portfolio").outerHeight()) {
			$(".about-me").addClass("visible animated fadeInUp");
			var elements = $(".about-me").find('.about-me-item');
			var i = 0;
			interval = setInterval(function(){
				if(elements.eq(i).hasClass("left")) {
					elements.eq(i).addClass('visible animated fadeInLeft');
				} 
				else {
					elements.eq(i).addClass('visible animated fadeInRight');
				}
				i++;
				if(i == elements.length) {
					clearInterval(interval);
				}
			}, 300);
		}
	});	
});
	