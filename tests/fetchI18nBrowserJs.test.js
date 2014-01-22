describe('fetchI18nBrowserJs()', function () {
    'use strict';

    var assert = require('assert'),
        sinon = require('sinon'),

        fs = require('fs'),
        enUsBrowserJs = fs.readFileSync(__dirname + '/data/en_us_browser_js', 'utf8'),

        fetchI18nBrowserJs = require('../src/fetchI18nBrowserJs');

    describe('in case of success', function () {
        var stubHttp = function () {
                return function (options, callback) {
                    setTimeout(function () {
                        callback(undefined, {statusCode: 200}, enUsBrowserJs);
                    }, 0);
                };
            };

        describe('http invocation', function () {
            var spy;

            beforeEach(function (done) {
                spy = sinon.spy(stubHttp());
                fetchI18nBrowserJs(spy, 'http://couch/t_en_us', ['email'], done);
            });

            it('happens once', function () {
                assert(spy.calledOnce);
            });

            it('is done with proper DB _list URL', function () {
                assert.strictEqual(
                    spy.args[0][0].url, 'http://couch/t_en_us/_design/main/_list/js/translations');
            });

            it('is done with JSON-encoded namespaces as "keys" in query string', function () {
                assert.strictEqual(spy.args[0][0].qs.keys, '["email"]');
            });
        });

        it('returns the HTTP response body', function (done) {
            fetchI18nBrowserJs(stubHttp(), '', [], function (error, result) {
                assert(!error);
                assert.strictEqual(result, enUsBrowserJs);
                done();
            });
        });
    });

    it('propagates HTTP error', function (done) {
        var http = function (options, callback) {
                setTimeout(function () { callback('Oopsie'); }, 0);
            };

        fetchI18nBrowserJs(http, '', [], function (error) {
            assert.strictEqual(error, 'Oopsie');
            done();
        });
    });

    it('raises an error if http returns non-200 status', function (done) {
        var http = function (options, callback) {
                setTimeout(function () {
                    callback(undefined, {statusCode: 404}, '');
                }, 0);
            };

        fetchI18nBrowserJs(http, '', [], function (error) {
            assert(error);
            done();
        });
    });
});
