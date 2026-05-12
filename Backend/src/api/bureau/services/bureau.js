'use strict';

/**
 * bureau service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bureau.bureau');
