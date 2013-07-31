/*
 * jQuery Minimun Password Requirements 1.0
 * https://github.com/elationbase/jquery.passwordRequirements
 * Copyright 2013, elationbase
 * Check Minimun Password Requirements
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
  
  
(function($){
    $.fn.extend({
        passwordRequirements: function(options) {

            // options for the plugin
            var defaults = {
				numCaracters: 8,
                useLowercase: true,
                useUppercase: true,
				useNumbers: true,
				useSpecial: true,
				infoMessage: "The minimum password length is 8 characters and must contain at least 1 capital letter, 1 lowercase letter and 1 number.",
				infoMessageHints: true,
				style: "light", // Style Options: Light or Dark
				fadeTime:300, // FadeIn / FadeOut in milliseconds
				place: "top",  // Tooltip postion Options: top, bottom, left, right, topleft, topright, bottomleft, bottomright
            }

            var options =  $.extend(defaults, options);

            return this.each(function() {
				
				var o = options;
				
				
                
				// Show password hint 
				$(this).on("focus",function (e){
					e.preventDefault();
					
				
					// Add password tooltip div
					var tooltipDiv 	= '<div class="pr-tooltip"><span class="pr-tooltip-arrow"></span><div class="pr-tooltip-inner"><p>' + o.infoMessage + '</p><ul><li class="pr-numCaracters"><i></i># of caracters</li><li class="pr-useLowercase"><i></i>Lowercase letter</li><li class="pr-useUppercase"><i></i>Capital letter</li><li class="pr-useNumbers"><i></i>Number</li><li class="pr-useSpecial"><i></i>Special caracter</li></ul></div></div>';
					var inputWidth 	= $(this).outerWidth();
					var wrapper 	= '<div class="pr-tooltip-wrap" style="width:'+ inputWidth +'px"></div>'
					
					$(this).parent().css('postion','relative').append(tooltipDiv);
					
					
					// Position tooltip
					// Position Variables
					var inputPosition 	= $(this).offset();
					var inputPositionX 	= inputPosition.left;
					var inputPositionY 	= inputPosition.top;
					
					switch (o.place) {
						case 'top':
							$(".pr-tooltip").addClass("pr-tooltip-top")
											.css({ "left": "45%", "top": "0px" });
						break;
						case 'bottom':
							$(".pr-tooltip").addClass("pr-tooltip-bottom")
											.css({ "left": inputPositionX + "px", "top": inputPositionY + "px" });
						break;
						case 'left':
							$(".pr-tooltip").addClass("pr-tooltip-left")
											.css({ "left": inputPositionX + "px", "top": inputPositionY + "px" });
						break;
						case 'right':
							$(".pr-tooltip").addClass("pr-tooltip-right")
											.css({ "left": inputPositionX + "px", "top": inputPositionY + "px" });
						break;
					};
					
					// Set witch options to show
					// Hide Lowercase
					if ( o.useLowercase === false  ) {
						$(".pr-useLowercase").addClass("pr-hide");
					};
					// Hide Upercase
					if ( o.useUppercase === false  ) {
						$(".pr-useUppercase").addClass("pr-hide");
					};
					// Hide Numbers
					if ( o.useNumbers === false  ) {
						$(".pr-useNumbers").addClass("pr-hide");
					};
					// Hide Special Caracters
					if ( o.useSpecial === false  ) {
						$(".pr-useSpecial").addClass("pr-hide");
					};
					
				
					var targetMessage = $(".pr-tooltip");
					targetMessage .addClass(o.style)
							      .fadeIn(o.fadeTime);
				});
				
				// Hide password hint 
				$(this).on("blur",function (e){
					e.preventDefault();
					var targetMessage = $(".pr-tooltip");
					targetMessage.fadeOut(o.fadeTime, function () {
						targetMessage.remove();
					});
				});
				
				// Show or Hide password tooltip based on users event
				// Set variables
				var lowerCase   	= new RegExp('[a-z]');
				var upperCase   	= new RegExp('[A-Z]');
				var numbers     	= new RegExp('[0-9]');
				var specialCaracter = new RegExp('[!,%,&,@,#,$,^,*,?,_,~]');
				
				// Show or Hide password hint based on keyup
				$(this).on("keyup", function (){
					var thisVal = $(this).val();  
					
					// Check # of caracters
					if ( thisVal.length >= o.numCaracters ) {
						//console.log("good numCaracters");
						$(".pr-numCaracters i").addClass("pr-ok");
					} else {
						//console.log("bad numCaracters");
						$(".pr-numCaracters i").removeClass("pr-ok");
					}
					
					// Lowercase meet requirements
					if (o.useLowercase === true) {
						if ( thisVal.match(lowerCase) ) {
							//console.log("good lowerCase");
							$(".pr-useLowercase i").addClass("pr-ok");
						} else {
							//console.log("bad lowerCase");
							$(".pr-useLowercase i").removeClass("pr-ok");
						}
					}
					
					// Uppercase meet requirements
					if (o.useUppercase === true) {
						if ( thisVal.match(upperCase) ) {
							//console.log("good upperCase");
							$(".pr-useUppercase i").addClass("pr-ok");
						} else {
							//console.log("bad upperCase");
							$(".pr-useUppercase i").removeClass("pr-ok");
						}
					}
					
					// Numbers meet requirements
					if (o.useNumbers === true) {
						if ( thisVal.match(numbers) ) {
							//console.log("good numbers");
							$(".pr-useNumbers i").addClass("pr-ok");
						} else {
							//console.log("bad numbers");
							$(".pr-useNumbers i").removeClass("pr-ok");
						}
					}
					
					// Special Caracters meet requirements
					if (o.useSpecial === true) {
						if ( thisVal.match(specialCaracter) ) {
							//console.log("good specialCaracter");
							$(".pr-useSpecial i").addClass("pr-ok");
						} else {
							//console.log("bad specialCaracter");
							$(".pr-useSpecial i").removeClass("pr-ok");
						}
					}
				});
				
            });
        }
    });
})(jQuery);
