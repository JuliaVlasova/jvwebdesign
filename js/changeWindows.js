$(document).ready(function() {
	win1 = new Image();
	win1.src = 'images/window1.png';

	win2 = new Image();
	win2.src = 'images/window1_on.png';

	win3 = new Image();
	win3.src = 'images/window2.png';

	win4 = new Image();
	win4.src = 'images/window2_on.png';

	$('.houses').find(".win").mouseover(function() {
		if($(this).hasClass('biggerOn')) {
			$(this).attr("src", win1.src);
		} else if($(this).hasClass('biggerOff')) {
			$(this).attr("src", win2.src);
		} else if($(this).hasClass('smallerOn')) {
			$(this).attr("src", win3.src);
		} else if($(this).hasClass('smallerOff')) {
			$(this).attr("src", win4.src);
		}
	});

	$('.houses').find(".win").mouseout(function() {
		if($(this).hasClass('biggerOn')) {
			$(this).attr("src", win2.src);
		} else if($(this).hasClass('biggerOff')) {
			$(this).attr("src", win1.src);
		} else if($(this).hasClass('smallerOn')) {
			$(this).attr("src", win4.src);
		} else if($(this).hasClass('smallerOff')) {
			$(this).attr("src", win3.src);
		}
	});

	$('.houses').find(".win").click(function() {
		if($(this).hasClass('biggerOn')) {
			$(this).removeClass('biggerOn');
			$(this).addClass('biggerOff');
		}
		else {
			if($(this).hasClass('biggerOff')) {
				$(this).addClass('biggerOn');
				$(this).removeClass('biggerOff');
			} else {
				if($(this).hasClass('smallerOn')) {
					$(this).addClass('smallerOff');
					$(this).removeClass('smallerOn');
				} else {
					if($(this).hasClass('smallerOff')) {
						$(this).removeClass('smallerOff');
						$(this).addClass('smallerOn');
					}
				}
			}
		}
	});
});
