const controller = require('../../controllers/reqline.controller');

module.exports = {
  method: 'post',
  path: '/reqline-parser',
  handler: async (req, res) => controller(req),
};
