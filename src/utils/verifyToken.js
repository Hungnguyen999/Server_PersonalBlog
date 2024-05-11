// tokenUtils.js

const jwt = require('jsonwebtoken');

// Function to verify JWT token
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        console.log("err" + error);
        return reject(error); // Token verification failed
      }

      resolve(decoded); // Token is valid, return decoded payload
    });
  });
}

module.exports = { verifyToken };
