const service = require('../services/reqline.service');

module.exports = async (req) => {
  try {
    const result = await service(req.body.reqline);
    return {
      statusCode: 200,
      body: result,
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: { error: true, message: err.message },
    };
  }
};
