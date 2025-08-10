const qs = require('querystring');

module.exports = (reqline) => {
  if (!reqline || typeof reqline !== 'string') {
    throw new Error('Missing reqline string');
  }

  // Destructure the parts
  const [methodPart, urlPart, queryPart] = reqline.split('|').map((p) => p.trim());

  // Extract method
  const [, method] = methodPart.split(' ');
  if (!method) {
    throw new Error('HTTP method not found in reqline');
  }

  // Extract URL
  const [, , rawUrl] = urlPart.split(' ');
  if (!rawUrl) {
    throw new Error('URL not found in reqline');
  }

  // Parse base parts manually (works in Node 8)
  const match = rawUrl.match(/^(https?):\/\/([^/]+)(\/[^?]*)?(\?.*)?$/i);
  if (!match) {
    throw new Error('Invalid URL format');
  }

  const protocol = match[1];
  const host = match[2];
  const path = match[3] || '';
  const initialQuery = match[4] ? qs.parse(match[4].substring(1)) : {};

  // Merge with queryPart JSON
  let extraQuery = {};
  if (queryPart) {
    const [, rawQuery] = queryPart.split(' ');
    try {
      extraQuery = JSON.parse(rawQuery);
    } catch (err) {
      throw new Error(`Invalid query JSON: ${err.message}`);
    }
  }

  const finalQuery = { ...initialQuery, ...extraQuery };
  const queryString = qs.stringify(finalQuery);
  const fullUrl = `${protocol}://${host}${path}${queryString ? `?${queryString}` : ''}`;

  return {
    method,
    fullUrl,
    protocol,
    host,
    path,
    query: finalQuery,
  };
};
