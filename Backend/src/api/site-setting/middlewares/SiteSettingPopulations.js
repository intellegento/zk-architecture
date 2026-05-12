export default (config, { strapi }) => {
    return async (ctx, next) => {
      if (!ctx.query.populate) {
        ctx.query.populate = {
            footerSocialLinks: {
                fields: ['platform', 'url']
            }
        };
      }
      await next();
    };
  };
  