/*
 * jQuery Minimun Password Requirements 1.0
 * http://elationbase.com
 * Copyright 2013, elationbase
 * Check Minimun Password Requirements
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
  
  
(function($){
    $.fn.extend({
        // change 'pluginname' to your plugin name (duh)
        passwordRequirements: function(options) {

            // options for the plugin
            var defaults = {
				numCaracters: 8,
                useLowercase: true,
                useUppercase: true,
				useNumbers: true,
				useSpecial: true,
				infoMessage: "The minimum password length is 8 characters and must contain at least 1 capital letter, 1 lowercase letter and 1 number.",
				style: "light", // Style Options Light or Dark
				fadeTime:300, // FadeIn / FadeOut in milliseconds
				
            }

            var options =  $.extend(defaults, options);

            return this.each(function() {
				
				var o = options;
				
				// Append password hint div
				var messageDiv2 = '<div id="pr-box" class="label-info">' + o.infoMessage + '</div>';
				
				var messageDiv = '<div id="pr-box"><p>The minimum password length is 8 characters and must contain at least 1 capital letter, 1 lowercase letter and 1 number.</p><ul><li class="pr-numCaracters"><i></i># of caracters</li><li class="pr-useLowercase"><i></i>Lowercase letter</li><li class="pr-useUppercase"><i></i>Capital letter</li><li class="pr-useNumbers"><i></i>Number</li><li class="pr-useSpecial"><i></i>Special caracter</li></ul></div>';
				
                
				// Show password hint 
				$(this).on("focus",function (e){
					e.preventDefault();
					$(this).parent().css("position","relative").append(messageDiv);
					var targetMessage = $("#pr-box");
					targetMessage .addClass(o.style)
							      .fadeIn(o.fadeTime)
				});
				// Show password hint 
				$(this).on("blur",function (e){
					e.preventDefault();
					var targetMessage = $("#pr-box");
					targetMessage.fadeOut(o.fadeTime, function(){
						$(this).remove();
					})
				});
				
				
				
				// Show or Hide password hint based on user's event
				// Set variables
				var lowerCase   		= new RegExp('[a-z]');
				var upperCase   		= new RegExp('[A-Z]');
				var numbers     		= new RegExp('[0-9]');
				var specialCaracter     = new RegExp('[!,%,&,@,#,$,^,*,?,_,~]');
				
				// Show or Hide password hint based on keyup
				$(this).on("keyup", function (){
					var thisVal = $(this).val();  
					
					// Check # of caracters
					if ( thisVal.length >= o.numCaracters ) {
						console.log("good numCaracters");
						$(".pr-numCaracters i").addClass("pr-ok");
					} else {
						console.log("bad numCaracters");
						$(".pr-numCaracters i").removeClass("pr-ok");
					}
					// lowerCase meet requirements
					if (o.useLowercase === true) {
						//alert("yes")
						if ( thisVal.match(lowerCase) ) {
							console.log("good lowerCase");
							$(".pr-useLowercase i").addClass("pr-ok");
						} else {
							console.log("bad lowerCase");
							$(".pr-useLowercase i").removeClass("pr-ok");
						}
					}
					// upperCase meet requirements
					if (o.useUppercase === true) {
						//alert("yes")
						if ( thisVal.match(upperCase) ) {
							console.log("good upperCase");
							$(".pr-useUppercase i").addClass("pr-ok");
						} else {
							console.log("bad upperCase");
							$(".pr-useUppercase i").removeClass("pr-ok");
						}
					}
					// upperCase meet requirements
					if (o.useNumbers === true) {
						//alert("yes")
						if ( thisVal.match(numbers) ) {
							console.log("good numbers");
							$(".pr-useNumbers i").addClass("pr-ok");
						} else {
							console.log("bad numbers");
							$(".pr-useNumbers i").removeClass("pr-ok");
						}
					}
					// upperCase meet requirements
					if (o.useSpecial === true) {
						//alert("yes")
						if ( thisVal.match(specialCaracter) ) {
							console.log("good specialCaracter");
							$(".pr-useSpecial i").addClass("pr-ok");
						} else {
							console.log("bad specialCaracter");
							$(".pr-useSpecial i").removeClass("pr-ok");
						}
					}
				});
				
            });
        }
    });
})(jQuery);
