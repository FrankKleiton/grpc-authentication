const jwt = require('jsonwebtoken');

module.exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_LIFE });
}

module.exports.verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        reject();
      }
      resolve(user);
    });
  });
}