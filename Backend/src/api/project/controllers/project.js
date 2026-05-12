'use strict';

/**
 * project controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::project.project', ({ strapi }) => ({
    async findBySlug(ctx) {
        const { slug } = ctx.params;
    
        ctx.query = {
          ...ctx.query,
          filters: { slug },
        };
    
        const { data, meta } = await super.find(ctx);
        return { data, meta };
      },
}));