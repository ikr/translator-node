describe('adaptI18nBrowserJs()', function () {
    'use strict';

    var assert = require('assert'),

        fs = require('fs'),
        enUsBrowserJs = fs.readFileSync(__dirname + '/data/en_us_browser_js', 'utf8'),

        adaptI18nBrowserJs = require('../src/adaptI18nBrowserJs'),

        data = function () {
            return {
                NAME_PREFIX: 'Mr.',
                LAST_NAME: 'Krechetov',
                ROOM_COUNT: 2,
                RESERVATION_ID: 'R1545',
                CHECK_IN_DATE: '22.01.2014',
                CHECK_OUT_DATE: '23.01.2014',
                HOTEL_NAME: 'Hotel Wartmann',
                HOTEL_STARS: '***',
                HOTEL_ADDRESS: 'Gleis NaN',
                HOTEL_ZIP: '8400',
                HOTEL_CITY: 'Winterthur',
                CANCELLATION_URL: 'http://example.com/12345'
            };
        },

        i18n;

    beforeEach(function () {
        i18n = adaptI18nBrowserJs(enUsBrowserJs);
    });

    it('returns an object', function () {
        assert.strictEqual(typeof i18n, 'object');
    });

    it('results in working namespaced i18n function for simple placeholders', function () {
        assert.strictEqual(
            i18n['email/booking/confirmation'].subject(data()),
            'Reservation from 22.01.2014 to 23.01.2014 in Hotel Wartmann, Winterthur'
        );
    });

    it('results in working namespaced i18n function for a more advanced ICU message', function () {
        assert(/2 rooms/.test(i18n['email/booking/confirmation/body'].fullText(data())));
    });
});
