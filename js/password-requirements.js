
// Set variables
var upperCase 	= new RegExp('[A-Z]');
var lowerCase 	= new RegExp('[a-z]');
var numbers   	= new RegExp('[0-9]');

// Function to check password strength 
function passwordRequirements(eventNames, item, infoMessage) {
	// Make sure the password hint is hidden
	$(infoMessage).hide();

	// Show password hint 
	$(item).on("focus",function (){
		$(infoMessage).removeClass("label-important")
				   .addClass("label-info")
				   .fadeIn(300)
				   .prev("div.control-group")
				   .removeClass("error");
	});

	// Split events
	eventNames = eventNames.split(",");

	// Loop for events
	for (var i = 0; i < eventNames.length; i++ ) {
	
		// Trim event spaces
		var eventName = $.trim(eventNames[i]);
	
		// Show or Hide password hint based on user's event
		$(item).on( eventName, function (){
			var thisVal = $(this).val();
		
			// Password meet requirements
			if (thisVal.match(upperCase) 
				&& thisVal.match(lowerCase) 
				&& thisVal.match(numbers) 
				&& thisVal.length > 7) {
				
		    	$(infoMessage).fadeOut(500)
						   .removeClass("label-important")
						   .addClass("label-info")
						   .prev("div.control-group")
						   .removeClass("error");
			}
			// Password does not meet requirements
			else {
		    	$(infoMessage).addClass("label-important")
						   .removeClass("label-info")
						   .fadeIn(300)
						   .prev("div.control-group")
						   .addClass("error");
			}
		});
	};
};
