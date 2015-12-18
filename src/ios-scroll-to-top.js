// @author hooriza
(function($) {

	'use strict';

	var scrollToTop = function() {

		var eles = $('.scroll-to-top');
		var start = Date.now();

		var scrollTops = [];
		for (var i = 0, len = eles.length; i < len; i++) {
			scrollTops.push(eles[i].scrollTop);
		}

		(function loop() {

			(window.requestAnimationFrame||window.webkitRequestAnimationFrame)(function() {

				var estimated = Date.now() - start;
				var changed = false;

				for (var i = 0, len = eles.length; i < len; i++) {
					if (!scrollTops[i]) { continue; }

					var duration = Math.min(300, scrollTops[i] * 2);
					var per = Math.min(1, estimated / duration);

					eles[i].scrollTop = scrollTops[i] * (1 - Math.pow(per, 3));
					changed = true;

					if (per === 1) {
						scrollTops[i] = 0;
					}

				}

				if (changed) {
					loop();
				}

			});

		})();

	};

	var onScroll = function() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if (scrollTop === 0) {
			document.documentElement.scrollTop = document.body.scrollTop = 1;
			scrollToTop();
		}
	};

	var onScrollTimer = null;
	var onScrollDelayed = function() {
		if (onScrollTimer) { clearTimeout(onScrollTimer); }
		onScrollTimer = setTimeout(function() {
			onScroll();
			onScrollTimer = null;
		}, 100);
	};

	$(function() {

		var html = document.getElementsByTagName('html')[0];
		var styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		
		html.insertBefore(styleTag, html.firstChild);
		var sheet = styleTag.sheet || styleTag.styleSheet;
		sheet.insertRule('.scrollable { -webkit-overflow-scrolling:touch; overflow:auto; }', 0);

		if (!/ios|iphone|ipad|ipod/i.test(navigator.userAgent)) { return; } // only iOS

		html.style.height = '100%';
		html.style.borderTop = '1px solid transparent';

		window.addEventListener('touchstart', function(evt) {
			var scrollable = evt.target;

			for (
				scrollable = evt.target;
				scrollable && scrollable.classList && !scrollable.classList.contains('scrollable');
				scrollable = scrollable.parentNode
			) { }

			if (scrollable === document || !scrollable) {
				evt.preventDefault();
				return;
			}

			var beforeScrollTop = scrollable.scrollTop;

			scrollable.scrollTop = beforeScrollTop - 1;
			if (beforeScrollTop === scrollable.scrollTop) {
				scrollable.scrollTop += 1;
				if (beforeScrollTop === scrollable.scrollTop) {
					evt.preventDefault();
				}
				return;
			}

			scrollable.scrollTop = beforeScrollTop + 1;
			if (beforeScrollTop === scrollable.scrollTop) {
				scrollable.scrollTop -= 1;
				if (beforeScrollTop === scrollable.scrollTop) {
					evt.preventDefault();
				}
				return;
			}

			scrollable.scrollTop = beforeScrollTop;

		}, false);

		onScrollDelayed();
		window.addEventListener('scroll', onScrollDelayed, false);

	});

})(window.jQuery||window.Zepto);
