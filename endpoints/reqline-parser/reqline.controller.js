const parseReqline = require('./reqline.service');

module.exports = async (req, res) => {
  const { reqline } = req.body;

  if (!reqline) {
    return res.status(400).json({ error: 'reqline is required' });
  }

  try {
    const result = await parseReqline(reqline);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
