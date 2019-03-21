//根据浏览器的宽自动分配body的字号
var clientWidth;
(function (doc, win) {
	
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			// if (docEl.style.fontSize) return;
			clientWidth = docEl.clientWidth;
			//alert(clientWidth);
			clientWidth = clientWidth>750?750:clientWidth;
			clientWidth = clientWidth<320?320:clientWidth;
			if (!clientWidth) return;
			docEl.style.fontSize =100 * (clientWidth / 750) + 'px';
			if (document.body) {
				document.body.style.fontSize = docEl.style.fontSize;
			}
		};
	recalc();
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);