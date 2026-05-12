'use strict';

/**
 * site-setting router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::site-setting.site-setting', {
    config: {
        find: {
            middlewares: ['api::site-setting.site-setting-populations'],
        }
    }
});
