describe('adaptI18nBrowserJs()', function () {
    'use strict';

    var assert = require('assert'),

        fs = require('fs'),
        enUsBrowserJs = fs.readFileSync(__dirname + '/data/en_us_browser_js', 'utf8'),

        adaptI18nBrowserJs = require('../src/adaptI18nBrowserJs'),
        i18n;

    beforeEach(function () {
        i18n = adaptI18nBrowserJs(enUsBrowserJs);
    });

    it('returns an object', function () {
        assert.strictEqual(typeof i18n, 'object');
    });

    it('results in namespaced and functional i18n functions', function () {
        assert.strictEqual(
            i18n['email/booking/confirmation'].subject({
                CHECK_IN_DATE: '22.01.2014',
                CHECK_OUT_DATE: '23.01.2014',
                HOTEL_NAME: 'Hotel Wartmann',
                HOTEL_CITY: 'Winterthur'
            }),

            'Reservation from 22.01.2014 to 23.01.2014 in Hotel Wartmann, Winterthur'
        );
    });
});
