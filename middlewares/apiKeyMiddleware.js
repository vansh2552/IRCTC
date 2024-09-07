const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if(!apiKey) {
      return res.status(403).json({ error: 'API key is required' });
    }
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({ error: 'API key is not valid' });
    }
    next();
  };
  
  module.exports = apiKeyMiddleware;
  