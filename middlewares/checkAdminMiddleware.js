const jwt = require('jsonwebtoken');

const checkAdminMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check if the user role is admin
    if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only Admins are allowed to perform this function' });
    }
    next();
  };
  
  module.exports = checkAdminMiddleware;