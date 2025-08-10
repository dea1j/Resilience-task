// const reqlineService = require('../services/reqline.service');

// module.exports = async function (reqContext, helpers) {
//   const payload = reqContext.body;

//   const response = await reqlineService(payload);

//   return {
//     status: helpers.http_statuses.HTTP_200_OK,
//     data: response,
//   };
// };

const service = require('../services/reqline.service');

module.exports = async (req, res) => {
  try {
    const result = await service(req.body.reqline);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};
