/*
 * jQuery Minimun Password Requirements 1.2
 * http://elationbase.com
 * Copyright 2014, elationbase
 * Check Minimun Password Requirements
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Modified by: Misteregis <misteregis@gmail.com>
 * Modified date: 2022/10/18
*/


(function ($) {
    $.fn.passwordRequirements = function (options) {
        // options for the plugin
        options = $.extend($.fn.passwordRequirements.defaults, options);

        return this.each(function () {

            var o = options;
            var $this = this;

            o.infoMessage = o.infoMessageText.replace('{0}', o.numCharacters);

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
                            var p = $('<p/>', { text: o.infoMessage });
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
            };

            // Show password hint
            $(this).on("blur", deleteMessage);


            // Show or Hide password hint based on user's event
            // Set variables
            var regex = {
                numCharactersDone: function (val) { return val.length >= o.numCharacters },
                useLowercaseDone: function (val) { return val.match(/[a-z]/) !== null },
                useUppercaseDone: function (val) { return val.match(/[A-Z]/) !== null },
                useNumbersDone: function (val) { return val.match(/\d/) !== null },
                useSpecialDone: function (val) { return val.match(/[,!%&@#$^*?_~]/) !== null }
            };

            // Show or Hide password hint based on keyup (input)
            $(this).on("input focus", function () {
                checkCompleted();

                for (var key in toCheck) {
                    var done = regex[key]($(this).val());
                    var cls = done ? 'addClass' : 'removeClass';

                    toCheck[key] = done;

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
        useLowercase: true,
        useUppercase: true,
        useNumbers: true,
        useSpecial: true,
        infoMessage: '',
        style: "light", // Style Options light or dark
        fadeTime: 300 // FadeIn / FadeOut in milliseconds
    };

    $.fn.passwordRequirements.locales = [];

    $.fn.passwordRequirements.locales["en"] = {
        infoMessageText: "The minimum password length is {0} characters and must contain at least 1 lowercase letter, 1 capital letter, 1 number, and 1 special character.",
        numCharactersText: "# of characters",
        useLowercaseText: "Lowercase letter",
        useUppercaseText: "Capital letter",
        useNumbersText: "Number",
        useSpecialText: "Special character"
    };

    $.extend($.fn.passwordRequirements.defaults, $.fn.passwordRequirements.locales['en']);

    $(window).resize(function () {
        $(".pr-box").get(0).updatePos();
    });
})(jQuery);
