const { parseAndExecuteReqline } = require('./reqline.service');

module.exports = {
  method: 'post',
  path: '/',
  middlewares: [
    async (req, res) => {
      const { reqline } = req.body;

      if (!reqline) {
        return res.status(400).json({ error: 'Missing "reqline" in request body.' });
      }

      try {
        const result = await parseAndExecuteReqline(reqline);
        return res.status(200).json(result);
      } catch (err) {
        return res.status(500).json({
          error: 'Failed to execute request.',
          details: err.message || err.toString(),
        });
      }
    },
  ],
};
