/*
 * jQuery Minimun Password Requirements 1.2
 * http://elationbase.com
 * Copyright 2014, elationbase
 * Check Minimun Password Requirements
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Modified by: Misteregis <misteregis@gmail.com>
 * Modified date: 2022/10/20
*/

(function ($) {
    $.fn.passwordRequirements = function (options) {
        // options for the plugin
        options = $.extend($.fn.passwordRequirements.defaults, options);

        return this.each(function () {
            var o = options;
            var $this = this;
            var info = o.infoMessageTextArray;
            var infoMessage = '';
            var infoToUse = {};

            infoMessage = info.minCharacters.replace('{0}', o.minCharacters || o.numCharacters);

            if (o.maxCharacters) {
                infoMessage += ' ' + info.maxCharacters.replace('{0}', o.maxCharacters);
            }

            for (var opt in o) {
                if (['minCharacters', 'maxCharacters'].includes(opt)) continue;

                if (info.hasOwnProperty(opt) && o[opt] && !infoToUse.hasOwnProperty(opt)) {
                    infoToUse[opt] = info[opt].replace('{0}', o[opt]);
                }
            }

            infoToUse = Object.values(infoToUse);

            if (infoToUse.length) {
                var last = infoToUse[0];
                var at_least = last;

                if (infoToUse.length > 1) {
                    last = infoToUse.pop();

                    at_least = infoToUse.join(', ') + info.and + last;
                }

                infoMessage += ' ' + info.mustContain + ' ' + at_least;
            }

            infoMessage += '.';

            this.passwordRequirements = { infoMessage };

            var lis = [], toCheck = {};

            // Check if the options are true
            $(['numCharacters', 'useLowercase', 'useUppercase', 'useNumbers', 'useSpecial']).each(function (_, opt) {
                if (o[opt]) {
                    lis.push($('<li/>', { class: 'pr-' + opt, html: '<span></span>' + o[opt + 'Text'] }));
                    toCheck[opt + 'Done'] = false;
                }
            });

            if (!lis.length) return;

            var toCheckTotal = Object.keys(toCheck).length;

            var checked = function () {
                return Object.values(toCheck).filter(b => b === true).length === toCheckTotal;
            }

            // Show Message reusable function
            var showMessage = function () {
                if (!checked()) {
                    $(".pr-password").each(function () {
                        var id = 'pr-box-' + $(".pr-password").index($this);

                        // Append info box to the body
                        if (!$("#" + id).length) {
                            var em = $('<em/>');
                            var ul = $('<ul/>').append(lis);
                            var p = $('<p/>', { text: $this.passwordRequirements.infoMessage });
                            var prBoxInner = $('<div/>', { class: 'pr-box-inner' }).append([p, ul]);
                            var prBox = $('<div/>', { id, class: 'pr-box' }).append([em, prBoxInner]);

                            // Append input in the box
                            prBox.get(0)._element = $this;

                            // Update box position
                            prBox.get(0).updatePos = function () {
                                var posH = $(this._element).offset().top,
                                    itemH = $(this._element).innerHeight(),
                                    top = posH + itemH,
                                    left = $(this._element).offset().left;

                                $(this).css({ top, left });
                            };

                            $('.pr-box').remove();
                            $("body").append(prBox);

                            prBox.addClass(o.style)
                                .fadeIn(o.fadeTime)
                                .get(0).updatePos();

                            scroll({ top: $this.offsetTop, behavior: "smooth" });
                        }
                    });
                }
            };

            // Show password hint
            $(this).on("focus", showMessage);

            // Delete Message reusable function
            var deleteMessage = function () {
                $(".pr-box").fadeOut(o.fadeTime, function () {
                    $(this).remove();
                });
            };

            // Show / Delete Message when completed requirements function
            var checkCompleted = function () {
                if (checked()) {
                    deleteMessage();
                } else {
                    showMessage();
                }
                checked();
            };

            // Show password hint
            $(this).on("blur", deleteMessage);

            var range = {
                min: o.minCharacters || o.numCharacters,
                max: o.maxCharacters || ''
            };

            // Show or Hide password hint based on user's event
            // Set variables
            var regex = {
                useSpecial: /[,!%&@#$^*?_~=]/,
                useNumbers: /\d/,
                useLowercase: /[a-z]/,
                useUppercase: /[A-Z]/,
                numCharacters: eval('/^(?=.{' + range.min + ',' + range.max + '}$).+/'),
            };

            // The pattern string
            var pattern = '';

            // Build the pattern string
            for (var key in regex) {
                if (o[key]) {
                    var rgx = regex[key].source;

                    pattern += rgx.includes('(') ? rgx : '(?=.*' + rgx + ')';
                }
            }

            if (pattern) {
                // Apply pattern to input
                $(this).attr({
                    maxlength: o.maxCharacters,
                    minlength: range.min,
                    pattern
                });
            }

            // Show or Hide password hint based on keyup (input) and apply pattern
            $(this).on("input focus", function (e) {
                for (var key in toCheck) {
                    var done = $(this).val().match(regex[key.slice(0, -4)]) !== null;
                    var cls = done ? 'addClass' : 'removeClass';

                    toCheck[key] = done;

                    checkCompleted();

                    $(".pr-" + key.slice(0, -4) + " span")[cls]("pr-ok");
                }
            });
        });
    };

    $.fn.passwordRequirements.getPos = function (element) {
        var posH = $(element).offset().top,
            itemH = $(element).innerHeight(),
            totalH = posH + itemH,
            itemL = $(element).offset().left;

        return { top: totalH, left: itemL };
    }

    // plugin defaults
    $.fn.passwordRequirements.defaults = {
        numCharacters: 8,
        minCharacters: null,
        maxCharacters: null,
        useLowercase: true,
        useUppercase: true,
        useNumbers: true,
        useSpecial: true,
        style: "light", // Style Options light or dark
        fadeTime: 300 // FadeIn / FadeOut in milliseconds
    };

    $.fn.passwordRequirements.locales = [];

    $.fn.passwordRequirements.locales["en"] = {
        infoMessageTextArray: {
            minCharacters: "The minimum password length is {0} characters",
            maxCharacters: "and the maximum is {0} characters",
            mustContain: "and must contain at least",
            useLowercase: "1 lowercase letter",
            useUppercase: "1 capital letter",
            useNumbers: "1 number",
            useSpecial: "1 special character",
            and: " and "
        },
        numCharactersText: "# of characters",
        useLowercaseText: "Lowercase letter",
        useUppercaseText: "Capital letter",
        useNumbersText: "Number",
        useSpecialText: "Special character"
    };

    $.extend($.fn.passwordRequirements.defaults, $.fn.passwordRequirements.locales['en']);

    $(window).resize(function () {
        if ($(".pr-box").length) {
            $(".pr-box").get(0).updatePos();
        }
    });
})(jQuery);
