const redis = require('redis');
const client = redis.createClient();

function checkAccessTokenCache(req, res, next) {
    const { accessToken } = req.headers;
    client.get(accessToken, (err, cachedToken) => {
      if (err) {
        console.error('Error retrieving access token from Redis:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (cachedToken) {
        // Access token found in cache
        req.accessToken = cachedToken;
      }
  
      next();
    });
}

module.exports = checkAccessTokenCache