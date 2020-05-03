const jwt = require('jsonwebtoken');

exports.protected = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) throw new Error();
      else return next();
    });
  } else {
    return res.status(403).json({
      status: 'fail',
      message: 'Invalid bearer token'
    });
  }
};
