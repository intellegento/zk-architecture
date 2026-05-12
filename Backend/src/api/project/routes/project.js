'use strict';

/**
 * project router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::project.project', {
    config: {
        find: {
            middlewares: ['api::project.project-populations'],
        },
        findOne: {
            middlewares: ['api::project.project-populations'],
        }
    }
});
