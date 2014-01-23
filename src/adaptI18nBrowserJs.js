/* jshint evil:true */
/* jshint unused:false */

(function () {
    'use strict';

    var MessageFormat = require('messageformat');

    module.exports = function (browserJs) {
        var window = {};
        eval(browserJs);
        return window.i18n;
    };
}());
