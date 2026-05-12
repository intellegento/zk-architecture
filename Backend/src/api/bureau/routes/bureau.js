'use strict';

/**
 * bureau router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::bureau.bureau', {
    config: {
        find: {
            middlewares: ['api::bureau.bureau-populations'],
        }
    }
});
