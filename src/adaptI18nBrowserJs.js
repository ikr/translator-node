/* jshint evil:true */
/* jshint unused:false */

(function () {
    'use strict';

    module.exports = function (browserJs) {
        var window = {};
        eval(browserJs);
        return window.i18n;
    };
}());
