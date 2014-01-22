(function () {
    'use strict';

    module.exports = function (http, dbUrl, namespaces, callback) {
        http({
            url: dbUrl + '/_design/main/_list/js/translations',
            qs: {keys: JSON.stringify(namespaces)}
        }, function (error, response, body) {
            if (error) {
                callback(error);
                return;
            }

            if (response.statusCode !== 200) {
                callback({statusCode: response.statusCode, body: body});
                return;
            }

            callback(undefined, body);
        });
    };
}());
