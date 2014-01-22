/* jshint evil: true */

(function () {
    'use strict';

    module.exports = function (browserJs) {
        var window = {};
        eval(browserJs);
        return window.i18n;
    };
}());
