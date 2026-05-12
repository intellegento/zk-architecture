export default (config, { strapi }) => {
  return async (ctx, next) => {
    if (!ctx.query.populate) {
      ctx.query.populate = {
        projects: {
          fields: ['title', 'link', 'year', 'type'],
          populate: {
            mediaMobile: {
              fields: ['name', 'url']
            },
            mediaDesktop: {
              fields: ['name', 'url']
            }
          }
        },
        services: {
          fields: ['title'],
          populate: {
            slideItems: {
                fields: ['text']
            }
          }
        }
      };
    }
    await next();
  };
};
