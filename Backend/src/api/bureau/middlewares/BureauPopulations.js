export default (config, { strapi }) => {
    return async (ctx, next) => {
      if (!ctx.query.populate) {
        ctx.query.populate = {
            philosophyCards: {
                fields: ['title', 'description']
            },
            founderCards: {
                fields: ['name', 'position', 'bio'],
                populate: {
                    photo: {
                        fields: ['name', 'url']
                    }
                }
            }
        };
      }
      await next();
    };
  };
  