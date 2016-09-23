(function($){

/**********************************************************
-----------------------------------------------------------
	smooth the scroll
	v1.0.0
	23/09/2016
	by AZGSKULL
	Git https://github.com/azgskull/jquery.smoothescroll
-----------------------------------------------------------
**********************************************************/


	$.fn.smoothescroll = function (step, speed) {
		var $body = $('html, body');
		var $window = $(window);
		var rootX = $window.scrollLeft();
		var rootY = $window.scrollTop();
		var betaX = rootX;
		var betaY = rootY;
		var incrementStep = 150;
		var speedCurent = speed;
		var stepCurrent = step;
		var scrolling = false;
		////////////
		// functions

			$body.direction = function (e) {
				/*
					this function check direction of scroll of both axes X and Y
					! compatibility : 
						deltaX for chrome
						detail for firefox
				*/
				return {
					x : ((e.originalEvent.wheelDelta*-1) || e.originalEvent.detail) > 0 ? 1 : -1,
					y : (e.originalEvent.deltaY || e.originalEvent.detail) > 0 ? 1 : -1,
				};
			}

			$body.saveXY = function (betaX,betaY) {
				/*
					this function save new pos into root variables
				*/
				rootX = betaX;
				rootY = betaY;
			}

		///////////
		// handlers

			$body.on("mousewheel DOMMouseScroll", function(e) {
				betaX = $window.scrollLeft();
				betaY = $window.scrollTop();
				var scrollDirection = $body.direction(e);
				stepCurrent += incrementStep;
				// if(stepCurrent<200)
				// 	stepCurrent = 200;
				$body
					.stop()
					.animate({
						'scrollTop' : (stepCurrent * scrollDirection.y) + rootY,
						'scrollLeft' : (stepCurrent * scrollDirection.x) + rootX,
					},
					{
						duration: speedCurent,
						easing  : "linear",
						progress : function(o,p) {
							scrolling = true;
						},
						complete : function() {
							scrolling = false;
							var tmpStep = stepCurrent;
							stepCurrent = step;
						}
					});

				
				return false;
			});

			$window.on("scroll", function(e) {
				betaX = $window.scrollLeft();
				betaY = $window.scrollTop();

				$body.saveXY(betaX, betaY);
			});
	};

})(jQuery);