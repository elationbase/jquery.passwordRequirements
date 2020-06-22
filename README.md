### jQuery Plugin 
# [Password Requirements](http://elationbase.com/jquery/jquery-password-requirements/)
## The easy way to help users meet your minimum password requirements
================================

jQuery Plugin to Check Minimun Password Requirements
<b><a href="http://elationbase.com/jquery/jquery-password-requirements/index.html#demos">View Demo</a></b> 


### Usage
1.) Add CSS before the opening of the &lt;body&gt; tag
`````html
<link rel="stylesheet" href="css/jquery.passwordRequirements.css">
`````
2.) Add jQuery and plugin.
(recommended to place at the end before the close of the &lt;body&gt; tag for faster loading )
`````html
<!-- Grab Google CDN's jQuery. fall back to local if necessary -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script>window.jQuery || document.write("<script src='_/js/lib/jquery-1.10.2.min.js'>\x3C/script>")</script>
<script src="js/jquery.passwordRequirements.min.js"></script>
`````
3.) Call the plugin Inside of a &lt;script&gt; block after the include of the step 2
`````javascript
$(document).ready(function (){
    $(".pr-password").passwordRequirements();
});
`````
4.) HTML5 markup
`````html
<input type="password" class="pr-password">
`````
### Options
jQuery password requirements plugin is very easy to configure to your exact requirements.

####Password Requirements Options
<b>numCaracters </b> (Number of minimun required caracters)
`````html
default: 8
options: integer
`````
<b>useLowercase</b> (Make mandatory a lowercase caracter)
`````html
default: true
options: boolean (true / false)
`````
<b>useUppercase</b> (Make mandatory a upercase caracter)
`````html
default: true
options: boolean (true / false)
`````
<b>useNumbers</b> (Make mandatory a numeric caracter)
`````html
default: true
options: boolean (true / false)
`````
<b>useSpecial</b> (Make mandatory a special caracter)
`````html
default: true
options: boolean (true / false)
`````


####Other Options

<b>infoMessage</b> (Change the message to help the user understan the requirements)
`````html
default: 'The minimum password length is 8 characters and must contain at least 1 lowercase letter, 1 capital letter 1 number and 1 special caracter.'
options: string
`````
<b>style</b> (The design of the tooltip)
`````html
default: 'light'
options: 'dark', 'light'
`````
<b>fadeTime</b> (Time in milliseconds of fade transition at open / close)
`````html
default: 300
options: integer
`````


### License
Copyright (c) 2014 Elation Base
Licensed under the MIT license.
`````html
/*
 * jQuery Minimun Password Requirements 1.1
 * http://elationbase.com
 * Copyright 2014, elationbase
 * Check Minimun Password Requirements
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
`````
