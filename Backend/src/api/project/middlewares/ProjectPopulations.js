export default (config, { strapi }) => {
  return async (ctx, next) => {
    if (!ctx.query.populate) {
      ctx.query.populate = {
        images: {
          fields: ['type'],
          populate: {
            media: {
              fields: ['name', 'url']
            }
          }
        },
        squareBigMedia: {
          fields: ['type'],
          populate: {
            media: {
              fields: ['name', 'url']
            }
          }
        },
        squareSmallMedia: {
          fields: ['type'],
          populate: {
            media: {
              fields: ['name', 'url']
            }
          }
        },
        locationImage: {
          fields: ['name', 'url']
        },
        mapImage: {
          fields: ['name', 'url']
        },
        conceptImages: {
          fields: ['type'],
          populate: {
            media: {
              fields: ['name', 'url']
            }
          }
        },
        imagesSlider: {
          fields: ['type'],
          populate: {
            media: {
              fields: ['name', 'url']
            }
          }
        },
        detailedInfoProject: {
          fields: ['title', 'text', 'top', 'sliderTitle'],
          populate: {
            images: {
              fields: ['type'],
              populate: {
                preview: {
                  fields: ['name', 'url']
                },
                original: {
                  fields: ['name', 'url']
                }
              }
            },
            sliderImages: {
              fields: ['type'],
              populate: {
                media: {
                  fields: ['name', 'url']
                }
              }
            }
          }
        },
        projectDescriptions: {
          fields: ['title', 'info']
        }
      };
    }
    await next();
  };
};
