'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/projects/:slug',
      handler: 'api::project.project.findBySlug',
      config: {
        auth: false,
        middlewares: ['api::project.project-populations'],
      },
    },
  ],
};
