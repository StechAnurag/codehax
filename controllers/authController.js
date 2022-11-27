const config = require('config');
const authToken = config.get('adminToken');

module.exports.routeProtect = (req, res, next) => {
  console.log(req.headers);
  if (!req.headers['admin-token'] || req.headers['admin-token'] !== authToken) {
    return res.status(401).json({
      status: 'failed',
      code: 401,
      message: "You're unauthorized to access the resource."
    });
  }
  next();
};
