(function () {
    'use strict';

    exports.namespacedKeyToMessageMap = function (db, namespacePaths, callback) {
        db.view('main/translations', {keys: namespacePaths}, function (error, rows) {
            if (error) {
                callback(error);
                return;
            }

            callback(undefined, rows.map(function (row) {
                return [
                    row.value.namespace.join('/') + ':' + row.value.key,
                    row.value.translation
                ];
            }).reduce(function (memo, pair) {
                memo[pair[0]] = pair[1];
                return memo;
            }, {}));
        });
    };
}());
