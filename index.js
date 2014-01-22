(function () {
    'use strict';

    var request = require('request'),
        fetchI18nBrowserJs = require('./src/fetchI18nBrowserJs'),
        adaptI18nBrowserJs = require('./src/adaptI18nBrowserJs');

    exports.i18n = function (dbUrl, namespaces, callback) {
        fetchI18nBrowserJs(request, dbUrl, namespaces, function (error, browserJs) {
            if (error) {
                callback(error);
                return;
            }

            callback(undefined, adaptI18nBrowserJs(browserJs));
        });
    };
}());
