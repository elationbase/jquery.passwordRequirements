/**
 * jQuery Minimun Password Requirements Brazilian Portuguese translation
 */
(function ($) {
    "use strict";

    $.fn.passwordRequirements.locales['pt-BR'] = {
        infoMessageTextArray: {
            minCharacters: "A senha deve ter no mínimo {0} caracteres",
            maxCharacters: "e no máximo {0}",
            mustContain: "e ela também deve conter ao menos",
            useLowercase: "1 letra minúscula",
            useUppercase: "1 letra maiúscula",
            useNumbers: "1 número",
            useSpecial: "1 caractere especial",
            and: " e "
        },
        numCharactersText: "# de caracteres",
        useLowercaseText: "Letra minúscula",
        useUppercaseText: "Letra maiúscula",
        useNumbersText: "Número",
        useSpecialText: "Caractere especial"
    };

    $.extend($.fn.passwordRequirements.defaults, $.fn.passwordRequirements.locales['pt-BR']);
})(jQuery);