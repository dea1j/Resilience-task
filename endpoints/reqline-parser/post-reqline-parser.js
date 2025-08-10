// const { createHandler } = require('@app-core/server');
// const reqlineController = require('../../controllers/reqline.controller');

// module.exports = createHandler({
//   path: '/reqline-parser',
//   method: 'post',
//   async handler(rc, helpers) {
//     return await reqlineController(rc, helpers);
//   },
// });

const controller = require('../../controllers/reqline.controller');

module.exports = {
  method: 'post',
  path: '/reqline-parser',
  handler: async (req, res) => {
    await controller(req, res);
  },
};
