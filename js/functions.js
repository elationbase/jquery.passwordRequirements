// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs

// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);

// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }


// remap jQuery to $
(function($){


/* trigger when page is ready */
$(document).ready(function (){

	$("input").passwordRequirements( { 
		numCaracters: 8,
	    useLowercase: true,
	    useUppercase: true,
		useNumbers: true,
		useSpecial: true,
		infoMessage: "The minimum password length is 8 characters and must contain at least 1 capital letter, 1 lowercase letter and 1 number.",
		style: "dark", // Style Options Light or Dark
		fadeTime:3000, // FadeIn / FadeOut in milliseconds,
		place: "top"
	} );

});


/* optional triggers

$(window).load(function() {
	
});

$(window).resize(function() {
	
});

*/


})(window.jQuery);