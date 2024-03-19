const jwt = require("jsonwebtoken");

const verification = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      {},
      (err, userData) => {
        if (err) throw err;
        resolve(userData);
      }
    );
  });
};

module.exports = verification;
