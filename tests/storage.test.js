describe('storage', function () {
    'use strict';

    var assert = require('assert'),
        sinon = require('sinon'),
        storage = require('../src/storage');

    describe('namespacedKeyToMessageMap()', function () {
        describe('successful view query', function () {
            var stubDb = function () {
                    return {
                        view: function (name, params, callback) {
                            setTimeout(function () {
                                callback(undefined, [{
                                    value: {
                                        key: 'bookX',
                                        translation: 'Book No. {NUM}',
                                        namespace: ['foo', 'bar']
                                    }
                                }, {
                                    value: {
                                        key: 'hook',
                                        translation: 'Hook',
                                        namespace: ['foo', 'baz']
                                    }
                                }]);
                            }, 0);
                        }
                    };
                };

            describe('execution', function () {
                var db;

                beforeEach(function (done) {
                    db = stubDb();
                    sinon.spy(db, 'view');
                    storage.namespacedKeyToMessageMap(db, ['foo/bar', 'foo/baz'], done);
                });

                it('queries the db view once', function () {
                    assert(db.view.calledOnce);
                });

                it('names the queried db view correctly', function () {
                    assert.strictEqual(db.view.args[0][0], 'main/translations');
                });

                it('passes namespace paths as the queried view keys', function () {
                    assert.deepEqual(db.view.args[0][1], {keys: ['foo/bar', 'foo/baz']});
                });
            });

            describe('result transformation', function () {
                it('results in the namespaced keys mapped to the messages', function (done) {
                    storage.namespacedKeyToMessageMap(
                        stubDb(),
                        ['foo/bar', 'foo/baz'],

                        function (error, result) {
                            assert(!error);

                            assert.deepEqual(result, {
                                'foo/bar:bookX': 'Book No. {NUM}',
                                'foo/baz:hook': 'Hook'
                            });

                            done();
                        }
                    );
                });
            });
        });

        describe('failed query', function () {
            it('propagates the db.view error', function (done) {
                var db = {
                        view: function (name, params, callback) { callback('Oopsie'); }
                    };

                storage.namespacedKeyToMessageMap(db, [], function (error) {
                    assert.strictEqual(error, 'Oopsie');
                    done();
                });
            });
        });
    });
});
