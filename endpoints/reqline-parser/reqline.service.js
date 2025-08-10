const axios = require('axios');

function parseReqline(reqline) {
  const parts = reqline.trim().split(/\s+/);

  if (parts.length < 2) {
    throw new Error('Invalid REQLINE format. Expected format: METHOD URL [BODY]');
  }

  const method = parts[0].toUpperCase();
  const url = parts[1];
  let data = null;

  if (parts.length > 2) {
    try {
      data = JSON.parse(parts.slice(2).join(' '));
    } catch {
      throw new Error('Invalid JSON body in REQLINE.');
    }
  }

  return { method, url, data };
}

async function parseAndExecuteReqline(reqline) {
  const { method, url, data } = parseReqline(reqline);

  const config = {
    method,
    url,
  };

  if (data) config.data = data;

  const response = await axios(config);

  return {
    status: response.status,
    statusText: response.statusText,
    data: response.data,
  };
}

module.exports = {
  parseAndExecuteReqline,
};
