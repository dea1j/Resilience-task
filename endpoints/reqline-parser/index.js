const handler = require('./reqline.controller');

module.exports = {
  path: '/reqline-parser',
  method: 'post',
  middlewares: [handler],
};
